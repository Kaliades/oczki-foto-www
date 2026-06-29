import type { GalleryHeroData, GallerySessionFilterId } from '@/components/GalleryHero/constants'
import {
  GALLERY_SESSION_FILTERS,
  galleryHeroDefaults,
} from '@/components/GalleryHero/constants'
import { GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from '@/components/GalleryPortfolio/constants'
import type { GalleryPage } from '@/payload-types'

export type GalleryPageSettings = {
  hero: GalleryHeroData
  initialCount: number
  loadMoreBatchSize: number
  loadMoreLabel: string
}

export function mapGalleryPage(doc: GalleryPage | null | undefined): GalleryPageSettings {
  const d = galleryHeroDefaults

  const cmsFilters = doc?.heroContent?.filters
  const filters =
    cmsFilters && cmsFilters.length > 0
      ? cmsFilters.flatMap((f) =>
          f.category && f.label
            ? [{ id: f.category as GallerySessionFilterId, label: f.label }]
            : [],
        )
      : d.filters

  const defaultFilterId =
    (doc?.heroContent?.defaultFilter as GallerySessionFilterId | null | undefined) ??
    d.defaultFilterId

  const safeDefaultFilter = filters.some((f) => f.id === defaultFilterId)
    ? defaultFilterId
    : (filters[0]?.id ?? GALLERY_SESSION_FILTERS[0].id)

  return {
    hero: {
      title: {
        lead: doc?.heroContent?.title?.lead ?? d.title.lead,
        emphasis: doc?.heroContent?.title?.emphasis ?? d.title.emphasis,
        trail: doc?.heroContent?.title?.trail ?? d.title.trail,
      },
      description: doc?.heroContent?.description ?? d.description,
      filters: filters.length > 0 ? filters : d.filters,
      defaultFilterId: safeDefaultFilter,
    },
    initialCount: doc?.portfolioSettings?.initialCount ?? 12,
    loadMoreBatchSize: doc?.portfolioSettings?.loadMoreBatchSize ?? 12,
    loadMoreLabel:
      doc?.portfolioSettings?.loadMoreLabel ?? GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
  }
}
