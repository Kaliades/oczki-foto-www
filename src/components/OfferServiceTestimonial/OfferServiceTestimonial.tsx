import { TestimonialSectionClient } from '@/components/TestimonialSection'

import {
  OFFER_SERVICE_TESTIMONIAL_FIGMA_NODES,
  offerServiceTestimonialSesjeKobieceDefaults,
  type OfferServiceTestimonialData,
} from './constants'

type OfferServiceTestimonialProps = {
  data: OfferServiceTestimonialData
}

/**
 * Offer service “Opinie” — reuses {@link TestimonialSectionClient} with
 * sesje-kobiece heading copy and offer-page Figma instance nodes.
 *
 * Page order (Figma y-coords): after `OfferServiceCare`, before
 * `OfferServiceProcessSteps`.
 */
export function OfferServiceTestimonial({ data }: OfferServiceTestimonialProps) {
  return (
    <TestimonialSectionClient
      data={data}
      fallbackItems={offerServiceTestimonialSesjeKobieceDefaults.items}
      figmaNodes={OFFER_SERVICE_TESTIMONIAL_FIGMA_NODES}
      headingId="offer-service-testimonial-heading"
    />
  )
}
