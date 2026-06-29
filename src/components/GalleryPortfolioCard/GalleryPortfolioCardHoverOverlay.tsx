import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { GalleryPortfolioCardCaption, type GalleryPortfolioCardCaptionData } from './GalleryPortfolioCardCaption'
import {
  GALLERY_PORTFOLIO_CARD_FIGMA_NODES,
  GALLERY_PORTFOLIO_HOVER_FRAME_SRC,
  GALLERY_PORTFOLIO_HOVER_OVERLAY_STYLE,
} from './constants'

type GalleryPortfolioCardHoverOverlayProps = {
  caption: GalleryPortfolioCardCaptionData
}

/**
 * Hover/focus overlay — colour wash, scallop frame, centred caption.
 * Frame bbox extends beyond the card (Figma Group 63 at -20, -22).
 */
export function GalleryPortfolioCardHoverOverlay({ caption }: GalleryPortfolioCardHoverOverlayProps) {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={GALLERY_PORTFOLIO_HOVER_OVERLAY_STYLE}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-5 -top-[22px] h-[417px] w-[338.133px]"
        data-figma-node={GALLERY_PORTFOLIO_CARD_FIGMA_NODES.hoverFrame}
      >
        <div className="relative size-full">
          <Image
            alt=""
            className="max-w-none object-fill"
            fill
            sizes="338px"
            src={GALLERY_PORTFOLIO_HOVER_FRAME_SRC}
          />
        </div>
      </div>
      <GalleryPortfolioCardCaption caption={caption} />
    </>
  )
}
