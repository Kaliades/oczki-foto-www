import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

export const OFFER_SERVICE_HERO_FIGMA_NODES = {
  desktop: '6994:25771',
  tablet: '7100:7810',
  mobile: '7102:9481',
  breadcrumbs: {
    desktop: '6989:25515',
    tablet: '7100:7812',
    mobile: '7102:9483',
  },
  copyContainer: {
    desktop: '6994:25738',
    tablet: '7100:7825',
    mobile: '7102:9496',
  },
  copyInner: {
    desktop: '6994:25739',
    tablet: '7100:7826',
    mobile: '7102:9497',
  },
  scallopStrip: {
    desktop: '6994:25754',
    tablet: '7100:7831',
    mobile: '7102:9502',
  },
  mainImage: {
    desktop: '6994:25770',
    tablet: '7102:9477',
    mobile: '7102:9517',
  },
} as const

/** Desktop row layout — Figma `6994:25771`. */
export const OFFER_SERVICE_HERO_DESKTOP_LAYOUT = {
  frameHeight: 569,
  storyColumnWidth: 598,
  breadcrumbRowHeight: 52,
  breadcrumbPaddingX: 32,
  breadcrumbPaddingY: 4,
  copyContainerHeight: 517,
  copyPaddingTop: 64,
  copyPaddingLeft: 64,
  copyPaddingRight: 128,
  copyPaddingBottom: 80,
  copyInnerGap: 16,
  copyInnerMaxWidth: 406,
  descriptionPaddingRight: 48,
  scallop: {
    left: 381,
    /** Pinned to story column `inset-y-0` — matches `Main image` 569 px height. */
    top: 0,
    boxWidth: 434,
    /** Figma `6994:25754` metadata height; rendered slot uses `frameHeight` (569). */
    boxHeight: 566,
    innerWidth: 566,
    innerHeight: 434,
    imageBleedXPercent: 35.16,
  },
  mainImageWidth: 768,
  mainImageHeight: 569,
} as const

/**
 * Stacked layout — Figma `7102:9481` (mobile) / `7100:7810` (tablet).
 * Values from `get_metadata` + `get_design_context` on both frames.
 */
export const OFFER_SERVICE_HERO_STACKED_LAYOUT = {
  mobile: {
    breadcrumbHeight: 44,
    breadcrumbPaddingX: 16,
    copyContainerHeight: 408,
    copyPaddingTop: 20,
    copyPaddingX: 16,
    copyToButtonGap: 28,
    copyInnerGap: 8,
    scallopTop: 367,
    scallopSlotWidth: 768,
    scallopSlotHeight: 80,
    scallopBleedXPercent: 12.76,
    imageAspectWidth: 360,
    imageAspectHeight: 267,
  },
  tablet: {
    breadcrumbHeight: 52,
    breadcrumbPaddingX: 80,
    breadcrumbPaddingY: 4,
    copyContainerHeight: 407,
    copyPaddingTop: 48,
    copyPaddingX: 80,
    copyToButtonGap: 32,
    copyInnerGap: 16,
    copyInnerMaxWidth: 481,
    scallopTop: 367,
    scallopSlotWidth: 768,
    scallopSlotHeight: 80,
    scallopBleedXPercent: 12.76,
    imageAspectWidth: 768,
    imageAspectHeight: 569,
  },
  /** Shared horizontal scallop row — Figma ellipses 6–19 (80 px, 12 px overlap). */
  horizontalScallop: {
    circleSize: 80,
    circleOverlap: 12,
    /** SSR / pre-hydration fallback until ResizeObserver measures the slot. */
    circleCount: 14,
  },
} as const

export const OFFER_SERVICE_HERO_SCALLOP_ASSET = '/figma/offer-service-hero-scallop-strip.svg' as const
export const OFFER_SERVICE_HERO_HORIZONTAL_SCALLOP_CIRCLE =
  '/figma/offer-service-hero-scallop-circle.svg' as const

export type OfferServiceHeroCopyVariant = 'stacked' | 'desktop'

export type OfferServiceHeroData = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  cta: {
    href: string
    label: string
  }
  description: string
  heading: {
    emphasis: string
    start: string
  }
  image: {
    alt: string
    src: string
  }
  title: string
}

export const offerServiceHeroSesjeKobieceDefaults: OfferServiceHeroData = {
  title: 'Sesja kobieca | Oczki fotografia',
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'Oferta', href: '/oferta' },
    { label: 'Sesje kobiece' },
  ],
  heading: {
    emphasis: 'Sesja kobieca',
    start: ' w Krakowie, Przemyślu i okolicach — zobacz w sobie to, co widzą inni',
  },
  description:
    'Chwila zatrzymania, odrobina czułości i zdjęcia, które przypomną Ci o Twojej sile. Bez sztuczności, w atmosferze pełnego zaufania i swobody.',
  cta: {
    href: '/kontakt',
    label: 'Umów sesję',
  },
  image: {
    src: '/figma/offer-service-hero-main.png',
    alt: 'Kobieta w czarnej bluzce w białe kropki podczas sesji kobiecej',
  },
}
