import type { Page } from '@/payload-types'

import {
  type CmsEntityKey,
  type DuplicateFn,
  type MediaReplacement,
  resolveMediaId,
} from './mediaRefs'

export type { MediaReplacement } from './mediaRefs'

/** Every upload field on a Pages document (layout blocks + meta). */
export function collectPageMediaIds(page: Page): number[] {
  const ids: number[] = []

  const push = (value: unknown) => {
    const id = resolveMediaId(value)
    if (id != null) ids.push(id)
  }

  push(page.meta?.image)

  for (const block of page.layout ?? []) {
    switch (block.blockType) {
      case 'homeHero':
        push(block.background)
        break
      case 'introQuote':
        push(block.collageImage)
        break
      case 'homeGallery':
        block.items?.forEach((item) => push(item.image))
        break
      case 'testimonial':
        block.items?.forEach((item) => push(item.photo))
        break
      case 'homeAbout':
        push(block.portrait)
        break
      case 'homeInstagram':
        push(block.profile.avatar)
        block.posts?.forEach((post) => push(post.image))
        break
      default:
        break
    }
  }

  return ids
}

export async function splitSharedMediaOnPage(
  page: Page,
  entityKey: CmsEntityKey,
  canonicalOwner: Map<number, CmsEntityKey>,
  duplicateCache: Map<string, number>,
  duplicate: DuplicateFn,
  options: { apply: boolean },
): Promise<{ page: Page; replacements: MediaReplacement[] }> {
  const next = structuredClone(page) as Page
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

  if (next.meta) {
    await replace('meta.image', () => next.meta?.image, (id) => {
      if (next.meta) next.meta.image = id
    })
  }

  for (const [blockIndex, block] of (next.layout ?? []).entries()) {
    const prefix = `layout[${blockIndex}]`

    switch (block.blockType) {
      case 'homeHero':
        await replace(`${prefix}.background`, () => block.background, (id) => {
          block.background = id
        })
        break
      case 'introQuote':
        await replace(`${prefix}.collageImage`, () => block.collageImage, (id) => {
          block.collageImage = id
        })
        break
      case 'homeGallery':
        if (block.items) {
          for (const [index, item] of block.items.entries()) {
            await replace(`${prefix}.items[${index}].image`, () => item.image, (id) => {
              item.image = id
            })
          }
        }
        break
      case 'testimonial':
        if (block.items) {
          for (const [index, item] of block.items.entries()) {
            await replace(`${prefix}.items[${index}].photo`, () => item.photo, (id) => {
              item.photo = id
            })
          }
        }
        break
      case 'homeAbout':
        await replace(`${prefix}.portrait`, () => block.portrait, (id) => {
          block.portrait = id
        })
        break
      case 'homeInstagram':
        await replace(`${prefix}.profile.avatar`, () => block.profile.avatar, (id) => {
          block.profile.avatar = id
        })
        if (block.posts) {
          for (const [index, post] of block.posts.entries()) {
            await replace(`${prefix}.posts[${index}].image`, () => post.image, (id) => {
              post.image = id
            })
          }
        }
        break
      default:
        break
    }
  }

  return { page: next, replacements }
}
