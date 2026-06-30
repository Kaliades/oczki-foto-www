import type { Payload } from 'payload'

import { readSeedAsset, seedAssetBasename } from './seedAssetIO'

export function mimeFromExt(filePath: string): string {
  const ext = filePath.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'png':
      return 'image/png'
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'webp':
      return 'image/webp'
    case 'svg':
      return 'image/svg+xml'
    default:
      return 'application/octet-stream'
  }
}

export type UploadMediaFn = (assetPath: string, alt: string) => Promise<number>

/**
 * Deduplicated uploader for seed assets under `scripts/seed-assets/`.
 * Logical paths use the `/seed-assets/<file>.png` prefix.
 */
export function createUploadMedia(payload: Payload, options?: { prefix?: string }): UploadMediaFn {
  const cache = new Map<string, number>()
  let counter = 0
  const prefix = options?.prefix ?? 'seed'

  return async (assetPath: string, alt: string): Promise<number> => {
    const normalized = assetPath.startsWith('/') ? assetPath : `/${assetPath}`
    const cached = cache.get(normalized)
    if (cached) return cached

    const { buffer, basename, mimetype } = await readSeedAsset(normalized)
    const uniqueName = `${prefix}-${String(++counter).padStart(3, '0')}-${basename}`

    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        name: uniqueName,
        data: buffer,
        mimetype,
        size: buffer.byteLength,
      },
      context: { disableRevalidate: true },
    })

    const id = doc.id as number
    cache.set(normalized, id)
    payload.logger.info(`Uploaded ${seedAssetBasename(normalized)} -> media #${id}`)
    return id
  }
}
