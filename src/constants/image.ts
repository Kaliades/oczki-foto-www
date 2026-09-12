/** Maximum Next.js image optimization quality — photography site default. */
export const IMAGE_MAX_QUALITY = 100 as const

/**
 * Typical gallery master aspect (width / height). Used when computing `sizes`
 * for `fill` + `object-cover` without knowing the file yet.
 */
export const GALLERY_MASTER_LANDSCAPE_ASPECT = 1.5 as const

/**
 * CSS pixel width for next/image `sizes` when using `fill` + `object-cover`.
 *
 * next/image only sizes by width. A portrait frame showing a landscape master
 * needs enough source width so the cover crop is not upscaled (soft / “pixelated”).
 */
export function objectCoverSizesPx(
  cssWidth: number,
  cssHeight: number,
  sourceAspect: number = GALLERY_MASTER_LANDSCAPE_ASPECT,
): string {
  return `${Math.ceil(Math.max(cssWidth, cssHeight * sourceAspect))}px`
}
