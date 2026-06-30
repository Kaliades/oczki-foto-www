import type { TiltedPhotoFrameVariant } from '@/components/TiltedPhotoFrame/constants'

export type ScallopedHandwrittenBadgeVariant = TiltedPhotoFrameVariant

type ScallopedHandwrittenBadgeTextLayout = {
  left: number
  top: number
  width: number
  fontSize: number
  lineHeight: number
}

export type ScallopedHandwrittenBadgeLayout = {
  figmaNode: string
  /** Figma axis-aligned bbox after rotation — placement wrapper. */
  left: number
  top: number
  width: number
  height: number
  rotateDeg: number
  /** Extra rotation on live text only — Dancing Script vs Figma outline tune. */
  textRotateOffsetDeg: number
  assetWidth: number
  assetHeight: number
  shapeAsset: string
  /** Text box in placement-bbox space — Figma `6952:19961` family. */
  text: ScallopedHandwrittenBadgeTextLayout
}

export const SCALLOPED_HANDWRITTEN_BADGE_SHAPE_ASSET =
  '/figma/ease-cluster/scalloped-badge-shape.svg' as const

/** Figma `6952:19954` / `7104:19113` / `7104:19416`. */
export const SCALLOPED_HANDWRITTEN_BADGE_LAYOUT: Record<
  ScallopedHandwrittenBadgeVariant,
  ScallopedHandwrittenBadgeLayout
> = {
  desktop: {
    figmaNode: '6952:19954',
    left: 422,
    top: 302,
    width: 270,
    height: 224,
    rotateDeg: -11.02,
    textRotateOffsetDeg: -20,
    assetWidth: 265,
    assetHeight: 212,
    shapeAsset: SCALLOPED_HANDWRITTEN_BADGE_SHAPE_ASSET,
    text: {
      left: 40,
      top: 60.9,
      width: 194,
      fontSize: 24,
      lineHeight: 0.98,
    },
  },
  tablet: {
    figmaNode: '7104:19113',
    left: 337.6,
    top: 241.6,
    width: 215.7,
    height: 179.3,
    rotateDeg: -11.02,
    textRotateOffsetDeg: -20,
    assetWidth: 212,
    assetHeight: 170,
    shapeAsset: SCALLOPED_HANDWRITTEN_BADGE_SHAPE_ASSET,
    text: {
      left: 32,
      top: 48.7,
      width: 155,
      fontSize: 19,
      lineHeight: 0.98,
    },
  },
  mobile: {
    figmaNode: '7104:19416',
    left: 202.6,
    top: 145,
    width: 129.4,
    height: 107.6,
    rotateDeg: -11.02,
    textRotateOffsetDeg: -20,
    assetWidth: 127,
    assetHeight: 102,
    shapeAsset: SCALLOPED_HANDWRITTEN_BADGE_SHAPE_ASSET,
    text: {
      left: 19,
      top: 29.2,
      width: 93,
      fontSize: 12,
      lineHeight: 0.98,
    },
  },
}

export const SCALLOPED_HANDWRITTEN_BADGE_DEFAULT_QUOTE =
  'I find a brand new way of seeing... your eyes forever glued to mine' as const
