export type OrnateFrameVariant = 'desktop' | 'tablet'

export type OrnateFrameAsset = {
  src: string
  intrinsicWidth: number
  intrinsicHeight: number
}

export type OrnateFrameSet = Record<OrnateFrameVariant, OrnateFrameAsset>

/** Gallery CTA decorative frames — Figma 6962:4087 / 7104:19158 / 7104:19441. */
export const GALLERY_CTA_FRAME_SET: OrnateFrameSet = {
  desktop: {
    src: '/figma/gallery-cta-frame-desktop.svg',
    intrinsicWidth: 1174,
    intrinsicHeight: 398,
  },
  tablet: {
    src: '/figma/gallery-cta-frame-tablet.svg',
    intrinsicWidth: 717,
    intrinsicHeight: 396,
  },
} as const

/** Mobile nine-slice frame — cropped from the 717×396 tablet artboard. */
export const GALLERY_CTA_MOBILE_FRAME = {
  source: { width: 717, height: 396 },
  cornerCrop: 92,
  edgeSource: {
    topHeight: 56.74,
    bottomHeight: 63.04,
    leftWidth: 55,
    rightWidth: 58,
    innerTop: 56.74,
    innerLeft: 55,
    innerRight: 58,
    innerBottom: 63.04,
  },
} as const

/** Uniform scale — corner display width / source crop size. */
export function galleryCtaMobileFrameScale(): number {
  const cornerDisplayWidth = 50
  return cornerDisplayWidth / GALLERY_CTA_MOBILE_FRAME.cornerCrop
}

export function galleryCtaMobileCornerSize(): number {
  return GALLERY_CTA_MOBILE_FRAME.cornerCrop * galleryCtaMobileFrameScale()
}

/** Scaled edge band dimensions (px). */
export function galleryCtaMobileEdgeBands() {
  const scale = galleryCtaMobileFrameScale()
  const { edgeSource } = GALLERY_CTA_MOBILE_FRAME

  return {
    topHeight: edgeSource.topHeight * scale,
    bottomHeight: edgeSource.bottomHeight * scale,
    leftWidth: edgeSource.leftWidth * scale,
    rightWidth: edgeSource.rightWidth * scale,
  }
}

/** Vertical rail segment between corner crops — source y 92…304 stretched to fill. */
export function galleryCtaMobileSideRailSegment() {
  const { cornerCrop, source } = GALLERY_CTA_MOBILE_FRAME
  const segmentHeight = source.height - 2 * cornerCrop

  return {
    imageHeightRatio: source.height / segmentHeight,
    imageTopRatio: cornerCrop / segmentHeight,
  }
}

/** Horizontal rail segment between corner crops — source x 92…625 stretched to fill. */
export function galleryCtaMobileHorizRailSegment() {
  const { cornerCrop, source } = GALLERY_CTA_MOBILE_FRAME
  const segmentWidth = source.width - 2 * cornerCrop

  return {
    imageWidthRatio: source.width / segmentWidth,
    imageLeftRatio: cornerCrop / segmentWidth,
  }
}

/** Horizontal clip-path insets (%) for side strips — vertical rails only. */
export function galleryCtaMobileSideClip() {
  const { edgeSource, source } = GALLERY_CTA_MOBILE_FRAME

  return {
    leftStripRight: ((source.width - edgeSource.innerLeft) / source.width) * 100,
    rightStripLeft: ((source.width - edgeSource.innerRight) / source.width) * 100,
  }
}
