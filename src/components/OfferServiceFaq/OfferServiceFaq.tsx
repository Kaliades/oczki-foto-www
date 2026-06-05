import { FaqSection } from '@/components/FaqSection'

import {
  OFFER_SERVICE_FAQ_FIGMA_NODES,
  type OfferServiceFaqData,
} from './constants'

type OfferServiceFaqProps = {
  data: OfferServiceFaqData
}

/**
 * Offer service FAQ — reuses {@link FaqSection} with offer-page Figma instance nodes.
 *
 * Page order (Figma y-coords): after `OfferServiceClosingCta`, before footer.
 */
export function OfferServiceFaq({ data }: OfferServiceFaqProps) {
  return (
    <FaqSection
      accordionIdPrefix="offer-service-faq"
      data={data}
      figmaNodes={OFFER_SERVICE_FAQ_FIGMA_NODES}
      headingId="offer-service-faq-heading"
    />
  )
}
