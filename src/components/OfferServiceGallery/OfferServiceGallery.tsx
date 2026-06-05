import { GallerySection } from '@/components/GallerySection'

import {
  OFFER_SERVICE_GALLERY_FIGMA_NODES,
  type OfferServiceGalleryData,
} from './constants'

type OfferServiceGalleryProps = {
  data: OfferServiceGalleryData
}

/**
 * Offer service "Galeria" — reuses {@link GallerySection} with
 * sesje-kobiece heading copy and offer-page Figma instance nodes.
 *
 * Page order (Figma y-coords): after `OfferServiceProcessSteps`, before
 * `OfferServiceClosingCta`.
 */
export function OfferServiceGallery({ data }: OfferServiceGalleryProps) {
  return (
    <GallerySection
      data={data}
      figmaNodes={OFFER_SERVICE_GALLERY_FIGMA_NODES}
      headingId="offer-service-gallery-heading"
    />
  )
}
