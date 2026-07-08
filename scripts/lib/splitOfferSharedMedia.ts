import type { Payload } from 'payload'

import type { OfferItem } from '@/payload-types'

import { duplicateMediaRecord } from '@/utilities/cmsMedia/duplicateMedia'
import { entityKey, type MediaReplacement } from '@/utilities/cmsMedia/mediaRefs'
import {
  buildOfferCanonicalOwners,
  collectOfferMediaIds,
  splitSharedMediaOnOffer,
} from '@/utilities/cmsMedia/offerMedia'

import { updateVersionedCollectionDoc } from './versionedUpdate'

export type SplitOfferSharedMediaResult = {
  offersChecked: number
  offersUpdated: number
  mediaDuplicatesCreated: number
  sharedMediaCount: number
  replacements: { offerSlug: string; offerId: number; items: MediaReplacement[] }[]
}

export type SplitOfferSharedMediaOptions = {
  apply: boolean
}

const UPDATE_CONTEXT = { disableRevalidate: true, disableMediaDedupe: true } as const

function stripOfferForUpdate(
  offer: OfferItem,
): Omit<OfferItem, 'id' | 'createdAt' | 'updatedAt'> {
  const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = offer
  return data
}

/**
 * Detaches cross-offer media links by copying shared files per offer.
 * Does not touch galleries, pages, or globals.
 */
export async function splitOfferSharedMedia(
  payload: Payload,
  options: SplitOfferSharedMediaOptions,
): Promise<SplitOfferSharedMediaResult> {
  const result = await payload.find({
    collection: 'offerItems',
    depth: 0,
    limit: 200,
    pagination: false,
    sort: 'id',
    overrideAccess: true,
  })

  const offers = result.docs as OfferItem[]
  const canonicalOwner = buildOfferCanonicalOwners(offers)
  const duplicateCache = new Map<string, number>()

  const summary: SplitOfferSharedMediaResult = {
    offersChecked: offers.length,
    offersUpdated: 0,
    mediaDuplicatesCreated: 0,
    sharedMediaCount: canonicalOwner.size,
    replacements: [],
  }

  if (canonicalOwner.size === 0) {
    payload.logger.info('No cross-offer shared media found — nothing to split.')
    return summary
  }

  payload.logger.info(
    `Found ${canonicalOwner.size} media file(s) shared across ${offers.length} offer(s).`,
  )

  for (const [mediaId, ownerKey] of canonicalOwner) {
    const users = offers
      .filter((offer) => collectOfferMediaIds(offer).includes(mediaId))
      .map((o) => o.slug ?? `#${o.id}`)
    payload.logger.info(`media #${mediaId}: [${users.join(', ')}] — ${ownerKey} keeps original`)
  }

  for (const offer of offers) {
    const key = entityKey('offerItems', offer.id)
    const label = offer.slug ?? String(offer.id)

    const { offer: next, replacements } = await splitSharedMediaOnOffer(
      offer,
      key,
      canonicalOwner,
      duplicateCache,
      async (sourceId, path) => {
        if (!options.apply) {
          payload.logger.info(`[dry-run] Would duplicate media #${sourceId} for ${label}:${path}`)
          return sourceId
        }

        const newId = await duplicateMediaRecord(payload, sourceId, {
          nameSuffix: `${label}-${path.replace(/[^\w.-]+/g, '-')}`,
        })
        payload.logger.info(`Duplicated media #${sourceId} -> #${newId} (${label}: ${path})`)
        return newId
      },
      { apply: options.apply },
    )

    if (replacements.length === 0) continue

    summary.replacements.push({
      offerSlug: label,
      offerId: offer.id,
      items: replacements,
    })

    if (options.apply) {
      await updateVersionedCollectionDoc(
        payload,
        'offerItems',
        offer.id,
        stripOfferForUpdate(next),
        options,
        UPDATE_CONTEXT,
      )
      summary.offersUpdated += 1
      payload.logger.info(`Updated offer #${offer.id} (${label}) — ${replacements.length} reference(s).`)
    } else {
      payload.logger.info(
        `[dry-run] Would update offer #${offer.id} (${label}) — ${replacements.length} reference(s).`,
      )
    }
  }

  summary.mediaDuplicatesCreated = options.apply
    ? duplicateCache.size
    : new Set(
        summary.replacements.flatMap((entry) =>
          entry.items.map((item) => `${entry.offerId}:${item.from}`),
        ),
      ).size

  return summary
}

export function describeSharedMediaUsage(offers: OfferItem[]): string[] {
  return offers.flatMap((offer) => {
    const ids = [...new Set(collectOfferMediaIds(offer))]
    return ids.map((mediaId) => `${offer.slug ?? offer.id}: media #${mediaId}`)
  })
}
