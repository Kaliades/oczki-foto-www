import type { Payload } from 'payload'

import { AboutHeroSeed } from '@/blocks/AboutHero/seed'
import { AboutValuesSeed } from '@/blocks/AboutValues/seed'
import { AboutApproachSeed } from '@/blocks/AboutApproach/seed'
import { AboutExpertiseSeed } from '@/blocks/AboutExpertise/seed'
import { AboutHobbiesSeed } from '@/blocks/AboutHobbies/seed'
import { AboutDuoBioSeed } from '@/blocks/AboutDuoBio/seed'
import { AboutCollaborationSeed } from '@/blocks/AboutCollaboration/seed'
import { AboutInstagramSeed } from '@/blocks/AboutInstagram/seed'
import { AboutCtaSeed } from '@/blocks/AboutCta/seed'
import { AboutNewsletterSeed } from '@/blocks/AboutNewsletter/seed'
import { resolvePlaceholders } from './uploadMedia'

export async function seedAbout(payload: Payload): Promise<void> {
  const cache = new Map<string, number | string>()
  const layoutBlocks = [
    AboutHeroSeed,
    AboutValuesSeed,
    AboutApproachSeed,
    AboutExpertiseSeed,
    AboutHobbiesSeed,
    AboutDuoBioSeed,
    AboutCollaborationSeed,
    AboutInstagramSeed,
    AboutCtaSeed,
    AboutNewsletterSeed,
  ]
  const layout = await resolvePlaceholders(payload, layoutBlocks, cache)

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'o-mnie' } },
    limit: 1,
    pagination: false,
  })

  const data = {
    title: 'O mnie',
    slug: 'o-mnie',
    _status: 'published',
    layout,
    meta: {
      title: 'O mnie — Oczki Fotografia',
      description:
        'Poznaj fotografkę Oczki — naturalność bez filtrów, komfort jako priorytet, brak sztywnych schematów.',
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
    payload.logger.info(`[seed] updated 'o-mnie' page (id=${existing.docs[0].id})`)
  } else {
    const doc = await payload.create({
      collection: 'pages',
      data,
      draft: false,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`[seed] created 'o-mnie' page (id=${doc.id})`)
  }
}
