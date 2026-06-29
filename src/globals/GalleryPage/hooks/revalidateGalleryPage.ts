import type { GlobalAfterChangeHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { GalleryPage } from '@/payload-types'

export const revalidateGalleryPage: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  const { _status } = doc as GalleryPage
  if (!context.disableRevalidate && _status === 'published') {
    payload.logger.info('Revalidating /galeria')
    revalidatePath('/galeria')
  }
  return doc
}
