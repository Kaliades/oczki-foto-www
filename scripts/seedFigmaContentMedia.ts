import { config as loadEnv } from 'dotenv'

loadEnv()

if (process.env.POSTGRES_URL_LOCAL) {
  process.env.POSTGRES_URL = process.env.POSTGRES_URL_LOCAL
}

import type { Payload } from 'payload'

import {
  SEED_CONTENT_ASSETS,
  seedAssetStem,
  mediaFilenameMatchesStem,
} from './lib/seedContentAssets'
import { createUploadMedia } from './lib/uploadMedia'
import { runSeedCli } from './lib/seedCli'

/**
 * Ensures every seed content PNG has a matching Media record (by filename stem).
 * Skips assets already present — safe to run after the other seed steps.
 */
export async function seedFigmaContentMedia(payload: Payload): Promise<void> {
  const upload = createUploadMedia(payload, { prefix: 'seed-content' })

  const existing = await payload.find({
    collection: 'media',
    limit: 500,
    pagination: false,
    depth: 0,
  })

  const stemsPresent = new Set<string>()
  for (const doc of existing.docs) {
    if (typeof doc.filename !== 'string') continue
    for (const asset of SEED_CONTENT_ASSETS) {
      const stem = seedAssetStem(asset.path)
      if (mediaFilenameMatchesStem(doc.filename, stem)) {
        stemsPresent.add(stem)
      }
    }
  }

  let uploaded = 0
  let skipped = 0

  for (const asset of SEED_CONTENT_ASSETS) {
    const stem = seedAssetStem(asset.path)
    if (stemsPresent.has(stem)) {
      skipped++
      continue
    }

    try {
      await upload(asset.path, asset.alt)
      stemsPresent.add(stem)
      uploaded++
    } catch {
      payload.logger.warn(`Seed asset missing on disk, skipping: ${asset.path}`)
    }
  }

  payload.logger.info(
    `Seed content media — uploaded ${uploaded}, already present ${skipped}, total catalog ${SEED_CONTENT_ASSETS.length}`,
  )
}

runSeedCli(seedFigmaContentMedia, 'seedFigmaContentMedia')
