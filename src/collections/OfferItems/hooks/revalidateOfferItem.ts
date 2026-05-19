import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { OfferItem } from '../../../payload-types'

/**
 * Offer items are not rendered by their own page yet, but they ARE embedded
 * on the home page through the `offerShowcase` block. Any change to a
 * referenced offer item must invalidate that page.
 */
export const revalidateOfferItem: CollectionAfterChangeHook<OfferItem> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    payload.logger.info(`Revalidating home page due to offer item change: ${doc.slug ?? doc.id}`)
    revalidatePath('/')
  }

  return doc
}

export const revalidateOfferItemDelete: CollectionAfterDeleteHook<OfferItem> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
  }

  return doc
}
