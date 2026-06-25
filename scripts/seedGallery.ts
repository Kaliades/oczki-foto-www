import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'

/**
 * Seeds the `slub-justyny-i-krzysia` gallery into Payload from the code-side
 * defaults. Inverse of `mapGallery`: writes the content the case-study page used
 * to render statically and uploads the Figma placeholder images. Run with:
 *
 *   pnpm payload run scripts/seedGallery.ts
 *
 * Idempotent — an existing gallery with the same slug is deleted first.
 */

const SLUG = 'slub-justyny-i-krzysia'

function mimeFromExt(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'webp':
      return 'image/webp'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

async function run() {
  const payload = await getPayload({ config })
  const data = getCaseStudyBySlug(SLUG)

  if (!data) {
    throw new Error(`No code-side defaults found for slug "${SLUG}"`)
  }

  const uploadCache = new Map<string, number>()
  let uploadCounter = 0

  const uploadImage = async (src: string, alt: string): Promise<number> => {
    const cached = uploadCache.get(src)
    if (cached) return cached

    const rel = src.replace(/^\//, '')
    const abs = path.resolve(process.cwd(), 'public', rel)
    const buffer = await readFile(abs)

    // Unique prefix avoids filename collisions when distinct source files share
    // a basename and are uploaded concurrently (Payload enforces unique filename).
    const base = path.basename(abs)
    const uniqueName = `${String(++uploadCounter).padStart(3, '0')}-${base}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        name: uniqueName,
        data: buffer,
        mimetype: mimeFromExt(abs),
        size: buffer.byteLength,
      },
      context: { disableRevalidate: true },
    })

    uploadCache.set(src, doc.id)
    payload.logger.info(`Uploaded ${rel} -> media #${doc.id}`)
    return doc.id
  }

  const heroBg = await uploadImage(data.hero.background.src, data.hero.background.alt)
  const duoPhoto = await uploadImage(data.duoPerspective.photo.src, data.duoPerspective.photo.alt)
  const venue = data.venueStory.photos.desktop
  const venueBack = await uploadImage(venue.back.src, venue.back.alt)
  const venueFront = await uploadImage(venue.front.src, venue.front.alt)
  const venueScallop = await uploadImage(venue.scallop.src, venue.scallop.alt)
  const testimonialPhoto = await uploadImage(
    data.testimonial.items[0].photoSrc,
    data.testimonial.items[0].photoAlt,
  )
  const portraitPhoto = await uploadImage(
    data.memorableMoment.portraitPhoto.src,
    data.memorableMoment.portraitPhoto.alt,
  )
  const landscapePhoto = await uploadImage(
    data.memorableMoment.landscapePhoto.src,
    data.memorableMoment.landscapePhoto.alt,
  )
  const galleryImages = await Promise.all(
    data.photoGallery.items.map((g) => uploadImage(g.imageSrc, g.imageAlt)),
  )

  const galleryData = {
    title: data.hero.title,
    intro:
      'Reportaż ślubny Justyny i Krzysia — gorący czerwiec, chłodne mury kościoła w Wieprzu i wesele pełne luzu.',
    coverImage: heroBg,
    slug: SLUG,
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

await run()
