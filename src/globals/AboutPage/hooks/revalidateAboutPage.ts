import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { AboutPage } from '@/payload-types'

/**
 * Revalidate /o-mnie only when the global is published. Without the status
 * guard, autosave drafts (interval 100ms) would fire this hook on every
 * keystroke and push draft content onto the production path.
 */
export const revalidateAboutPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as AboutPage
  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating /o-mnie')
    revalidatePath('/o-mnie')
  }
  return doc
}
