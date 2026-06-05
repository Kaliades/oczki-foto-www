import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'
import { OfferServiceHeroHorizontalScallopRow } from './OfferServiceHeroHorizontalScallopRow'

/**
 * Horizontal scallop bridge — bottom-anchored to copy container so it hugs the image
 * edge even when heading wraps. Mobile: centred 768 px slot + bleed; tablet+: full viewport.
 */
export function OfferServiceHeroStackedScallop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-[var(--offer-stacked-scallop-bottom)] left-1/2 z-0 h-[var(--offer-stacked-scallop-h)] w-[768px] max-w-none -translate-x-1/2 overflow-hidden md:left-0 md:w-full md:translate-x-0"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.scallopStrip.mobile}
      data-name="Image list"
    >
      <div
        className="absolute inset-y-0 left-0 right-0 max-md:-left-[var(--offer-stacked-scallop-bleed)] max-md:-right-[var(--offer-stacked-scallop-bleed)]"
      >
        <OfferServiceHeroHorizontalScallopRow />
      </div>
    </div>
  )
}
