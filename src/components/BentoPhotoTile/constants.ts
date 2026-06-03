export const BENTO_PHOTO_TILE_FIGMA_NODES = {
  image: '6972:19196',
} as const

/** Fixed bento row pattern — same tile order on mobile, tablet, and desktop. */
export const BENTO_PHOTO_SPANS = [
  'narrow',
  'narrow',
  'wide',
  'wide',
  'narrow',
  'narrow',
  'narrow',
  'narrow',
  'narrow',
  'narrow',
  'wide',
  'wide',
] as const

export type BentoPhotoSpan = (typeof BENTO_PHOTO_SPANS)[number]

/**
 * Column span + row height per tile span (Figma Image Container bboxes).
 * Widths come from the grid track (2 cols mobile/tablet, 4 cols desktop) — not fixed px w on tiles.
 */
export const BENTO_PHOTO_TILE_COL_SPAN = {
  narrow: 'col-span-1',
  wide: 'col-span-2',
} as const satisfies Record<BentoPhotoSpan, string>

export const BENTO_PHOTO_TILE_HEIGHT_CLASS = {
  narrow: 'h-[199px] md:h-[371px] lg:h-[395px]',
  wide: 'h-[200px] md:h-[372px] lg:h-[395px]',
} as const satisfies Record<BentoPhotoSpan, string>

/** Mobile 8 px; tablet/desktop 10 px — matches Figma Image Container gap. */
export const BENTO_PHOTO_GRID_CLASS =
  'grid w-full grid-cols-2 gap-2 md:gap-2.5 lg:grid-cols-4' as const
