import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  type HomeFooterNewsletterData,
} from '@/components/HomeFooterNewsletter/constants'
import type { NewsletterSignupSource } from '@/newsletter/types'

import { ABOUT_FOOTER_NEWSLETTER_FIGMA_NODES } from './constants'

type AboutFooterNewsletterProps = {
  data?: HomeFooterNewsletterData
  signupSource?: NewsletterSignupSource
}

/**
 * About page footer — reuses {@link HomeFooterNewsletter} with
 * o-mnie artboard Figma instance nodes.
 *
 * Page order: after {@link AboutCta}, last section on `/o-mnie`.
 *
 * Figma references:
 *   - Desktop: 7091:5203
 *   - Tablet:  7092:4749
 *   - Mobile:  7093:6134
 */
export function AboutFooterNewsletter({
  data = homeFooterNewsletterDefaults,
  signupSource = 'about',
}: AboutFooterNewsletterProps) {
  return (
    <HomeFooterNewsletter
      data={data}
      figmaNodes={ABOUT_FOOTER_NEWSLETTER_FIGMA_NODES}
      headingId="about-footer-newsletter-heading"
      signupSource={signupSource}
    />
  )
}
