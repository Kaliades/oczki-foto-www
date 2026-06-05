import { OfferServiceHero } from '@/components/OfferServiceHero'
import { OfferServiceApproach } from '@/components/OfferServiceApproach'
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
    </main>
  )
}
