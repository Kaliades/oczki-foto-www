/** Figma `RoundedRectangle` — 48×24 px tile, 48 px flex gap between tiles. */
export const SEGMENTED_SCALLOP_TILE = {
  gapPx: 48,
  heightPx: 24,
  widthPx: 48,
} as const

export type SegmentedScallopDividerVariant = 'transition-down' | 'transition-up'
