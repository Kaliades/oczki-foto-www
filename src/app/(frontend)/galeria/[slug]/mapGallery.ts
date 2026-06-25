import type { Gallery } from '@/payload-types'

import type { BentoPhotoTileData } from '@/components/BentoPhotoTile'
import type { CaseStudyDetailsData } from '@/components/CaseStudyDetails'
import type { CaseStudyDuoPerspectiveData } from '@/components/CaseStudyDuoPerspective'
import type { CaseStudyHeroData } from '@/components/CaseStudyHero'
import type { CaseStudyMemorableMomentData } from '@/components/CaseStudyMemorableMoment'
import type { CaseStudyPhotoGalleryData } from '@/components/CaseStudyPhotoGallery/constants'
import type { CaseStudyTestimonialData } from '@/components/CaseStudyTestimonial/constants'
import type { CaseStudyVenueStoryData } from '@/components/CaseStudyVenueStory'
import type { CaseStudyClosingCtaData } from '@/components/CaseStudyClosingCta'

import { CASE_STUDY_CASES, type CaseStudyPageData, type CaseStudySlug } from './constants'

/**
 * Maps a Payload `Gallery` document onto the `CaseStudyPageData` shape the
 * case-study section components already expect.
 *
 * Principle (see `docs/CMS-INSTRUKCJA.md` §7): the canonical case (below) is the
 * technical skeleton — Figma nodes, layout offsets, bento spans, photo-set
 * variants and decorative ordering all live in code. CMS content is overlaid on
 * top; any field or section left blank in the panel falls back to the skeleton,
 * so partial content never breaks the page.
 *
 * `relatedStories` is intentionally not exposed in the CMS yet (it needs a
 * gallery↔gallery relationship design) — it always renders the code defaults.
 * The bento `photoGallery` reuses the `photos[]` array from the "Treść" tab.
 */

/** The case used as the technical skeleton for any gallery. */
const SKELETON_SLUG: CaseStudySlug = 'slub-justyny-i-krzysia'

function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

type MediaLike = number | { url?: string | null } | null | undefined

function mediaUrl(media: MediaLike): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    return media.url
  }
  return null
}

function mapHero(doc: Gallery, d: CaseStudyHeroData): CaseStudyHeroData {
  const cms = doc.hero
  return {
    title: doc.title,
    background: {
      src: pick(mediaUrl(cms?.backgroundImage), d.background.src),
      alt: pick(cms?.backgroundAlt, d.background.alt),
    },
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Galeria', href: '/galeria' },
      { label: doc.title },
    ],
    heading: {
      lead: pick(cms?.heading?.lead, d.heading.lead),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    description: pick(cms?.description, d.description),
  }
}

function mapDetails(doc: Gallery, d: CaseStudyDetailsData): CaseStudyDetailsData {
  const cms = doc.details
  const cmsItems = cms?.items?.filter((i) => i.title || i.description) ?? []
  const items =
    cmsItems.length > 0
      ? cmsItems.map((item, i) => ({
          title: pick(item.title, d.items[i]?.title ?? ''),
          description: pick(item.description, d.items[i]?.description ?? ''),
          figmaNodes: d.items[i]?.figmaNodes,
        }))
      : d.items
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    items,
  }
}

function mapDuoPerspective(
  doc: Gallery,
  d: CaseStudyDuoPerspectiveData,
): CaseStudyDuoPerspectiveData {
  const cms = doc.duoPerspective
  const cmsHighlights = cms?.highlights?.filter((h) => h.title || h.description) ?? []
  const highlights =
    cmsHighlights.length > 0
      ? cmsHighlights.map((h, i) => ({
          title: pick(h.title, d.highlights[i]?.title ?? ''),
          description: pick(h.description, d.highlights[i]?.description ?? ''),
          figmaNodes: d.highlights[i]?.figmaNodes,
        }))
      : d.highlights
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    leadParagraph: pick(cms?.leadParagraph, d.leadParagraph),
    callout: pick(cms?.callout, d.callout),
    photo: {
      src: pick(mediaUrl(cms?.photo), d.photo.src),
      alt: pick(cms?.photoAlt, d.photo.alt),
    },
    highlights,
  }
}

function mapVenueStory(doc: Gallery, d: CaseStudyVenueStoryData): CaseStudyVenueStoryData {
  const cms = doc.venueStory
  // One CMS-uploaded set of three photos is reused on every breakpoint.
  const back = {
    src: pick(mediaUrl(cms?.backImage), d.photos.desktop.back.src),
    alt: pick(cms?.backAlt, d.photos.desktop.back.alt),
  }
  const front = {
    src: pick(mediaUrl(cms?.frontImage), d.photos.desktop.front.src),
    alt: pick(cms?.frontAlt, d.photos.desktop.front.alt),
  }
  const scallop = {
    src: pick(mediaUrl(cms?.scallopImage), d.photos.desktop.scallop.src),
    alt: pick(cms?.scallopAlt, d.photos.desktop.scallop.alt),
  }
  const set = { back, front, scallop }
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
    },
    body: pick(cms?.body, d.body),
    photos: { desktop: set, tablet: set, mobile: set },
  }
}

function mapPhotoGallery(doc: Gallery, d: CaseStudyPhotoGalleryData): CaseStudyPhotoGalleryData {
  const cms = doc.photoGallery
  const items: BentoPhotoTileData[] =
    doc.photos.length > 0
      ? doc.photos.map((photo, i) => ({
          id: pick(photo.id, String(i + 1)),
          imageSrc: pick(mediaUrl(photo.image), d.items[i]?.imageSrc ?? ''),
          imageAlt: pick(photo.caption, d.items[i]?.imageAlt ?? ''),
        }))
      : [...d.items]
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    loadMoreLabel: pick(cms?.loadMoreLabel, d.loadMoreLabel),
    items,
  }
}

function mapTestimonial(doc: Gallery, d: CaseStudyTestimonialData): CaseStudyTestimonialData {
  const cms = doc.testimonial
  const cmsItems = cms?.items?.filter((i) => i.quote || i.author) ?? []
  const items =
    cmsItems.length > 0
      ? cmsItems.map((item, i) => ({
          quote: pick(item.quote, d.items[i]?.quote ?? ''),
          author: pick(item.author, d.items[i]?.author ?? ''),
          photoSrc: pick(mediaUrl(item.photo), d.items[i]?.photoSrc ?? ''),
          photoAlt: pick(item.photoAlt, d.items[i]?.photoAlt ?? ''),
        }))
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

function mapMemorableMoment(
  doc: Gallery,
  d: CaseStudyMemorableMomentData,
): CaseStudyMemorableMomentData {
  const cms = doc.memorableMoment
  return {
    title: pick(cms?.title, d.title),
    body: pick(cms?.body, d.body),
    portraitPhoto: {
      src: pick(mediaUrl(cms?.portraitPhoto), d.portraitPhoto.src),
      alt: pick(cms?.portraitAlt, d.portraitPhoto.alt),
    },
    landscapePhoto: {
      src: pick(mediaUrl(cms?.landscapePhoto), d.landscapePhoto.src),
      alt: pick(cms?.landscapeAlt, d.landscapePhoto.alt),
    },
  }
}

function mapClosingCta(doc: Gallery, d: CaseStudyClosingCtaData): CaseStudyClosingCtaData {
  const cms = doc.closingCta
  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: pick(cms?.heading?.emphasis, d.heading.emphasis),
      end: pick(cms?.heading?.end, d.heading.end),
    },
    body: pick(cms?.body, d.body),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
  }
}

export function mapGallery(doc: Gallery): CaseStudyPageData {
  const d = CASE_STUDY_CASES[SKELETON_SLUG]
  return {
    slug: doc.slug as CaseStudySlug,
    hero: mapHero(doc, d.hero),
    details: mapDetails(doc, d.details),
    duoPerspective: mapDuoPerspective(doc, d.duoPerspective),
    venueStory: mapVenueStory(doc, d.venueStory),
    photoGallery: mapPhotoGallery(doc, d.photoGallery),
    testimonial: mapTestimonial(doc, d.testimonial),
    memorableMoment: mapMemorableMoment(doc, d.memorableMoment),
    closingCta: mapClosingCta(doc, d.closingCta),
    relatedStories: d.relatedStories,
  }
}
