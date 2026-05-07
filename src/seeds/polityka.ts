import type { Payload } from 'payload'

import { PolicyHeroSeed } from '@/blocks/PolicyHero/seed'
import { PolicyContentSeed } from '@/blocks/PolicyContent/seed'

export async function seedPolityka(payload: Payload): Promise<void> {
  const layout = [PolicyHeroSeed, PolicyContentSeed]

  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'polityka-prywatnosci' } },
    limit: 1,
    pagination: false,
  })

  const data = {
    title: 'Polityka prywatności',
    slug: 'polityka-prywatnosci',
    _status: 'published',
    layout,
    meta: {
      title: 'Polityka prywatności — Oczki Fotografia',
      description:
        'Zasady przetwarzania danych osobowych oraz informacja o plikach cookies.',
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
    payload.logger.info(
      `[seed] updated 'polityka-prywatnosci' page (id=${existing.docs[0].id})`,
    )
  } else {
    const doc = await payload.create({
      collection: 'pages',
      data,
      draft: false,
      context: { disableRevalidate: true },
    })
    payload.logger.info(`[seed] created 'polityka-prywatnosci' page (id=${doc.id})`)
  }
}
