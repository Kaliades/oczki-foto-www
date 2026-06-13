/** Małopolska outline — Figma `Subtract` (`7001:2693`), 536×462, tertiary/500. */
export const CROSS_MASKED_PHOTO_MAP_OVERLAY_SRC =
  '/figma/service-area/map-overlay-malopolska.svg' as const

export const CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES = {
  desktop: '7001:2692',
  tablet: '7084:3620',
  mobile: '7086:4551',
  photo: {
    desktop: '7001:2675',
    tablet: '7084:3621',
    mobile: '7086:4552',
  },
  mapOverlay: {
    desktop: '7001:2693',
    tablet: '7084:3627',
    mobile: '7086:4558',
  },
} as const

export type CrossMaskedPhotoVisualVariant = 'desktop' | 'tablet' | 'mobile'

/** Figma `Image Container` — cross-masked portrait + Małopolska map overlay. */
export const CROSS_MASKED_PHOTO_VISUAL_METRICS: Record<
  CrossMaskedPhotoVisualVariant,
  {
    containerGapClassName: string
    containerHeightClassName: string
    figmaNode: string
    photoAlt: string
    photoHeight: number
    photoSrc: string
    photoWidth: number
  }
> = {
  mobile: {
    containerGapClassName: 'gap-[5.924px]',
    containerHeightClassName: 'h-[340px]',
    figmaNode: CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES.mobile,
    photoAlt: 'Fotografka pokazuje klientce zdjęcia na ekranie aparatu',
    photoHeight: 340,
    photoSrc: '/figma/service-area/cross-photo-mobile.png',
    photoWidth: 282,
  },
  tablet: {
    containerGapClassName: 'gap-2.5',
    containerHeightClassName: 'h-[574px]',
    figmaNode: CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES.tablet,
    photoAlt: 'Fotografka pokazuje klientce zdjęcia na ekranie aparatu',
    photoHeight: 574,
    photoSrc: '/figma/service-area/cross-photo-desktop.png',
    photoWidth: 476,
  },
  desktop: {
    containerGapClassName: 'gap-2.5',
    containerHeightClassName: 'h-[574px]',
    figmaNode: CROSS_MASKED_PHOTO_VISUAL_FIGMA_NODES.desktop,
    photoAlt: 'Fotografka pokazuje klientce zdjęcia na ekranie aparatu',
    photoHeight: 574,
    photoSrc: '/figma/service-area/cross-photo-desktop.png',
    photoWidth: 476,
  },
}
