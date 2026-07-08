import type { Payload } from 'payload'

import {
  getOfferServiceBySlug,
  type OfferServiceSlug,
} from '@/app/(frontend)/oferta/[slug]/constants'

import { createUploadMedia } from './uploadMedia'

export type OfferListingSeed = {
  slug: OfferServiceSlug | 'sesje-milosne'
  title: string
  shortDescription: string
  listingImageSrc: string
  listingImageAlt: string
  imageCropClassName?: string
}

type OfferSectionMedia = {
  heroImage: number
  portraitImage: number
  packageImages: number[]
  careImage: number
  testimonialImages: number[]
  galleryImages: number[]
  inclusionsMainImage: number
  inclusionsScallopImage: number
}

function seedAssetPath(figmaSrc: string): string {
  return figmaSrc.replace(/^\/figma\//, '/seed-assets/')
}

/**
 * Uploads a fresh copy of each detail-page photo for one offer.
 * Section images are never shared across offers — each slug gets its own media IDs.
 */
async function uploadOfferSectionMedia(
  payload: Payload,
  slug: OfferListingSeed['slug'],
): Promise<OfferSectionMedia> {
  const data = getOfferServiceBySlug(slug) ?? getOfferServiceBySlug('sesje-kobiece')
  if (!data) {
    throw new Error('Missing code-side defaults for sesje-kobiece')
  }

  const upload = createUploadMedia(payload, { prefix: `offer-${slug}` })

  const heroImage = await upload(seedAssetPath(data.hero.image.src), data.hero.image.alt)
  const portraitImage = await upload(
    seedAssetPath(data.approach.portrait.src),
    data.approach.portrait.alt,
  )
  const packageImages = await Promise.all(
    data.packages.packages.map((p) => upload(seedAssetPath(p.image.src), p.image.alt)),
  )
  const careImage = await upload(seedAssetPath(data.care.image.src), data.care.image.alt)
  const testimonialImages = await Promise.all(
    data.testimonial.items.map((t) => upload(seedAssetPath(t.photoSrc), t.photoAlt)),
  )
  const galleryImages = await Promise.all(
    data.gallery.items.map((g) => upload(seedAssetPath(g.imageSrc), g.imageAlt)),
  )
  const inclusionsMainImage = await upload(
    '/seed-assets/offer-inclusions-main-photo.png',
    data.inclusions.images.mainAlt,
  )
  const inclusionsScallopImage = await upload(
    '/seed-assets/offer-inclusions-scallop-photo.png',
    data.inclusions.images.scallopAlt,
  )

  return {
    heroImage,
    portraitImage,
    packageImages,
    careImage,
    testimonialImages,
    galleryImages,
    inclusionsMainImage,
    inclusionsScallopImage,
  }
}

export async function seedFullOfferItem(
  payload: Payload,
  listing: OfferListingSeed,
): Promise<void> {
  const pageData =
    getOfferServiceBySlug(listing.slug) ?? getOfferServiceBySlug('sesje-kobiece')
  if (!pageData) {
    throw new Error(`No page defaults for offer slug "${listing.slug}"`)
  }

  const media = await uploadOfferSectionMedia(payload, listing.slug)
  const uploadListing = createUploadMedia(payload, { prefix: `offer-listing-${listing.slug}` })
  const listingImageId = await uploadListing(listing.listingImageSrc, listing.listingImageAlt)

  const offerData = {
    title: listing.title,
    shortDescription: listing.shortDescription,
    image: listingImageId,
    imageAlt: listing.listingImageAlt,
    imageCropClassName: listing.imageCropClassName,
    slug: listing.slug,
    _status: 'published' as const,
    publishedAt: new Date().toISOString(),
    hero: {
      heading: {
        start: pageData.hero.heading.start,
        emphasis: pageData.hero.heading.emphasis,
      },
      description: pageData.hero.description,
      cta: { label: pageData.hero.cta.label, url: pageData.hero.cta.href },
      image: media.heroImage,
      imageAlt: pageData.hero.image.alt,
    },
    approach: {
      heading: {
        start: pageData.approach.heading.start,
        emphasis: pageData.approach.heading.emphasis,
        end: pageData.approach.heading.end,
      },
      introParagraph1: pageData.approach.introParagraphs[0],
      introParagraph2: pageData.approach.introParagraphs[1],
      blocks: pageData.approach.blocks.map((b) => ({
        title: b.title,
        description: b.description,
      })),
      portraitImage: media.portraitImage,
      portraitAlt: pageData.approach.portrait.alt,
    },
    packages: {
      catalogDownload: {
        label: pageData.packages.catalogDownload.label,
        url: pageData.packages.catalogDownload.url,
      },
      items: pageData.packages.packages.map((p, i) => ({
        image: media.packageImages[i],
        imageAlt: p.image.alt,
        title: p.panel.title,
        price: p.panel.price,
        badgeLabel: p.panel.badgeLabel,
        features: p.panel.features.map((text) => ({ text })),
      })),
    },
    inclusions: {
      heading: pageData.inclusions.heading,
      intro: pageData.inclusions.intro,
      checklist: pageData.inclusions.checklist.map((c) => ({
        title: c.title,
        description: c.description,
      })),
      accordionHeading: pageData.inclusions.accordion.heading,
      accordion: pageData.inclusions.accordion.items.map((a) => ({
        title: a.title,
        body: a.body,
      })),
      mainImage: media.inclusionsMainImage,
      scallopImage: media.inclusionsScallopImage,
      mainImageAlt: pageData.inclusions.images.mainAlt,
      scallopImageAlt: pageData.inclusions.images.scallopAlt,
    },
    care: {
      heading: {
        start: pageData.care.heading.start,
        emphasis: pageData.care.heading.emphasis,
        end: pageData.care.heading.end,
      },
      intro: pageData.care.intro,
      features: pageData.care.features.map((f) => ({
        title: f.title,
        description: f.description,
      })),
      image: media.careImage,
      imageAlt: pageData.care.image.alt,
      cta: { label: pageData.care.cta.label, url: pageData.care.cta.url },
    },
    testimonial: {
      heading: {
        start: pageData.testimonial.heading.start,
        emphasis: pageData.testimonial.heading.emphasis,
      },
      items: pageData.testimonial.items.map((t, i) => ({
        quote: t.quote,
        author: t.author,
        photo: media.testimonialImages[i],
        photoAlt: t.photoAlt,
      })),
    },
    processSteps: {
      heading: {
        plain: pageData.processSteps.heading.plain,
        emphasis: pageData.processSteps.heading.emphasis,
      },
      intro: pageData.processSteps.intro,
      cta: {
        label: pageData.processSteps.cta.label,
        url: pageData.processSteps.cta.url,
      },
      items: pageData.processSteps.items.map((s) => ({
        title: s.title,
        paragraphs: s.paragraphs.map((text) => ({ text })),
      })),
    },
    gallery: {
      heading: {
        start: pageData.gallery.heading.start,
        emphasis: pageData.gallery.heading.emphasis,
      },
      description: pageData.gallery.description,
      cta: { label: pageData.gallery.cta.label, url: pageData.gallery.cta.url },
      items: pageData.gallery.items.map((g, i) => ({
        image: media.galleryImages[i],
        imageAlt: g.imageAlt,
        captionTitle: g.caption?.title ?? '',
        captionSubtitle: g.caption?.subtitle ?? '',
      })),
    },
    closingCta: {
      heading: pageData.closingCta.heading,
      body: pageData.closingCta.body,
      cta: { label: pageData.closingCta.cta.label, url: pageData.closingCta.cta.url },
    },
    faq: {
      heading: {
        start: pageData.faq.heading.start,
        emphasis: pageData.faq.heading.emphasis,
      },
      intro: pageData.faq.intro,
      items: pageData.faq.items.map((q) => ({ question: q.question, answer: q.answer })),
    },
  }

  const existing = await payload.find({
    collection: 'offerItems',
    where: { slug: { equals: listing.slug } },
    limit: 1,
    depth: 0,
  })

  if (existing.docs.length > 0) {
    await payload.delete({
      collection: 'offerItems',
      id: existing.docs[0].id,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Deleted existing offer #${existing.docs[0].id} (${listing.slug})`)
  }

  const created = await payload.create({
    collection: 'offerItems',
    data: offerData,
    context: { disableRevalidate: true },
  })

  payload.logger.info(`Seeded offer "${created.slug}" -> #${created.id}`)
}
