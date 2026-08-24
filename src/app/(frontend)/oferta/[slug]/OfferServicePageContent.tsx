import { OfferServiceApproach } from '@/components/OfferServiceApproach'
import { OfferServiceCare } from '@/components/OfferServiceCare'
import { OfferServiceClosingCta } from '@/components/OfferServiceClosingCta'
import { OfferServiceFaq } from '@/components/OfferServiceFaq'
import { OfferServiceGallery } from '@/components/OfferServiceGallery'
import { OfferServiceProcessSteps } from '@/components/OfferServiceProcessSteps'
import { OfferServiceTestimonial } from '@/components/OfferServiceTestimonial'
import { OfferServiceHero } from '@/components/OfferServiceHero'
import { OfferServiceInclusions } from '@/components/OfferServiceInclusions'
import { OfferServicePackages } from '@/components/OfferServicePackages'

import type { OfferServicePageData } from './constants'

type OfferServicePageContentProps = {
  data: OfferServicePageData
}

/**
 * Offer detail sections only — footer stays on the server page so live preview
 * (a Client Component) never imports `getGlobals` / `next/headers`.
 */
export function OfferServicePageContent({ data }: OfferServicePageContentProps) {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OfferServiceHero data={data.hero} />
      <OfferServiceApproach data={data.approach} />
      <OfferServicePackages data={data.packages} />
      <OfferServiceInclusions data={data.inclusions} />
      <OfferServiceCare data={data.care} />
      <OfferServiceTestimonial data={data.testimonial} />
      <OfferServiceProcessSteps data={data.processSteps} />
      <OfferServiceGallery data={data.gallery} />
      <OfferServiceClosingCta data={data.closingCta} />
      <OfferServiceFaq data={data.faq} />
    </main>
  )
}
