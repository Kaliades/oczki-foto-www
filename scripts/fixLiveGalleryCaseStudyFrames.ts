/**
 * Fix local live galleries: case-study collage frames use Figma seed assets
 * (correct crops / rotation), while `photos[]` + cover stay as live client photos.
 * Also restores skeleton headings so venue/duo sections match Figma.
 *
 * Local-only. Does not touch production.
 *
 * Usage: pnpm exec tsx scripts/fixLiveGalleryCaseStudyFrames.ts
 */
import { loadSeedEnv } from './lib/seedEnv'
import { CASE_STUDY_SLUG, uploadCaseStudySectionMedia, buildCaseStudyImageFields } from './lib/gallerySeedShared'
import { createSeedImageUploader } from './lib/createSeedImageUploader'
import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'

function assertLocalOnly(): void {
  if (process.env.SEED_TARGET === 'production') {
    throw new Error('Refusing: SEED_TARGET=production')
  }
  loadSeedEnv()
  const url = process.env.POSTGRES_URL ?? ''
  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    throw new Error('Refusing non-local Postgres')
  }
}

async function main(): Promise<void> {
  assertLocalOnly()
  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()
  const defaults = getCaseStudyBySlug(CASE_STUDY_SLUG)!

  const galleries = await payload.find({
    collection: 'galleries',
    limit: 500,
    pagination: false,
    depth: 0,
  })

  // One shared set of Figma section frames for all non-canonical galleries.
  const sharedUpload = createSeedImageUploader(payload, 'live-frames')
  const sharedFrames = await uploadCaseStudySectionMedia(sharedUpload, CASE_STUDY_SLUG)
  const sharedFields = buildCaseStudyImageFields(sharedFrames, CASE_STUDY_SLUG)

  for (const doc of galleries.docs) {
    const slug = doc.slug ?? ''
    const isCanonical = slug === CASE_STUDY_SLUG

    // Keep existing live photos[] + cover; only rewrite case-study frame fields.
    const livePhotos = Array.isArray(doc.photos)
      ? doc.photos.map((row) => ({
          image: typeof row.image === 'object' && row.image && 'id' in row.image
            ? (row.image as { id: number }).id
            : (row.image as number),
          caption: row.caption ?? '',
        }))
      : []

    if (livePhotos.length === 0) {
      payload.logger.warn(`Skip ${slug} — no photos`)
      continue
    }

    const frames = isCanonical
      ? // Canonical: keep live photos for frames too, but restore proper skeleton copy.
        null
      : sharedFields

    const data = isCanonical
      ? {
          hero: {
            heading: {
              lead: defaults.hero.heading.lead,
              emphasis: defaults.hero.heading.emphasis,
              end: defaults.hero.heading.end,
            },
            description: defaults.hero.description,
            // keep existing backgroundImage
          },
          details: {
            heading: {
              start: defaults.details.heading.start,
              emphasis: defaults.details.heading.emphasis,
            },
            items: defaults.details.items.map((item) => ({
              title: item.title,
              description: item.description,
            })),
          },
          duoPerspective: {
            heading: {
              start: defaults.duoPerspective.heading.start,
              emphasis: defaults.duoPerspective.heading.emphasis,
            },
            leadParagraph: defaults.duoPerspective.leadParagraph,
            callout: defaults.duoPerspective.callout,
            highlights: defaults.duoPerspective.highlights.map((h) => ({
              title: h.title,
              description: h.description,
            })),
          },
          venueStory: {
            heading: {
              start: defaults.venueStory.heading.start,
              emphasis: defaults.venueStory.heading.emphasis,
            },
            body: defaults.venueStory.body,
          },
          photoGallery: {
            heading: {
              start: defaults.photoGallery.heading.start,
              emphasis: defaults.photoGallery.heading.emphasis,
              end: defaults.photoGallery.heading.end,
            },
            loadMoreLabel: defaults.photoGallery.loadMoreLabel,
          },
          testimonial: {
            heading: {
              start: defaults.testimonial.heading.start,
              emphasis: defaults.testimonial.heading.emphasis,
            },
            items: [
              {
                quote: defaults.testimonial.items[0]?.quote ?? '',
                author: defaults.testimonial.items[0]?.author ?? '',
                photoAlt: defaults.testimonial.items[0]?.photoAlt ?? '',
              },
            ],
          },
          memorableMoment: {
            title: defaults.memorableMoment.title,
            body: defaults.memorableMoment.body,
          },
          closingCta: {
            heading: {
              start: defaults.closingCta.heading.start,
              emphasis: defaults.closingCta.heading.emphasis,
              end: defaults.closingCta.heading.end,
            },
            body: defaults.closingCta.body,
            cta: {
              label: defaults.closingCta.cta.label,
              url: defaults.closingCta.cta.url,
            },
          },
        }
      : {
          coverImage:
            typeof doc.coverImage === 'object' && doc.coverImage && 'id' in doc.coverImage
              ? (doc.coverImage as { id: number }).id
              : (doc.coverImage as number),
          // Skeleton collage frames + copy — then force live photos back on top.
          ...frames,
          photos: livePhotos,
          hero: {
            ...frames!.hero,
            heading: {
              lead: '',
              emphasis: doc.title,
              end: '',
            },
            description: (doc.intro || '').slice(0, 600),
          },
          details: {
            heading: {
              start: defaults.details.heading.start,
              emphasis: defaults.details.heading.emphasis,
            },
            items: defaults.details.items.map((item) => ({
              title: item.title,
              description: item.description,
            })),
          },
          duoPerspective: {
            ...frames!.duoPerspective,
            heading: {
              start: defaults.duoPerspective.heading.start,
              emphasis: defaults.duoPerspective.heading.emphasis,
            },
            leadParagraph: defaults.duoPerspective.leadParagraph,
            callout: defaults.duoPerspective.callout,
            highlights: defaults.duoPerspective.highlights.map((h) => ({
              title: h.title,
              description: h.description,
            })),
          },
          venueStory: {
            ...frames!.venueStory,
            heading: {
              start: defaults.venueStory.heading.start,
              emphasis: defaults.venueStory.heading.emphasis,
            },
            body: (doc.intro || defaults.venueStory.body).slice(0, 800),
          },
          photoGallery: {
            heading: {
              start: defaults.photoGallery.heading.start,
              emphasis: defaults.photoGallery.heading.emphasis,
              end: defaults.photoGallery.heading.end,
            },
            loadMoreLabel: defaults.photoGallery.loadMoreLabel,
          },
          testimonial: frames!.testimonial,
          memorableMoment: {
            ...frames!.memorableMoment,
            title: defaults.memorableMoment.title,
            body: defaults.memorableMoment.body,
          },
          closingCta: {
            heading: {
              start: defaults.closingCta.heading.start,
              emphasis: defaults.closingCta.heading.emphasis,
              end: defaults.closingCta.heading.end,
            },
            body: defaults.closingCta.body,
            cta: {
              label: defaults.closingCta.cta.label,
              url: defaults.closingCta.cta.url,
            },
          },
        }

    await payload.update({
      collection: 'galleries',
      id: doc.id,
      data,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Fixed case-study frames for ${slug}`)
  }

  payload.logger.info('Done fixing live gallery case-study frames.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
