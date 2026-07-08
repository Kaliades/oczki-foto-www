import type { Payload } from 'payload'

import {
  type OfferListingSeed,
  seedFullOfferItem,
} from './lib/offerSeedShared'
import { runSeedCli } from './lib/seedCli'

const SESJE_KOBIECE: OfferListingSeed = {
  slug: 'sesje-kobiece',
  title: 'Sesja kobieca',
  shortDescription:
    'Sesja kobieca w atmosferze zaufania i swobody — naturalne kadry, które przypomną Ci o Twojej sile i pięknie.',
  listingImageSrc: '/seed-assets/offer-session-kobieca.png',
  listingImageAlt: 'Kobieta z bukietem przy oknie',
}

export async function seedOffer(payload: Payload): Promise<void> {
  await seedFullOfferItem(payload, SESJE_KOBIECE)
}

runSeedCli(seedOffer, 'seedOffer')
