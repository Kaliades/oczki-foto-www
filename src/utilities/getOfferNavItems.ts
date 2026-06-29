import { OFFER_SERVICE_SLUGS } from '@/app/(frontend)/oferta/[slug]/constants'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type OfferNavItem = {
  href: string
  label: string
}

/** Code-side fallback when CMS offer items are unavailable. */
export const OCZKI_OFFER_NAV_ITEMS: readonly OfferNavItem[] = homeOfferDefaults.items
  .slice(0, OFFER_SERVICE_SLUGS.length)
  .map((item, index) => ({
    label: item.title,
    href: `/oferta/${OFFER_SERVICE_SLUGS[index]}`,
  }))

/**
 * Published offer items mapped to navbar dropdown links (`/oferta/[slug]`).
 */
export async function getOfferNavItems(): Promise<readonly OfferNavItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'offerItems',
      draft: false,
      depth: 0,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: 'publishedAt',
    })

    const items = result.docs.flatMap((doc) => {
      if (!doc.slug || !doc.title) return []
      return [{ href: `/oferta/${doc.slug}`, label: doc.title }]
    })

    return items.length > 0 ? items : OCZKI_OFFER_NAV_ITEMS
  } catch {
    return OCZKI_OFFER_NAV_ITEMS
  }
}
