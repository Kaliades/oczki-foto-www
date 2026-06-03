import { OczkiTextLink } from '@/components/OczkiTextLink'

import { GALLERY_PORTFOLIO_FIGMA_NODES, GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from './constants'

type GalleryPortfolioLoadMoreProps = {
  label?: string
  onLoadMore?: () => void
  /** Override footer wrapper padding-top (e.g. case study mobile pt-2). */
  footerClassName?: string
  figmaNode?: string
}

/**
 * Figma `More Photos Container` — 56 px tall, border-t primary-300, centred text button.
 */
export function GalleryPortfolioLoadMore({
  label = GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
  onLoadMore,
  footerClassName = 'pt-3',
  figmaNode = GALLERY_PORTFOLIO_FIGMA_NODES.loadMore.desktop,
}: GalleryPortfolioLoadMoreProps) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center border-t border-[var(--oczki-primary-300)] ${footerClassName}`}
      data-figma-node={figmaNode}
    >
      <OczkiTextLink iconDirection="down" label={label} onClick={onLoadMore} type="button" />
    </div>
  )
}
