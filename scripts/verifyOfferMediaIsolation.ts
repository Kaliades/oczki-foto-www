import type { Payload } from 'payload'

import { collectOfferMediaIds, buildOfferCanonicalOwners } from '@/utilities/cmsMedia/offerMedia'

import { runSeedCli } from './lib/seedCli'

export async function verifyOfferMediaIsolation(payload: Payload): Promise<void> {
  const { docs } = await payload.find({
    collection: 'offerItems',
    depth: 0,
    limit: 100,
    pagination: false,
    sort: 'id',
    overrideAccess: true,
  })

  const offers = docs
  const canonical = buildOfferCanonicalOwners(offers)

  const usage = new Map<number, string[]>()
  for (const offer of offers) {
    for (const mediaId of collectOfferMediaIds(offer)) {
      const slugs = usage.get(mediaId) ?? []
      slugs.push(offer.slug ?? String(offer.id))
      usage.set(mediaId, slugs)
    }
  }

  const leaks = [...usage.entries()].filter(([, slugs]) => new Set(slugs).size > 1)

  payload.logger.info('— Offer media isolation audit')
  payload.logger.info(`Offers: ${offers.length}`)
  payload.logger.info(`Shared media files (canonical map): ${canonical.size}`)
  payload.logger.info(`Cross-offer leaks: ${leaks.length}`)

  for (const offer of offers) {
    const ids = collectOfferMediaIds(offer)
    payload.logger.info(`  ${offer.slug}: ${ids.length} media ref(s)`)
  }

  const seededCrops = offers
    .filter((o) => o.imageCropClassName)
    .map((o) => `${o.slug}=${o.imageCropClassName}`)
  payload.logger.info(
    seededCrops.length
      ? `Seeded imageCropClassName still set: ${seededCrops.join('; ')}`
      : 'Seeded imageCropClassName: cleared on all offers',
  )

  if (canonical.size > 0 || leaks.length > 0) {
    for (const [mediaId, slugs] of leaks) {
      payload.logger.error(`LEAK media #${mediaId}: used by [${slugs.join(', ')}]`)
    }
    throw new Error('Offer media isolation check FAILED')
  }

  payload.logger.info('PASS — no cross-offer shared media')
}

runSeedCli(verifyOfferMediaIsolation, 'verifyOfferMediaIsolation')
