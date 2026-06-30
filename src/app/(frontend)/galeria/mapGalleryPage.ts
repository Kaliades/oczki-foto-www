import type { GalleryCtaData } from '@/components/GalleryCta/constants'
import { galleryCtaDefaults } from '@/components/GalleryCta/constants'
import type { GalleryHeroData, GallerySessionFilterId } from '@/components/GalleryHero/constants'
import {
  GALLERY_SESSION_FILTERS,
  galleryHeroDefaults,
} from '@/components/GalleryHero/constants'
import type { HomeEaseData } from '@/components/HomeEase/constants'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import type { HomeFaqData } from '@/components/HomeFaq/constants'
import { homeFaqDefaults } from '@/components/HomeFaq/constants'
import { GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from '@/components/GalleryPortfolio/constants'
import type { GalleryPage } from '@/payload-types'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export type GalleryPageSettings = {
  hero: GalleryHeroData
  initialCount: number
  loadMoreBatchSize: number
  loadMoreLabel: string
  ease: HomeEaseData
  faq: HomeFaqData
  cta: GalleryCtaData
}

function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

export function mapGalleryPage(doc: GalleryPage | null | undefined): GalleryPageSettings {
  const d = galleryHeroDefaults
  const easeDefaults = homeEaseDefaults
  const faqDefaults = homeFaqDefaults
  const ctaDefaults = galleryCtaDefaults

  const cmsFilters = doc?.heroContent?.filters
  const filters =
    cmsFilters && cmsFilters.length > 0
      ? cmsFilters.flatMap((f) =>
          f.category && f.label
            ? [{ id: f.category as GallerySessionFilterId, label: f.label }]
            : [],
        )
      : d.filters

  const defaultFilterId =
    (doc?.heroContent?.defaultFilter as GallerySessionFilterId | null | undefined) ??
    d.defaultFilterId

  const safeDefaultFilter = filters.some((f) => f.id === defaultFilterId)
    ? defaultFilterId
    : (filters[0]?.id ?? GALLERY_SESSION_FILTERS[0].id)

  const cmsFaqItems = doc?.faqSection?.items?.filter((q) => q.question || q.answer) ?? []
  const faqItems =
    cmsFaqItems.length > 0
      ? cmsFaqItems.map((q, i) => ({
          id: pick(q.id, faqDefaults.items[i]?.id ?? `faq-${i}`),
          question: pick(q.question, faqDefaults.items[i]?.question ?? ''),
          answer: pick(q.answer, faqDefaults.items[i]?.answer ?? ''),
        }))
      : faqDefaults.items

  const easePhotoSrc = resolvePopulatedMediaUrl(doc?.easeSection?.photo)

  return {
    hero: {
      title: {
        lead: doc?.heroContent?.title?.lead ?? d.title.lead,
        emphasis: doc?.heroContent?.title?.emphasis ?? d.title.emphasis,
        trail: doc?.heroContent?.title?.trail ?? d.title.trail,
      },
      description: doc?.heroContent?.description ?? d.description,
      filters: filters.length > 0 ? filters : d.filters,
      defaultFilterId: safeDefaultFilter,
    },
    initialCount: doc?.portfolioSettings?.initialCount ?? 12,
    loadMoreBatchSize: doc?.portfolioSettings?.loadMoreBatchSize ?? 12,
    loadMoreLabel:
      doc?.portfolioSettings?.loadMoreLabel ?? GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
    ease: {
      heading: {
        start: pick(doc?.easeSection?.heading?.start, easeDefaults.heading.start),
        emphasis: pick(doc?.easeSection?.heading?.emphasis, easeDefaults.heading.emphasis),
      },
      body: pick(doc?.easeSection?.body, easeDefaults.body),
      tiltedPhoto: {
        src: easePhotoSrc ?? '',
        alt: pick(doc?.easeSection?.photoAlt, easeDefaults.tiltedPhoto.alt),
      },
      handwrittenQuote: easeDefaults.handwrittenQuote,
    },
    faq: {
      heading: {
        emphasis: pick(doc?.faqSection?.heading?.emphasis, faqDefaults.heading.emphasis),
        start: pick(doc?.faqSection?.heading?.start, faqDefaults.heading.start),
      },
      intro: pick(doc?.faqSection?.intro, faqDefaults.intro),
      items: faqItems,
    },
    cta: {
      heading: {
        start: pick(doc?.ctaSection?.heading?.start, ctaDefaults.heading.start),
        emphasis: pick(doc?.ctaSection?.heading?.emphasis, ctaDefaults.heading.emphasis),
        end: pick(doc?.ctaSection?.heading?.end, ctaDefaults.heading.end),
      },
      body: pick(doc?.ctaSection?.body, ctaDefaults.body),
      cta: {
        type: 'custom',
        url: pick(doc?.ctaSection?.button?.url, ctaDefaults.cta.url ?? '/kontakt'),
        label: pick(doc?.ctaSection?.button?.label, ctaDefaults.cta.label ?? 'Porozmawiajmy'),
        newTab: false,
      },
    },
  }
}
