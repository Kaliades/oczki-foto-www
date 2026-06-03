/**
 * Botanical `OBJECTS` ornaments — Figma 6978:19669 (left) / 6978:19811 (right).
 *
 * Positions are frame-absolute (origin 0, 0) from Figma MCP layout — including
 * intentional horizontal bleed. Parent must use `overflow-visible` on the decor
 * layer; the section shell clips only at viewport width.
 */
export const BOTANICAL_SIDE_DECOR_ASSETS = {
  left: '/figma/closing-cta-botanical-left.svg',
  right: '/figma/closing-cta-botanical-right.svg',
} as const

/** Figma SVG export dimensions — width/height attributes on each asset. */
export const BOTANICAL_SIDE_DECOR_INTRINSIC = {
  left: { height: 386, width: 371 },
  right: { height: 436, width: 283 },
} as const

export const BOTANICAL_SIDE_DECOR_FIGMA_NODES = {
  desktop: { left: '6978:19669', right: '6978:19811' },
  tablet: { left: '7102:13030', right: '7102:12888' },
  mobile: { left: '7102:16911', right: '7102:16769' },
} as const

/** Visual outer bbox per `OBJECTS` — MCP `get_design_context` wrapper coords. */
export const BOTANICAL_SIDE_DECOR_LAYOUT = {
  desktop: {
    left: { height: 386, left: -41, top: 50, width: 371 },
    right: { height: 436, left: 1084, top: -79, width: 283 },
  },
  tablet: {
    left: { height: 217, left: -23, top: 28, width: 209 },
    right: { height: 245, left: 609, top: -44, width: 159 },
  },
  mobile: {
    left: { height: 102, left: -20, top: 73, width: 98 },
    right: { height: 115, left: 285, top: -21, width: 75 },
  },
} as const

export type BotanicalSideDecorSide = 'left' | 'right'
export type BotanicalSideDecorVariant = keyof typeof BOTANICAL_SIDE_DECOR_LAYOUT
