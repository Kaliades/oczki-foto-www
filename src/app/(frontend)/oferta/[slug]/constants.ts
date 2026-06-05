import {
  offerServiceHeroSesjeKobieceDefaults,
  type OfferServiceHeroData,
} from '@/components/OfferServiceHero'
import {
  offerServiceApproachSesjeKobieceDefaults,
  type OfferServiceApproachData,
} from '@/components/OfferServiceApproach'
import {
  offerServiceInclusionsSesjeKobieceDefaults,
  type OfferServiceInclusionsData,
} from '@/components/OfferServiceInclusions'
import {
  offerServicePackagesSesjeKobieceDefaults,
  type OfferServicePackagesData,
} from '@/components/OfferServicePackages'
export const OFFER_SERVICE_SLUGS = ['sesje-kobiece'] as const

export type OfferServiceSlug = (typeof OFFER_SERVICE_SLUGS)[number]

export type OfferServicePageData = {
  slug: OfferServiceSlug
  approach: OfferServiceApproachData
  hero: OfferServiceHeroData
  inclusions: OfferServiceInclusionsData
  packages: OfferServicePackagesData
}

const OFFER_SERVICE_PAGES: Record<OfferServiceSlug, OfferServicePageData> = {
  'sesje-kobiece': {
    slug: 'sesje-kobiece',
    approach: offerServiceApproachSesjeKobieceDefaults,
    hero: offerServiceHeroSesjeKobieceDefaults,
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
