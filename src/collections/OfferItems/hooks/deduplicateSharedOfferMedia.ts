import type { CollectionBeforeChangeHook } from 'payload'

import type { OfferItem } from '@/payload-types'

import { duplicateMediaRecord } from '@/utilities/cmsMedia/duplicateMedia'
import {
  buildOfferCanonicalOwners,
  collectOfferMediaIds,
  splitSharedMediaOnOffer,
} from '@/utilities/cmsMedia/offerMedia'
import { entityKey } from '@/utilities/cmsMedia/mediaRefs'

/**
 * On save, detaches shared media IDs so one offer cannot affect another.
 * Lowest numeric offer id keeps the original file per shared media ID.
 */
export const deduplicateSharedOfferMedia: CollectionBeforeChangeHook<OfferItem> = async ({
  data,
  originalDoc,
  req,
}) => {
  if ((req.context as { disableMediaDedupe?: boolean } | undefined)?.disableMediaDedupe) return data
  if (!data) return data

  const offerId = originalDoc?.id
  if (!offerId) return data

  const allOffers = await req.payload.find({
    collection: 'offerItems',
    depth: 0,
    limit: 100,
    pagination: false,
    overrideAccess: true,
  })

  const offers = allOffers.docs.map((doc) =>
    doc.id === offerId ? ({ ...doc, ...data } as OfferItem) : (doc as OfferItem),
  )

  const canonicalOwner = buildOfferCanonicalOwners(offers)
  if (canonicalOwner.size === 0) return data

  const merged = { ...originalDoc, ...data } as OfferItem
  const key = entityKey('offerItems', offerId)
  const duplicateCache = new Map<string, number>()
  const label = merged.slug ?? String(offerId)

  const { offer: next, replacements } = await splitSharedMediaOnOffer(
    merged,
    key,
    canonicalOwner,
    duplicateCache,
    async (sourceId, path) =>
      duplicateMediaRecord(req.payload, sourceId, {
        nameSuffix: `${label}-${path}`,
      }),
    { apply: true },
  )

  if (replacements.length === 0) return data

  req.payload.logger.info(
    `Offer #${offerId} (${label}): split ${replacements.length} shared media reference(s) on save.`,
  )

  const {
    id: _id,
    createdAt: _createdAt,
    updatedAt: _updatedAt,
    ...patch
  } = next

  return { ...data, ...patch }
}
