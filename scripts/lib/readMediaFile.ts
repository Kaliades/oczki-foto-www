import fs from 'fs/promises'
import path from 'path'

import type { Media } from '@/payload-types'

import { isLocalMediaStorage } from '@/utilities/isLocalMediaStorage'
import { getServerSideURL } from '@/utilities/getURL'

const MEDIA_DIR = path.resolve(process.cwd(), 'public/media')

function resolveMediaFetchUrl(source: Media): string {
  const raw = source.url
  if (!raw) {
    throw new Error(`Media #${source.id} has no url — cannot read file bytes`)
  }

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  const base = getServerSideURL().replace(/\/$/, '')
  return raw.startsWith('/') ? `${base}${raw}` : `${base}/${raw}`
}

async function readLocalMediaFile(filename: string): Promise<Buffer | null> {
  const filePath = path.join(MEDIA_DIR, filename)
  try {
    return await fs.readFile(filePath)
  } catch {
    return null
  }
}

/**
 * Reads the original media bytes from local disk or remote storage (Vercel Blob).
 * Prefers local `public/media` when the file exists (dev); otherwise fetches via URL.
 */
export async function readMediaFileBytes(source: Media): Promise<{
  buffer: Buffer
  mimetype: string
  filename: string
}> {
  if (!source.filename && !source.url) {
    throw new Error(`Media #${source.id} has no filename or url`)
  }

  const mimetype = source.mimeType ?? 'application/octet-stream'
  const filename = source.filename ?? `media-${source.id}`

  if (source.filename) {
    const local = await readLocalMediaFile(source.filename)
    if (local) {
      return { buffer: local, mimetype, filename }
    }
  }

  if (isLocalMediaStorage() && source.filename) {
    throw new Error(
      `Media #${source.id} (${source.filename}) not found in ${MEDIA_DIR}. ` +
        'Upload may be missing locally.',
    )
  }

  const fetchUrl = resolveMediaFetchUrl(source)
  const response = await fetch(fetchUrl)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch media #${source.id} from ${fetchUrl} (${response.status} ${response.statusText})`,
    )
  }

  const arrayBuffer = await response.arrayBuffer()
  return {
    buffer: Buffer.from(arrayBuffer),
    mimetype: response.headers.get('content-type') ?? mimetype,
    filename,
  }
}
