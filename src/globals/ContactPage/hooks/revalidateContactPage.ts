import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { ContactPage } from '@/payload-types'

/**
 * Revalidate /kontakt only when the global is published. Without the status
 * guard, autosave drafts (interval 100ms) would fire this hook on every
 * keystroke and push draft content onto the production path.
 */
export const revalidateContactPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as ContactPage
  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating /kontakt')
    revalidatePath('/kontakt')
  }
  return doc
}
