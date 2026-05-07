// TODO: Mobile breakpoint — tile grid is 2-col on mobile (grid-cols-2) and 3-col on md.
// Current implementation targets the desktop Figma frame (1366px), 4-col layout.

import type { Media } from '@/payload-types'
import { GalleryGridClient } from './GalleryGridClient'

export type GalleryPhoto = {
  id?: string | null
  image: Media | string | number
  alt?: string | null
  category: string
  sortOrder?: number | null
  captionTitle?: string | null
  captionSubtitle?: string | null
  href?: string | null
}

export type GalleryGridProps = {
  blockType: 'galleryGrid'
  initialVisible?: number | null
  loadMoreLabel?: string | null
  emptyStateLabel?: string | null
  photos: GalleryPhoto[]
}

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  initialVisible,
  loadMoreLabel,
  emptyStateLabel,
  photos,
}) => {
  // Sort by sortOrder asc, then preserve array index as tiebreaker
  const sorted = [...photos].sort((a, b) => {
    const aOrder = a.sortOrder ?? Infinity
    const bOrder = b.sortOrder ?? Infinity
    return aOrder - bOrder
  })

  return (
    <GalleryGridClient
      emptyStateLabel={emptyStateLabel ?? 'Brak zdjęć w tej kategorii'}
      initialVisible={initialVisible ?? 16}
      loadMoreLabel={loadMoreLabel ?? 'Pokaż więcej'}
      photos={sorted}
    />
  )
}
