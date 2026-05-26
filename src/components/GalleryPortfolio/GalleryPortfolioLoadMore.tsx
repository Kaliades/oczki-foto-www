import { OczkiTextLink } from '@/components/OczkiTextLink'

import { GALLERY_PORTFOLIO_FIGMA_NODES, GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from './constants'

type GalleryPortfolioLoadMoreProps = {
  label?: string
  onLoadMore?: () => void
}

/**
 * Figma `More Photos Container` — 56 px tall, border-t primary-300, centred text button.
 */
export function GalleryPortfolioLoadMore({
  label = GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
  onLoadMore,
}: GalleryPortfolioLoadMoreProps) {
  return (
    <div
      className="flex w-full flex-col items-center justify-center border-t border-[var(--oczki-primary-300)] pt-3"
      data-figma-node={GALLERY_PORTFOLIO_FIGMA_NODES.loadMore.desktop}
    >
      <OczkiTextLink iconDirection="down" label={label} onClick={onLoadMore} type="button" />
    </div>
  )
}
