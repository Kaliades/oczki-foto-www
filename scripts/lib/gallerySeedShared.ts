import type { Payload } from 'payload'

import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'

import { createSeedImageUploader } from './createSeedImageUploader'

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

type SeedImageUploader = ReturnType<typeof createSeedImageUploader>

/**
 * Uploads a fresh set of case-study section images for one gallery document.
 * Each slug gets its own media IDs — never shared across galleries.
 */
export async function uploadCaseStudySectionMedia(
  uploadImage: SeedImageUploader,
  slug: string,
): Promise<CaseStudySeedMedia> {
  const data = getCaseStudyBySlug(slug as 'slub-justyny-i-krzysia') ?? getCaseStudyBySlug(CASE_STUDY_SLUG)
  if (!data) {
    throw new Error(`Missing code-side defaults for gallery slug "${slug}"`)
  }

  const venue = data.venueStory.photos.desktop
  const heroBg = await uploadImage('case-study-hero-bg', data.hero.background.alt)
  const duoPhoto = await uploadImage('case-study-duo-photo-desktop', data.duoPerspective.photo.alt)
  const venueBack = await uploadImage('case-study-venue-back-desktop', venue.back.alt)
  const venueFront = await uploadImage('case-study-venue-front-desktop', venue.front.alt)
  const venueScallop = await uploadImage('case-study-venue-scallop-desktop', venue.scallop.alt)
  const testimonialPhoto = await uploadImage(
    'case-study-testimonial-polaroid-photo',
    data.testimonial.items[0]?.photoAlt ?? 'Opinia klientki',
  )
  const portraitPhoto = await uploadImage(
    'case-study-memorable-portrait',
    data.memorableMoment.portraitPhoto.alt,
  )
  const landscapePhoto = await uploadImage(
    'case-study-memorable-landscape',
    data.memorableMoment.landscapePhoto.alt,
  )
  const bentoPhotos = await Promise.all(
    data.photoGallery.items.map((g, i) =>
      uploadImage(`case-study-gallery-${i + 1}`, g.imageAlt),
    ),
  )

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

/** Maps uploaded media IDs onto gallery CMS fields (text from code defaults). */
export function buildCaseStudyImageFields(media: CaseStudySeedMedia, slug: string = CASE_STUDY_SLUG) {
  const defaults = getCaseStudyBySlug(slug as 'slub-justyny-i-krzysia') ?? getCaseStudyBySlug(CASE_STUDY_SLUG)
  if (!defaults) {
    throw new Error(`Missing code-side defaults for "${slug}"`)
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

/** @deprecated Portfolio seed now uploads per gallery. Kept for one-off reads during migration. */
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
    throw new Error(`Case study "${CASE_STUDY_SLUG}" must exist before reading seed media`)
  }

  return extractCaseStudySeedMedia(doc)
}

function mediaId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'number') {
    return value.id
  }
  return null
}

export function extractCaseStudySeedMedia(doc: {
  slug?: string | null
  hero?: { backgroundImage?: unknown }
  duoPerspective?: { photo?: unknown }
  venueStory?: { backImage?: unknown; frontImage?: unknown; scallopImage?: unknown }
  testimonial?: { items?: { photo?: unknown }[] | null }
  memorableMoment?: { portraitPhoto?: unknown; landscapePhoto?: unknown }
  photos?: { image?: unknown }[] | null
}): CaseStudySeedMedia {
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
