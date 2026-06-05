import { OfferProcessStepsSection } from '@/components/OfferProcessSteps'

import {
  OFFER_SERVICE_PROCESS_STEPS_FIGMA_NODES,
  type OfferServiceProcessStepsData,
} from './constants'

type OfferServiceProcessStepsProps = {
  data: OfferServiceProcessStepsData
}

/**
 * Offer service "Kroki do realizacji oferty" — reuses
 * {@link OfferProcessStepsSection} with offer-page Figma instance nodes.
 *
 * Page order (Figma y-coords): after `OfferServiceTestimonial`, before
 * `OfferServiceGallery`.
 */
export function OfferServiceProcessSteps({ data }: OfferServiceProcessStepsProps) {
  return (
    <OfferProcessStepsSection
      data={data}
      figmaNodes={OFFER_SERVICE_PROCESS_STEPS_FIGMA_NODES}
      headingId="offer-service-process-steps-heading"
    />
  )
}
