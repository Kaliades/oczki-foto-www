import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

import type { Header } from '@/payload-types'

/**
 * Revalidate cached header data only when the global is published. Without the
 * status guard, autosave drafts would fire on every keystroke and push draft
 * nav links onto production pages.
 */
export const revalidateHeader: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  const { _status } = doc as Header

  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating header')
    revalidateTag('global_header', 'max')
  }

  return doc
}
