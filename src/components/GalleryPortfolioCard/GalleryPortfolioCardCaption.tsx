import { GALLERY_PORTFOLIO_CARD_FIGMA_NODES } from './constants'

export type GalleryPortfolioCardCaptionData = {
  title: string
  subtitle: string
}

type GalleryPortfolioCardCaptionProps = {
  caption: GalleryPortfolioCardCaptionData
}

/**
 * Centred caption stack inside the hover overlay.
 * Figma `Image description container` — title body/xl, subtitle body/l, -2px title margin.
 */
export function GalleryPortfolioCardCaption({ caption }: GalleryPortfolioCardCaptionProps) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 flex w-[169px] -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center [font-feature-settings:'ss01'_1,'ss02'_1,'ss03'_1,'ss08'_1,'ss10'_1,'ss12'_1,'lnum'_1,'pnum'_1]"
      data-figma-node={GALLERY_PORTFOLIO_CARD_FIGMA_NODES.captionContainer}
    >
      <p className="oczki-body-xl mb-[-2px] w-full text-[var(--oczki-primary-900)]">{caption.title}</p>
      <p className="oczki-body-l w-full text-[var(--oczki-primary-800)]">{caption.subtitle}</p>
    </div>
  )
}
