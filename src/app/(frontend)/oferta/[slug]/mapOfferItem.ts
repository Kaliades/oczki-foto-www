import type { OfferItem } from '@/payload-types'

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
  offerServicePackagesReportazeSlubneDefaults,
  offerServicePackagesSesjeKobieceDefaults,
  type OfferServicePackagesData,
} from '@/components/OfferServicePackages'
import {
  offerServiceInclusionsReportazeSlubneDefaults,
  offerServiceInclusionsSesjeKobieceDefaults,
  type OfferServiceInclusionsData,
} from '@/components/OfferServiceInclusions'
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
  offerServiceTestimonialReportazeSlubneDefaults,
  offerServiceTestimonialSesjeKobieceDefaults,
  type OfferServiceTestimonialData,
} from '@/components/OfferServiceTestimonial'
import {
  offerServiceProcessStepsReportazeSlubneDefaults,
  offerServiceProcessStepsSesjeKobieceDefaults,
  type OfferServiceProcessStepsData,
} from '@/components/OfferServiceProcessSteps'
import {
  offerServiceGalleryReportazeSlubneDefaults,
  offerServiceGallerySesjeKobieceDefaults,
  offerServiceGalleryStoriesReportazeSlubneDefaults,
  type OfferServiceGalleryData,
} from '@/components/OfferServiceGallery'
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

import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

import type { OfferServicePageData, OfferServiceSlug } from './constants'

/**
 * Maps a Payload `OfferItem` document onto the `OfferServicePageData` shape the
 * section components already expect.
 *
 * Principle (see `docs/CMS-INSTRUKCJA.md` §7): the section *defaults* are the
 * technical skeleton (Figma nodes, layout flags, crop classes, decoration
 * sources, fixed orderings). CMS content is overlaid on top. Any field or whole
 * section left blank in the panel falls back to the default, so partial content
 * never breaks the page.
 *
 * Content images come from CMS only — no `/figma/` PNG fallbacks.
 */

/** Returns a non-empty CMS value, otherwise the code-side fallback. */
function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

const HERO_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceHeroData>> = {
  'sesje-kobiece': offerServiceHeroSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceHeroReportazeSlubneDefaults,
}

const APPROACH_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceApproachData>> = {
  'sesje-kobiece': offerServiceApproachSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceApproachReportazeSlubneDefaults,
}

const PACKAGES_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServicePackagesData>> = {
  'sesje-kobiece': offerServicePackagesSesjeKobieceDefaults,
  'reportaze-slubne': offerServicePackagesReportazeSlubneDefaults,
}

const INCLUSIONS_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceInclusionsData>> = {
  'sesje-kobiece': offerServiceInclusionsSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceInclusionsReportazeSlubneDefaults,
}

const DUO_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceDuoData>> = {
  'reportaze-slubne': offerServiceDuoReportazeSlubneDefaults,
}

const STORIES_GALLERY_DEFAULTS_BY_SLUG: Partial<
  Record<OfferServiceSlug, OfferServiceGalleryData>
> = {
  'reportaze-slubne': offerServiceGalleryStoriesReportazeSlubneDefaults,
}

const CLOSING_CTA_DEFAULTS_BY_SLUG: Partial<
  Record<OfferServiceSlug, OfferServiceClosingCtaData>
> = {
  'sesje-kobiece': offerServiceClosingCtaSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceClosingCtaReportazeSlubneDefaults,
}

const CARE_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceCareData>> = {
  'sesje-kobiece': offerServiceCareSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceCareReportazeSlubneDefaults,
}

const TESTIMONIAL_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceTestimonialData>> = {
  'sesje-kobiece': offerServiceTestimonialSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceTestimonialReportazeSlubneDefaults,
}

const GALLERY_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceGalleryData>> = {
  'sesje-kobiece': offerServiceGallerySesjeKobieceDefaults,
  'reportaze-slubne': offerServiceGalleryReportazeSlubneDefaults,
}

const PROCESS_STEPS_DEFAULTS_BY_SLUG: Partial<
  Record<OfferServiceSlug, OfferServiceProcessStepsData>
> = {
  'sesje-kobiece': offerServiceProcessStepsSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceProcessStepsReportazeSlubneDefaults,
}

const FAQ_DEFAULTS_BY_SLUG: Partial<Record<OfferServiceSlug, OfferServiceFaqData>> = {
  'sesje-kobiece': offerServiceFaqSesjeKobieceDefaults,
  'reportaze-slubne': offerServiceFaqReportazeSlubneDefaults,
}

function resolveHeroDefaults(slug: string): OfferServiceHeroData {
  return HERO_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ?? offerServiceHeroSesjeKobieceDefaults
}

function resolveApproachDefaults(slug: string): OfferServiceApproachData {
  return (
    APPROACH_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ?? offerServiceApproachSesjeKobieceDefaults
  )
}

function resolvePackagesDefaults(slug: string): OfferServicePackagesData {
  return (
    PACKAGES_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ?? offerServicePackagesSesjeKobieceDefaults
  )
}

function resolveInclusionsDefaults(slug: string): OfferServiceInclusionsData {
  return (
    INCLUSIONS_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ??
    offerServiceInclusionsSesjeKobieceDefaults
  )
}

/** Code defaults only until a Payload `duo` group is wired (CMS-ready shape). */
function resolveDuoDefaults(slug: string): OfferServiceDuoData | undefined {
  return DUO_DEFAULTS_BY_SLUG[slug as OfferServiceSlug]
}

/** Code defaults only — second stories rail after process steps (reportaż). */
function resolveStoriesGalleryDefaults(slug: string): OfferServiceGalleryData | undefined {
  return STORIES_GALLERY_DEFAULTS_BY_SLUG[slug as OfferServiceSlug]
}

function resolveClosingCtaDefaults(slug: string): OfferServiceClosingCtaData {
  return (
    CLOSING_CTA_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ??
    offerServiceClosingCtaSesjeKobieceDefaults
  )
}

function resolveCareDefaults(slug: string): OfferServiceCareData {
  return CARE_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ?? offerServiceCareSesjeKobieceDefaults
}

function resolveTestimonialDefaults(slug: string): OfferServiceTestimonialData {
  return (
    TESTIMONIAL_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ??
    offerServiceTestimonialSesjeKobieceDefaults
  )
}

function resolveGalleryDefaults(slug: string): OfferServiceGalleryData {
  return (
    GALLERY_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ??
    offerServiceGallerySesjeKobieceDefaults
  )
}

function resolveProcessStepsDefaults(slug: string): OfferServiceProcessStepsData {
  return (
    PROCESS_STEPS_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ??
    offerServiceProcessStepsSesjeKobieceDefaults
  )
}

function resolveFaqDefaults(slug: string): OfferServiceFaqData {
  return FAQ_DEFAULTS_BY_SLUG[slug as OfferServiceSlug] ?? offerServiceFaqSesjeKobieceDefaults
}

function mapHero(doc: OfferItem): OfferServiceHeroData {
  const d = resolveHeroDefaults(doc.slug)
  const cms = doc.hero
  const breadcrumbCurrent =
    d.breadcrumbs[d.breadcrumbs.length - 1]?.label ?? doc.title
  return {
    title: `${doc.title} | Oczki fotografia`,
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Oferta', href: '/oferta' },
      { label: breadcrumbCurrent },
    ],
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      // Prefer CMS emphasis, then slug-specific defaults, then the offer title
      // so seeded/blank heroes still show the real service name in the H1.
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis || doc.title),
    },
    description: pick(cms?.description, d.description),
    cta: {
      href: pick(cms?.cta?.url, d.cta.href),
      label: pick(cms?.cta?.label, d.cta.label),
    },
    image: {
      src: resolvePopulatedMediaUrl(cms?.image) ?? '',
      alt: pick(cms?.imageAlt, d.image.alt),
    },
  }
}

function mapApproach(doc: OfferItem): OfferServiceApproachData {
  const d = resolveApproachDefaults(doc.slug)
  const cms = doc.approach
  const blocks = d.blocks.map((def, i) => {
    const row = cms?.blocks?.[i]
    return row
      ? { ...def, title: pick(row.title, def.title), description: pick(row.description, def.description) }
      : def
  }) as unknown as OfferServiceApproachData['blocks']

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    introParagraphs: [
      pick(cms?.introParagraph1, d.introParagraphs[0]),
      pick(cms?.introParagraph2, d.introParagraphs[1]),
    ],
    blocks,
    portrait: {
      src: resolvePopulatedMediaUrl(cms?.portraitImage) ?? '',
      alt: pick(cms?.portraitAlt, d.portrait.alt),
    },
  }
}

function mapPackages(doc: OfferItem): OfferServicePackagesData {
  const d = resolvePackagesDefaults(doc.slug)
  const cms = doc.packages
  const packages = d.packages.map((def, i) => {
    const row = cms?.items?.[i]
    if (!row) return def
    const cmsImageSrc = resolvePopulatedMediaUrl(row.image)
    return {
      image: {
        alt: pick(row.imageAlt, def.image.alt),
        src: cmsImageSrc ?? '',
        position: cmsImageSrc ? undefined : def.image.position,
      },
      panel: {
        ...def.panel,
        title: pick(row.title, def.panel.title),
        // Empty string from CMS must hide the line (do not fall back via `pick`).
        description: row.description ?? def.panel.description,
        price: row.price ?? def.panel.price,
        badgeLabel: row.badgeLabel ?? def.panel.badgeLabel,
        features:
          row.features && row.features.length > 0
            ? row.features.map((f) => f.text)
            : def.panel.features,
      },
    }
  })

  return {
    catalogDownload: {
      ...d.catalogDownload,
      label: pick(cms?.catalogDownload?.label, d.catalogDownload.label),
      url: pick(cms?.catalogDownload?.url, d.catalogDownload.url),
    },
    heading: d.heading,
    packages,
  }
}

function mapInclusions(doc: OfferItem): OfferServiceInclusionsData {
  const d = resolveInclusionsDefaults(doc.slug)
  const cms = doc.inclusions

  const checklist = (
    cms?.checklist && cms.checklist.length > 0
      ? cms.checklist.map((row, i) => {
          const def = d.checklist[i]
          return {
            ...(def ?? {}),
            id: def?.id ?? `inclusion-${i + 1}`,
            title: pick(row.title, def?.title ?? ''),
            description: pick(row.description, def?.description ?? ''),
          }
        })
      : d.checklist
  ) as OfferServiceInclusionsData['checklist']

  const accordionItems = (
    cms?.accordion && cms.accordion.length > 0
      ? cms.accordion.map((row, i) => {
          const def = d.accordion.items[i]
          return {
            id: def?.id ?? `inclusion-info-${i + 1}`,
            title: pick(row.title, def?.title ?? ''),
            body: pick(row.body, def?.body ?? ''),
          }
        })
      : d.accordion.items
  ) as OfferServiceInclusionsData['accordion']['items']

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    intro: pick(cms?.intro, d.intro),
    checklist,
    accordion: {
      heading: pick(cms?.accordionHeading, d.accordion.heading),
      items: accordionItems,
    },
    images: {
      mainAlt: pick(cms?.mainImageAlt, d.images.mainAlt),
      scallopAlt: pick(cms?.scallopImageAlt, d.images.scallopAlt),
      mainPhotoSrc: resolvePopulatedMediaUrl(cms?.mainImage) ?? '',
      scallopPhotoSrc: resolvePopulatedMediaUrl(cms?.scallopImage) ?? '',
    },
  }
}

function mapCare(doc: OfferItem): OfferServiceCareData {
  const d = resolveCareDefaults(doc.slug)
  const cms = doc.care

  const features = (
    cms?.features && cms.features.length > 0
      ? cms.features.map((row, i) => {
          const def = d.features[i]
          return {
            ...(def ?? {}),
            title: pick(row.title, def?.title ?? ''),
            description: pick(row.description, def?.description ?? ''),
          }
        })
      : d.features
  ) as OfferServiceCareData['features']

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    intro: pick(cms?.intro, d.intro),
    features,
    image: {
      src: resolvePopulatedMediaUrl(cms?.image) ?? '',
      alt: pick(cms?.imageAlt, d.image.alt),
    },
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
  }
}

function mapTestimonial(doc: OfferItem): OfferServiceTestimonialData {
  const d = resolveTestimonialDefaults(doc.slug)
  const cms = doc.testimonial

  const items =
    cms?.items && cms.items.length > 0
      ? cms.items.map((row, i) => {
          const def = d.items[i]
          return {
            quote: pick(row.quote, def?.quote ?? ''),
            author: pick(row.author, def?.author ?? ''),
            photoSrc: resolvePopulatedMediaUrl(row.photo) ?? '',
            photoAlt: pick(row.photoAlt, def?.photoAlt ?? ''),
          }
        })
      : d.items

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    items,
    showPolaroid: d.showPolaroid,
  }
}

function mapProcessSteps(doc: OfferItem): OfferServiceProcessStepsData {
  const d = resolveProcessStepsDefaults(doc.slug)
  const cms = doc.processSteps

  const items =
    cms?.items && cms.items.length > 0
      ? cms.items.map((row, i) => {
          const def = d.items[i]
          return {
            number: def?.number ?? i + 1,
            title: pick(row.title, def?.title ?? ''),
            paragraphs:
              row.paragraphs && row.paragraphs.length > 0
                ? row.paragraphs.map((p) => p.text)
                : (def?.paragraphs ?? []),
          }
        })
      : d.items

  return {
    heading: {
      plain: pick(cms?.heading?.plain, d.heading.plain),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    intro: pick(cms?.intro, d.intro),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
    items,
  }
}

function mapGallery(doc: OfferItem): OfferServiceGalleryData {
  const d = resolveGalleryDefaults(doc.slug)
  const cms = doc.gallery

  const cmsItems = (cms?.items ?? []).flatMap((row, i) => {
    const imageSrc = resolvePopulatedMediaUrl(row.image)
    if (!imageSrc) return []

    const def = d.items[i]
    return [
      {
        imageSrc,
        imageAlt: pick(row.imageAlt, def?.imageAlt ?? ''),
        cropClassName: def?.cropClassName,
        caption: {
          title: pick(row.captionTitle, def?.caption?.title ?? ''),
          subtitle: pick(row.captionSubtitle, def?.caption?.subtitle ?? ''),
        },
      },
    ]
  }) as OfferServiceGalleryData['items']

  return {
    layout: d.layout,
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: cms?.heading?.emphasis ?? d.heading.emphasis,
      end: pick(cms?.heading?.end, d.heading.end ?? ''),
    },
    description: pick(cms?.description, d.description),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
    items: cmsItems.length > 0 ? cmsItems : d.items,
  }
}

function mapStoriesGallery(doc: OfferItem): OfferServiceGalleryData | undefined {
  const d = resolveStoriesGalleryDefaults(doc.slug)
  const cms = doc.storiesGallery

  if (!d && !(cms?.items && cms.items.length > 0)) return undefined

  const defaults = d ?? offerServiceGalleryStoriesReportazeSlubneDefaults

  const cmsItems = (cms?.items ?? []).flatMap((row, i) => {
    const imageSrc = resolvePopulatedMediaUrl(row.image)
    if (!imageSrc) return []

    const def = defaults.items[i]
    return [
      {
        imageSrc,
        imageAlt: pick(row.imageAlt, def?.imageAlt ?? ''),
        cropClassName: def?.cropClassName,
        caption: {
          title: pick(row.captionTitle, def?.caption?.title ?? ''),
          subtitle: pick(row.captionSubtitle, def?.caption?.subtitle ?? ''),
        },
      },
    ]
  }) as OfferServiceGalleryData['items']

  if (cmsItems.length === 0 && !d) return undefined

  return {
    layout: defaults.layout,
    heading: {
      start: pick(cms?.heading?.start, defaults.heading.start),
      emphasis: cms?.heading?.emphasis ?? defaults.heading.emphasis,
      end: defaults.heading.end,
    },
    description: pick(cms?.description, defaults.description),
    cta: {
      ...defaults.cta,
      label: pick(cms?.cta?.label, defaults.cta.label),
      url: pick(cms?.cta?.url, defaults.cta.url),
    },
    items: cmsItems.length > 0 ? cmsItems : defaults.items,
  }
}

function mapClosingCta(doc: OfferItem): OfferServiceClosingCtaData {
  const d = resolveClosingCtaDefaults(doc.slug)
  const cms = doc.closingCta
  return {
    heading: pick(cms?.heading, d.heading),
    body: pick(cms?.body, d.body),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
    textureSrc: d.textureSrc,
  }
}

function mapFaq(doc: OfferItem): OfferServiceFaqData {
  const d = resolveFaqDefaults(doc.slug)
  const cms = doc.faq

  const items =
    cms?.items && cms.items.length > 0
      ? cms.items.map((row, i) => {
          const def = d.items[i]
          return {
            id: def?.id ?? `faq-${i + 1}`,
            question: pick(row.question, def?.question ?? ''),
            answer: pick(row.answer, def?.answer ?? ''),
          }
        })
      : d.items

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    intro: pick(cms?.intro, d.intro),
    items,
  }
}

export function mapOfferItem(doc: OfferItem): OfferServicePageData {
  return {
    slug: doc.slug as OfferServicePageData['slug'],
    hero: mapHero(doc),
    approach: mapApproach(doc),
    packages: mapPackages(doc),
    inclusions: mapInclusions(doc),
    care: mapCare(doc),
    duo: resolveDuoDefaults(doc.slug),
    testimonial: mapTestimonial(doc),
    processSteps: mapProcessSteps(doc),
    gallery: mapGallery(doc),
    storiesGallery: mapStoriesGallery(doc),
    closingCta: mapClosingCta(doc),
    faq: mapFaq(doc),
  }
}
