import type { Payload } from 'payload'

import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'
import type { Gallery } from '@/payload-types'

export const CASE_STUDY_SLUG = 'slub-justyny-i-krzysia'

export type CaseStudySeedMedia = {
  heroBg: number
  duoPhoto: number
  venueBack: number
  venueFront: number
  venueScallop: number
  testimonialPhoto: number
  portraitPhoto: number
  landscapePhoto: number
  bentoPhotos: readonly number[]
}

function mediaId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    return value.id
  }
  return null
}

/** Reads uploaded media IDs from the canonical case study (seeded by `seedGallery`). */
export function extractCaseStudySeedMedia(doc: Gallery): CaseStudySeedMedia {
  const heroBg = mediaId(doc.hero?.backgroundImage)
  const duoPhoto = mediaId(doc.duoPerspective?.photo)
  const venueBack = mediaId(doc.venueStory?.backImage)
  const venueFront = mediaId(doc.venueStory?.frontImage)
  const venueScallop = mediaId(doc.venueStory?.scallopImage)
  const testimonialPhoto = mediaId(doc.testimonial?.items?.[0]?.photo)
  const portraitPhoto = mediaId(doc.memorableMoment?.portraitPhoto)
  const landscapePhoto = mediaId(doc.memorableMoment?.landscapePhoto)
  const bentoPhotos = (doc.photos ?? []).flatMap((row) => {
    const id = mediaId(row.image)
    return id ? [id] : []
  })

  if (
    !heroBg ||
    !duoPhoto ||
    !venueBack ||
    !venueFront ||
    !venueScallop ||
    !testimonialPhoto ||
    !portraitPhoto ||
    !landscapePhoto ||
    bentoPhotos.length === 0
  ) {
    throw new Error(`Gallery "${doc.slug}" is missing required case-study media fields`)
  }

  return {
    heroBg,
    duoPhoto,
    venueBack,
    venueFront,
    venueScallop,
    testimonialPhoto,
    portraitPhoto,
    landscapePhoto,
    bentoPhotos,
  }
}

export async function loadCaseStudySeedMedia(payload: Payload): Promise<CaseStudySeedMedia> {
  const result = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: CASE_STUDY_SLUG } },
    limit: 1,
    depth: 0,
    pagination: false,
  })

  const doc = result.docs[0]
  if (!doc) {
    throw new Error(`Case study "${CASE_STUDY_SLUG}" must be seeded before portfolio galleries`)
  }

  return extractCaseStudySeedMedia(doc)
}

/** Image fields shared across portfolio placeholders — same photos as the case study. */
export function buildPortfolioCaseStudyImageFields(media: CaseStudySeedMedia) {
  const defaults = getCaseStudyBySlug(CASE_STUDY_SLUG)
  if (!defaults) {
    throw new Error(`Missing code-side defaults for "${CASE_STUDY_SLUG}"`)
  }

  const testimonialItem = defaults.testimonial.items[0]
  const venue = defaults.venueStory.photos.desktop

  return {
    photos: media.bentoPhotos.map((image, index) => ({
      image,
      caption:
        defaults.photoGallery.items[index]?.imageAlt ??
        defaults.photoGallery.items[0]?.imageAlt ??
        '',
    })),
    hero: {
      backgroundImage: media.heroBg,
      backgroundAlt: defaults.hero.background.alt,
    },
    duoPerspective: {
      photo: media.duoPhoto,
      photoAlt: defaults.duoPerspective.photo.alt,
    },
    venueStory: {
      backImage: media.venueBack,
      backAlt: venue.back.alt,
      frontImage: media.venueFront,
      frontAlt: venue.front.alt,
      scallopImage: media.venueScallop,
      scallopAlt: venue.scallop.alt,
    },
    testimonial: testimonialItem
      ? {
          items: [
            {
              quote: testimonialItem.quote,
              author: testimonialItem.author,
              photo: media.testimonialPhoto,
              photoAlt: testimonialItem.photoAlt,
            },
          ],
        }
      : undefined,
    memorableMoment: {
      portraitPhoto: media.portraitPhoto,
      portraitAlt: defaults.memorableMoment.portraitPhoto.alt,
      landscapePhoto: media.landscapePhoto,
      landscapeAlt: defaults.memorableMoment.landscapePhoto.alt,
    },
  }
}
