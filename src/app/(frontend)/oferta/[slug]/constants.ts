import {
  offerServiceHeroSesjeKobieceDefaults,
  type OfferServiceHeroData,
} from '@/components/OfferServiceHero'
import {
  offerServiceApproachSesjeKobieceDefaults,
  type OfferServiceApproachData,
} from '@/components/OfferServiceApproach'
import {
  offerServiceCareSesjeKobieceDefaults,
  type OfferServiceCareData,
} from '@/components/OfferServiceCare'
import {
  offerServiceProcessStepsSesjeKobieceDefaults,
  type OfferServiceProcessStepsData,
} from '@/components/OfferServiceProcessSteps'
import {
  offerServiceTestimonialSesjeKobieceDefaults,
  type OfferServiceTestimonialData,
} from '@/components/OfferServiceTestimonial'
import {
  offerServiceInclusionsSesjeKobieceDefaults,
  type OfferServiceInclusionsData,
} from '@/components/OfferServiceInclusions'
import {
  offerServicePackagesSesjeKobieceDefaults,
  type OfferServicePackagesData,
} from '@/components/OfferServicePackages'
import {
  offerServiceClosingCtaSesjeKobieceDefaults,
  type OfferServiceClosingCtaData,
} from '@/components/OfferServiceClosingCta'
import {
  offerServiceFaqSesjeKobieceDefaults,
  type OfferServiceFaqData,
} from '@/components/OfferServiceFaq'
import {
  offerServiceGallerySesjeKobieceDefaults,
  type OfferServiceGalleryData,
} from '@/components/OfferServiceGallery'
export const OFFER_SERVICE_SLUGS = [
  'sesje-kobiece',
  'reportaze-slubne',
  'sesje-wizerunkowe',
  'sesje-rodzinne',
] as const

export type OfferServiceSlug = (typeof OFFER_SERVICE_SLUGS)[number]

export type OfferServicePageData = {
  slug: OfferServiceSlug
  approach: OfferServiceApproachData
  care: OfferServiceCareData
  closingCta: OfferServiceClosingCtaData
  faq: OfferServiceFaqData
  gallery: OfferServiceGalleryData
  hero: OfferServiceHeroData
  inclusions: OfferServiceInclusionsData
  packages: OfferServicePackagesData
  processSteps: OfferServiceProcessStepsData
  testimonial: OfferServiceTestimonialData
}

/** Builds a hero for a slug that has not yet received bespoke CMS content. */
function buildFallbackHero(title: string, label: string): OfferServiceHeroData {
  return {
    ...offerServiceHeroSesjeKobieceDefaults,
    title: `${title} | Oczki fotografia`,
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Oferta', href: '/oferta' },
      { label },
    ],
    heading: {
      ...offerServiceHeroSesjeKobieceDefaults.heading,
      emphasis: title,
    },
  }
}

const OFFER_SERVICE_PAGES: Record<OfferServiceSlug, OfferServicePageData> = {
  'sesje-kobiece': {
    slug: 'sesje-kobiece',
    hero: offerServiceHeroSesjeKobieceDefaults,
    approach: offerServiceApproachSesjeKobieceDefaults,
    care: offerServiceCareSesjeKobieceDefaults,
    closingCta: offerServiceClosingCtaSesjeKobieceDefaults,
    faq: offerServiceFaqSesjeKobieceDefaults,
    gallery: offerServiceGallerySesjeKobieceDefaults,
    processSteps: offerServiceProcessStepsSesjeKobieceDefaults,
    testimonial: offerServiceTestimonialSesjeKobieceDefaults,
    inclusions: offerServiceInclusionsSesjeKobieceDefaults,
    packages: offerServicePackagesSesjeKobieceDefaults,
  },
  'reportaze-slubne': {
    slug: 'reportaze-slubne',
    hero: buildFallbackHero('Reportaż ślubny', 'Reportaże ślubne'),
    approach: offerServiceApproachSesjeKobieceDefaults,
    care: offerServiceCareSesjeKobieceDefaults,
    closingCta: offerServiceClosingCtaSesjeKobieceDefaults,
    faq: offerServiceFaqSesjeKobieceDefaults,
    gallery: offerServiceGallerySesjeKobieceDefaults,
    processSteps: offerServiceProcessStepsSesjeKobieceDefaults,
    testimonial: offerServiceTestimonialSesjeKobieceDefaults,
    inclusions: offerServiceInclusionsSesjeKobieceDefaults,
    packages: offerServicePackagesSesjeKobieceDefaults,
  },
  'sesje-wizerunkowe': {
    slug: 'sesje-wizerunkowe',
    hero: buildFallbackHero('Sesja wizerunkowa', 'Sesje wizerunkowe'),
    approach: offerServiceApproachSesjeKobieceDefaults,
    care: offerServiceCareSesjeKobieceDefaults,
    closingCta: offerServiceClosingCtaSesjeKobieceDefaults,
    faq: offerServiceFaqSesjeKobieceDefaults,
    gallery: offerServiceGallerySesjeKobieceDefaults,
    processSteps: offerServiceProcessStepsSesjeKobieceDefaults,
    testimonial: offerServiceTestimonialSesjeKobieceDefaults,
    inclusions: offerServiceInclusionsSesjeKobieceDefaults,
    packages: offerServicePackagesSesjeKobieceDefaults,
  },
  'sesje-rodzinne': {
    slug: 'sesje-rodzinne',
    hero: buildFallbackHero('Sesja rodzinna', 'Sesje rodzinne'),
    approach: offerServiceApproachSesjeKobieceDefaults,
    care: offerServiceCareSesjeKobieceDefaults,
    closingCta: offerServiceClosingCtaSesjeKobieceDefaults,
    faq: offerServiceFaqSesjeKobieceDefaults,
    gallery: offerServiceGallerySesjeKobieceDefaults,
    processSteps: offerServiceProcessStepsSesjeKobieceDefaults,
    testimonial: offerServiceTestimonialSesjeKobieceDefaults,
    inclusions: offerServiceInclusionsSesjeKobieceDefaults,
    packages: offerServicePackagesSesjeKobieceDefaults,
  },
}

export function getOfferServiceBySlug(slug: string): OfferServicePageData | null {
  if (!(OFFER_SERVICE_SLUGS as readonly string[]).includes(slug)) {
    return null
  }
  return OFFER_SERVICE_PAGES[slug as OfferServiceSlug]
}
