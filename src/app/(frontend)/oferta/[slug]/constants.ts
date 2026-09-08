import {
  offerServiceHeroReportazeSlubneDefaults,
  offerServiceHeroSesjeKobieceDefaults,
  type OfferServiceHeroData,
} from '@/components/OfferServiceHero'
import {
  offerServiceApproachReportazeSlubneDefaults,
  offerServiceApproachSesjeKobieceDefaults,
  type OfferServiceApproachData,
} from '@/components/OfferServiceApproach'
import {
  offerServiceCareReportazeSlubneDefaults,
  offerServiceCareSesjeKobieceDefaults,
  type OfferServiceCareData,
} from '@/components/OfferServiceCare'
import {
  offerServiceDuoReportazeSlubneDefaults,
  type OfferServiceDuoData,
} from '@/components/OfferServiceDuo'
import {
  offerServiceProcessStepsReportazeSlubneDefaults,
  offerServiceProcessStepsSesjeKobieceDefaults,
  type OfferServiceProcessStepsData,
} from '@/components/OfferServiceProcessSteps'
import {
  offerServiceTestimonialReportazeSlubneDefaults,
  offerServiceTestimonialSesjeKobieceDefaults,
  type OfferServiceTestimonialData,
} from '@/components/OfferServiceTestimonial'
import {
  offerServiceInclusionsReportazeSlubneDefaults,
  offerServiceInclusionsSesjeKobieceDefaults,
  type OfferServiceInclusionsData,
} from '@/components/OfferServiceInclusions'
import {
  offerServicePackagesReportazeSlubneDefaults,
  offerServicePackagesSesjeKobieceDefaults,
  type OfferServicePackagesData,
} from '@/components/OfferServicePackages'
import {
  offerServiceClosingCtaReportazeSlubneDefaults,
  offerServiceClosingCtaSesjeKobieceDefaults,
  type OfferServiceClosingCtaData,
} from '@/components/OfferServiceClosingCta'
import {
  offerServiceFaqReportazeSlubneDefaults,
  offerServiceFaqSesjeKobieceDefaults,
  type OfferServiceFaqData,
} from '@/components/OfferServiceFaq'
import {
  offerServiceGalleryReportazeSlubneDefaults,
  offerServiceGallerySesjeKobieceDefaults,
  offerServiceGalleryStoriesReportazeSlubneDefaults,
  type OfferServiceGalleryData,
} from '@/components/OfferServiceGallery'
export const OFFER_SERVICE_SLUGS = [
  'sesje-kobiece',
  'reportaze-slubne',
  'sesje-wizerunkowe',
  'sesje-rodzinne',
  'sesje-milosne',
] as const

export type OfferServiceSlug = (typeof OFFER_SERVICE_SLUGS)[number]

export type OfferServicePageData = {
  slug: OfferServiceSlug
  approach: OfferServiceApproachData
  care: OfferServiceCareData
  closingCta: OfferServiceClosingCtaData
  /** Reportaż-only Asia & Łukasz section. */
  duo?: OfferServiceDuoData
  faq: OfferServiceFaqData
  gallery: OfferServiceGalleryData
  /**
   * Optional second gallery (stories rail) after process steps — reportaż only.
   * Does not replace `gallery` (mosaic) or ClosingCta/FAQ.
   */
  storiesGallery?: OfferServiceGalleryData
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
    hero: offerServiceHeroReportazeSlubneDefaults,
    approach: offerServiceApproachReportazeSlubneDefaults,
    care: offerServiceCareReportazeSlubneDefaults,
    duo: offerServiceDuoReportazeSlubneDefaults,
    closingCta: offerServiceClosingCtaReportazeSlubneDefaults,
    faq: offerServiceFaqReportazeSlubneDefaults,
    gallery: offerServiceGalleryReportazeSlubneDefaults,
    storiesGallery: offerServiceGalleryStoriesReportazeSlubneDefaults,
    processSteps: offerServiceProcessStepsReportazeSlubneDefaults,
    testimonial: offerServiceTestimonialReportazeSlubneDefaults,
    inclusions: offerServiceInclusionsReportazeSlubneDefaults,
    packages: offerServicePackagesReportazeSlubneDefaults,
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
  'sesje-milosne': {
    slug: 'sesje-milosne',
    hero: buildFallbackHero('Sesja miłosna', 'Sesje miłosne'),
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
