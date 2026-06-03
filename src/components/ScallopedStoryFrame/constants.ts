export const SCALLOPED_STORY_FRAME_FIGMA_NODES = {
  desktop: '6972:18509',
  tablet: '7102:11867',
  mobile: '7130:9028',
  innerPanel: {
    desktop: '6972:17850',
    tablet: '7102:12448',
    mobile: '7130:9645',
  },
} as const

export const SCALLOP_TILE = {
  src: '/figma/case-study-scallop-tile.svg',
  desktop: { width: 68, height: 60, horizontalOverlap: 9, verticalOverlap: 8 },
  mobile: { width: 56, height: 50, overlap: 7.52 },
} as const

/** Horizontal tile counts — Figma `Group 62` top/bottom rows. */
export const SCALLOP_HORIZONTAL_TILE_COUNTS = {
  mobile: 6,
  tablet: 9,
  desktop: 9,
} as const

/** Vertical tile counts — Figma left/right `-rotate-90` strips. */
export const SCALLOP_VERTICAL_TILE_COUNTS = {
  mobile: 10,
  tablet: 7,
  desktop: 7,
} as const

/**
 * Layout from `get_design_context` on `6972:18509` / `7102:11867` / `7130:9028`.
 * (Metadata bbox offsets differ — trust design-context absolute positions.)
 */
export const SCALLOPED_STORY_FRAME_LAYOUT = {
  group: {
    width: { mobile: 354, tablet: 547, desktop: 547 },
    height: { mobile: 503, tablet: 467, desktop: 469 },
  },
  innerPanel: {
    left: { mobile: 21, tablet: 25, desktop: 25 },
    top: { mobile: 25, tablet: 27, desktop: 28 },
    width: { mobile: 311, tablet: 498, desktop: 498 },
    creamPad: { mobile: 6, tablet: 12, desktop: 12 },
  },
  copyWell: {
    paddingX: { mobile: 12, tablet: 32, desktop: 32 },
    paddingTop: { mobile: 12, tablet: 32, desktop: 32 },
    paddingBottom: { mobile: 16, tablet: 48, desktop: 36 },
  },
  ears: {
    desktop: {
      top: { left: 2, top: 3 },
      bottom: { left: 4, top: 409 },
      left: { left: 0, top: 0, height: 428, width: 60 },
      right: { left: 487, top: 2, height: 428, width: 60 },
    },
    mobile: {
      top: { left: 1, top: 3, height: 50, width: 353 },
      bottom: { left: 0, top: 448, height: 50, width: 353 },
      left: { left: 1, top: 2, height: 501, width: 46 },
      right: { left: 306, top: 0, height: 501, width: 46 },
    },
  },
  ruleInset: 6,
} as const
