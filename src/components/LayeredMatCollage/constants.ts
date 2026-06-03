export type LayeredMatCollageVariant = 'desktop' | 'tablet' | 'mobile'

type LayeredMatCollageLayout = {
  figmaNode: string
  stageHeight: number
  backImage: { left: number; top: number; width: number; height: number; figmaNode: string }
  matPhoto: { left: number; top: number }
  sygnetBadge: { left: number; top: number }
}

/**
 * Overlapping landscape + cream-mat portrait + sygnet badge.
 * Child positions from Figma metadata inside `Herosection`.
 */
export const LAYERED_MAT_COLLAGE_LAYOUT: Record<LayeredMatCollageVariant, LayeredMatCollageLayout> = {
  desktop: {
    figmaNode: '6952:17246',
    stageHeight: 620,
    backImage: {
      figmaNode: '6986:19958',
      left: 896,
      top: 0,
      width: 470,
      height: 287,
    },
    matPhoto: { left: 825, top: 195 },
    sygnetBadge: { left: 1070, top: 266 },
  },
  tablet: {
    figmaNode: '7102:12728',
    stageHeight: 1040,
    backImage: {
      figmaNode: '7104:20202',
      left: 377,
      top: 0,
      width: 391,
      height: 239,
    },
    matPhoto: { left: 318, top: 162 },
    sygnetBadge: { left: 522, top: 221 },
  },
  mobile: {
    figmaNode: '7102:16654',
    stageHeight: 842,
    backImage: {
      figmaNode: '7111:8998',
      left: 119,
      top: 0,
      width: 241,
      height: 147,
    },
    matPhoto: { left: 83, top: 99 },
    sygnetBadge: { left: 208, top: 136 },
  },
}
