/**
 * Migrate production media files from Vercel Blob → Cloudflare R2
 * and rewrite CMS URLs to the R2 public base.
 *
 * Safety:
 * - dry-run unless `--apply`
 * - does not delete Blob objects (manual cleanup later)
 * - `--skip-hq` (default on) leaves gallery HQ masters/variants untouched
 * - skips PutObject when the R2 key already exists (HeadObject)
 *
 * Usage:
 *   SEED_TARGET=production pnpm migrate:blob-to-r2
 *   SEED_TARGET=production pnpm migrate:blob-to-r2:apply
 *   … -- --include-hq          also migrate `*-hq*` (usually already on R2)
 *   … -- --include-live-orphans also migrate old `live-*` (pre-HQ gallery Blob leftovers)
 *   … -- --force-upload        re-upload even if R2 key exists
 *   … -- --offer-slugs=a,b     only media referenced by those offerItems
 *   … -- --client-uploads-only skip Figma/seed filenames (offer-*, placeholder-*, …)
 *                              (default ON when --offer-slugs is set; force OFF with
 *                              --include-seed-uploads)
 */
import { HeadObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import type { Media } from '../src/payload-types'

import { loadSeedEnv } from './lib/seedEnv'

const APPLY = process.argv.includes('--apply')
/** Default: skip gallery HQ — they already live on R2 from migrateGalleryHqToR2. */
const SKIP_HQ = !process.argv.includes('--include-hq')
/** Default: skip old `live-*` Blob leftovers from pre-HQ gallery seeds. */
const SKIP_LIVE_ORPHANS = !process.argv.includes('--include-live-orphans')
const FORCE_UPLOAD = process.argv.includes('--force-upload')

function parseCsvArg(name: string): string[] {
  const prefix = `${name}=`
  const inline = process.argv.find((a) => a.startsWith(prefix))
  if (inline) {
    return inline
      .slice(prefix.length)
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  const idx = process.argv.indexOf(name)
  if (idx >= 0 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith('--')) {
    return process.argv[idx + 1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

const OFFER_SLUGS = parseCsvArg('--offer-slugs')
const CLIENT_UPLOADS_ONLY =
  process.argv.includes('--client-uploads-only') ||
  (OFFER_SLUGS.length > 0 && !process.argv.includes('--include-seed-uploads'))

const MEDIA_KEY_RE = /(image|photo|media|portrait|landscape|cover|scallop|background|icon|logo|og)/i
const SEED_FILENAME_RE =
  /^(offer-|placeholder-|home-|about-|footer-|og-|figma|common-)/i

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

function productionSiteBase(): string | null {
  const fromEnv = (process.env.NEXT_PUBLIC_SERVER_URL || '').replace(/\/$/, '')
  if (fromEnv && !/localhost|127\.0\.0\.1/i.test(fromEnv)) return fromEnv
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/^https?:\/\//, '')}`
  }
  return 'https://oczki-foto-www.vercel.app'
}

function siteMediaUrl(filename: string): string | null {
  const base = productionSiteBase()
  if (!base) return null
  return `${base}/api/media/file/${encodeURIComponent(filename)}`
}

function isAlreadyR2Url(publicBase: string, url: string | null | undefined): boolean {
  if (!url) return false
  return url.startsWith(publicBase.replace(/\/$/, '')) || url.includes('.r2.dev/')
}

function isHqMedia(doc: Media): boolean {
  if (doc.filename?.includes('-hq')) return true
  return SIZE_KEYS.some((size) => doc.sizes?.[size]?.filename?.includes('-hq'))
}

/** Pre-HQ gallery seed files: `live-{slug}-14.jpg` (not `…-hq…`). */
function isLiveOrphan(doc: Media): boolean {
  const fn = doc.filename || ''
  return fn.startsWith('live-') && !fn.includes('-hq')
}

/** Client CMS uploads (real JPG/WebP names), not Figma/seed placeholders. */
function isClientUpload(doc: Media): boolean {
  const fn = doc.filename || ''
  if (!fn) return false
  if (SEED_FILENAME_RE.test(fn) || /placeholder/i.test(fn)) return false
  return /\.(jpe?g|webp)$/i.test(fn)
}

function collectMediaIds(node: unknown, pathKey: string, out: number[]): void {
  if (node == null) return
  if (typeof node === 'number' && Number.isInteger(node)) {
    const leaf = pathKey.split('.').pop() || ''
    if (MEDIA_KEY_RE.test(leaf)) out.push(node)
    return
  }
  if (Array.isArray(node)) {
    node.forEach((n, i) => collectMediaIds(n, `${pathKey}[${i}]`, out))
    return
  }
  if (typeof node === 'object') {
    const o = node as Record<string, unknown>
    if (
      'id' in o &&
      typeof o.id === 'number' &&
      ('url' in o || 'filename' in o || 'mimeType' in o)
    ) {
      out.push(o.id)
      return
    }
    for (const [k, v] of Object.entries(o)) {
      if (k === 'id' || k === 'relatedOfferItem' || k === 'folder') continue
      if (typeof v === 'number' && MEDIA_KEY_RE.test(k)) out.push(v)
      else collectMediaIds(v, pathKey ? `${pathKey}.${k}` : k, out)
    }
  }
}

function inMigrationScope(doc: Media, offerMediaIds: Set<number> | null): boolean {
  if (SKIP_HQ && isHqMedia(doc)) return false
  if (SKIP_LIVE_ORPHANS && isLiveOrphan(doc)) return false
  if (offerMediaIds && !offerMediaIds.has(Number(doc.id))) return false
  if (CLIENT_UPLOADS_ONLY && !isClientUpload(doc)) return false
  return true
}

async function r2ObjectExists(
  s3: S3Client,
  bucket: string,
  key: string,
): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }))
    return true
  } catch {
    return false
  }
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
    const siteBase = productionSiteBase()
    const hints = [
      typeof doc.url === 'string' && doc.url.startsWith('http') ? doc.url : null,
      blobPublicUrl(doc.filename),
      siteMediaUrl(doc.filename),
      doc.url && !doc.url.startsWith('http') && siteBase
        ? `${siteBase}${doc.url.startsWith('/') ? doc.url : `/${doc.url}`}`
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

  let offerMediaIds: Set<number> | null = null
  if (OFFER_SLUGS.length > 0) {
    const offerResult = await payload.find({
      collection: 'offerItems',
      depth: 2,
      limit: 100,
      overrideAccess: true,
      where: { slug: { in: OFFER_SLUGS } },
    })
    const foundSlugs = offerResult.docs.map((d) => (d as { slug?: string }).slug).filter(Boolean)
    const missing = OFFER_SLUGS.filter((s) => !foundSlugs.includes(s))
    if (missing.length) {
      throw new Error(`Offer slug(s) not found: ${missing.join(', ')}`)
    }
    const ids: number[] = []
    for (const doc of offerResult.docs) {
      collectMediaIds(doc, '', ids)
    }
    offerMediaIds = new Set(ids)
  }

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

  const scoped = docs.filter((d) => inMigrationScope(d, offerMediaIds))
  const skippedHq = docs.filter(isHqMedia).length
  const skippedLiveOrphans = docs.filter(isLiveOrphan).length

  console.log(
    JSON.stringify(
      {
        mode: APPLY ? 'APPLY' : 'DRY_RUN',
        offerSlugs: OFFER_SLUGS.length ? OFFER_SLUGS : null,
        offerMediaIdsCollected: offerMediaIds?.size ?? null,
        clientUploadsOnly: CLIENT_UPLOADS_ONLY,
        mediaDocsTotal: docs.length,
        mediaDocsInScope: scoped.length,
        skippedHqDocs: SKIP_HQ ? skippedHq : 0,
        skippedLiveOrphanDocs: SKIP_LIVE_ORPHANS ? skippedLiveOrphans : 0,
        skipHq: SKIP_HQ,
        skipLiveOrphans: SKIP_LIVE_ORPHANS,
        forceUpload: FORCE_UPLOAD,
        r2Bucket: r2.bucket,
        r2PublicHost: new URL(r2.publicUrl).host,
        siteFetchBase: productionSiteBase(),
        sampleInScope: scoped.slice(0, 12).map((d) => d.filename),
      },
      null,
      2,
    ),
  )

  let uploaded = 0
  let skippedExisting = 0
  let docsUpdated = 0
  let docsAlreadyOnR2 = 0
  let docsSkippedNoJobs = 0
  let failed = 0
  const sampleWouldTouch: string[] = []

  for (const doc of scoped) {
    const jobs = collectJobs(doc)
    if (jobs.length === 0) {
      docsSkippedNoJobs += 1
      continue
    }

    const allUrlsAlreadyR2 =
      isAlreadyR2Url(r2.publicUrl, doc.url) &&
      SIZE_KEYS.every((size) => {
        const variant = doc.sizes?.[size]
        return !variant?.filename || isAlreadyR2Url(r2.publicUrl, variant.url)
      })

    try {
      if (!APPLY) {
        if (sampleWouldTouch.length < 12 && doc.filename) {
          sampleWouldTouch.push(doc.filename)
        }
        uploaded += jobs.length
        if (allUrlsAlreadyR2) docsAlreadyOnR2 += 1
        else docsUpdated += 1
        continue
      }

      for (const job of jobs) {
        if (!FORCE_UPLOAD && (await r2ObjectExists(s3, r2.bucket, job.key))) {
          skippedExisting += 1
          continue
        }
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
          `progress: rewritten ${docsUpdated}/${scoped.length} docs, uploaded ${uploaded}, skippedExisting ${skippedExisting}`,
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
        uploadedOrWouldUploadObjects: uploaded,
        skippedExistingObjects: skippedExisting,
        docsUrlRewrite: docsUpdated,
        docsAlreadyOnR2,
        docsSkippedNoJobs,
        skippedHqDocs: SKIP_HQ ? skippedHq : 0,
        skippedLiveOrphanDocs: SKIP_LIVE_ORPHANS ? skippedLiveOrphans : 0,
        failed,
        sampleWouldTouch,
        note: APPLY
          ? 'Done. Do NOT set R2 on Vercel until you verify. Blob objects are untouched.'
          : 'DRY-RUN only — no R2 writes, no CMS URL rewrites. Re-run with --apply after OK.',
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
