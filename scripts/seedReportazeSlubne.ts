import type { Payload } from 'payload'

import { seedFullOfferItem } from './lib/offerSeedShared'
import { runSeedCli } from './lib/seedCli'

/**
 * Seeds only `/oferta/reportaze-slubne`: uploads Figma seed PNGs into Media,
 * wires the OfferItem, and falls back to `placeholder-offer-portrait` when a
 * file is missing. Duo collage stays code-hardcoded (not uploaded).
 */
export async function seedReportazeSlubne(payload: Payload): Promise<void> {
  await seedFullOfferItem(payload, {
    slug: 'reportaze-slubne',
    title: 'Reportaż ślubny',
    shortDescription:
      'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
    listingImageSrc: '/seed-assets/offer-reportaz-slubny.png',
    listingImageAlt: 'Para młoda patrząca na siebie podczas reportażu ślubnego',
  })
}

runSeedCli(seedReportazeSlubne, 'seedReportazeSlubne')
