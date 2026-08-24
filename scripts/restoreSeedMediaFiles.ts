/**
 * Restore `public/media/` files wiped by the ENOSPC recovery, by matching
 * Payload media filenames back to `scripts/seed-assets/`. Local-only.
 *
 * Usage: pnpm exec tsx scripts/restoreSeedMediaFiles.ts
 */
import { copyFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import { loadSeedEnv } from './lib/seedEnv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const SEED_ASSETS = path.join(REPO_ROOT, 'scripts/seed-assets')
const PUBLIC_MEDIA = path.join(REPO_ROOT, 'public/media')

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

/** `offer-shared-001-offer-service-hero-main.png` → `offer-service-hero-main.png` */
function stemFromSeededFilename(filename: string): string | null {
  const base = path.basename(filename)
  if (/-\d+x\d+\./.test(base)) return null
  if (base.startsWith('live-')) return null

  let withoutExt = base.replace(/\.[^.]+$/, '')
  // Strip repeated `token-NNN-` / `token-token-NNN-` seed prefixes.
  for (let i = 0; i < 4; i++) {
    const next = withoutExt.replace(/^[a-z]+(?:-[a-z]+)*-\d{3}-/i, '')
    if (next === withoutExt) break
    withoutExt = next
  }

  return withoutExt || null
}

/** Candidate stems — also try dropping a trailing `-1` / `-2` Payload duplicate suffix. */
function stemCandidates(filename: string): string[] {
  const stem = stemFromSeededFilename(filename)
  if (!stem) return []
  const withoutDup = stem.replace(/-\d+$/, '')
  return withoutDup && withoutDup !== stem ? [stem, withoutDup] : [stem]
}

async function main(): Promise<void> {
  assertLocalOnly()
  await mkdir(PUBLIC_MEDIA, { recursive: true })

  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()

  const media = await payload.find({
    collection: 'media',
    limit: 2000,
    pagination: false,
    depth: 0,
  })

  let restored = 0
  let skipped = 0
  let missingAsset = 0

  for (const doc of media.docs) {
    const filename = typeof doc.filename === 'string' ? doc.filename : null
    if (!filename) continue

    const dest = path.join(PUBLIC_MEDIA, filename)
    if (existsSync(dest)) {
      skipped += 1
      continue
    }

    const stems = stemCandidates(filename)
    if (stems.length === 0) {
      skipped += 1
      continue
    }

    const candidates = stems.flatMap((stem) => [
      path.join(SEED_ASSETS, `${stem}.png`),
      path.join(SEED_ASSETS, `${stem}.jpg`),
      path.join(SEED_ASSETS, `${stem}.jpeg`),
      path.join(SEED_ASSETS, `${stem}.webp`),
    ])
    const src = candidates.find((p) => existsSync(p))
    if (!src) {
      missingAsset += 1
      payload.logger.warn(`No seed asset for ${filename} (stems ${stems.join(', ')})`)
      continue
    }

    await copyFile(src, dest)
    restored += 1
    payload.logger.info(`Restored ${filename}`)
  }

  payload.logger.info(
    `Done — restored ${restored}, already present ${skipped}, unmatched ${missingAsset}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
