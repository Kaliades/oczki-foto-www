export type FullBleedPhotoCrop = {
  mobile: string
  tablet: string
  desktop: string
}

/** Figma `Image` backdrop layer — absolute fill + primary/100 fallback. */
export const FULL_BLEED_PHOTO_LAYER_FIGMA_NODES = {
  desktop: '6972:15584',
  tablet: '7092:4630',
  mobile: '7093:6015',
} as const
