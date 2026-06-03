export const PORTRAIT_PHOTO_STRIP_FIGMA_NODES = {
  imagesContainer: {
    desktop: '6952:17295',
    tablet: '7102:13173',
    mobile: '7102:17054',
  },
  image: {
    desktop: ['6974:19246', '6974:19247', '6974:19248'] as const,
    tablet: ['7102:13174', '7102:13175', '7102:13176'] as const,
    mobile: ['7102:17055', '7102:17056', '7102:17057'] as const,
  },
} as const

/** Tile geometry from Figma metadata inside `Images Container`. */
export const PORTRAIT_PHOTO_STRIP_LAYOUT = {
  desktop: {
    gap: 12,
    tileWidth: 318,
    tileHeight: 395,
  },
  tablet: {
    gap: 12,
    tileHeight: 245,
  },
  mobile: {
    gap: 8,
    tileHeight: 130,
  },
} as const
