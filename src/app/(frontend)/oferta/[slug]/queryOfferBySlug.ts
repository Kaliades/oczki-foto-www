import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'
import { cache } from 'react'

import type { OfferItem } from '@/payload-types'

import { OFFER_QUERY_DEPTH } from './offerQueryConstants'

export { OFFER_QUERY_DEPTH } from './offerQueryConstants'

async function fetchOfferBySlug(slug: string, draft: boolean): Promise<OfferItem | null> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'offerItems',
      draft,
      depth: OFFER_QUERY_DEPTH,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: { equals: slug },
      },
    })
    return result.docs?.[0] ?? null
  } catch {
    return null
  }
}

const queryPublishedOfferBySlug = cache(async (slug: string): Promise<OfferItem | null> => {
  return fetchOfferBySlug(slug, false)
})

export async function queryOfferBySlug({ slug }: { slug: string }): Promise<OfferItem | null> {
  const { isEnabled: draft } = await draftMode()

  if (draft) {
    noStore()
    return fetchOfferBySlug(slug, true)
  }

  return queryPublishedOfferBySlug(slug)
}
