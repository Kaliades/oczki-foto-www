import fs from 'fs/promises'
import path from 'path'

import type { Media } from '@/payload-types'

import { isLocalMediaStorage } from '@/utilities/isLocalMediaStorage'
import { getServerSideURL } from '@/utilities/getURL'

const MEDIA_DIR = path.resolve(process.cwd(), 'public/media')

function getVercelBlobBaseUrl(): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null

  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) {
    return process.env.STORAGE_VERCEL_BLOB_BASE_URL.replace(/\/$/, '')
  }

  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  return storeId ? `https://${storeId}.public.blob.vercel-storage.com` : null
}

function buildVercelBlobFileUrl(filename: string): string | null {
  const base = getVercelBlobBaseUrl()
  if (!base) return null
  return `${base}/${encodeURIComponent(filename)}`
}

function getMigrationMediaBaseUrl(): string {
  if (process.env.SEED_TARGET === 'production') {
    const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '')
    if (fromEnv && !fromEnv.includes('localhost') && !fromEnv.includes('127.0.0.1')) {
      return fromEnv
    }

    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
      return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`.replace(/\/$/, '')
    }
  }

  return getServerSideURL().replace(/\/$/, '')
}

function resolveMediaFetchUrl(source: Media): string {
  const raw = source.url
  if (!raw) {
    throw new Error(`Media #${source.id} has no url — cannot read file bytes`)
  }

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw
  }

  const base = getMigrationMediaBaseUrl()
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

async function fetchMediaBytes(
  fetchUrl: string,
  fallbackMimetype: string,
  filename: string,
): Promise<{ buffer: Buffer; mimetype: string; filename: string }> {
  const response = await fetch(fetchUrl)

  if (!response.ok) {
    throw new Error(
      `Failed to fetch media from ${fetchUrl} (${response.status} ${response.statusText})`,
    )
  }

  const arrayBuffer = await response.arrayBuffer()
  return {
    buffer: Buffer.from(arrayBuffer),
    mimetype: response.headers.get('content-type') ?? fallbackMimetype,
    filename,
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

  const fetchCandidates: string[] = []

  if (source.url?.startsWith('http://') || source.url?.startsWith('https://')) {
    fetchCandidates.push(source.url)
  }

  if (source.filename) {
    const blobUrl = buildVercelBlobFileUrl(source.filename)
    if (blobUrl) fetchCandidates.push(blobUrl)
  }

  if (source.url) {
    fetchCandidates.push(resolveMediaFetchUrl(source))
  }

  const uniqueCandidates = [...new Set(fetchCandidates)]
  const errors: string[] = []

  for (const fetchUrl of uniqueCandidates) {
    try {
      return await fetchMediaBytes(fetchUrl, mimetype, filename)
    } catch (error) {
      errors.push(error instanceof Error ? error.message : String(error))
    }
  }

  throw new Error(
    `Failed to read media #${source.id} (${filename}). Tried: ${uniqueCandidates.join(', ')}. ` +
      errors.join(' | '),
  )
}
