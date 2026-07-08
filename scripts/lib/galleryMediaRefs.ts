import type { Gallery } from '@/payload-types'

import {
  type CmsEntityKey,
  type DuplicateFn,
  type MediaReplacement,
  resolveMediaId,
} from './mediaRefs'

export type { MediaReplacement } from './mediaRefs'

/** Every upload field on a gallery document (cover + case-study sections). */
export function collectGalleryMediaIds(gallery: Gallery): number[] {
  const ids: number[] = []

  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(gallery.coverImage)
  gallery.photos?.forEach((row) => push(row.image))
  push(gallery.hero?.backgroundImage)
  push(gallery.duoPerspective?.photo)
  push(gallery.venueStory?.backImage)
  push(gallery.venueStory?.frontImage)
  push(gallery.venueStory?.scallopImage)
  gallery.testimonial?.items?.forEach((item) => push(item.photo))
  push(gallery.memorableMoment?.portraitPhoto)
  push(gallery.memorableMoment?.landscapePhoto)
  push(gallery.meta?.image)

  return ids
}

export async function splitSharedMediaOnGallery(
  gallery: Gallery,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ gallery: Gallery; replacements: MediaReplacement[] }> {
  const next = structuredClone(gallery) as Gallery
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

  await replace('coverImage', () => next.coverImage, (id) => {
    next.coverImage = id
  })

  if (next.photos) {
    for (const [index, row] of next.photos.entries()) {
      await replace(`photos[${index}].image`, () => row.image, (id) => {
        row.image = id
      })
    }
  }

  if (next.hero) {
    await replace('hero.backgroundImage', () => next.hero?.backgroundImage, (id) => {
      if (next.hero) next.hero.backgroundImage = id
    })
  }

  if (next.duoPerspective) {
    await replace('duoPerspective.photo', () => next.duoPerspective?.photo, (id) => {
      if (next.duoPerspective) next.duoPerspective.photo = id
    })
  }

  if (next.venueStory) {
    await replace('venueStory.backImage', () => next.venueStory?.backImage, (id) => {
      if (next.venueStory) next.venueStory.backImage = id
    })
    await replace('venueStory.frontImage', () => next.venueStory?.frontImage, (id) => {
      if (next.venueStory) next.venueStory.frontImage = id
    })
    await replace('venueStory.scallopImage', () => next.venueStory?.scallopImage, (id) => {
      if (next.venueStory) next.venueStory.scallopImage = id
    })
  }

  if (next.testimonial?.items) {
    for (const [index, item] of next.testimonial.items.entries()) {
      await replace(`testimonial.items[${index}].photo`, () => item.photo, (id) => {
        item.photo = id
      })
    }
  }

  if (next.memorableMoment) {
    await replace(
      'memorableMoment.portraitPhoto',
      () => next.memorableMoment?.portraitPhoto,
      (id) => {
        if (next.memorableMoment) next.memorableMoment.portraitPhoto = id
      },
    )
    await replace(
      'memorableMoment.landscapePhoto',
      () => next.memorableMoment?.landscapePhoto,
      (id) => {
        if (next.memorableMoment) next.memorableMoment.landscapePhoto = id
      },
    )
  }

  if (next.meta) {
    await replace('meta.image', () => next.meta?.image, (id) => {
      if (next.meta) next.meta.image = id
    })
  }

  return { gallery: next, replacements }
}
