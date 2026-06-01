export type DecorDotsFieldVariant = 'desktop' | 'tablet' | 'mobile'

type DecorDotsFieldLayout = {
  figmaNode: string
  /** Positioning wrapper (Figma absolute flex box around the rotation). */
  left?: number
  right?: number
  top: number
  width: number
  height: number
  rotateDeg: number
  assetWidth: number
  assetHeight: number
}

/**
 * Bokeh dots (`6962:4007`) — values from Figma `get_design_context` per section frame.
 * Native asset 196×260, rotated −47.32° inside the placement wrapper.
 */
export const DECOR_DOTS_FIELD_LAYOUT: Record<DecorDotsFieldVariant, DecorDotsFieldLayout> = {
  desktop: {
    figmaNode: '6962:4007',
    left: 1056,
    top: -152.09,
    width: 324,
    height: 320,
    rotateDeg: -47.32,
    assetWidth: 196,
    assetHeight: 260,
  },
  tablet: {
    figmaNode: '7104:19033',
    left: 508,
    top: -122.09,
    width: 324,
    height: 320,
    rotateDeg: -47.32,
    assetWidth: 196,
    assetHeight: 260,
  },
  mobile: {
    figmaNode: '7104:19430',
    right: 48.16,
    top: -116.84,
    width: 213,
    height: 211,
    rotateDeg: -47.32,
    assetWidth: 129,
    assetHeight: 171,
  },
}
