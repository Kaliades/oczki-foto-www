/**
 * Wire published OfferItems into the home page `offerShowcase` block.
 * Local-only — does not re-upload media or recreate the page.
 */
import { loadSeedEnv } from './lib/seedEnv'

const OFFER_SLUG_ORDER = [
  'sesje-kobiece',
  'reportaze-slubne',
  'sesje-wizerunkowe',
  'sesje-rodzinne',
  'sesje-milosne',
] as const

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

async function main(): Promise<void> {
  assertLocalOnly()
  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()

  const offers = await payload.find({
    collection: 'offerItems',
    limit: 100,
    pagination: false,
    depth: 0,
  })

  const bySlug = new Map(
    offers.docs
      .filter((d) => typeof d.slug === 'string')
      .map((d) => [d.slug as string, d.id as number]),
  )

  const orderedIds = OFFER_SLUG_ORDER.map((slug) => bySlug.get(slug)).filter(
    (id): id is number => typeof id === 'number',
  )

  if (orderedIds.length === 0) {
    throw new Error('No offer items found — seed offers first')
  }

  const pages = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
    depth: 0,
  })
  const home = pages.docs[0]
  if (!home) {
    throw new Error('No home page — run seedHomePage first')
  }

  const layout = (home.layout ?? []).map((block) => {
    if (block.blockType !== 'offerShowcase') return block
    return { ...block, items: orderedIds }
  })

  await payload.update({
    collection: 'pages',
    id: home.id,
    data: { layout },
    context: { disableRevalidate: true },
  })

  payload.logger.info(
    `Wired ${orderedIds.length} offers into home offerShowcase: ${OFFER_SLUG_ORDER.filter((s) => bySlug.has(s)).join(', ')}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
