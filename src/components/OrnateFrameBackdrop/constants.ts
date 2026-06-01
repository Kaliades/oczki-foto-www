export type OrnateFrameVariant = 'desktop' | 'tablet'

export type OrnateFrameAsset = {
  src: string
  intrinsicWidth: number
  intrinsicHeight: number
}

export type OrnateFrameSet = Record<OrnateFrameVariant, OrnateFrameAsset>

/** Gallery CTA decorative frames — Figma 6962:4087 / 7104:19158. */
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
