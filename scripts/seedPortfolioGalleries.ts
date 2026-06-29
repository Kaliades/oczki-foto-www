import { readFile } from 'fs/promises'
import path from 'path'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { GallerySessionFilterId } from '@/components/GalleryHero/constants'
import { GALLERY_SESSION_FILTERS } from '@/components/GalleryHero/constants'

/**
 * Seeds portfolio listing galleries for /galeria:
 * - 16 lightweight entries per session category (duplicate cover per category
 *   so filters are visually distinct until the client uploads real photos).
 * - Does not delete `slub-justyny-i-krzysia` (full case study); updates its category.
 * - Removes other existing galleries first.
 *
 * Run with:
 *   pnpm tsx scripts/seedPortfolioGalleries.ts
 */

const CASE_STUDY_SLUG = 'slub-justyny-i-krzysia'

const ENTRIES_PER_CATEGORY = 16

/** One distinct figma cover per filter — easy to tell filters apart in the admin. */
const CATEGORY_COVER: Record<GallerySessionFilterId, { src: string; alt: string }> = {
  kobieca: {
    src: '/figma/gallery-portfolio-1.png',
    alt: 'Sesja kobieca — portfolio',
  },
  wizerunkowa: {
    src: '/figma/gallery-portfolio-3.png',
    alt: 'Sesja wizerunkowa — portfolio',
  },
  slubny: {
    src: '/figma/gallery-portfolio-5.png',
    alt: 'Reportaż ślubny — portfolio',
  },
  narzezenska: {
    src: '/figma/gallery-portfolio-4.png',
    alt: 'Sesja narzeczeńska — portfolio',
  },
  rodzinna: {
    src: '/figma/gallery-portfolio-6.png',
    alt: 'Sesja rodzinna — portfolio',
  },
}

const CATEGORY_LABEL: Record<GallerySessionFilterId, string> = Object.fromEntries(
  GALLERY_SESSION_FILTERS.map((f) => [f.id, f.label]),
) as Record<GallerySessionFilterId, string>

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
    default:
      return 'application/octet-stream'
  }
}

async function run() {
  const payload = await getPayload({ config })
  let uploadCounter = 0
  const uploadCache = new Map<string, number>()

  const uploadImage = async (src: string, alt: string): Promise<number> => {
    const cached = uploadCache.get(src)
    if (cached) return cached

    const rel = src.replace(/^\//, '')
    const abs = path.resolve(process.cwd(), 'public', rel)
    const buffer = await readFile(abs)
    const base = path.basename(abs)
    const uniqueName = `${String(++uploadCounter).padStart(3, '0')}-portfolio-${base}`

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

    uploadCache.set(src, doc.id as number)
    payload.logger.info(`Uploaded ${rel} -> media #${doc.id}`)
    return doc.id as number
  }

  const existing = await payload.find({
    collection: 'galleries',
    limit: 500,
    pagination: false,
    depth: 0,
  })

  for (const doc of existing.docs) {
    if (doc.slug === CASE_STUDY_SLUG) continue
    await payload.delete({
      collection: 'galleries',
      id: doc.id,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Deleted gallery #${doc.id} (${doc.slug})`)
  }

  for (const category of GALLERY_SESSION_FILTERS) {
    const cover = CATEGORY_COVER[category.id]
    const coverId = await uploadImage(cover.src, cover.alt)
    const label = CATEGORY_LABEL[category.id]

    for (let i = 1; i <= ENTRIES_PER_CATEGORY; i++) {
      const slug = `portfolio-${category.id}-${String(i).padStart(2, '0')}`
      const title = `${label} ${i}`

      const created = await payload.create({
        collection: 'galleries',
        data: {
          title,
          intro: `Placeholder — ${label.toLowerCase()} (${i}/${ENTRIES_PER_CATEGORY})`,
          coverImage: coverId,
          slug,
          portfolioCategory: category.id,
          showOnPortfolio: true,
          _status: 'published' as const,
          publishedAt: new Date().toISOString(),
          photos: [{ image: coverId, caption: cover.alt }],
        },
        context: { disableRevalidate: true },
      })

      payload.logger.info(`Seeded ${slug} -> #${created.id}`)
    }
  }

  const caseStudy = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: CASE_STUDY_SLUG } },
    limit: 1,
    depth: 0,
  })

  if (caseStudy.docs[0]) {
    await payload.update({
      collection: 'galleries',
      id: caseStudy.docs[0].id,
      data: {
        portfolioCategory: 'slubny',
        showOnPortfolio: true,
      },
      context: { disableRevalidate: true },
    })
    payload.logger.info(`Updated case study "${CASE_STUDY_SLUG}" -> category slubny`)
  }

  payload.logger.info(
    `Done — ${GALLERY_SESSION_FILTERS.length * ENTRIES_PER_CATEGORY} portfolio placeholders seeded.`,
  )
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
