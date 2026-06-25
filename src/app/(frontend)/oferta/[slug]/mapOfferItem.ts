import type { OfferItem } from '@/payload-types'

import {
  offerServiceHeroSesjeKobieceDefaults,
  type OfferServiceHeroData,
} from '@/components/OfferServiceHero'
import {
  offerServiceApproachSesjeKobieceDefaults,
  type OfferServiceApproachData,
} from '@/components/OfferServiceApproach'
import {
  offerServicePackagesSesjeKobieceDefaults,
  type OfferServicePackagesData,
} from '@/components/OfferServicePackages'
import {
  offerServiceInclusionsSesjeKobieceDefaults,
  type OfferServiceInclusionsData,
} from '@/components/OfferServiceInclusions'
import {
  offerServiceCareSesjeKobieceDefaults,
  type OfferServiceCareData,
} from '@/components/OfferServiceCare'
import {
  offerServiceTestimonialSesjeKobieceDefaults,
  type OfferServiceTestimonialData,
} from '@/components/OfferServiceTestimonial'
import {
  offerServiceProcessStepsSesjeKobieceDefaults,
  type OfferServiceProcessStepsData,
} from '@/components/OfferServiceProcessSteps'
import {
  offerServiceGallerySesjeKobieceDefaults,
  type OfferServiceGalleryData,
} from '@/components/OfferServiceGallery'
import {
  offerServiceClosingCtaSesjeKobieceDefaults,
  type OfferServiceClosingCtaData,
} from '@/components/OfferServiceClosingCta'
import {
  offerServiceFaqSesjeKobieceDefaults,
  type OfferServiceFaqData,
} from '@/components/OfferServiceFaq'

import type { OfferServicePageData } from './constants'

/**
 * Maps a Payload `OfferItem` document onto the `OfferServicePageData` shape the
 * section components already expect.
 *
 * Principle (see `docs/CMS-INSTRUKCJA.md` §7): the section *defaults* are the
 * technical skeleton (Figma nodes, layout flags, crop classes, decoration
 * sources, fixed orderings). CMS content is overlaid on top. Any field or whole
 * section left blank in the panel falls back to the default, so partial content
 * never breaks the page.
 */

/** Returns a non-empty CMS value, otherwise the code-side fallback. */
function pick<T>(value: T | null | undefined | '', fallback: T): T {
  return value === null || value === undefined || value === '' ? fallback : (value as T)
}

/** Resolves a populated Media relationship to its public URL, if available. */
function mediaUrl(media: OfferItem['image'] | null | undefined): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    return media.url
  }
  return null
}

function mapHero(doc: OfferItem): OfferServiceHeroData {
  const d = offerServiceHeroSesjeKobieceDefaults
  const cms = doc.hero
  return {
    title: `${doc.title} | Oczki fotografia`,
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Oferta', href: '/oferta' },
      { label: doc.title },
    ],
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      // Default the emphasis to the offer's own name (not the sesje-kobiece
      // skeleton default) so an offer seeded/created without bespoke hero copy
      // still shows its real title in the H1.
      emphasis: pick(cms?.heading?.emphasis, doc.title),
    },
    description: pick(cms?.description, d.description),
    cta: {
      href: pick(cms?.cta?.url, d.cta.href),
      label: pick(cms?.cta?.label, d.cta.label),
    },
    image: {
      src: pick(mediaUrl(cms?.image), d.image.src),
      alt: pick(cms?.imageAlt, d.image.alt),
    },
  }
}

function mapApproach(doc: OfferItem): OfferServiceApproachData {
  const d = offerServiceApproachSesjeKobieceDefaults
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
      src: pick(mediaUrl(cms?.portraitImage), d.portrait.src),
      alt: pick(cms?.portraitAlt, d.portrait.alt),
    },
  }
}

function mapPackages(doc: OfferItem): OfferServicePackagesData {
  const d = offerServicePackagesSesjeKobieceDefaults
  const cms = doc.packages
  const packages = d.packages.map((def, i) => {
    const row = cms?.items?.[i]
    if (!row) return def
    return {
      image: {
        ...def.image,
        src: pick(mediaUrl(row.image), def.image.src),
        alt: pick(row.imageAlt, def.image.alt),
      },
      panel: {
        ...def.panel,
        title: pick(row.title, def.panel.title),
        price: pick(row.price, def.panel.price),
        badgeLabel: pick(row.badgeLabel, def.panel.badgeLabel),
        features:
          row.features && row.features.length > 0
            ? row.features.map((f) => f.text)
            : def.panel.features,
      },
    }
  }) as unknown as OfferServicePackagesData['packages']

  return {
    catalogDownload: {
      ...d.catalogDownload,
      label: pick(cms?.catalogDownload?.label, d.catalogDownload.label),
      url: pick(cms?.catalogDownload?.url, d.catalogDownload.url),
    },
    packages,
  }
}

function mapInclusions(doc: OfferItem): OfferServiceInclusionsData {
  const d = offerServiceInclusionsSesjeKobieceDefaults
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
    },
  }
}

function mapCare(doc: OfferItem): OfferServiceCareData {
  const d = offerServiceCareSesjeKobieceDefaults
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
      src: pick(mediaUrl(cms?.image), d.image.src),
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
  const d = offerServiceTestimonialSesjeKobieceDefaults
  const cms = doc.testimonial

  const items =
    cms?.items && cms.items.length > 0
      ? cms.items.map((row, i) => {
          const def = d.items[i]
          return {
            quote: pick(row.quote, def?.quote ?? ''),
            author: pick(row.author, def?.author ?? ''),
            photoSrc: pick(mediaUrl(row.photo), def?.photoSrc ?? d.items[0].photoSrc),
            photoAlt: pick(row.photoAlt, def?.photoAlt ?? d.items[0].photoAlt),
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
  const d = offerServiceProcessStepsSesjeKobieceDefaults
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
  const d = offerServiceGallerySesjeKobieceDefaults
  const cms = doc.gallery

  const items = d.items.map((def, i) => {
    const row = cms?.items?.[i]
    if (!row) return def
    return {
      ...def,
      imageSrc: pick(mediaUrl(row.image), def.imageSrc),
      imageAlt: pick(row.imageAlt, def.imageAlt),
      caption: {
        title: pick(row.captionTitle, def.caption?.title ?? ''),
        subtitle: pick(row.captionSubtitle, def.caption?.subtitle ?? ''),
      },
    }
  }) as OfferServiceGalleryData['items']

  return {
    heading: {
      start: pick(cms?.heading?.start, d.heading.start),
      emphasis: cms?.heading?.emphasis ?? d.heading.emphasis,
    },
    description: pick(cms?.description, d.description),
    cta: {
      ...d.cta,
      label: pick(cms?.cta?.label, d.cta.label),
      url: pick(cms?.cta?.url, d.cta.url),
    },
    items,
  }
}

function mapClosingCta(doc: OfferItem): OfferServiceClosingCtaData {
  const d = offerServiceClosingCtaSesjeKobieceDefaults
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
  const d = offerServiceFaqSesjeKobieceDefaults
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
    testimonial: mapTestimonial(doc),
    processSteps: mapProcessSteps(doc),
    gallery: mapGallery(doc),
    closingCta: mapClosingCta(doc),
    faq: mapFaq(doc),
  }
}
