import type { SectionLink } from '@/utilities/resolveLinkHref'

export type GallerySectionItem = {
  imageSrc: string
  imageAlt: string
  /**
   * Optional crop classes applied to the underlying `<img>` so editors can
   * reframe a portrait or landscape source inside the fixed 211×262 (small)
   * or 296×366 / 393×486 (large) slot without uploading a new crop.
   */
  cropClassName?: string
  /**
   * Shown only while this slot is focused. Primary line uses body/xl,
   * secondary uses body/l. Items without a caption get a generic fallback
   * in `GalleryItem`.
   */
  caption?: {
    title: string
    subtitle: string
  }
}

export type GallerySectionData = {
  heading: {
    start: string
    /** Empty string renders a single plain heading line (no italic span). */
    emphasis: string
  }
  description: string
  cta: SectionLink
  /** Five-item rail; one slot is enlarged at a time (click / carousel). */
  items: readonly GallerySectionItem[]
}

/** Initial focused slot — middle of the rail (Figma default). */
export const getDefaultFocusedIndex = (count: number): number => Math.floor(count / 2)

/**
 * Whether a slot at `index` is a direct neighbour of the focused slot. On
 * mobile these neighbours sit higher (`pt-[52px]`) instead of `pt-[108px]`.
 */
export const isFocusedNeighbour = (
  index: number,
  focusedIndex: number,
  count: number,
): boolean => {
  if (count < 2) return false
  return Math.abs(index - focusedIndex) === 1
}
