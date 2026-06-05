import type { FloralSideClusterLayout } from '@/components/FloralSideCluster'
import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Offer-service closing reservation CTA — Figma `Proces`.
 *
 * Desktop / tablet / mobile:
 *   - 6986:20363 / 7100:8319 / 7102:9985
 */
export const OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES = {
  desktop: '6986:20363',
  tablet: '7100:8319',
  mobile: '7102:9985',
  texture: {
    desktop: '6994:26781',
    mobile: '7102:9986',
    tablet: '7100:8320',
  },
  botanical: {
    left: {
      desktop: '6994:26604',
      mobile: '7102:10147',
      tablet: '7100:8481',
    },
    right: {
      desktop: '6994:26443',
      tablet: '7100:8321',
    },
  },
} as const

export const OFFER_SERVICE_CLOSING_CTA_TEXTURE = {
  height: 610,
  opacity: 0.8,
  src: '/figma/offer-texture.jpg',
  width: 1402,
} as const

/** Figma `OBJECTS` SVG — full section height, intrinsic width on desktop. */
export const OFFER_SERVICE_CLOSING_CTA_FLORAL: {
  left: { desktop: FloralSideClusterLayout; mobile: FloralSideClusterLayout }
  right: { desktop: FloralSideClusterLayout }
} = {
  left: {
    desktop: {
      figmaNode: OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES.botanical.left.desktop,
      flipY: true,
      fullHeight: true,
      left: 0,
      src: '/figma/offer-closing-cta-botanical-left-desktop.svg',
      width: 472,
    },
    mobile: {
      figmaNode: OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES.botanical.left.mobile,
      flipY: true,
      fullHeight: true,
      left: 0,
      src: '/figma/offer-closing-cta-botanical-left-desktop.svg',
      width: 284,
    },
  },
  right: {
    desktop: {
      figmaNode: OFFER_SERVICE_CLOSING_CTA_FIGMA_NODES.botanical.right.desktop,
      fullHeight: true,
      right: 0,
      src: '/figma/offer-closing-cta-botanical-right-desktop.svg',
      width: 494,
    },
  },
} as const

export type OfferServiceClosingCtaData = {
  body: string
  cta: SectionLink
  heading: string
  textureSrc?: string
}

export const offerServiceClosingCtaSesjeKobieceDefaults: OfferServiceClosingCtaData = {
  heading:
    'Twoja autentyczność nie potrzebuje filtra. Potrzebuje tylko odpowiedniego światła',
  body: 'Nie czekaj na „idealny moment”, na „lepszą wagę” czy „specjalną okazję”. Jesteś wystarczająca i piękna dokładnie taka, jaka jesteś dzisiaj. Pozwól mi to zapisać na zdjęciach, do których będziesz wracać z uśmiechem za 10, 20 i 50 lat.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Zarezerwuj czas dla siebie',
    newTab: false,
  },
  textureSrc: '/figma/offer-texture.jpg',
}
