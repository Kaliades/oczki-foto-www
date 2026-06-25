import { OfferServiceApproach } from '@/components/OfferServiceApproach'
import { OfferServiceCare } from '@/components/OfferServiceCare'
import { OfferServiceClosingCta } from '@/components/OfferServiceClosingCta'
import { OfferServiceFaq } from '@/components/OfferServiceFaq'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import { OfferServiceGallery } from '@/components/OfferServiceGallery'
import { OfferServiceProcessSteps } from '@/components/OfferServiceProcessSteps'
import { OfferServiceTestimonial } from '@/components/OfferServiceTestimonial'
import { OfferServiceHero } from '@/components/OfferServiceHero'
import { OfferServiceInclusions } from '@/components/OfferServiceInclusions'
import { OfferServicePackages } from '@/components/OfferServicePackages'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'

import type { OfferItem } from '@/payload-types'

import { getImageURL } from '@/utilities/generateMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { OFFER_SERVICE_SLUGS, getOfferServiceBySlug } from './constants'
import { mapOfferItem } from './mapOfferItem'

type Args = {
  params: Promise<{
    slug: string
  }>
}

/**
 * Static params are the union of slugs that already exist in Payload and the
 * code-side fallback slugs (offers not yet migrated to the CMS). The Payload
 * query is wrapped defensively so a missing database at build-planning time
 * falls back to code slugs instead of failing the build.
 */
export async function generateStaticParams() {
  const slugs = new Set<string>(OFFER_SERVICE_SLUGS)

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'offerItems',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: { slug: true },
    })
    for (const doc of result.docs) {
      if (doc.slug) slugs.add(doc.slug)
    }
  } catch {
    // Database unavailable — fall back to the code-side slug list.
  }

  return Array.from(slugs).map((slug) => ({ slug }))
}

const queryOfferBySlug = cache(async ({ slug }: { slug: string }): Promise<OfferItem | null> => {
  const { isEnabled: draft } = await draftMode()

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'offerItems',
      draft,
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
})

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)
  const doc = await queryOfferBySlug({ slug: decodedSlug })

  if (doc) {
    const title = doc.meta?.title || `${doc.title} | Oczki fotografia`
    const description = doc.meta?.description || doc.shortDescription || undefined

    return {
      title,
      description,
      // The card image is always populated, unlike hero.image which requires
      // detail-page content to be fully seeded.
      openGraph: mergeOpenGraph({
        title,
        description: description ?? '',
        url: `/oferta/${decodedSlug}`,
        images: [{ url: getImageURL(doc.image) }],
      }),
    }
  }

  const offerService = getOfferServiceBySlug(decodedSlug)
  return { title: offerService?.hero.title ?? 'Oferta | Oczki fotografia' }
}

export default async function OfferServicePage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const doc = await queryOfferBySlug({ slug: decodedSlug })
  const offerService = doc ? mapOfferItem(doc) : getOfferServiceBySlug(decodedSlug)

  if (!offerService) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
      <OfferServiceHero data={offerService.hero} />
      <OfferServiceApproach data={offerService.approach} />
      <OfferServicePackages data={offerService.packages} />
      <OfferServiceInclusions data={offerService.inclusions} />
      <OfferServiceCare data={offerService.care} />
      <OfferServiceTestimonial data={offerService.testimonial} />
      <OfferServiceProcessSteps data={offerService.processSteps} />
      <OfferServiceGallery data={offerService.gallery} />
      <OfferServiceClosingCta data={offerService.closingCta} />
      <OfferServiceFaq data={offerService.faq} />
      <SiteFooterNewsletter variant="offer-service" />
    </main>
  )
}
