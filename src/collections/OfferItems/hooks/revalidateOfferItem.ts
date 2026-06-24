import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { OfferItem } from '../../../payload-types'

/**
 * Offer items are embedded on the home page through the `offerShowcase` block
 * AND render their own detail page at `/oferta/[slug]` plus the `/oferta`
 * listing. Any change to a published offer must invalidate all three.
 */
export const revalidateOfferItem: CollectionAfterChangeHook<OfferItem> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (context.disableRevalidate) return doc

  if (doc._status === 'published' || previousDoc?._status === 'published') {
    payload.logger.info(`Revalidating offer item: ${doc.slug ?? doc.id}`)
    revalidatePath('/')
    revalidatePath('/oferta')
    if (doc.slug) revalidatePath(`/oferta/${doc.slug}`)
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(`/oferta/${previousDoc.slug}`)
    }
  }

  return doc
}

export const revalidateOfferItemDelete: CollectionAfterDeleteHook<OfferItem> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    revalidatePath('/')
    revalidatePath('/oferta')
    if (doc?.slug) revalidatePath(`/oferta/${doc.slug}`)
  }

  return doc
}
