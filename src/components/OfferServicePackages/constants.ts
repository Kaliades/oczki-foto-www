import type { PackagePanelData } from '@/components/PackagePanel'
import type { PackageImagePosition } from '@/components/PackageShowcaseRow'
import type { SectionLink } from '@/utilities/resolveLinkHref'

export const OFFER_SERVICE_PACKAGES_FIGMA_NODES = {
  container: {
    desktop: '6986:20158',
    mobile: '7102:9545',
    tablet: '7100:7874',
  },
  content: {
    desktop: '6986:20161',
    mobile: '7102:9550',
    tablet: '7100:7884',
  },
  header: {
    desktop: '6989:25497',
    mobile: '7102:9546',
    tablet: '7100:7875',
  },
  rows: {
    premium: {
      desktop: '6989:25447',
      image: {
        desktop: '6989:25487',
        mobile: '7102:9638',
        tablet: '7100:7972',
      },
      mobile: '7102:9611',
      panel: {
        column: {
          desktop: '6989:25448',
          mobile: '7102:9612',
          tablet: '7100:7946',
        },
        columnDetails: {
          desktop: '6989:25456',
          mobile: '7102:9617',
          tablet: '7100:7951',
        },
        columnHeader: {
          desktop: '6989:25449',
          mobile: '7102:9613',
          tablet: '7100:7947',
        },
        heading: {
          desktop: '6989:25450',
          mobile: '7102:9614',
          tablet: '7100:7948',
        },
      },
      tablet: '7100:7945',
    },
    starter: {
      desktop: '6989:25344',
      image: {
        desktop: '6989:25342',
        mobile: '7102:9579',
        tablet: '7100:7913',
      },
      mobile: '7102:9552',
      panel: {
        column: {
          desktop: '6986:20162',
          mobile: '7102:9553',
          tablet: '7100:7887',
        },
        columnDetails: {
          desktop: '6989:25358',
          mobile: '7102:9558',
          tablet: '7100:7892',
        },
        columnHeader: {
          desktop: '6989:25341',
          mobile: '7102:9554',
          tablet: '7100:7888',
        },
        heading: {
          desktop: '6989:25443',
          mobile: '7102:9555',
          tablet: '7100:7889',
        },
      },
      tablet: '7100:7886',
    },
    story: {
      desktop: '6989:25392',
      image: {
        desktop: '6989:25428',
        mobile: '7102:9610',
        tablet: '7100:7944',
      },
      mobile: '7102:9580',
      panel: {
        column: {
          desktop: '6989:25393',
          mobile: '7102:9581',
          tablet: '7100:7915',
        },
        columnDetails: {
          desktop: '6989:25397',
          mobile: '7102:9589',
          tablet: '7100:7923',
        },
        columnHeader: {
          desktop: '6989:25394',
          mobile: '7102:9582',
          tablet: '7100:7916',
        },
        heading: {
          desktop: '6989:25442',
          mobile: '7102:9583',
          tablet: '7100:7917',
        },
      },
      tablet: '7100:7914',
    },
  },
} as const

export type OfferServicePackageItem = {
  image: {
    alt: string
    position?: PackageImagePosition
    src: string
  }
  panel: PackagePanelData
}

export type OfferServicePackagesData = {
  catalogDownload: SectionLink
  headingId?: string
  packages: readonly [OfferServicePackageItem, OfferServicePackageItem, OfferServicePackageItem]
}

const BOOK_SESSION_CTA: SectionLink = {
  label: 'Umów sesję',
  type: 'custom',
  url: '/kontakt',
}

const CATALOG_DOWNLOAD: SectionLink = {
  label: 'Pobierz katalog',
  type: 'custom',
  url: '/katalog',
}

const PREMIUM_IMAGE_POSITION: PackageImagePosition = {
  heightPercent: 160.08,
  topPercent: -8.16,
}

export const offerServicePackagesSesjeKobieceDefaults: OfferServicePackagesData = {
  catalogDownload: CATALOG_DOWNLOAD,
  packages: [
    {
      image: {
        alt: 'Sesja kobieca — pakiet Na dobry początek',
        src: '/figma/offer-package-starter-photo.png',
      },
      panel: {
        cta: BOOK_SESSION_CTA,
        features: [
          '10 zdjęć w formie elektronicznej',
          '10 wydruków 13×19 cm zapakowanych w ozdobne opakowanie',
          'Prywatna galeria ważna przez 3 miesiące',
          'Możliwość dokupienia dodatkowych ujęć w cenie 40 zł/sztuka',
        ],
        price: '600 zł',
        theme: 'sage',
        title: 'Na dobry początek',
      },
    },
    {
      image: {
        alt: 'Sesja kobieca — pakiet Opowiedz swoją historię',
        src: '/figma/offer-package-story-photo.png',
      },
      panel: {
        badgeLabel: 'Najczęściej wybierany',
        cta: BOOK_SESSION_CTA,
        features: [
          '25 zdjęć w formie elektronicznej',
          '25 wydruków 13×19 cm zapakowanych w ozdobne opakowanie',
          'Prywatna galeria ważna przez 3 miesiące',
          'Możliwość dokupienia dodatkowych ujęć w cenie 30 zł/sztuka',
        ],
        price: '750 zł',
        theme: 'cream',
        title: 'Opowiedz swoją historię',
      },
    },
    {
      image: {
        alt: 'Sesja kobieca — pakiet Premium',
        position: PREMIUM_IMAGE_POSITION,
        src: '/figma/offer-package-premium-photo.png',
      },
      panel: {
        cta: BOOK_SESSION_CTA,
        features: [
          '40 zdjęć w formie elektronicznej',
          'Mini album 10×10',
          'Prywatna galeria ważna przez 3 miesiące',
          'Możliwość dokupienia dodatkowych ujęć w cenie 25 zł/sztuka',
        ],
        price: '1 000 zł',
        theme: 'rose',
        title: 'Premium',
      },
    },
  ],
}
