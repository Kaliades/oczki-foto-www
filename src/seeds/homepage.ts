import type { Payload } from 'payload'

import { HomepageAboutTeaserSeed } from '@/blocks/HomepageAboutTeaser/seed'
import { HomepageCtaSeed } from '@/blocks/HomepageCta/seed'
import { HomepageGallerySeed } from '@/blocks/HomepageGallery/seed'
import { HomepageHeroSeed } from '@/blocks/HomepageHero/seed'
import { HomepageInstagramSeed } from '@/blocks/HomepageInstagram/seed'
import { homepageIntroSeed } from '@/blocks/HomepageIntro/seed'
import { HomepagePhilosophySeed } from '@/blocks/HomepagePhilosophy/seed'
import { HomepageProcessSeed } from '@/blocks/HomepageProcess/seed'
import { HomepageServicesSeed } from '@/blocks/HomepageServices/seed'
import { HomepageTestimonialsSeed } from '@/blocks/HomepageTestimonials/seed'

import { resolvePlaceholders } from './uploadMedia'

export async function seedHomepage(payload: Payload): Promise<void> {
  // Wipe Media before re-seeding so uploads stay idempotent: Payload appends
  // -2, -3, -N suffixes on filename collisions, and our exact-filename lookup
  // misses those, so without wiping we'd accumulate duplicates until validation
  // fails. Local dev only — CMS-uploaded media in prod would never go through
  // this path.
  const existingMedia = await payload.find({ collection: 'media', limit: 0, pagination: false })
  if (existingMedia.totalDocs > 0) {
    payload.logger.info(`[seed] wiping ${existingMedia.totalDocs} existing media docs…`)
    await payload.delete({ collection: 'media', where: { id: { exists: true } } })
  }

  payload.logger.info('[seed] resolving 10 block placeholders…')

  const layoutBlocks = [
    HomepageHeroSeed,
    homepageIntroSeed,
    HomepageServicesSeed,
    HomepagePhilosophySeed,
    HomepageGallerySeed,
    HomepageProcessSeed,
    HomepageTestimonialsSeed,
    HomepageAboutTeaserSeed,
    HomepageInstagramSeed,
    HomepageCtaSeed,
  ]

  const cache = new Map<string, number | string>()
  const layout = await resolvePlaceholders(payload, layoutBlocks, cache)

  await payload.updateGlobal({
    slug: 'homepage',
    data: { layout } as never,
  })

  payload.logger.info(`[seed] homepage populated with ${layoutBlocks.length} blocks`)
}
