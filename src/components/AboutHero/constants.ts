import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

export const ABOUT_HERO_FIGMA_NODES = {
  desktop: '6974:19430',
  tablet: '7092:4198',
  mobile: '7093:5559',
  header: {
    desktop: '6974:19250',
    tablet: '7092:4199',
    mobile: '7093:5560',
  },
  breadcrumbs: {
    desktop: '7105:15357',
    tablet: '7105:15367',
    mobile: '7105:15377',
  },
  contentSection: {
    desktop: '6974:19429',
    tablet: '7092:4208',
    mobile: '7093:5569',
  },
  mainContent: {
    desktop: '6972:15521',
    tablet: '7092:4336',
    mobile: '7093:5697',
  },
  introduction: {
    desktop: '6972:15522',
    tablet: '7092:4337',
    mobile: '7093:5698',
  },
  portrait: {
    desktop: '7001:2532',
    tablet: '7092:4343',
    mobile: '7093:5704',
  },
  secondaryPhoto: {
    desktop: '7001:2531',
    tablet: '7092:4342',
    mobile: '7093:5703',
  },
  botanical: {
    desktop: '7001:2533',
    tablet: '7092:4209',
    mobile: '7093:5570',
  },
  scallopedBadge: {
    desktop: '7000:26977',
    tablet: '7092:4344',
    mobile: '7093:5705',
  },
} as const

/** Section shell metrics from Figma `get_metadata`. */
export const ABOUT_HERO_SHELL = {
  breadcrumbRowHeight: { mobile: 44, tablet: 52, desktop: 52 },
  breadcrumbPaddingX: { mobile: 16, tablet: 80, desktop: 32 },
  breadcrumbPaddingY: { mobile: 0, tablet: 4, desktop: 4 },
  contentHeight: { mobile: 640, tablet: 961, desktop: 560 },
} as const

/**
 * Figma `7093:5699` — phrase units for mobile H1 wrapping.
 *
 * Each phrase is `whitespace-nowrap`; the browser breaks only between phrases.
 * At 328 px (360 reference): „Fotografka z Krakowa, przy” / „której możesz być sobą”.
 * Narrower: breaks after the comma or before „której” — never inside „z Krakowa” / „być sobą”.
 */
export const ABOUT_HERO_MOBILE_HEADING_PHRASES = [
  'Fotografka z\u00A0Krakowa,',
  'przy',
  'której możesz',
] as const

type AbsoluteBox = {
  height: number
  left: number
  top: number
  width: number
}

type AboutHeroBreakpointLayout = {
  botanical: AbsoluteBox
  introductionGap: number
  mainContent: AbsoluteBox & { buttonGap: number }
  portrait: AbsoluteBox
  scallopedBadge: { left: number; size: number; top: number }
  secondaryPhoto: AbsoluteBox
  /** Gap from CTA bottom to secondary photo top — mobile flow layout only. */
  secondaryPhotoGap?: number
}

/** Positions relative to `Content Section` — Figma metadata 1:1. */
export const ABOUT_HERO_LAYOUT: Record<'mobile' | 'tablet' | 'desktop', AboutHeroBreakpointLayout> = {
  desktop: {
    portrait: { left: 0, top: 0, width: 364, height: 478 },
    scallopedBadge: { left: 339, top: 348, size: 96 },
    secondaryPhoto: { left: 955, top: 309, width: 411, height: 251 },
    botanical: { left: 1116, top: 124, width: 227, height: 328 },
    mainContent: { left: 435, top: 123, width: 496, height: 266, buttonGap: 36 },
    introductionGap: 16,
  },
  tablet: {
    portrait: { left: 0, top: 0, width: 225, height: 295 },
    scallopedBadge: { left: 199, top: 185, size: 96 },
    secondaryPhoto: { left: 333, top: 695, width: 435, height: 266 },
    botanical: { left: 503, top: 499, width: 241, height: 348 },
    mainContent: { left: 136, top: 337.5, width: 496, height: 258, buttonGap: 36 },
    introductionGap: 16,
  },
  mobile: {
    portrait: { left: 0, top: 0, width: 136, height: 179 },
    scallopedBadge: { left: 122, top: 107, size: 64 },
    secondaryPhoto: { left: 123, top: 494, width: 237, height: 146 },
    botanical: { left: 216, top: 387, width: 131, height: 191 },
    mainContent: { left: 16, top: 196, width: 328, height: 256, buttonGap: 24 },
    introductionGap: 10,
    secondaryPhotoGap: 42,
  },
} as const

export type AboutHeroLayoutVariant = 'mobile' | 'tablet' | 'desktop'

export const ABOUT_HERO_ASSETS = {
  botanical: '/figma/about-hero-botanical.png',
  portrait: '/figma/about-hero-portrait.png',
  secondaryPhoto: '/figma/about-hero-secondary-photo.png',
} as const

export type AboutHeroData = {
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
  portrait: {
    alt: string
    src: string
  }
  secondaryPhoto: {
    alt: string
    src: string
  }
  title: string
}

export const aboutHeroDefaults: AboutHeroData = {
  title: 'O mnie | Oczki fotografia',
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'O mnie' },
  ],
  heading: {
    start: 'Fotografka z Krakowa, przy której możesz ',
    emphasis: 'być sobą',
  },
  description:
    'Wierzę, że najpiękniejsze rzeczy dzieją się „pomiędzy” – w nieśmiałym uśmiechu i czułym geście. Jako fotografka z Krakowa nie oferuję Ci tylko zdjęć, ale przestrzeń, w której możesz odetchnąć i poczuć się w pełni sobą.',
  cta: {
    href: '/kontakt',
    label: 'Umów sesję',
  },
  portrait: {
    src: ABOUT_HERO_ASSETS.portrait,
    alt: 'Asia — fotografka Oczki Fotografia z aparatem w dłoni',
  },
  secondaryPhoto: {
    src: ABOUT_HERO_ASSETS.secondaryPhoto,
    alt: 'Para młoda na drewnianym moście podczas sesji ślubnej',
  },
}
