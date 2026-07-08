import type { Payload } from 'payload'

import type { OfferItem } from '@/payload-types'

import { collectOfferMediaIds } from './offerMediaRefs'
import { splitCmsSharedMedia, type SplitCmsSharedMediaOptions } from './splitCmsSharedMedia'
import type { MediaReplacement } from './mediaRefs'

export type SplitOfferSharedMediaResult = {
  offersChecked: number
  offersUpdated: number
  mediaDuplicatesCreated: number
  replacements: { offerSlug: string; offerId: number; items: MediaReplacement[] }[]
}

/**
 * @deprecated Prefer `splitCmsSharedMedia` — cross-collection split includes offers.
 * Kept for `pnpm split:offer-media` alias.
 */
export async function splitOfferSharedMedia(
  payload: Payload,
  options: SplitCmsSharedMediaOptions,
): Promise<SplitOfferSharedMediaResult> {
  const offersResult = await payload.find({
    collection: 'offerItems',
    depth: 0,
    limit: 200,
    pagination: false,
    overrideAccess: true,
  })
  const offers = offersResult.docs as OfferItem[]

  const full = await splitCmsSharedMedia(payload, options)

  const replacements = full.byEntity
    .filter((entry) => entry.entityKey.startsWith('offerItems:'))
    .map((entry) => {
      const id = Number(entry.entityKey.split(':')[1])
      const offer = offers.find((doc) => doc.id === id)
      return {
        offerSlug: entry.label,
        offerId: id,
        items: entry.replacements,
      }
    })

  return {
    offersChecked: offers.length,
    offersUpdated: options.apply ? replacements.length : replacements.length,
    mediaDuplicatesCreated: full.mediaDuplicatesCreated,
    replacements,
  }
}

export function describeSharedMediaUsage(offers: OfferItem[]): string[] {
  return offers.flatMap((offer) => {
    const ids = [...new Set(collectOfferMediaIds(offer))]
    return ids.map((mediaId) => `${offer.slug ?? offer.id}: media #${mediaId}`)
  })
}
