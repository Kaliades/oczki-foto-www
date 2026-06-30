import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  type HomeFooterNewsletterData,
} from '@/components/HomeFooterNewsletter/constants'
import type { NewsletterSignupSource } from '@/newsletter/types'

import { PRIVACY_POLICY_FOOTER_NEWSLETTER_FIGMA_NODES } from './constants'

type PrivacyPolicyFooterNewsletterProps = {
  data?: HomeFooterNewsletterData
  signupSource?: NewsletterSignupSource
}

/**
 * Privacy policy page footer — reuses {@link HomeFooterNewsletter} with
 * polityka-prywatnosci artboard Figma instance nodes.
 *
 * Page order: after {@link PrivacyPolicySection}, last section on `/polityka-prywatnosci`.
 *
 * Figma references:
 *   - Desktop: 7107:15728
 *   - Tablet:  7108:16313
 *   - Mobile:  7108:16949
 */
export function PrivacyPolicyFooterNewsletter({
  data = homeFooterNewsletterDefaults,
  signupSource = 'privacy',
}: PrivacyPolicyFooterNewsletterProps) {
  return (
    <HomeFooterNewsletter
      data={data}
      figmaNodes={PRIVACY_POLICY_FOOTER_NEWSLETTER_FIGMA_NODES}
      headingId="privacy-policy-footer-newsletter-heading"
      signupSource={signupSource}
    />
  )
}
