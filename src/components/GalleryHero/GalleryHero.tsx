import { GalleryHeroDecor } from './GalleryHeroDecor'
import { GalleryHeroFilters } from './GalleryHeroFilters'
import { GalleryHeroHeading } from './GalleryHeroHeading'
import {
  GALLERY_HERO_FIGMA_NODES,
  type GalleryHeroData,
  type GallerySessionFilterId,
} from './constants'

type GalleryHeroProps = {
  data: GalleryHeroData
  onFilterChange?: (id: GallerySessionFilterId) => void
}

/**
 * Galeria page hero — Figma `Herosection`.
 *
 * <section> (full-bleed bg)
 * └── <div> inner 1366 cap, relative
 *     ├── GalleryHeroDecor (absolute ornaments)
 *     └── <div> centred column (gap 36 mobile / 48 tablet+)
 *         ├── GalleryHeroHeading
 *         └── GalleryHeroFilters
 */
export function GalleryHero({ data, onFilterChange }: GalleryHeroProps) {
  const { title, description, filters, defaultFilterId } = data

  return (
    <section
      aria-labelledby="gallery-hero-heading"
      className="relative isolate w-full overflow-visible bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={GALLERY_HERO_FIGMA_NODES.desktop}
    >
      <div className="relative mx-auto w-full max-w-[1366px] min-h-[397px] md:min-h-[407px] lg:min-h-[354px]">
        <GalleryHeroDecor />
        <div className="relative z-10 flex flex-col items-center gap-9 px-4 pb-4 pt-5 md:gap-12 md:pb-7 md:pt-[60px] lg:pb-9">
          <GalleryHeroHeading
            description={description}
            titleEmphasis={title.emphasis}
            titleLead={title.lead}
            titleTrail={title.trail}
          />
          <GalleryHeroFilters
            defaultFilterId={defaultFilterId}
            filters={filters}
            onFilterChange={onFilterChange}
          />
        </div>
      </div>
    </section>
  )
}
