/**
 * Wire each gallery's own live photos into case-study section frames
 * (hero / duo / venue / testimonial / memorable). Fixes "still seeing Figma
 * wedding photos on Dominika etc."
 *
 * Local-only.
 */
import { loadSeedEnv } from './lib/seedEnv'

function assertLocalOnly(): void {
  if (process.env.SEED_TARGET === 'production') {
    throw new Error('Refusing: SEED_TARGET=production')
  }
  loadSeedEnv()
  const url = process.env.POSTGRES_URL ?? ''
  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    throw new Error('Refusing non-local Postgres')
  }
}

function pick(ids: number[], index: number): number {
  return ids[Math.min(index, ids.length - 1)]!
}

async function main(): Promise<void> {
  assertLocalOnly()
  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()

  const galleries = await payload.find({
    collection: 'galleries',
    limit: 500,
    pagination: false,
    depth: 0,
  })

  for (const doc of galleries.docs) {
    const slug = doc.slug ?? ''
    if (!slug) continue

    const media = await payload.find({
      collection: 'media',
      limit: 200,
      pagination: false,
      depth: 0,
      where: { filename: { like: `live-${slug}-%` } },
      sort: 'filename',
    })

    const livePrefix = `live-${slug}-`
    const photoIds = media.docs
      .filter((m) => {
        const name = typeof m.filename === 'string' ? m.filename : ''
        if (!name.startsWith(livePrefix)) return false
        return /^\d{3}\./.test(name.slice(livePrefix.length))
      })
      .sort((a, b) => String(a.filename).localeCompare(String(b.filename)))
      .map((m) => m.id as number)

    if (photoIds.length === 0) {
      payload.logger.warn(`Skip ${slug} — no live photos`)
      continue
    }

    const alt = doc.title

    await payload.update({
      collection: 'galleries',
      id: doc.id,
      data: {
        coverImage: pick(photoIds, 0),
        photos: photoIds.map((image, i) => ({
          image,
          caption: `${alt} — zdjęcie ${i + 1}`,
        })),
        hero: {
          backgroundImage: pick(photoIds, 0),
          backgroundAlt: alt,
        },
        duoPerspective: {
          photo: pick(photoIds, 1),
          photoAlt: alt,
        },
        venueStory: {
          backImage: pick(photoIds, 2),
          backAlt: alt,
          frontImage: pick(photoIds, 3),
          frontAlt: alt,
          scallopImage: pick(photoIds, 4),
          scallopAlt: alt,
        },
        testimonial: {
          items: [
            {
              quote:
                typeof doc.testimonial?.items?.[0]?.quote === 'string'
                  ? doc.testimonial.items[0].quote
                  : '',
              author:
                typeof doc.testimonial?.items?.[0]?.author === 'string'
                  ? doc.testimonial.items[0].author
                  : '',
              photo: pick(photoIds, 5),
              photoAlt: alt,
            },
          ],
        },
        memorableMoment: {
          portraitPhoto: pick(photoIds, 6),
          portraitAlt: alt,
          landscapePhoto: pick(photoIds, 7),
          landscapeAlt: alt,
        },
      },
      context: { disableRevalidate: true },
    })

    payload.logger.info(`Wired ${photoIds.length} live frames for ${slug}`)
  }

  payload.logger.info('Done — case-study sections now use each gallery’s live photos.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
