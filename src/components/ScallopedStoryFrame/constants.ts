export const SCALLOPED_STORY_FRAME_FIGMA_NODES = {
  desktop: '7394:10341',
  tablet: '7394:12212',
  mobile: '7394:12821',
  innerPanel: {
    desktop: '7394:10922',
    tablet: '7394:12793',
    mobile: '7394:13438',
  },
} as const

export const SCALLOP_TILE = {
  src: '/figma/case-study-scallop-tile.svg',
  desktop: { width: 68, height: 60, horizontalOverlap: 9, verticalOverlap: 8 },
  mobile: { width: 56, height: 50, overlap: 7.52 },
} as const

/** Horizontal tile counts — Figma `Group 62` top/bottom rows. */
export const SCALLOP_HORIZONTAL_TILE_COUNTS = {
  mobile: 7,
  tablet: 9,
  desktop: 9,
} as const

/**
 * Base vertical tile counts — left/right `-rotate-90` strips for the
 * heading-only card. Taller copy adds tiles via `scallopExtraVerticalTiles`.
 */
export const SCALLOP_VERTICAL_TILE_COUNTS = {
  mobile: 5,
  tablet: 5,
  desktop: 5,
} as const

/**
 * Layout from `get_design_context` / `get_metadata` on
 * `7394:10341` / `7394:12212` / `7394:12821` (heading-only Group 62).
 *
 * `bottomChrome` — minimum reveal kept under the cream panel for the bottom
 * scallop row. Must stay small: using the leftover under the short Figma
 * heading (43–49 px) made desktop/tablet add a side tile one step too early.
 */
export const SCALLOPED_STORY_FRAME_LAYOUT = {
  group: {
    width: { mobile: 354, tablet: 547, desktop: 547 },
    height: { mobile: 251, tablet: 310, desktop: 310 },
  },
  bottomChrome: { mobile: 22, tablet: 18, desktop: 18 },
  innerPanel: {
    left: { mobile: 23, tablet: 25, desktop: 25 },
    top: { mobile: 25, tablet: 29, desktop: 31 },
    width: { mobile: 311, tablet: 498, desktop: 498 },
    creamPad: { mobile: 6, tablet: 12, desktop: 12 },
  },
  copyWell: {
    paddingX: { mobile: 16, tablet: 32, desktop: 32 },
    paddingTop: { mobile: 14, tablet: 32, desktop: 32 },
    paddingBottom: { mobile: 16, tablet: 48, desktop: 36 },
  },
  ears: {
    desktop: {
      top: { left: 2, top: 6 },
      bottom: { left: 7, top: 244 },
      left: { left: 0, top: 0, height: 308, width: 60 },
      right: { left: 487, top: 2, height: 308, width: 60 },
    },
    mobile: {
      top: { left: 3, top: 3, height: 50, width: 353 },
      bottom: { left: 0, top: 201, height: 50, width: 353 },
      left: { left: 3, top: 2, height: 251, width: 46 },
      right: { left: 308, top: 0, height: 251, width: 46 },
    },
  },
  ruleInset: 6,
} as const
