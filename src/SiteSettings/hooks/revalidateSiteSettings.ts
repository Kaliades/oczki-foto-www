import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { SiteSetting } from '@/payload-types'

/**
 * Revalidate cached site settings only when the global is published. Without
 * the status guard, autosave drafts would fire on every keystroke and push
 * draft footer / OG data onto production pages.
 */
export const revalidateSiteSettings: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as SiteSetting

  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating site settings')
    revalidateTag('global_siteSettings', 'max')
  }

  return doc
}
