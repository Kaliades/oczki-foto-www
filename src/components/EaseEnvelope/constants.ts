import type { TiltedPhotoFrameVariant } from '@/components/TiltedPhotoFrame/constants'

export type EaseEnvelopeVariant = TiltedPhotoFrameVariant

type EnvelopeAssetLayer = {
  src: string
  left: number
  top: number
  width: number
  height: number
}

type EaseEnvelopeLayout = {
  figmaNode: string
  width: number
  height: number
  /** Figma group rotation `6952:19916` — 0.142 rad. */
  rotateDeg: number
  back: EnvelopeAssetLayer
  photoShell: { left: number; top: number }
  /** Photo frame rotation inside the envelope group — Figma `6952:19918` local rot (~8.47°). */
  photoRotateDeg: number
}

const EASE_ENVELOPE_BACK_ASSET = '/figma/ease-cluster/envelope-back.svg' as const
const EASE_ENVELOPE_FLAPS_ASSET = '/figma/ease-cluster/envelope-flaps.svg' as const

/** `envelope-flaps.svg` artboard — flaps are anchored to `envelope-back` bottom + side edges. */
const EASE_ENVELOPE_FLAPS_INTRINSIC_WIDTH = 535
const EASE_ENVELOPE_FLAPS_INTRINSIC_HEIGHT = 362

export function combinedFlapsAlignedToBack(back: EnvelopeAssetLayer): EnvelopeAssetLayer {
  const width = back.width
  const scaledHeight =
    EASE_ENVELOPE_FLAPS_INTRINSIC_HEIGHT * (width / EASE_ENVELOPE_FLAPS_INTRINSIC_WIDTH)
  const height = Math.min(scaledHeight, back.height)

  return {
    src: EASE_ENVELOPE_FLAPS_ASSET,
    left: back.left,
    top: back.top + back.height - height,
    width,
    height,
  }
}

/** Envelope group `6952:19916` / `7104:19106` / `7104:19409` — positions from Figma metadata. */
export const EASE_ENVELOPE_LAYOUT: Record<EaseEnvelopeVariant, EaseEnvelopeLayout> = {
  desktop: {
    figmaNode: '6952:19916',
    width: 561,
    height: 545,
    rotateDeg: 8.14,
    back: {
      src: EASE_ENVELOPE_BACK_ASSET,
      left: 1.1,
      top: 0.1,
      width: 560,
      height: 544,
    },
    photoShell: { left: 31.1, top: 20.1 },
    photoRotateDeg: 8.47,
  },
  tablet: {
    figmaNode: '7104:19106',
    width: 449,
    height: 436,
    rotateDeg: 8.14,
    back: {
      src: EASE_ENVELOPE_BACK_ASSET,
      left: 0.9,
      top: 0.1,
      width: 448,
      height: 435,
    },
    photoShell: { left: 24.3, top: 16 },
    photoRotateDeg: 8.47,
  },
  mobile: {
    figmaNode: '7104:19409',
    width: 269,
    height: 262,
    rotateDeg: 8.14,
    back: {
      src: EASE_ENVELOPE_BACK_ASSET,
      left: 0.5,
      top: 0.1,
      width: 269,
      height: 261,
    },
    photoShell: { left: 14.4, top: 9 },
    photoRotateDeg: 8.47,
  },
}
