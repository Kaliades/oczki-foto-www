export const BENTO_PHOTO_GRID_FIGMA_NODES = {
  imageContainer: {
    desktop: '7356:12164',
    tablet: '7356:13504',
    mobile: '7356:14880',
  },
} as const

/**
 * `sizes` for next/image — CSS width needed so `object-cover` does not upscale
 * typical 3:2 landscape masters in portrait-ish tiles.
 * Narrow ≈ 1 track × row height; wide ≈ 2 tracks (width already dominates).
 */
export const BENTO_PHOTO_GRID_IMAGE_SIZES = {
  // max(track, height * 1.5): 318/395 → 593; 299/371 → 557; 160/199 → 299
  narrow: '(min-width: 1024px) 593px, (min-width: 768px) 557px, 299px',
  wide: '(min-width: 1024px) 646px, (min-width: 768px) 608px, 328px',
} as const
