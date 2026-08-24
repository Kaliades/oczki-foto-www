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
 * Clamped so long CMS intros never spill past the card image bounds.
 */
export function GalleryPortfolioCardCaption({ caption }: GalleryPortfolioCardCaptionProps) {
  return (
    <div
      className="pointer-events-none absolute inset-x-3 inset-y-6 flex items-center justify-center overflow-hidden"
      data-figma-node={GALLERY_PORTFOLIO_CARD_FIGMA_NODES.captionContainer}
    >
      <div className="flex w-[169px] max-h-full flex-col items-center overflow-hidden text-center [font-feature-settings:'ss01'_1,'ss02'_1,'ss03'_1,'ss08'_1,'ss10'_1,'ss12'_1,'lnum'_1,'pnum'_1]">
        <p className="oczki-body-xl mb-[-2px] line-clamp-3 w-full text-[var(--oczki-primary-900)]">
          {caption.title}
        </p>
        <p className="oczki-body-l line-clamp-5 w-full text-[var(--oczki-primary-800)]">
          {caption.subtitle}
        </p>
      </div>
    </div>
  )
}
