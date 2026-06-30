import type { Payload } from 'payload'

import { type OfferListingSeed, seedFullOfferItem } from './lib/offerSeedShared'
import { runSeedCli } from './lib/seedCli'

const OFFERS: readonly OfferListingSeed[] = [
  {
    slug: 'reportaze-slubne',
    title: 'Reportaż ślubny',
    shortDescription:
      'Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia, gesty i momenty, które często umykają w dniu ślubu.',
    listingImageSrc: '/seed-assets/offer-reportaz-slubny.png',
    listingImageAlt: 'Para młoda patrząca na siebie podczas reportażu ślubnego',
  },
  {
    slug: 'sesje-wizerunkowe',
    title: 'Sesja wizerunkowa',
    shortDescription:
      'Dla kobiet i marek osobistych, które chcą zdjęć spójnych z tym, kim są. Pomagam stworzyć wizerunek, który jest naturalny, profesjonalny i prawdziwy jednocześnie.',
    listingImageSrc: '/seed-assets/offer-session-wizerunkowa.png',
    listingImageAlt: 'Kobieta siedząca z notesem podczas sesji wizerunkowej',
    imageCropClassName: 'h-[150%] top-[-16.62%] w-full',
  },
  {
    slug: 'sesje-rodzinne',
    title: 'Sesja rodzinna',
    shortDescription:
      'Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i przestrzenią na bycie razem. To pamiątka z codzienności, do której chce się wracać.',
    listingImageSrc: '/seed-assets/offer-session-rodzinna.png',
    listingImageAlt: 'Mama trzymająca dziecko przy oknie',
  },
  {
    slug: 'sesje-milosne',
    title: 'Sesja miłosna',
    shortDescription:
      'Dla par, które chcą zatrzymać swoją bliskość w kadrze — naturalnie, bez pozowania na siłę.',
    listingImageSrc: '/seed-assets/offer-session-milosna.png',
    listingImageAlt: 'Para podczas sesji miłosnej',
    imageCropClassName: 'h-[254.48%] left-[-40.69%] top-[-57.08%] w-[169.65%]',
  },
] as const

export async function seedMissingOffers(payload: Payload): Promise<void> {
  for (const offer of OFFERS) {
    await seedFullOfferItem(payload, offer)
  }
}

runSeedCli(seedMissingOffers, 'seedMissingOffers')
