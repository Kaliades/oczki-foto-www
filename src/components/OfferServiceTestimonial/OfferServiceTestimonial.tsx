import { TestimonialSectionClient } from '@/components/TestimonialSection'

import {
  OFFER_SERVICE_TESTIMONIAL_FIGMA_NODES,
  type OfferServiceTestimonialData,
} from './constants'

type OfferServiceTestimonialProps = {
  data: OfferServiceTestimonialData
}

/**
 * Offer service “Opinie” — reuses {@link TestimonialSectionClient}.
 *
 * Page order (Figma y-coords): after Care/Duo, before ProcessSteps.
 * Reportaż instance: `7338:8306` / `7338:8966` / `7338:9626`.
 */
export function OfferServiceTestimonial({ data }: OfferServiceTestimonialProps) {
  return (
    <TestimonialSectionClient
      data={data}
      fallbackItems={data.items}
      figmaNodes={OFFER_SERVICE_TESTIMONIAL_FIGMA_NODES}
      headingId="offer-service-testimonial-heading"
    />
  )
}
