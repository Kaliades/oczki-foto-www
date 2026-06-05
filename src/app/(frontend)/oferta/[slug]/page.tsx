import { OfferServiceApproach } from '@/components/OfferServiceApproach'
import { OfferServiceCare } from '@/components/OfferServiceCare'
import { OfferServiceClosingCta } from '@/components/OfferServiceClosingCta'
import { OfferServiceFaq } from '@/components/OfferServiceFaq'
import { OfferServiceFooterNewsletter } from '@/components/OfferServiceFooterNewsletter'
import { OfferServiceGallery } from '@/components/OfferServiceGallery'
import { OfferServiceProcessSteps } from '@/components/OfferServiceProcessSteps'
import { OfferServiceTestimonial } from '@/components/OfferServiceTestimonial'
import { OfferServiceHero } from '@/components/OfferServiceHero'
import { OfferServiceInclusions } from '@/components/OfferServiceInclusions'
import { OfferServicePackages } from '@/components/OfferServicePackages'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { OFFER_SERVICE_SLUGS, getOfferServiceBySlug } from './constants'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return OFFER_SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const offerService = getOfferServiceBySlug(decodeURIComponent(slug))

  if (!offerService) {
    return { title: 'Oferta | Oczki fotografia' }
  }

  return {
    title: offerService.hero.title,
  }
}

export default async function OfferServicePage({ params }: Args) {
  const { slug } = await params
  const offerService = getOfferServiceBySlug(decodeURIComponent(slug))

  if (!offerService) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
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
      <OfferServiceFooterNewsletter />
    </main>
  )
}
