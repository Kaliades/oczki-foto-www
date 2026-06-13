import { FaqSection } from '@/components/FaqSection'

import type { ContactFaqData } from './constants'
import { CONTACT_FAQ_FIGMA_NODES } from './constants'

type ContactFaqProps = {
  data: ContactFaqData
}

/**
 * Kontakt page FAQ — reuses {@link FaqSection} with kontakt-page Figma instance nodes.
 *
 * Figma: desktop `7100:7158`, tablet `7100:7234`, mobile `7100:7310`.
 */
export function ContactFaq({ data }: ContactFaqProps) {
  return (
    <FaqSection
      accordionIdPrefix="contact-faq"
      data={data}
      figmaNodes={CONTACT_FAQ_FIGMA_NODES}
      headingId="contact-faq-heading"
    />
  )
}
