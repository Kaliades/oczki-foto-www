import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  type HomeFooterNewsletterData,
} from '@/components/HomeFooterNewsletter/constants'

import { OFFER_SERVICE_FOOTER_NEWSLETTER_FIGMA_NODES } from './constants'

type OfferServiceFooterNewsletterProps = {
  data?: HomeFooterNewsletterData
}

/**
 * Offer service page footer — reuses {@link HomeFooterNewsletter} with
 * sesje-kobiece artboard Figma instance nodes.
 *
 * Page order (Figma y-coords): after `OfferServiceFaq`, last section on page.
 */
export function OfferServiceFooterNewsletter({
  data = homeFooterNewsletterDefaults,
}: OfferServiceFooterNewsletterProps) {
  return (
    <HomeFooterNewsletter
      data={data}
      figmaNodes={OFFER_SERVICE_FOOTER_NEWSLETTER_FIGMA_NODES}
      headingId="offer-service-footer-newsletter-heading"
    />
  )
}
