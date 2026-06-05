export type OverlapPhotoCollageVariant = 'desktop' | 'tablet' | 'mobile'

export const OVERLAP_PHOTO_COLLAGE_ASSETS = {
  /** Figma `6994:25775` — intrinsic 229×301. */
  botanical: '/figma/offer-inclusions-botanical.svg',
  mainPhoto: '/figma/offer-inclusions-main-photo.png',
  scallopEarHorizontal: '/figma/offer-inclusions-scallop-ear-horizontal.svg',
  scallopEarVertical: '/figma/offer-inclusions-scallop-ear-vertical.svg',
  scallopPhoto: '/figma/offer-inclusions-scallop-photo.png',
} as const

export const OVERLAP_PHOTO_COLLAGE_FIGMA_NODES = {
  desktop: '6999:26871',
  tablet: '7100:7990',
  mobile: '7102:11185',
} as const

type VerticalScallopEarLayout = {
  height: number
  left: number
  orientation: 'vertical'
  top: string
  width: number
}

type HorizontalScallopEarLayout = {
  centerOffset: number
  height: number
  left: number
  orientation: 'horizontal'
  side: 'bottom' | 'top'
  width: number
}

export type ScallopEarLayout = HorizontalScallopEarLayout | VerticalScallopEarLayout

type OverlapPhotoCollageLayout = {
  botanical: {
    height: number
    left: number
    top: number
    width: number
  }
  containerHeight: number
  containerWidth: number
  mainPhoto: { height: number; left: number; top: number; width: number }
  scallopFrame: {
    ears: {
      bottom: ScallopEarLayout
      left: ScallopEarLayout
      right: ScallopEarLayout
      top: ScallopEarLayout
    }
    height: number
    left: number
    padding: number
    photoHeight: number
    photoWidth: number
    top: number
    width: number
  }
}

/** Positions from Figma metadata / `get_design_context` per breakpoint. */
export const OVERLAP_PHOTO_COLLAGE_LAYOUT: Record<OverlapPhotoCollageVariant, OverlapPhotoCollageLayout> = {
  desktop: {
    containerWidth: 650,
    containerHeight: 598,
    mainPhoto: { left: 0, top: 0, width: 382, height: 472 },
    scallopFrame: {
      left: 271,
      top: 228,
      width: 268,
      height: 370,
      padding: 6,
      photoWidth: 256,
      photoHeight: 358,
      ears: {
        left: { left: -9, top: 'calc(50% + 0.5px)', width: 24, height: 45, orientation: 'vertical' },
        right: { left: 253, top: 'calc(50% + 0.5px)', width: 24, height: 45, orientation: 'vertical' },
        top: { side: 'top', left: 111, centerOffset: 182, width: 45, height: 24, orientation: 'horizontal' },
        bottom: { side: 'bottom', left: 111, centerOffset: 180, width: 45, height: 24, orientation: 'horizontal' },
      },
    },
    botanical: {
      left: 421,
      top: 47,
      width: 229,
      height: 301,
    },
  },
  tablet: {
    containerWidth: 608,
    containerHeight: 559,
    mainPhoto: { left: 0, top: 0, width: 357, height: 442 },
    scallopFrame: {
      left: 253,
      top: 213,
      width: 251,
      height: 346,
      padding: 5.612,
      photoWidth: 239,
      photoHeight: 335,
      ears: {
        left: { left: -8, top: '50%', width: 22, height: 42, orientation: 'vertical' },
        right: { left: 237, top: '50%', width: 22, height: 42, orientation: 'vertical' },
        top: { side: 'top', left: 104, centerOffset: 170, width: 42, height: 22, orientation: 'horizontal' },
        bottom: { side: 'bottom', left: 104, centerOffset: 169, width: 42, height: 22, orientation: 'horizontal' },
      },
    },
    botanical: {
      left: 394,
      top: 44,
      width: 214,
      height: 282,
    },
  },
  mobile: {
    containerWidth: 328,
    containerHeight: 302,
    mainPhoto: { left: 0, top: 0, width: 193, height: 238 },
    scallopFrame: {
      left: 137,
      top: 115,
      width: 135,
      height: 187,
      padding: 3.028,
      photoWidth: 129,
      photoHeight: 181,
      ears: {
        left: { left: -5, top: 'calc(50% + 1px)', width: 12, height: 23, orientation: 'vertical' },
        right: { left: 128, top: 'calc(50% + 1px)', width: 12, height: 23, orientation: 'vertical' },
        top: { side: 'top', left: 56, centerOffset: 90.5, width: 23, height: 12, orientation: 'horizontal' },
        bottom: { side: 'bottom', left: 56, centerOffset: 91.5, width: 23, height: 12, orientation: 'horizontal' },
      },
    },
    botanical: {
      left: 212,
      top: 24,
      width: 116,
      height: 152,
    },
  },
}
