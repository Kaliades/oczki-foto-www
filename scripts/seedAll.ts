import { config as loadEnv } from 'dotenv'

loadEnv()

const isProductionSeed = process.env.SEED_TARGET === 'production'

if (isProductionSeed) {
  loadEnv({ path: '.env.local', override: true })
  loadEnv({ path: '.env.production.local', override: true })
} else if (process.env.POSTGRES_URL_LOCAL) {
  process.env.POSTGRES_URL = process.env.POSTGRES_URL_LOCAL
}

import type { Payload } from 'payload'

const { getSeedPayload } = await import('./lib/seedPayload')
const { seedCookieConsent } = await import('./seedCookieConsent')
const { seedGallery } = await import('./seedGallery')
const { seedGalleryPage } = await import('./seedGalleryPage')
const { seedHeader } = await import('./seedHeader')
const { seedHomePage } = await import('./seedHomePage')
const { seedMissingOffers } = await import('./seedMissingOffers')
const { seedOffer } = await import('./seedOffer')
const { seedPages } = await import('./seedPages')
const { seedPortfolioGalleries } = await import('./seedPortfolioGalleries')
const { seedSiteBrand } = await import('./seedSiteBrand')
const { seedSiteFooter } = await import('./seedSiteFooter')
const { seedFigmaContentMedia } = await import('./seedFigmaContentMedia')

const STEPS: { label: string; fn: (payload: Payload) => Promise<void> }[] = [
  { label: 'Site settings: footer + newsletter', fn: seedSiteFooter },
  { label: 'Site brand (OG image)', fn: seedSiteBrand },
  { label: 'Offer: sesje-kobiece', fn: seedOffer },
  { label: 'Offers: remaining thumbnails', fn: seedMissingOffers },
  { label: 'Gallery case study', fn: seedGallery },
  { label: 'Gallery portfolio listing', fn: seedPortfolioGalleries },
  { label: 'Globals: o-mnie, kontakt, polityka', fn: seedPages },
  { label: 'Header navigation', fn: seedHeader },
  { label: 'Cookie consent copy', fn: seedCookieConsent },
  { label: 'Home page blocks', fn: seedHomePage },
  { label: 'Gallery page global', fn: seedGalleryPage },
  { label: 'Seed content PNGs (supplemental media)', fn: seedFigmaContentMedia },
]

const started = Date.now()
console.log('Oczki — full CMS seed (single process)\n')
console.log('Connecting to Payload…')

const payload = await getSeedPayload()
console.log(`✓ Payload ready (${((Date.now() - started) / 1000).toFixed(1)}s)\n`)

for (const [index, step] of STEPS.entries()) {
  const stepStart = Date.now()
  console.log(`[${index + 1}/${STEPS.length}] ${step.label}`)
  await step.fn(payload)
  console.log(`  done in ${((Date.now() - stepStart) / 1000).toFixed(1)}s\n`)
}

console.log(`✓ Full seed complete in ${((Date.now() - started) / 1000).toFixed(1)}s`)
process.exit(0)
