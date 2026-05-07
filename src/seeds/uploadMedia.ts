import fs from 'node:fs/promises'
import path from 'node:path'
import type { Payload } from 'payload'

const SEED_IMAGES_DIR = path.resolve(process.cwd(), 'public/seed-images')
const PLACEHOLDER_REGEX = /^\{\{MEDIA:(.+)\}\}$/

type MediaCache = Map<string, number | string>

const mimeFromExt = (filename: string): string => {
  const ext = path.extname(filename).toLowerCase()
  if (ext === '.png') return 'image/png'
  if (ext === '.webp') return 'image/webp'
  if (ext === '.svg') return 'image/svg+xml'
  if (ext === '.gif') return 'image/gif'
  return 'image/jpeg'
}

const altFromFilename = (filename: string): string => {
  const stem = filename.replace(/\.[^.]+$/, '')
  const localPart = stem.includes('__') ? stem.split('__')[1] : stem
  return localPart.replace(/[-_]+/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
}

export async function uploadMedia(
  payload: Payload,
  filename: string,
  cache: MediaCache,
): Promise<number | string | null> {
  if (cache.has(filename)) return cache.get(filename)!

  const existing = await payload.find({
    collection: 'media',
    where: { filename: { equals: filename } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    const id = existing.docs[0].id
    cache.set(filename, id)
    return id
  }

  const filePath = path.join(SEED_IMAGES_DIR, filename)
  let buffer: Buffer
  try {
    buffer = await fs.readFile(filePath)
  } catch {
    payload.logger.warn(`[seed] missing asset: ${filePath} — field will stay null`)
    return null
  }

  const doc = await payload.create({
    collection: 'media',
    data: { alt: altFromFilename(filename) },
    file: {
      data: buffer,
      mimetype: mimeFromExt(filename),
      name: filename,
      size: buffer.byteLength,
    },
  })
  cache.set(filename, doc.id)
  payload.logger.info(`[seed] uploaded ${filename} → media id ${doc.id}`)
  return doc.id
}

export async function resolvePlaceholders<T>(
  payload: Payload,
  obj: T,
  cache: MediaCache = new Map(),
): Promise<T> {
  if (typeof obj === 'string') {
    const match = obj.match(PLACEHOLDER_REGEX)
    if (match) {
      const id = await uploadMedia(payload, match[1], cache)
      return id as T
    }
    return obj
  }
  if (Array.isArray(obj)) {
    const resolved = await Promise.all(obj.map((item) => resolvePlaceholders(payload, item, cache)))
    return resolved as T
  }
  if (obj && typeof obj === 'object') {
    const result: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(obj)) {
      result[k] = await resolvePlaceholders(payload, v, cache)
    }
    return result as T
  }
  return obj
}
