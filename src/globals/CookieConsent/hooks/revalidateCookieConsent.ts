import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { CookieConsent as CookieConsentDoc } from '@/payload-types'

/**
 * Revalidate layout (baner cookies) only when the global is published.
 */
export const revalidateCookieConsent: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as CookieConsentDoc

  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating cookie consent global')
    revalidateTag('global_cookieConsent', 'max')
    revalidatePath('/', 'layout')
  }

  return doc
}
