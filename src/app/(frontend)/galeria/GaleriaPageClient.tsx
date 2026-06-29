'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'

import { GalleryHero } from '@/components/GalleryHero'
import type { GalleryHeroData, GallerySessionFilterId } from '@/components/GalleryHero/constants'
import { GalleryPortfolio } from '@/components/GalleryPortfolio'
import type { GalleryPortfolioCardData } from '@/components/GalleryPortfolioCard'

export type GalleryPortfolioListingItem = GalleryPortfolioCardData & {
  category: GallerySessionFilterId
}

type GaleriaPageClientProps = {
  hero: GalleryHeroData
  items: readonly GalleryPortfolioListingItem[]
  initialCount: number
  loadMoreBatchSize: number
  loadMoreLabel: string
}

/**
 * Client shell for /galeria — connects hero session filters to the portfolio
 * grid and paginates with “Zobacz więcej zdjęć”.
 */
export function GaleriaPageClient({
  hero,
  items,
  initialCount,
  loadMoreBatchSize,
  loadMoreLabel,
}: GaleriaPageClientProps) {
  const [activeFilterId, setActiveFilterId] = useState<GallerySessionFilterId>(
    hero.defaultFilterId,
  )
  const [visibleCount, setVisibleCount] = useState(initialCount)

  useEffect(() => {
    setActiveFilterId(hero.defaultFilterId)
  }, [hero.defaultFilterId])

  useEffect(() => {
    setVisibleCount(initialCount)
  }, [activeFilterId, initialCount])

  const filteredItems = useMemo(
    () => items.filter((item) => item.category === activeFilterId),
    [items, activeFilterId],
  )

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount],
  )

  const hasMore = visibleCount < filteredItems.length

  const handleFilterChange = useCallback((id: GallerySessionFilterId) => {
    setActiveFilterId(id)
  }, [])

  const handleLoadMore = useCallback(() => {
    setVisibleCount((count) => count + loadMoreBatchSize)
  }, [loadMoreBatchSize])

  return (
    <>
      <GalleryHero
        activeFilterId={activeFilterId}
        data={hero}
        onFilterChange={handleFilterChange}
      />
      <GalleryPortfolio
        data={{ items: visibleItems, loadMoreLabel }}
        loadMoreDisabled={!hasMore}
        onLoadMore={handleLoadMore}
      />
    </>
  )
}
