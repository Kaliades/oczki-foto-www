import { access } from 'fs/promises'
import type { Payload } from 'payload'
import sharp from 'sharp'

import {
  getOfferServiceBySlug,
  type OfferServiceSlug,
} from '@/app/(frontend)/oferta/[slug]/constants'

import { resolveSeedAssetAbs } from './seedAssetIO'
import { createUploadMedia, type UploadMediaFn } from './uploadMedia'

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
  storiesGalleryImages: number[]
  inclusionsMainImage: number
  inclusionsScallopImage: number
}

function seedAssetPath(figmaSrc: string): string {
  return figmaSrc.replace(/^\/figma\//, '/seed-assets/')
}

async function seedAssetExists(logicalPath: string): Promise<boolean> {
  try {
    await access(resolveSeedAssetAbs(logicalPath))
    return true
  } catch {
    return false
  }
}

/**
 * Brand "DO ZAMIANY" placeholder (same look as `replaceOfferPlaceholders…`).
 * Used when a Figma/seed PNG is missing for a slot.
 */
async function ensureOfferPlaceholderMedia(
  payload: Payload,
  cache: Map<string, number>,
): Promise<number> {
  const cached = cache.get('__placeholder-offer-portrait__')
  if (cached) return cached

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { like: 'placeholder-offer-portrait' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    const id = existing.docs[0].id as number
    cache.set('__placeholder-offer-portrait__', id)
    return id
  }

  const width = 1067
  const height = 1600
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f6f5f2"/>
  <rect x="64" y="64" width="${width - 128}" height="${height - 128}"
        fill="none" stroke="#cba783" stroke-width="5" stroke-dasharray="18 14"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, serif"
        font-size="56" fill="#4f3a26" letter-spacing="4">DO ZAMIANY</text>
  <text x="50%" y="54%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="28" fill="#6b5947">Placeholder oferty</text>
  <text x="50%" y="60%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="22" fill="#6b5947">Podmień na zdjęcie</text>
</svg>`

  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
  const doc = await payload.create({
    collection: 'media',
    data: { alt: 'Placeholder oferty — podmień na zdjęcie' },
    file: {
      name: 'placeholder-offer-portrait.jpg',
      data: buffer,
      mimetype: 'image/jpeg',
      size: buffer.byteLength,
    },
    context: { disableRevalidate: true },
  })

  const id = doc.id as number
  cache.set('__placeholder-offer-portrait__', id)
  payload.logger.info(`Created shared offer placeholder -> media #${id}`)
  return id
}

/** Upload seed asset, or fall back to the shared brand placeholder. */
function createOfferUpload(
  payload: Payload,
  prefix: string,
): UploadMediaFn {
  const upload = createUploadMedia(payload, { prefix })
  const placeholderCache = new Map<string, number>()

  return async (assetPath: string, alt: string): Promise<number> => {
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
    if (await seedAssetExists(normalized)) {
      return upload(normalized, alt)
    }

    payload.logger.warn(
      `Missing seed asset ${normalized} — using shared placeholder-offer-portrait`,
    )
    return ensureOfferPlaceholderMedia(payload, placeholderCache)
  }
}

/**
 * Uploads a fresh copy of each detail-page photo for one offer.
 * Section images are never shared across offers — each slug gets its own media IDs.
 * Duo collage stays code-hardcoded (not seeded into CMS).
 */
async function uploadOfferSectionMedia(
  payload: Payload,
  slug: OfferListingSeed['slug'],
): Promise<OfferSectionMedia> {
  const data = getOfferServiceBySlug(slug) ?? getOfferServiceBySlug('sesje-kobiece')
  if (!data) {
    throw new Error('Missing code-side defaults for sesje-kobiece')
  }

  const upload = createOfferUpload(payload, `offer-${slug}`)

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
  const storiesGalleryImages = data.storiesGallery
    ? await Promise.all(
        data.storiesGallery.items.map((g) => upload(seedAssetPath(g.imageSrc), g.imageAlt)),
      )
    : []
  const inclusionsMainImage = await upload(
    seedAssetPath(
      data.inclusions.images.mainPhotoSrc ?? '/figma/offer-inclusions-main-photo.png',
    ),
    data.inclusions.images.mainAlt,
  )
  const inclusionsScallopImage = await upload(
    seedAssetPath(
      data.inclusions.images.scallopPhotoSrc ?? '/figma/offer-inclusions-scallop-photo.png',
    ),
    data.inclusions.images.scallopAlt,
  )

  return {
    heroImage,
    portraitImage,
    packageImages,
    careImage,
    testimonialImages,
    galleryImages,
    storiesGalleryImages,
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
  const uploadListing = createOfferUpload(payload, `offer-listing-${listing.slug}`)
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
        description: p.panel.description,
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
        end: pageData.gallery.heading.end,
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
    ...(pageData.storiesGallery && media.storiesGalleryImages.length > 0
      ? {
          storiesGallery: {
            heading: {
              start: pageData.storiesGallery.heading.start,
              emphasis: pageData.storiesGallery.heading.emphasis,
            },
            description: pageData.storiesGallery.description,
            cta: {
              label: pageData.storiesGallery.cta.label,
              url: pageData.storiesGallery.cta.url,
            },
            items: pageData.storiesGallery.items.map((g, i) => ({
              image: media.storiesGalleryImages[i],
              imageAlt: g.imageAlt,
              captionTitle: g.caption?.title ?? '',
              captionSubtitle: g.caption?.subtitle ?? '',
            })),
          },
        }
      : {}),
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
