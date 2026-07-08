import type { OfferItem } from '@/payload-types'

import {
  type CmsEntityKey,
  type MediaReplacement,
  resolveMediaId,
} from './mediaRefs'

export type DuplicateFn = (sourceId: number, label: string) => Promise<number>

/** Every upload field on an offer document (listing card + detail sections). */
export function collectOfferMediaIds(offer: Partial<OfferItem> | null | undefined): number[] {
  if (!offer) return []

  const ids: number[] = []

  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(offer.image)
  push(offer.hero?.image)
  push(offer.approach?.portraitImage)
  offer.packages?.items?.forEach((item) => push(item.image))
  push(offer.inclusions?.mainImage)
  push(offer.inclusions?.scallopImage)
  push(offer.care?.image)
  offer.testimonial?.items?.forEach((item) => push(item.photo))
  offer.gallery?.items?.forEach((item) => push(item.image))

  return ids
}

export type CmsEntityDescriptor = {
  key: CmsEntityKey
  label: string
  mediaIds: readonly number[]
}

/**
 * For media IDs referenced by more than one offer, the lexicographically first
 * entity key keeps the original file; others receive duplicates.
 */
export function buildOfferCanonicalOwners(
  offers: readonly OfferItem[],
): Map<number, CmsEntityKey> {
  const usage = new Map<number, CmsEntityKey[]>()

  for (const offer of offers) {
    const key = `offerItems:${offer.id}`
    for (const mediaId of collectOfferMediaIds(offer)) {
      const keys = usage.get(mediaId) ?? []
      keys.push(key)
      usage.set(mediaId, keys)
    }
  }

  const canonical = new Map<number, CmsEntityKey>()
  for (const [mediaId, keys] of usage) {
    const unique = [...new Set(keys)]
    if (unique.length <= 1) continue
    unique.sort()
    canonical.set(mediaId, unique[0])
  }

  return canonical
}

export async function splitSharedMediaOnOffer(
  offer: OfferItem,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ offer: OfferItem; replacements: MediaReplacement[] }> {
  const next = structuredClone(offer) as OfferItem
  const replacements: MediaReplacement[] = []

  const replace = async (path: string, get: () => unknown, set: (id: number) => void) => {
    const mediaId = resolveMediaId(get())
    if (mediaId == null) return

    const owner = canonicalOwner.get(mediaId)
    if (owner == null || owner === entityKey) return

    const cacheKey = `${entityKey}:${mediaId}`
    let newId = duplicateCache.get(cacheKey)
    if (newId == null) {
      newId = await duplicate(mediaId, path)
      duplicateCache.set(cacheKey, newId)
    }

    if (options.apply) {
      set(newId)
    }

    replacements.push({ path, from: mediaId, to: newId })
  }

  await replace('image', () => next.image, (id) => {
    next.image = id
  })

  if (next.hero) {
    await replace('hero.image', () => next.hero?.image, (id) => {
      if (next.hero) next.hero.image = id
    })
  }

  if (next.approach) {
    await replace('approach.portraitImage', () => next.approach?.portraitImage, (id) => {
      if (next.approach) next.approach.portraitImage = id
    })
  }

  if (next.packages?.items) {
    for (const [index, item] of next.packages.items.entries()) {
      await replace(`packages.items[${index}].image`, () => item.image, (id) => {
        item.image = id
      })
    }
  }

  if (next.inclusions) {
    await replace('inclusions.mainImage', () => next.inclusions?.mainImage, (id) => {
      if (next.inclusions) next.inclusions.mainImage = id
    })
    await replace('inclusions.scallopImage', () => next.inclusions?.scallopImage, (id) => {
      if (next.inclusions) next.inclusions.scallopImage = id
    })
  }

  if (next.care) {
    await replace('care.image', () => next.care?.image, (id) => {
      if (next.care) next.care.image = id
    })
  }

  if (next.testimonial?.items) {
    for (const [index, item] of next.testimonial.items.entries()) {
      await replace(`testimonial.items[${index}].photo`, () => item.photo, (id) => {
        item.photo = id
      })
    }
  }

  if (next.gallery?.items) {
    for (const [index, item] of next.gallery.items.entries()) {
      await replace(`gallery.items[${index}].image`, () => item.image, (id) => {
        item.image = id
      })
    }
  }

  return { offer: next, replacements }
}
