/** Figma `Section Header` stripe field — shared across detail-card variants. */
export const STRIPED_DETAIL_FRAME_LAYOUT = {
  backsplashHeightPx: 187,
  backsplashWidthPx: 872,
  /** Opacity on the whole `Section Header` group (Figma 36 %). */
  backsplashOpacity: 0.36,
  stripeWidthPx: 4,
  stripeGapPx: 24,
  stripeBarCount: 32,
  framePaddingPx: 6,
  contentPaddingX: 12,
  contentPaddingTop: 12,
  contentPaddingBottom: 16,
  copyGapPx: 8,
  contentOrnamentGapPx: 10,
} as const

export const STRIPED_DETAIL_FRAME_FIGMA_NODES = {
  sectionHeader: '7102:14770',
} as const

export const DETAIL_CARD_ORNAMENT = {
  src: '/figma/case-study-detail-ornament.svg',
  /** Native asset size before the −90° rotation applied in layout. */
  widthPx: 27,
  heightPx: 48.6,
  /** Slot size after rotation (Figma `Vector` wrapper). */
  slotWidthPx: 48.6,
  slotHeightPx: 27,
} as const
