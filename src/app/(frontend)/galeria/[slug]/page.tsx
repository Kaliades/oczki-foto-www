import { CaseStudyClosingCta } from '@/components/CaseStudyClosingCta'
import { CaseStudyDetails } from '@/components/CaseStudyDetails'
import { CaseStudyDuoPerspective } from '@/components/CaseStudyDuoPerspective'
import { CaseStudyHero } from '@/components/CaseStudyHero'
import { CaseStudyMemorableMoment } from '@/components/CaseStudyMemorableMoment'
import { CaseStudyPhotoGallery } from '@/components/CaseStudyPhotoGallery'
import { CaseStudyRelatedStories } from '@/components/CaseStudyRelatedStories'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import { CaseStudyTestimonial } from '@/components/CaseStudyTestimonial'
import { CaseStudyVenueStory } from '@/components/CaseStudyVenueStory'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'

import { getImageURL } from '@/utilities/generateMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import type { Gallery } from '@/payload-types'

import { CASE_STUDY_SLUGS, getCaseStudyBySlug } from './constants'
import { mapGallery } from './mapGallery'

type Args = {
  params: Promise<{
    slug: string
  }>
}

/**
 * Static params are the union of slugs in Payload and the code-side fallback
 * slugs. The Payload query is wrapped defensively so a missing database at
 * build-planning time falls back to code slugs instead of failing the build.
 */
export async function generateStaticParams() {
  const slugs = new Set<string>(CASE_STUDY_SLUGS)

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'galleries',
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

const queryGalleryBySlug = cache(async ({ slug }: { slug: string }): Promise<Gallery | null> => {
  const { isEnabled: draft } = await draftMode()

  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'galleries',
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
  const doc = await queryGalleryBySlug({ slug: decodedSlug })

  if (doc) {
    const title = doc.meta?.title || `${doc.title} | Oczki fotografia`
    const description = doc.meta?.description || doc.intro || undefined

    return {
      title,
      description,
      openGraph: mergeOpenGraph({
        title,
        description: description ?? '',
        url: `/galeria/${decodedSlug}`,
        images: [{ url: getImageURL(doc.coverImage) }],
      }),
    }
  }

  const caseStudy = getCaseStudyBySlug(decodedSlug)
  return {
    title: caseStudy ? `${caseStudy.hero.title} | Oczki fotografia` : 'Galeria | Oczki fotografia',
  }
}

export default async function CaseStudyPage({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await params
  const decodedSlug = decodeURIComponent(slug)

  const doc = await queryGalleryBySlug({ slug: decodedSlug })
  const caseStudy = doc ? mapGallery(doc) : getCaseStudyBySlug(decodedSlug)

  if (!caseStudy) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
      <CaseStudyHero data={caseStudy.hero} />
      <CaseStudyDetails data={caseStudy.details} />
      <CaseStudyDuoPerspective data={caseStudy.duoPerspective} />
      <CaseStudyVenueStory data={caseStudy.venueStory} />
      <CaseStudyPhotoGallery data={caseStudy.photoGallery} />
      <CaseStudyTestimonial data={caseStudy.testimonial} />
      <CaseStudyMemorableMoment data={caseStudy.memorableMoment} />
      <CaseStudyClosingCta data={caseStudy.closingCta} />
      <CaseStudyRelatedStories data={caseStudy.relatedStories} />
      <SiteFooterNewsletter variant="home" />
    </main>
  )
}
