export const OFFER_SERVICE_DUO_FIGMA_NODES = {
  container: {
    desktop: '7353:9590',
    mobile: '7356:10270',
    tablet: '7356:10122',
  },
  copyColumn: {
    desktop: '7353:9539',
    mobile: '7356:10271',
    tablet: '7356:10123',
  },
  collage: {
    desktop: '7353:9589',
    mobile: '7356:10292',
    tablet: '7356:10234',
  },
} as const

export const OFFER_SERVICE_DUO_ASSETS = {
  collageDesktop: '/figma/offer-duo-collage-desktop.png',
  collageMobile: '/figma/offer-duo-collage-mobile.png',
  collageTablet: '/figma/offer-duo-collage-tablet.png',
} as const

export type OfferServiceDuoFeature = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  title: string
}

export type OfferServiceDuoHeading = {
  emphasis: string
  /** Regular run after emphasis when `emphasisPosition` is `start`. */
  start: string
}

export type OfferServiceDuoCollage = {
  alt: string
  desktopSrc: string
  mobileSrc: string
  tabletSrc: string
}

export type OfferServiceDuoData = {
  collage: OfferServiceDuoCollage
  features: readonly OfferServiceDuoFeature[]
  featuresHeading: string
  heading: OfferServiceDuoHeading
  headingId?: string
  intro: string
}

/**
 * Figma photo-column / Group 64 sizes (1×).
 * Desktop right column is exactly half of 1366 (`7353:9589` = 683×931).
 * Tablet/mobile Group 64 sits centred in the full-bleed collage band.
 */
export const OFFER_SERVICE_DUO_COLLAGE_SIZE = {
  desktop: { width: 683, height: 931 },
  tablet: { width: 423, height: 560 },
  mobile: { width: 275, height: 364 },
} as const

export type DuoCollageVariant = keyof typeof OFFER_SERVICE_DUO_COLLAGE_SIZE

const reportazeSlubneFeatures: readonly OfferServiceDuoFeature[] = [
  {
    title: 'Dwie perspektywy, jedna pasja',
    description:
      'Jesteśmy jak dwa uzupełniające się żywioły. Asia wnosi artystyczną wrażliwość, empatię i wyczucie estetyki, a Łukasz – spokojną głowę, zacięcie techniczne i zmysł obserwacji. Dzięki temu w Waszym reportażu nie brakuje ani poetyckich kadrów, ani naturalnej, dynamicznej akcji.',
    figmaNodes: {
      desktop: '7353:9547',
      tablet: '7356:10131',
      mobile: '7356:10279',
    },
  },
  {
    title: 'Nasza wspólna historia',
    description:
      'Wszystko zaczęło się od pożyczonej na studiach lustrzanki. Dziś – kilka lat później, już jako małżeństwo – nie tylko dzielimy życie, ale też wspólnie tworzymy bezcenne pamiątki dla innych. Rozumiemy się bez słów, co w dniu ślubu pozwala nam działać całkowicie bezszelestnie i bez zbędnego zamieszania.',
    figmaNodes: {
      desktop: '7353:9551',
      tablet: '7356:10135',
      mobile: '7356:10283',
    },
  },
  {
    title: 'Poza kadrami',
    description:
      'Prywatnie? Uwielbiamy góry, dobrą kawę i czerpanie radości z małych rzeczy. Dbałość o szczegóły, organizację i harmonogram mamy we krwi – dzięki temu w dniu ślubu możecie odetchnąć i po prostu cieszyć się sobą, wiedząc, że nad wszystkim czuwamy.',
    figmaNodes: {
      desktop: '7353:9555',
      tablet: '7356:10139',
      mobile: '7356:10287',
    },
  },
]

export const offerServiceDuoReportazeSlubneDefaults: OfferServiceDuoData = {
  heading: {
    emphasis: 'Podwójne spojrzenie',
    start: ' na Waszą historię',
  },
  intro:
    'Ślub to zbyt złożona opowieść na jedno spojrzenie. Dlatego pracujemy w zgranym duecie – i jako małżeństwo, i jako fotografowie. Wierzymy, że Wasz dzień zasługuje na to, by widzieć go z dwóch perspektyw jednocześnie.',
  featuresHeading: 'Poznajcie nas: Asia & Łukasz',
  features: reportazeSlubneFeatures,
  collage: {
    alt: 'Asia z aparatem i Łukasz w golfie',
    desktopSrc: OFFER_SERVICE_DUO_ASSETS.collageDesktop,
    tabletSrc: OFFER_SERVICE_DUO_ASSETS.collageTablet,
    mobileSrc: OFFER_SERVICE_DUO_ASSETS.collageMobile,
  },
}
