export const GRAIN_DOT_CLUSTER_SRC = '/figma/case-study-memorable-dot-cluster.svg'

/** Figma `Warstwa_1` outer bbox (metadata). Position comes from layout constants. */
export const GRAIN_DOT_CLUSTER_LAYOUT = {
  desktop: {
    figmaNode: '6989:25675',
    outerHeight: 385.0005142688751,
    outerWidth: 389.35284328460693,
  },
  tablet: {
    figmaNode: '7102:12875',
    outerHeight: 385.0005142688751,
    outerWidth: 389.35284328460693,
  },
  mobile: {
    figmaNode: '7102:16756',
    outerHeight: 259.9259561896324,
    outerWidth: 262.90386551618576,
  },
} as const

export type GrainDotClusterVariant = keyof typeof GRAIN_DOT_CLUSTER_LAYOUT
