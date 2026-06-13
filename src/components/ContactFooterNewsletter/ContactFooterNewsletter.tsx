import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  type HomeFooterNewsletterData,
} from '@/components/HomeFooterNewsletter/constants'

import { CONTACT_FOOTER_NEWSLETTER_FIGMA_NODES } from './constants'

type ContactFooterNewsletterProps = {
  data?: HomeFooterNewsletterData
}

/**
 * Contact page footer — reuses {@link HomeFooterNewsletter} with
 * kontakt artboard Figma instance nodes.
 *
 * Page order: after {@link ContactFaq}, last section on `/kontakt`.
 *
 * Figma references:
 *   - Desktop: 7091:4030
 *   - Tablet:  7091:4166
 *   - Mobile:  7091:4302
 */
export function ContactFooterNewsletter({
  data = homeFooterNewsletterDefaults,
}: ContactFooterNewsletterProps) {
  return (
    <HomeFooterNewsletter
      data={data}
      figmaNodes={CONTACT_FOOTER_NEWSLETTER_FIGMA_NODES}
      headingId="contact-footer-newsletter-heading"
    />
  )
}
