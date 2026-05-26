import { GalleryPortfolioGrid } from './GalleryPortfolioGrid'
import { GalleryPortfolioLoadMore } from './GalleryPortfolioLoadMore'
import { GALLERY_PORTFOLIO_FIGMA_NODES, type GalleryPortfolioData } from './constants'

type GalleryPortfolioProps = {
  data: GalleryPortfolioData
  onLoadMore?: () => void
}

/**
 * Galeria page portfolio grid — Figma `Galeria`.
 *
 * <section> (full-bleed bg)
 * └── <div> inner 1366 cap
 *     └── Image Gallery (flex col, gap 32)
 *         ├── GalleryPortfolioGrid
 *         └── GalleryPortfolioLoadMore
 */
export function GalleryPortfolio({ data, onLoadMore }: GalleryPortfolioProps) {
  const { items, loadMoreLabel } = data

  return (
    <section
      aria-label="Portfolio zdjęć"
      className="relative isolate w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={GALLERY_PORTFOLIO_FIGMA_NODES.desktop}
    >
      <div className="relative mx-auto w-full max-w-[1366px] px-4 pb-16 pt-5 md:px-20 md:pb-20 md:pt-8 lg:px-8">
        <div
          className="flex w-full flex-col items-center gap-8"
          data-figma-node={GALLERY_PORTFOLIO_FIGMA_NODES.imageGallery.desktop}
        >
          <GalleryPortfolioGrid items={items} />
          <GalleryPortfolioLoadMore label={loadMoreLabel} onLoadMore={onLoadMore} />
        </div>
      </div>
    </section>
  )
}
