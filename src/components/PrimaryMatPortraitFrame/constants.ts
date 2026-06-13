export const PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES = {
  desktop: '6994:26050',
  tablet: '7092:5312',
  mobile: '7093:6034',
  image: {
    desktop: '6994:26044',
    tablet: '7092:5313',
    mobile: '7093:6035',
  },
} as const

/** Portrait crop — Figma stacked `Image` layers, object-cover fill. */
export const PRIMARY_MAT_PORTRAIT_CROP_CLASS =
  'absolute inset-0 h-full w-full object-cover' as const
