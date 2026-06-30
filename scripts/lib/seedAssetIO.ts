import { readFile } from 'fs/promises'
import path from 'path'

import { mimeFromExt } from './uploadMedia'

export const SEED_ASSETS_ROOT = path.resolve(process.cwd(), 'scripts/seed-assets')

/** Normalizes `seed-assets/foo.png` or `/seed-assets/foo.png` to a basename. */
export function seedAssetBasename(logicalPath: string): string {
  return logicalPath.replace(/^\/?seed-assets\//, '')
}

/** Absolute path on disk for a seed asset logical path. */
export function resolveSeedAssetAbs(logicalPath: string): string {
  return path.join(SEED_ASSETS_ROOT, seedAssetBasename(logicalPath))
}

export async function readSeedAsset(logicalPath: string): Promise<{
  buffer: Buffer
  basename: string
  mimetype: string
}> {
  const abs = resolveSeedAssetAbs(logicalPath)
  const buffer = await readFile(abs)
  return {
    buffer,
    basename: path.basename(abs),
    mimetype: mimeFromExt(abs),
  }
}
