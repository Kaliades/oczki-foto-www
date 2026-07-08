import type { Payload } from 'payload'

import type { Gallery } from '@/payload-types'

import { splitCmsSharedMedia, type SplitCmsSharedMediaOptions } from './splitCmsSharedMedia'
import type { MediaReplacement } from './mediaRefs'

export type SplitGallerySharedMediaResult = {
  galleriesChecked: number
  galleriesUpdated: number
  mediaDuplicatesCreated: number
  replacements: { gallerySlug: string; galleryId: number; items: MediaReplacement[] }[]
}

/**
 * @deprecated Prefer `splitCmsSharedMedia` — cross-collection split includes galleries.
 */
export async function splitGallerySharedMedia(
  payload: Payload,
  options: SplitCmsSharedMediaOptions,
): Promise<SplitGallerySharedMediaResult> {
  const galleriesResult = await payload.find({
    collection: 'galleries',
    depth: 0,
    limit: 500,
    pagination: false,
    overrideAccess: true,
  })
  const galleries = galleriesResult.docs as Gallery[]

  const full = await splitCmsSharedMedia(payload, options)

  const replacements = full.byEntity
    .filter((entry) => entry.entityKey.startsWith('galleries:'))
    .map((entry) => {
      const id = Number(entry.entityKey.split(':')[1])
      const gallery = galleries.find((doc) => doc.id === id)
      return {
        gallerySlug: gallery?.slug ?? entry.label,
        galleryId: id,
        items: entry.replacements,
      }
    })

  return {
    galleriesChecked: galleries.length,
    galleriesUpdated: options.apply ? replacements.length : replacements.length,
    mediaDuplicatesCreated: full.mediaDuplicatesCreated,
    replacements,
  }
}
