import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { PrivacyPolicyPage } from '@/payload-types'

/**
 * Revalidate /polityka-prywatnosci only when the global is published. Without
 * the status guard, autosave drafts (interval 100ms) would fire this hook on
 * every keystroke and push draft content onto the production path.
 */
export const revalidatePrivacyPolicyPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as PrivacyPolicyPage
  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating /polityka-prywatnosci')
    revalidatePath('/polityka-prywatnosci')
  }
  return doc
}
