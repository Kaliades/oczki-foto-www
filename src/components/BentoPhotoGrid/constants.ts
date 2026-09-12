export const BENTO_PHOTO_GRID_FIGMA_NODES = {
  imageContainer: {
    desktop: '7356:12164',
    tablet: '7356:13504',
    mobile: '7356:14880',
  },
} as const

/**
 * `sizes` for next/image — must match real CSS width of the tile.
 * Narrow ≈ 1 grid track; wide ≈ 2 tracks (was wrongly using narrow for both,
 * so landscape tiles looked soft / upscaled).
 */
export const BENTO_PHOTO_GRID_IMAGE_SIZES = {
  narrow: '(min-width: 1024px) 318px, (min-width: 768px) 299px, 160px',
  wide: '(min-width: 1024px) 646px, (min-width: 768px) 608px, 328px',
} as const
