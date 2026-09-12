/**
 * Migrate production media files from Vercel Blob → Cloudflare R2
 * and rewrite CMS URLs to the R2 public base.
 *
 * Safety:
 * - dry-run unless `--apply`
 * - does not delete Blob objects (manual cleanup later)
 *
 * Usage:
 *   SEED_TARGET=production pnpm migrate:blob-to-r2
 *   SEED_TARGET=production pnpm migrate:blob-to-r2:apply
 */
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { Media } from '../src/payload-types'

import { loadSeedEnv } from './lib/seedEnv'

const APPLY = process.argv.includes('--apply')

const SIZE_KEYS = [
  'thumbnail',
  'square',
  'small',
  'medium',
  'large',
  'xlarge',
  'og',
] as const

type SizeKey = (typeof SIZE_KEYS)[number]

type FileJob = {
  key: string
  mimeType: string
  sourceUrlHints: string[]
  label: string
}

type R2Config = {
  bucket: string
  endpoint: string
  accessKeyId: string
  secretAccessKey: string
  publicUrl: string
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required`)
  return value
}

function r2PublicUrl(publicBase: string, key: string): string {
  const base = publicBase.replace(/\/$/, '')
  return `${base}/${key.split('/').map(encodeURIComponent).join('/')}`
}

function blobPublicUrl(filename: string): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null
  if (process.env.STORAGE_VERCEL_BLOB_BASE_URL) {
    return `${process.env.STORAGE_VERCEL_BLOB_BASE_URL.replace(/\/$/, '')}/${encodeURIComponent(filename)}`
  }
  const storeId = token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase()
  return storeId
    ? `https://${storeId}.public.blob.vercel-storage.com/${encodeURIComponent(filename)}`
    : null
}

function siteMediaUrl(filename: string): string | null {
  const base =
    process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : null)
  if (!base || base.includes('localhost')) return null
  return `${base}/api/media/file/${encodeURIComponent(filename)}`
}

function isAlreadyR2Url(publicBase: string, url: string | null | undefined): boolean {
  if (!url) return false
  return url.startsWith(publicBase.replace(/\/$/, ''))
}

async function fetchBytes(urls: string[]): Promise<{ buffer: Buffer; contentType: string }> {
  const errors: string[] = []
  for (const url of urls) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        errors.push(`${url} → ${res.status}`)
        continue
      }
      const buffer = Buffer.from(await res.arrayBuffer())
      return {
        buffer,
        contentType: res.headers.get('content-type') || 'application/octet-stream',
      }
    } catch (error) {
      errors.push(`${url} → ${error instanceof Error ? error.message : String(error)}`)
    }
  }
  throw new Error(`Could not fetch file. Tried: ${errors.join(' | ')}`)
}

function collectJobs(doc: Media): FileJob[] {
  const jobs: FileJob[] = []

  if (doc.filename) {
    const hints = [
      typeof doc.url === 'string' && doc.url.startsWith('http') ? doc.url : null,
      blobPublicUrl(doc.filename),
      siteMediaUrl(doc.filename),
      doc.url && !doc.url.startsWith('http')
        ? `${(process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')}${doc.url.startsWith('/') ? doc.url : `/${doc.url}`}`
        : null,
    ].filter((u): u is string => Boolean(u))

    jobs.push({
      key: doc.filename,
      mimeType: doc.mimeType || 'application/octet-stream',
      sourceUrlHints: hints,
      label: `media#${doc.id} original`,
    })
  }

  for (const size of SIZE_KEYS) {
    const variant = doc.sizes?.[size]
    if (!variant?.filename) continue

    const hints = [
      typeof variant.url === 'string' && variant.url.startsWith('http') ? variant.url : null,
      blobPublicUrl(variant.filename),
      siteMediaUrl(variant.filename),
    ].filter((u): u is string => Boolean(u))

    jobs.push({
      key: variant.filename,
      mimeType: variant.mimeType || doc.mimeType || 'application/octet-stream',
      sourceUrlHints: hints,
      label: `media#${doc.id} ${size}`,
    })
  }

  return jobs
}

function buildUpdatedSizes(doc: Media, publicBase: string): Media['sizes'] | undefined {
  if (!doc.sizes) return undefined
  const next: NonNullable<Media['sizes']> = { ...doc.sizes }

  for (const size of SIZE_KEYS) {
    const variant = doc.sizes[size]
    if (!variant?.filename) continue
    next[size] = {
      ...variant,
      url: r2PublicUrl(publicBase, variant.filename),
    }
  }

  return next
}

async function main(): Promise<void> {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing to run without SEED_TARGET=production')
  }

  loadSeedEnv()

  // Capture R2 config, then strip plugin-enabling vars so Payload `find()` returns
  // real DB URLs (not generateFileURL rewrites as if files were already on R2).
  const r2: R2Config = {
    bucket: requireEnv('R2_BUCKET'),
    endpoint: requireEnv('R2_ENDPOINT'),
    accessKeyId: requireEnv('R2_ACCESS_KEY_ID'),
    secretAccessKey: requireEnv('R2_SECRET_ACCESS_KEY'),
    publicUrl: requireEnv('R2_PUBLIC_URL').replace(/\/$/, ''),
  }
  delete process.env.R2_BUCKET
  delete process.env.R2_ACCESS_KEY_ID
  delete process.env.R2_SECRET_ACCESS_KEY
  delete process.env.R2_ENDPOINT
  delete process.env.R2_PUBLIC_URL

  if (!process.env.BLOB_READ_WRITE_TOKEN && !process.env.NEXT_PUBLIC_SERVER_URL) {
    throw new Error('Need BLOB_READ_WRITE_TOKEN and/or NEXT_PUBLIC_SERVER_URL to read source files')
  }

  const s3 = new S3Client({
    region: 'auto',
    endpoint: r2.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: r2.accessKeyId,
      secretAccessKey: r2.secretAccessKey,
    },
  })

  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()
  payload.logger.info = (() => {}) as typeof payload.logger.info

  const docs: Media[] = []
  let page = 1
  while (true) {
    const result = await payload.find({
      collection: 'media',
      depth: 0,
      limit: 100,
      page,
      overrideAccess: true,
    })
    docs.push(...(result.docs as Media[]))
    if (!result.hasNextPage) break
    page += 1
  }

  console.log(
    JSON.stringify(
      {
        mode: APPLY ? 'APPLY' : 'DRY_RUN',
        mediaDocs: docs.length,
        r2Bucket: r2.bucket,
        r2PublicHost: new URL(r2.publicUrl).host,
        sampleUrl: docs[0]?.url ?? null,
      },
      null,
      2,
    ),
  )

  let uploaded = 0
  let docsUpdated = 0
  let docsAlreadyOnR2 = 0
  let failed = 0

  for (const doc of docs) {
    const jobs = collectJobs(doc)
    if (jobs.length === 0) continue

    const allUrlsAlreadyR2 =
      isAlreadyR2Url(r2.publicUrl, doc.url) &&
      SIZE_KEYS.every((size) => {
        const variant = doc.sizes?.[size]
        return !variant?.filename || isAlreadyR2Url(r2.publicUrl, variant.url)
      })

    try {
      if (!APPLY) {
        uploaded += jobs.length
        if (allUrlsAlreadyR2) docsAlreadyOnR2 += 1
        else docsUpdated += 1
        continue
      }

      for (const job of jobs) {
        const { buffer, contentType } = await fetchBytes(job.sourceUrlHints)
        await s3.send(
          new PutObjectCommand({
            Bucket: r2.bucket,
            Key: job.key,
            Body: buffer,
            ContentType: job.mimeType || contentType,
            CacheControl: 'public, max-age=31536000, immutable',
          }),
        )
        uploaded += 1
      }

      if (allUrlsAlreadyR2) {
        docsAlreadyOnR2 += 1
        continue
      }

      const nextUrl = doc.filename ? r2PublicUrl(r2.publicUrl, doc.filename) : doc.url
      const nextSizes = buildUpdatedSizes(doc, r2.publicUrl)
      const thumbFilename = doc.sizes?.thumbnail?.filename
      const nextThumb = thumbFilename
        ? r2PublicUrl(r2.publicUrl, thumbFilename)
        : doc.thumbnailURL

      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: nextUrl,
          thumbnailURL: nextThumb,
          ...(nextSizes ? { sizes: nextSizes } : {}),
        },
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      docsUpdated += 1

      if (docsUpdated % 25 === 0) {
        console.log(
          `progress: rewritten ${docsUpdated}/${docs.length} docs, uploaded ${uploaded} objects`,
        )
      }
    } catch (error) {
      failed += 1
      console.error(
        `FAIL media#${doc.id} (${doc.filename ?? 'no-filename'}):`,
        error instanceof Error ? error.message : error,
      )
    }
  }

  console.log(
    JSON.stringify(
      {
        uploadedOrWouldUpload: uploaded,
        docsUrlRewrite: docsUpdated,
        docsAlreadyOnR2,
        failed,
        note: APPLY
          ? 'Done. Add the same R2_* env vars on Vercel and redeploy. Blob can stay until you confirm.'
          : 'Dry-run only. Re-run with --apply to upload + rewrite URLs.',
      },
      null,
      2,
    ),
  )

  process.exit(failed > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
