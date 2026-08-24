/**
 * Re-attach live client photos to galleries after frames fix overwrote `photos[]`
 * with Figma seed assets. Cover + photos become `live-{slug}-NNN.jpg` again;
 * collage frames (hero/duo/venue) stay as Figma crops.
 *
 * Local-only.
 */
import { loadSeedEnv } from './lib/seedEnv'
import { CASE_STUDY_SLUG } from './lib/gallerySeedShared'

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

function mediaId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value && typeof (value as { id: unknown }).id === 'number') {
    return (value as { id: number }).id
  }
  return null
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
      where: {
        filename: {
          like: `live-${slug}-%`,
        },
      },
      sort: 'filename',
    })

    // Exact prefix only: `live-{slug}-001.jpg`, never `live-{slug}-2-001.jpg`.
    const livePrefix = `live-${slug}-`
    const liveDocs = media.docs
      .filter((m) => {
        const name = typeof m.filename === 'string' ? m.filename : ''
        if (!name.startsWith(livePrefix)) return false
        const rest = name.slice(livePrefix.length)
        return /^\d{3}\./.test(rest)
      })
      .sort((a, b) => String(a.filename).localeCompare(String(b.filename)))

    if (liveDocs.length === 0) {
      payload.logger.warn(`No live-* media for ${slug}`)
      continue
    }

    const photoIds = liveDocs.map((m) => m.id as number)
    const coverId = photoIds[0]!

    await payload.update({
      collection: 'galleries',
      id: doc.id,
      data: {
        coverImage: coverId,
        photos: photoIds.map((image, i) => ({
          image,
          caption: `${doc.title} — zdjęcie ${i + 1}`,
        })),
        // Keep existing collage frame fields; do not touch hero/duo/venue image IDs.
      },
      context: { disableRevalidate: true },
    })

    payload.logger.info(
      `Restored ${photoIds.length} live photos for ${slug} (cover #${coverId}; previous cover ${mediaId(doc.coverImage)})`,
    )
  }

  payload.logger.info('Done restoring live gallery photos.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
