/** Matches `NewsletterSubscriptions.source` select options in Payload. */
export type NewsletterSignupSource =
  | 'home'
  | 'about'
  | 'contact'
  | 'offer-service'
  | 'privacy'
  | 'gallery'

export const NEWSLETTER_SIGNUP_SOURCES: readonly NewsletterSignupSource[] = [
  'home',
  'about',
  'contact',
  'offer-service',
  'privacy',
  'gallery',
] as const
