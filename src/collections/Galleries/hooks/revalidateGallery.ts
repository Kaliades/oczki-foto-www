import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Gallery } from '../../../payload-types'

export const revalidateGallery: CollectionAfterChangeHook<Gallery> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published') {
    const path = `/galeria/${doc.slug}`
    payload.logger.info(`Revalidating gallery at path: ${path}`)
    revalidatePath(path)
    revalidatePath('/galeria')
  }

  if (previousDoc?._status === 'published' && doc._status !== 'published') {
    const oldPath = `/galeria/${previousDoc.slug}`
    payload.logger.info(`Revalidating unpublished gallery at path: ${oldPath}`)
    revalidatePath(oldPath)
    revalidatePath('/galeria')
  }

  return doc
}

export const revalidateGalleryDelete: CollectionAfterDeleteHook<Gallery> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    if (doc?.slug) revalidatePath(`/galeria/${doc.slug}`)
    revalidatePath('/galeria')
  }

  return doc
}
