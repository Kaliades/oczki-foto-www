import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  type HomeFooterNewsletterData,
} from '@/components/HomeFooterNewsletter/constants'
import type { NewsletterSignupSource } from '@/newsletter/types'

import { OFFER_SERVICE_FOOTER_NEWSLETTER_FIGMA_NODES } from './constants'

type OfferServiceFooterNewsletterProps = {
  data?: HomeFooterNewsletterData
  signupSource?: NewsletterSignupSource
}

/**
 * Offer service page footer — reuses {@link HomeFooterNewsletter}.
 * Reportaż artboards (`7338:8610` / `7338:9270` / `7338:9930`) match the
 * shared shell and copy — no content overlay required.
 *
 * Page order (Figma y-coords): after `OfferServiceFaq`, last section on page.
 */
export function OfferServiceFooterNewsletter({
  data = homeFooterNewsletterDefaults,
  signupSource = 'offer-service',
}: OfferServiceFooterNewsletterProps) {
  return (
    <HomeFooterNewsletter
      data={data}
      figmaNodes={OFFER_SERVICE_FOOTER_NEWSLETTER_FIGMA_NODES}
      headingId="offer-service-footer-newsletter-heading"
      signupSource={signupSource}
    />
  )
}
