import type { Payload } from 'payload'

import { HomepageAboutTeaserSeed } from '@/blocks/HomepageAboutTeaser/seed'
import { HomepageCtaSeed } from '@/blocks/HomepageCta/seed'
import { HomepageGallerySeed } from '@/blocks/HomepageGallery/seed'
import { HomepageInstagramSeed } from '@/blocks/HomepageInstagram/seed'
import { homepageIntroSeed } from '@/blocks/HomepageIntro/seed'
import { HomepagePhilosophySeed } from '@/blocks/HomepagePhilosophy/seed'
import { HomepageProcessSeed } from '@/blocks/HomepageProcess/seed'
import { HomepageServicesSeed } from '@/blocks/HomepageServices/seed'
import { HomepageTestimonialsSeed } from '@/blocks/HomepageTestimonials/seed'

import { resolvePlaceholders } from './uploadMedia'

const heroSeed = {
  heroImage: '{{MEDIA:homepage-hero__bg.jpg}}',
  heroHeading: 'Zdjęcia, przy których możesz odetchnąć',
  heroSubheading:
    'Naturalna, ciepła i autentyczna fotografia kobieca, ślubna i rodzinna. Bez sztucznego pozowania, bez stresu — po prostu Ty, taka jaka jesteś.',
  heroPrimaryButtonLabel: 'Poznaj mnie bliżej',
  heroPrimaryButtonUrl: '/o-mnie',
  heroSecondaryButtonLabel: 'Zobacz moje kadry →',
  heroSecondaryButtonUrl: '/galeria',
}

export async function seedHomepage(payload: Payload): Promise<void> {
  payload.logger.info('[seed] resolving hero + 9 block placeholders…')

  const layoutBlocks = [
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
  const hero = await resolvePlaceholders(payload, heroSeed, cache)
  const layout = await resolvePlaceholders(payload, layoutBlocks, cache)

  await payload.updateGlobal({
    slug: 'homepage',
    data: {
      ...hero,
      layout,
    } as never,
  })

  payload.logger.info(`[seed] homepage populated with ${layoutBlocks.length} blocks`)
}
