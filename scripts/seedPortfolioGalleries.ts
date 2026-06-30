import type { Payload } from 'payload'

import { GALLERY_SESSION_FILTERS } from '@/components/GalleryHero/constants'

import { createUploadMedia } from './lib/uploadMedia'
import { runSeedCli } from './lib/seedCli'

const CASE_STUDY_SLUG = 'slub-justyny-i-krzysia'

const ENTRIES_PER_CATEGORY = 16

const PORTFOLIO_COVERS = Array.from({ length: 12 }, (_, i) => ({
  src: `/seed-assets/gallery-portfolio-${i + 1}.png` as const,
  alt: `Portfolio — zdjęcie ${i + 1}`,
}))

const CATEGORY_LABEL = Object.fromEntries(
  GALLERY_SESSION_FILTERS.map((f) => [f.id, f.label]),
) as Record<(typeof GALLERY_SESSION_FILTERS)[number]['id'], string>

export async function seedPortfolioGalleries(payload: Payload): Promise<void> {
  const uploadImage = createUploadMedia(payload, { prefix: 'portfolio' })

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

  let coverIndex = 0
  let seededCount = 0

  for (const category of GALLERY_SESSION_FILTERS) {
    const label = CATEGORY_LABEL[category.id]
    // Full case study already appears under „Reportaż ślubny” — one fewer placeholder there.
    const count =
      category.id === 'slubny' ? ENTRIES_PER_CATEGORY - 1 : ENTRIES_PER_CATEGORY

    for (let i = 1; i <= count; i++) {
      const cover = PORTFOLIO_COVERS[coverIndex % PORTFOLIO_COVERS.length]
      coverIndex++
      const coverId = await uploadImage(cover.src, cover.alt)
      const slug = `portfolio-${category.id}-${String(i).padStart(2, '0')}`
      const title = `${label} ${i}`

      const created = await payload.create({
        collection: 'galleries',
        data: {
          title,
          intro: `Placeholder — ${label.toLowerCase()} (${i}/${count})`,
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
      seededCount++
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

  payload.logger.info(`Done — ${seededCount} portfolio placeholders seeded.`)
}

runSeedCli(seedPortfolioGalleries, 'seedPortfolioGalleries')
