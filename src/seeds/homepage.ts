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
