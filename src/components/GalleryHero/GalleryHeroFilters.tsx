'use client'

import { useState } from 'react'

import { OczkiPill } from '@/components/OczkiPill'

import { GALLERY_HERO_FIGMA_NODES, type GallerySessionFilter, type GallerySessionFilterId } from './constants'

type GalleryHeroFiltersProps = {
  filters: readonly GallerySessionFilter[]
  defaultFilterId: GallerySessionFilterId
  onFilterChange?: (id: GallerySessionFilterId) => void
}

/**
 * Figma `Session type options container` — flex-wrap, 6 px horizontal gap, centred.
 *
 * Session type options container
 * └── Pill × N (44 px row height; wraps to 2 rows tablet, 3 rows mobile)
 */
export function GalleryHeroFilters({
  filters,
  defaultFilterId,
  onFilterChange,
}: GalleryHeroFiltersProps) {
  const [activeId, setActiveId] = useState<GallerySessionFilterId>(defaultFilterId)

  return (
    <nav
      aria-label="Filtruj galerię według typu sesji"
      className="relative z-10 flex w-full max-w-[328px] flex-wrap content-start items-start justify-center gap-x-1.5 gap-y-0 md:max-w-[608px] lg:max-w-[675px]"
      data-figma-node={GALLERY_HERO_FIGMA_NODES.sessionFilters.desktop}
    >
      {filters.map((filter) => {
        const isActive = filter.id === activeId

        return (
          <OczkiPill
            aria-current={isActive ? 'true' : undefined}
            isActive={isActive}
            key={filter.id}
            label={filter.label}
            onClick={() => {
              setActiveId(filter.id)
              onFilterChange?.(filter.id)
            }}
          />
        )
      })}
    </nav>
  )
}
