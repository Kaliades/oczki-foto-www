export const PUNCHED_TAG_CARD_SHADOW =
  'drop-shadow-[1px_4px_2.9px_rgba(53,39,25,0.16),6px_11px_6.65px_rgba(53,39,25,0.08)]'

export const PUNCHED_TAG_CARD_HOLE = {
  desktop: { sizePx: 24, src: '/figma/punched-tag-hole.svg' },
  mobile: { sizePx: 20, src: '/figma/punched-tag-hole.svg' },
} as const

export type PunchedTagCardOrnamentVariant = 'a' | 'b' | 'c'

const PUNCHED_TAG_CARD_ORNAMENT_SRC: Record<PunchedTagCardOrnamentVariant, string> = {
  a: '/figma/punched-tag-ornament-a.svg',
  b: '/figma/punched-tag-ornament-b.svg',
  c: '/figma/punched-tag-ornament-c.svg',
}

export type PunchedTagCardVariantIndex = 0 | 1 | 2

type PunchedTagCardVariantLayout = {
  cardSizeClass: string
  holeLeftPx: number
  holeOffsetPx: { desktop: number; mobile: number }
  ornament: {
    imageHeightPx: number
    imageWidthPx: number
    rotationClass: string
    slotHeightPx: number
    slotWidthPx: number
    variant: PunchedTagCardOrnamentVariant
  }
  rotationDeg: number
  skewDeg: number
}

/**
 * Per-card tilt and surface — Figma `get_design_context` + `get_metadata`.
 * Surfaces: mobile 313/308/322 × 219/196/239; tablet+ 408 × 217/215/237.
 */
export const PUNCHED_TAG_CARD_VARIANTS: readonly PunchedTagCardVariantLayout[] = [
  {
    rotationDeg: -3.49,
    skewDeg: -0.34,
    cardSizeClass:
      'h-[219px] w-[313px] md:h-[217px] md:w-[408px] min-[1366px]:h-[217px] min-[1366px]:w-[408px]',
    holeLeftPx: 8,
    holeOffsetPx: { desktop: 0.5, mobile: -1.5 },
    ornament: {
      variant: 'a',
      slotWidthPx: 81.024,
      slotHeightPx: 40.654,
      imageWidthPx: 39,
      imageHeightPx: 80,
      rotationClass: 'rotate-[88.47deg] -skew-x-[0.34deg]',
    },
  },
  {
    rotationDeg: 6.12,
    skewDeg: -0.34,
    cardSizeClass:
      'h-[196px] w-[308px] md:h-[215px] md:w-[408px] min-[1366px]:h-[215px] min-[1366px]:w-[408px]',
    holeLeftPx: 8,
    holeOffsetPx: { desktop: 0.5, mobile: -2 },
    ornament: {
      variant: 'b',
      slotWidthPx: 80.28,
      slotHeightPx: 39.104,
      imageWidthPx: 39,
      imageHeightPx: 80,
      rotationClass: '-scale-y-100 -rotate-[90.41deg] -skew-x-[0.34deg]',
    },
  },
  {
    rotationDeg: -1.68,
    skewDeg: -0.34,
    cardSizeClass:
      'h-[239px] w-[322px] md:h-[237px] md:w-[408px] min-[1366px]:h-[237px] min-[1366px]:w-[408px]',
    holeLeftPx: 9,
    holeOffsetPx: { desktop: -9.5, mobile: -11.5 },
    ornament: {
      variant: 'c',
      slotWidthPx: 80.072,
      slotHeightPx: 39.622,
      imageWidthPx: 39,
      imageHeightPx: 80,
      rotationClass: '-scale-y-100 -rotate-[89.89deg] -skew-x-[0.34deg]',
    },
  },
] as const

export function resolvePunchedTagCardOrnamentSrc(variant: PunchedTagCardOrnamentVariant): string {
  return PUNCHED_TAG_CARD_ORNAMENT_SRC[variant]
}
