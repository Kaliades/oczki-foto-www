export type StripeBacksplashSpec = {
  backsplashHeightPx: number
  backsplashWidthPx: number
  stripeBarCount: number
}

/** Shared stripe-field tokens — all framed detail cards. */
export const STRIPED_DETAIL_FRAME_SHARED = {
  backsplashOpacity: 0.36,
  stripeWidthPx: 4,
  stripeGapPx: 24,
  framePaddingPx: 6,
  contentPaddingX: 12,
  contentPaddingTop: 12,
  contentPaddingBottom: 16,
  copyGapPx: 8,
} as const

/** Figma `Section Header` — case-study detail cards (`7102:14770`, 872×187, 32 bars). */
export const STRIPED_DETAIL_FRAME_CASE_STUDY_BACKSPLASH: StripeBacksplashSpec = {
  backsplashHeightPx: 187,
  backsplashWidthPx: 872,
  stripeBarCount: 32,
}

/** Figma `Card Background` — expertise cards ≤1023 px (620×236, 23 bars). */
export const STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_MOBILE_TABLET: StripeBacksplashSpec = {
  backsplashHeightPx: 236,
  backsplashWidthPx: 620,
  stripeBarCount: 23,
}

/** Figma `Card Background` — expertise cards desktop (480×238, 18 bars). */
export const STRIPED_DETAIL_FRAME_EXPERTISE_BACKSPLASH_DESKTOP: StripeBacksplashSpec = {
  backsplashHeightPx: 238,
  backsplashWidthPx: 480,
  stripeBarCount: 18,
}

/** @deprecated Use {@link STRIPED_DETAIL_FRAME_CASE_STUDY_BACKSPLASH} + {@link STRIPED_DETAIL_FRAME_SHARED}. */
export const STRIPED_DETAIL_FRAME_LAYOUT = {
  ...STRIPED_DETAIL_FRAME_SHARED,
  ...STRIPED_DETAIL_FRAME_CASE_STUDY_BACKSPLASH,
  contentOrnamentGapPx: 10,
} as const

export type StripedDetailFrameVariant = 'caseStudy' | 'expertise'

/** Desktop column widths — Figma `Card` frames in a four-card row (`7001:2295`…`7001:2370`). */
export const FRAMED_DETAIL_CARDS_RAIL_DESKTOP_WIDTHS = [
  'min-[1366px]:w-[320px]',
  'min-[1366px]:w-[319px]',
  'min-[1366px]:w-[320px]',
  'min-[1366px]:min-w-[319px]',
] as const

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
