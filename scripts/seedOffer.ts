import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import { getOfferServiceBySlug } from '@/app/(frontend)/oferta/[slug]/constants'

/**
 * Seeds the `sesje-kobiece` offer into Payload from the code-side defaults.
 *
 * This is the inverse of `mapOfferItem`: it takes the same content the page
 * used to render statically and writes it into the CMS, uploading the Figma
 * placeholder images into the Media collection. Run with:
 *
 *   pnpm payload run scripts/seedOffer.ts
 *
 * It is idempotent — an existing offer with the same slug is deleted first.
 */

const SLUG = 'sesje-kobiece'

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
  const data = getOfferServiceBySlug(SLUG)

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

  const heroImage = await uploadImage(data.hero.image.src, data.hero.image.alt)
  const portraitImage = await uploadImage(data.approach.portrait.src, data.approach.portrait.alt)
  const packageImages = await Promise.all(
    data.packages.packages.map((p) => uploadImage(p.image.src, p.image.alt)),
  )
  const careImage = await uploadImage(data.care.image.src, data.care.image.alt)
  const testimonialImages = await Promise.all(
    data.testimonial.items.map((t) => uploadImage(t.photoSrc, t.photoAlt)),
  )
  const galleryImages = await Promise.all(
    data.gallery.items.map((g) => uploadImage(g.imageSrc, g.imageAlt)),
  )

  const offerData = {
    title: 'Sesja kobieca',
    shortDescription:
      'Sesja kobieca w atmosferze zaufania i swobody — naturalne kadry, które przypomną Ci o Twojej sile i pięknie.',
    image: heroImage,
    imageAlt: data.hero.image.alt,
    slug: SLUG,
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
    hero: {
      heading: { start: data.hero.heading.start, emphasis: data.hero.heading.emphasis },
      description: data.hero.description,
      cta: { label: data.hero.cta.label, url: data.hero.cta.href },
      image: heroImage,
      imageAlt: data.hero.image.alt,
    },
    approach: {
      heading: {
        start: data.approach.heading.start,
        emphasis: data.approach.heading.emphasis,
        end: data.approach.heading.end,
      },
      introParagraph1: data.approach.introParagraphs[0],
      introParagraph2: data.approach.introParagraphs[1],
      blocks: data.approach.blocks.map((b) => ({ title: b.title, description: b.description })),
      portraitImage,
      portraitAlt: data.approach.portrait.alt,
    },
    packages: {
      catalogDownload: {
        label: data.packages.catalogDownload.label,
        url: data.packages.catalogDownload.url,
      },
      items: data.packages.packages.map((p, i) => ({
        image: packageImages[i],
        imageAlt: p.image.alt,
        title: p.panel.title,
        price: p.panel.price,
        badgeLabel: p.panel.badgeLabel,
        features: p.panel.features.map((text) => ({ text })),
      })),
    },
    inclusions: {
      heading: data.inclusions.heading,
      intro: data.inclusions.intro,
      checklist: data.inclusions.checklist.map((c) => ({
        title: c.title,
        description: c.description,
      })),
      accordionHeading: data.inclusions.accordion.heading,
      accordion: data.inclusions.accordion.items.map((a) => ({ title: a.title, body: a.body })),
      mainImageAlt: data.inclusions.images.mainAlt,
      scallopImageAlt: data.inclusions.images.scallopAlt,
    },
    care: {
      heading: {
        start: data.care.heading.start,
        emphasis: data.care.heading.emphasis,
        end: data.care.heading.end,
      },
      intro: data.care.intro,
      features: data.care.features.map((f) => ({ title: f.title, description: f.description })),
      image: careImage,
      imageAlt: data.care.image.alt,
      cta: { label: data.care.cta.label, url: data.care.cta.url },
    },
    testimonial: {
      heading: {
        start: data.testimonial.heading.start,
        emphasis: data.testimonial.heading.emphasis,
      },
      items: data.testimonial.items.map((t, i) => ({
        quote: t.quote,
        author: t.author,
        photo: testimonialImages[i],
        photoAlt: t.photoAlt,
      })),
    },
    processSteps: {
      heading: {
        plain: data.processSteps.heading.plain,
        emphasis: data.processSteps.heading.emphasis,
      },
      intro: data.processSteps.intro,
      cta: { label: data.processSteps.cta.label, url: data.processSteps.cta.url },
      items: data.processSteps.items.map((s) => ({
        title: s.title,
        paragraphs: s.paragraphs.map((text) => ({ text })),
      })),
    },
    gallery: {
      heading: { start: data.gallery.heading.start, emphasis: data.gallery.heading.emphasis },
      description: data.gallery.description,
      cta: { label: data.gallery.cta.label, url: data.gallery.cta.url },
      items: data.gallery.items.map((g, i) => ({
        image: galleryImages[i],
        imageAlt: g.imageAlt,
        captionTitle: g.caption?.title ?? '',
        captionSubtitle: g.caption?.subtitle ?? '',
      })),
    },
    closingCta: {
      heading: data.closingCta.heading,
      body: data.closingCta.body,
      cta: { label: data.closingCta.cta.label, url: data.closingCta.cta.url },
    },
    faq: {
      heading: { start: data.faq.heading.start, emphasis: data.faq.heading.emphasis },
      intro: data.faq.intro,
      items: data.faq.items.map((q) => ({ question: q.question, answer: q.answer })),
    },
  }

  const existing = await payload.find({
    collection: 'offerItems',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: 'offerItems',
      id: existing.docs[0].id,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Deleted existing offer #${existing.docs[0].id}`)
  }

  const created = await payload.create({
    collection: 'offerItems',
    data: offerData,
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Seeded offer "${created.slug}" -> #${created.id}`)
}

await run()
