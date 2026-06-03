export type RotatedScallopPhotoVariant = 'desktop' | 'tablet' | 'mobile'

type RotatedScallopPhotoLayout = {
  figmaNode: string
  /** Positioning wrapper — `get_design_context` when metadata x differs from layout. */
  left: number
  top: number
  boxWidth: number
  boxHeight: number
  innerWidth: number
  innerHeight: number
  assetWidth: number
  assetHeight: number
  /** Figma `inset-[-1.5%_-1.94%]` bleed on the export. */
  imageInset: { x: number; y: number }
}

/**
 * Scalloped dance photo — Figma boolean `Union` with 90° rotation wrapper.
 * Wrapper `left` from `get_design_context` (`32` / `57` / `16`), not Union metadata x.
 */
export const ROTATED_SCALLOP_PHOTO_LAYOUT: Record<RotatedScallopPhotoVariant, RotatedScallopPhotoLayout> =
  {
    desktop: {
      figmaNode: '6986:19964',
      left: 32,
      top: 321,
      boxWidth: 381.22,
      boxHeight: 294.3,
      innerWidth: 294.3,
      innerHeight: 381.22,
      assetWidth: 302.299,
      assetHeight: 389.217,
      imageInset: { x: 1.36, y: 1.05 },
    },
    tablet: {
      figmaNode: '7104:20209',
      left: 415,
      top: 721.92,
      boxWidth: 358,
      boxHeight: 276.38,
      innerWidth: 276.38,
      innerHeight: 358,
      assetWidth: 284.376,
      assetHeight: 366,
      imageInset: { x: 1.45, y: 1.12 },
    },
    mobile: {
      figmaNode: '7111:8989',
      left: 16,
      top: 623.52,
      boxWidth: 267.326,
      boxHeight: 206.376,
      innerWidth: 206.376,
      innerHeight: 267.326,
      assetWidth: 214.376,
      assetHeight: 275.326,
      imageInset: { x: 1.94, y: 1.5 },
    },
  }
