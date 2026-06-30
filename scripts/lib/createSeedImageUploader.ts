import type { Payload } from 'payload'

import { getSeedAssetByStem } from './seedContentAssets'
import { readSeedAsset } from './seedAssetIO'
import { mimeFromExt } from './uploadMedia'

/** Uploads a seed asset by stem (e.g. `case-study-hero-bg`). Deduplicates by stem. */
export function createSeedImageUploader(payload: Payload, prefix: string) {
  const cache = new Map<string, number>()
  let counter = 0

  return async (stem: string, alt: string): Promise<number> => {
    const cached = cache.get(stem)
    if (cached) return cached

    const asset = getSeedAssetByStem(stem)
    if (!asset) {
      throw new Error(`Unknown seed asset stem: ${stem}`)
    }

    const { buffer, basename } = await readSeedAsset(asset.path)
    const uniqueName = `${prefix}-${String(++counter).padStart(3, '0')}-${basename}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        name: uniqueName,
        data: buffer,
        mimetype: mimeFromExt(basename),
        size: buffer.byteLength,
      },
      context: { disableRevalidate: true },
    })

    const id = doc.id as number
    cache.set(stem, id)
    payload.logger.info(`Uploaded ${basename} -> media #${id}`)
    return id
  }
}
