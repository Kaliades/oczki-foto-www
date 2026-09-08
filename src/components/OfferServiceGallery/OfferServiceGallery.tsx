import {
  GallerySection,
  type GallerySectionFigmaNodes,
} from '@/components/GallerySection'

import {
  OFFER_SERVICE_GALLERY_FIGMA_NODES,
  type OfferServiceGalleryData,
} from './constants'
import { GalleryMosaic } from './GalleryMosaic'

type OfferServiceGalleryProps = {
  data: OfferServiceGalleryData
  /** Override Figma node ids (e.g. reportaż stories rail instance). */
  figmaNodes?: GallerySectionFigmaNodes
  headingId?: string
}

/**
 * Offer service "Galeria".
 *
 * - `layout: 'rail'` (default) — shared {@link GallerySection} carousel
 * - `layout: 'mosaic'` — static asymmetric grid + footer CTA
 */
export function OfferServiceGallery({
  data,
  figmaNodes = OFFER_SERVICE_GALLERY_FIGMA_NODES,
  headingId = 'offer-service-gallery-heading',
}: OfferServiceGalleryProps) {
  if (data.layout === 'mosaic') {
    return <GalleryMosaic data={data} headingId={headingId} />
  }

  return (
    <GallerySection data={data} figmaNodes={figmaNodes} headingId={headingId} />
  )
}
