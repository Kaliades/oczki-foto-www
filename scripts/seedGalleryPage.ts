import config from '@payload-config'
import { getPayload } from 'payload'

import { GALLERY_SESSION_FILTERS, galleryHeroDefaults } from '@/components/GalleryHero/constants'
import { GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from '@/components/GalleryPortfolio/constants'

/**
 * Seeds the GalleryPage global (hero copy, filters, portfolio pagination).
 *
 * Run with:
 *   pnpm tsx scripts/seedGalleryPage.ts
 */
async function run() {
  const payload = await getPayload({ config })
  const d = galleryHeroDefaults

  await payload.updateGlobal({
    slug: 'galleryPage',
    data: {
      heroContent: {
        title: {
          lead: d.title.lead,
          emphasis: d.title.emphasis,
          trail: d.title.trail,
        },
        description: d.description,
        filters: GALLERY_SESSION_FILTERS.map((f) => ({
          category: f.id,
          label: f.label,
        })),
        defaultFilter: d.defaultFilterId,
      },
      portfolioSettings: {
        initialCount: 12,
        loadMoreBatchSize: 12,
        loadMoreLabel: GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
      },
    },
    context: { disableRevalidate: true },
  })

  console.log('✓ GalleryPage global seeded')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
