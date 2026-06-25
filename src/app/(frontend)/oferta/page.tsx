import { OczkiBreadcrumbContainer, OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import { HomeOfferShowcase } from '@/components/HomeOfferShowcase/HomeOfferShowcase'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'
import type { HomeOfferData } from '@/components/HomeOfferShowcase/constants'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

const OFFER_META_DESCRIPTION =
  'Sesje kobiece, reportaże ślubne, sesje wizerunkowe, rodzinne i miłosne — naturalna fotografia w Krakowie i okolicach.'

export const metadata: Metadata = {
  title: 'Oferta | Oczki fotografia',
  description: OFFER_META_DESCRIPTION,
  openGraph: mergeOpenGraph({
    title: 'Oferta | Oczki fotografia',
    description: OFFER_META_DESCRIPTION,
    url: '/oferta',
  }),
}

const BREADCRUMBS: readonly OczkiBreadcrumbItemData[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Oferta' },
] as const

function mediaUrl(media: unknown): string | null {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: unknown }).url
    if (typeof url === 'string') return url
  }
  return null
}

/**
 * Fetches published offer items from Payload and maps them to the
 * `HomeOfferShowcase` card format. Each card includes an `href` so it links
 * to the corresponding detail page at `/oferta/[slug]`.
 *
 * Falls back gracefully to code-side defaults when the database is empty or
 * unavailable at build time (note: fallback cards have no href).
 */
async function getOfferData(): Promise<HomeOfferData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'offerItems',
      draft: false,
      depth: 1,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: 'publishedAt',
    })

    const items = result.docs
      .map((doc) => {
        const imageSrc = mediaUrl(doc.image)
        if (!imageSrc || !doc.slug) return null
        return {
          title: doc.title,
          description: doc.shortDescription ?? '',
          imageSrc,
          imageAlt: doc.imageAlt ?? doc.title,
          cropClassName: doc.imageCropClassName ?? undefined,
          href: `/oferta/${doc.slug}`,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    if (items.length === 0) return homeOfferDefaults

    return {
      ...homeOfferDefaults,
      items,
    }
  } catch {
    return homeOfferDefaults
  }
}

export default async function OfertaPage() {
  const offerData = await getOfferData()

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <HomeOfferShowcase data={{ ...offerData, showFooterNotch: false }} />
      <SiteFooterNewsletter variant="offer-service" />
    </main>
  )
}
