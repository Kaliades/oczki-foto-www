import type { Payload } from 'payload'

import { GalleryHeroSeed } from '@/blocks/GalleryHero/seed'
import { GalleryGridSeed } from '@/blocks/GalleryGrid/seed'
import { GalleryQuoteBandSeed } from '@/blocks/GalleryQuoteBand/seed'
import { GalleryFaqSeed } from '@/blocks/GalleryFaq/seed'
import { GalleryCtaSeed } from '@/blocks/GalleryCta/seed'
import { GalleryNewsletterSeed } from '@/blocks/GalleryNewsletter/seed'
import { resolvePlaceholders } from './uploadMedia'

export async function seedGaleria(payload: Payload): Promise<void> {
  const cache = new Map<string, number | string>()
  const layoutBlocks = [
    GalleryHeroSeed,
    GalleryGridSeed,
    GalleryQuoteBandSeed,
    GalleryFaqSeed,
    GalleryCtaSeed,
    GalleryNewsletterSeed,
  ]
  const layout = await resolvePlaceholders(payload, layoutBlocks, cache)

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'galeria' } },
    limit: 1,
    pagination: false,
  })

  const data = {
    title: 'Galeria',
    slug: 'galeria',
    _status: 'published',
    layout,
    meta: {
      title: 'Galeria — Oczki Fotografia',
      description:
        'Naturalna fotografia kobieca i ślubna — portfolio z Krakowa i okolic.',
    },
  } as never

  if (existing.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existing.docs[0].id,
      data,
      draft: false,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`[seed] updated 'galeria' page (id=${existing.docs[0].id})`)
  } else {
    const doc = await payload.create({
      collection: 'pages',
      data,
      draft: false,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`[seed] created 'galeria' page (id=${doc.id})`)
  }
}
