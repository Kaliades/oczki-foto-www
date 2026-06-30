import type { Payload } from 'payload'

import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'

import { createSeedImageUploader } from './lib/createSeedImageUploader'
import { runSeedCli } from './lib/seedCli'

const SLUG = 'slub-justyny-i-krzysia'

export async function seedGallery(payload: Payload): Promise<void> {
  const data = getCaseStudyBySlug(SLUG)

  if (!data) {
    throw new Error(`No code-side defaults found for slug "${SLUG}"`)
  }

  const uploadImage = createSeedImageUploader(payload, 'gallery')

  const heroBg = await uploadImage('case-study-hero-bg', data.hero.background.alt)
  const duoPhoto = await uploadImage('case-study-duo-photo-desktop', data.duoPerspective.photo.alt)
  const venue = data.venueStory.photos.desktop
  const venueBack = await uploadImage('case-study-venue-back-desktop', venue.back.alt)
  const venueFront = await uploadImage('case-study-venue-front-desktop', venue.front.alt)
  const venueScallop = await uploadImage('case-study-venue-scallop-desktop', venue.scallop.alt)
  const testimonialPhoto = await uploadImage(
    'case-study-testimonial-polaroid-photo',
    data.testimonial.items[0].photoAlt,
  )
  const portraitPhoto = await uploadImage(
    'case-study-memorable-portrait',
    data.memorableMoment.portraitPhoto.alt,
  )
  const landscapePhoto = await uploadImage(
    'case-study-memorable-landscape',
    data.memorableMoment.landscapePhoto.alt,
  )
  const galleryImages = await Promise.all(
    data.photoGallery.items.map((g, i) =>
      uploadImage(`case-study-gallery-${i + 1}`, g.imageAlt),
    ),
  )

  const galleryData = {
    title: data.hero.title,
    intro:
      'Reportaż ślubny Justyny i Krzysia — gorący czerwiec, chłodne mury kościoła w Wieprzu i wesele pełne luzu.',
    coverImage: heroBg,
    slug: SLUG,
    portfolioCategory: 'slubny' as const,
    showOnPortfolio: true,
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
    photos: data.photoGallery.items.map((g, i) => ({
      image: galleryImages[i],
      caption: g.imageAlt,
    })),
    hero: {
      heading: {
        lead: data.hero.heading.lead,
        emphasis: data.hero.heading.emphasis,
        end: data.hero.heading.end,
      },
      description: data.hero.description,
      backgroundImage: heroBg,
      backgroundAlt: data.hero.background.alt,
    },
    details: {
      heading: { start: data.details.heading.start, emphasis: data.details.heading.emphasis },
      items: data.details.items.map((d) => ({ title: d.title, description: d.description })),
    },
    duoPerspective: {
      heading: {
        start: data.duoPerspective.heading.start,
        emphasis: data.duoPerspective.heading.emphasis,
      },
      leadParagraph: data.duoPerspective.leadParagraph,
      callout: data.duoPerspective.callout,
      photo: duoPhoto,
      photoAlt: data.duoPerspective.photo.alt,
      highlights: data.duoPerspective.highlights.map((h) => ({
        title: h.title,
        description: h.description,
      })),
    },
    venueStory: {
      heading: { start: data.venueStory.heading.start, emphasis: data.venueStory.heading.emphasis },
      body: data.venueStory.body,
      backImage: venueBack,
      backAlt: venue.back.alt,
      frontImage: venueFront,
      frontAlt: venue.front.alt,
      scallopImage: venueScallop,
      scallopAlt: venue.scallop.alt,
    },
    photoGallery: {
      heading: {
        start: data.photoGallery.heading.start,
        emphasis: data.photoGallery.heading.emphasis,
        end: data.photoGallery.heading.end,
      },
      loadMoreLabel: data.photoGallery.loadMoreLabel,
    },
    testimonial: {
      heading: {
        start: data.testimonial.heading.start,
        emphasis: data.testimonial.heading.emphasis,
      },
      items: data.testimonial.items.map((t) => ({
        quote: t.quote,
        author: t.author,
        photo: testimonialPhoto,
        photoAlt: t.photoAlt,
      })),
    },
    memorableMoment: {
      title: data.memorableMoment.title,
      body: data.memorableMoment.body,
      portraitPhoto,
      portraitAlt: data.memorableMoment.portraitPhoto.alt,
      landscapePhoto,
      landscapeAlt: data.memorableMoment.landscapePhoto.alt,
    },
    closingCta: {
      heading: {
        start: data.closingCta.heading.start,
        emphasis: data.closingCta.heading.emphasis,
        end: data.closingCta.heading.end,
      },
      body: data.closingCta.body,
      cta: { label: data.closingCta.cta.label, url: data.closingCta.cta.url },
    },
  }

  const existing = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: 'galleries',
      id: existing.docs[0].id,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Deleted existing gallery #${existing.docs[0].id}`)
  }

  const created = await payload.create({
    collection: 'galleries',
    data: galleryData,
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Seeded gallery "${created.slug}" -> #${created.id}`)
}

runSeedCli(seedGallery, 'seedGallery')
