export type BracketPhotoFrameVariant = 'desktop' | 'tablet' | 'mobile'

export const BRACKET_PHOTO_FRAME_FIGMA_NODES = {
  desktop: '6972:18735',
  tablet: '7102:12560',
  mobile: '7102:16486',
  botanical: {
    desktop: '6972:18736',
    tablet: '7102:12561',
    mobile: '7102:16487',
  },
  outerUnion: {
    desktop: '6972:18585',
    tablet: '7102:12704',
    mobile: '7102:16630',
  },
  photoUnion: {
    desktop: '6972:18578',
    tablet: '7102:12707',
    mobile: '7102:16633',
  },
} as const

export const BRACKET_PHOTO_FRAME_ASSETS = {
  outerFrame: {
    desktop: '/figma/case-study-duo-frame-outer-desktop.svg',
    tablet: '/figma/case-study-duo-frame-outer-tablet.svg',
    mobile: '/figma/case-study-duo-frame-outer-mobile.svg',
  },
  /** Figma `6972:18736` — 190×325, scaled per breakpoint. */
  botanical: '/figma/case-study-duo-botanical.svg',
} as const

type BracketPhotoFrameLayout = {
  containerWidth: number
  containerHeight: number
  botanical: { left: number; top: number; width: number; height: number }
  outerFrame: { left: number; top: number; width: number; height: number }
  photo: { left: number; top: number; width: number; height: number }
  photoIntrinsic: { width: number; height: number }
}

/**
 * Positions from Figma metadata (`Image Container` children).
 * Desktop: union/photo/botanical metadata uses x≥32 inside the 768 px bbox; we anchor
 * the visible frame at left 0 so the cluster sits on the section’s lg:px-8 (32 px) edge only.
 */
export const BRACKET_PHOTO_FRAME_LAYOUT: Record<BracketPhotoFrameVariant, BracketPhotoFrameLayout> = {
  desktop: {
    containerWidth: 768,
    containerHeight: 638,
    botanical: { left: 578, top: 80, width: 190, height: 325 },
    outerFrame: { left: 0, top: 146, width: 685, height: 572 },
    photo: { left: 12, top: 158, width: 661, height: 547 },
    photoIntrinsic: { width: 661, height: 547 },
  },
  tablet: {
    containerWidth: 608,
    containerHeight: 505,
    botanical: { left: 458, top: 0, width: 150, height: 257 },
    outerFrame: { left: 0, top: 52, width: 542, height: 453 },
    photo: { left: 10, top: 62, width: 523, height: 433 },
    photoIntrinsic: { width: 523, height: 433 },
  },
  mobile: {
    containerWidth: 328,
    containerHeight: 272,
    botanical: { left: 247, top: 0, width: 81, height: 139 },
    outerFrame: { left: 0, top: 28, width: 293, height: 244 },
    photo: { left: 5, top: 33, width: 282, height: 234 },
    photoIntrinsic: { width: 282, height: 234 },
  },
}
