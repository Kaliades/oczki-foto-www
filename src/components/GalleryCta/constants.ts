import type { FramedCtaHeading } from '@/components/FramedCtaCopy/FramedCtaCopy'
import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Gallery page — final booking CTA ("Twoja autentyczność to Twoja siła…").
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=6962-4025
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7104-19128
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7104-19439
 */
export const GALLERY_CTA_FIGMA_NODES = {
  desktopFrame: '6962:4025',
  tabletFrame: '7104:19128',
  mobileFrame: '7104:19439',
} as const

/** Figma panel bbox — 1174×395 desktop, 608×395 tablet, 328×395 mobile. */
export const GALLERY_CTA_PANEL = {
  desktop: { width: 1174, minHeight: 395 },
  tablet: { width: 608, minHeight: 395 },
  mobile: { width: 328, minHeight: 395 },
} as const

export type GalleryCtaData = {
  heading: FramedCtaHeading
  body: string
  cta: SectionLink
}

// TODO(galeria/cta): Replace defaults with Payload gallery page block once CMS schema ships.
// TODO(galeria/cta): Wire mobile OrnateFrameBackdrop when Figma 7104:19441 is finalised.
export const galleryCtaDefaults: GalleryCtaData = {
  heading: {
    start: 'Twoja autentyczność to ',
    emphasis: 'Twoja siła',
    end: '. Chcesz, bym pomogła Ci ją uchwycić?',
  },
  body: 'Jeśli oglądając te zdjęcia, poczułaś, że bliskie jest Ci takie spojrzenie na kobiecość i miłość – napisz do mnie. Nie musisz wiedzieć, jak pozować, ani mieć gotowego planu na sesję.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Porozmawiajmy',
    newTab: false,
  },
}
