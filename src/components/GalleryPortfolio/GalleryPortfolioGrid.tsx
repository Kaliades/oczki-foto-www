import { GalleryPortfolioCard, type GalleryPortfolioCardData } from '@/components/GalleryPortfolioCard'

import { GALLERY_PORTFOLIO_FIGMA_NODES } from './constants'

type GalleryPortfolioGridProps = {
  items: readonly GalleryPortfolioCardData[]
}

/**
 * Figma `Image Container` — flex-wrap grid with 10 px gap (desktop/tablet), 6 px mobile.
 * Column counts: 2 mobile / 3 tablet / 4 desktop (from metadata bboxes).
 */
export function GalleryPortfolioGrid({ items }: GalleryPortfolioGridProps) {
  return (
    <ul
      className="grid w-full grid-cols-2 gap-1.5 overflow-visible md:grid-cols-3 md:gap-2.5 lg:grid-cols-4"
      data-figma-node={GALLERY_PORTFOLIO_FIGMA_NODES.imageContainer.desktop}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className="h-[200px] md:h-[244px] lg:h-[395px]"
        >
          <GalleryPortfolioCard
            item={item}
            sizes="(min-width: 1024px) 318px, (min-width: 768px) 196px, 161px"
          />
        </li>
      ))}
    </ul>
  )
}
