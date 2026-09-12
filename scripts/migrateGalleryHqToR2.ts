/**
 * Batch: one live gallery → HQ masters from WP dump → Payload (Simon imageSizes) → R2.
 *
 * Keeps Vercel Blob for the rest of the site: do NOT set R2_* on Vercel yet.
 * This script loads R2 creds locally so `payload.create` writes to R2; other prod
 * media stay on Blob until you migrate them.
 *
 * Usage:
 *   SEED_TARGET=production pnpm migrate:gallery-hq-r2 -- --slug=sesja-kobieca-basi-w-plenerze-w-zlotej-godzinie-krakow
 *   SEED_TARGET=production pnpm migrate:gallery-hq-r2:apply -- --slug=...
 *
 * Options:
 *   --slug=...          CMS gallery slug (required)
 *   --limit=12          Max photos to attach to gallery.photos (default 12)
 *   --all-photos        Ignore --limit; upload+attach every matched dump file
 *   --apply             Write (default is dry-run)
 */
import { existsSync } from 'fs'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import sharp from 'sharp'

import { loadSeedEnv } from './lib/seedEnv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const MANIFEST_PATH = path.join(REPO_ROOT, 'scripts/live-gallery-staging/manifest.json')

const APPLY = process.argv.includes('--apply')
const ALL_PHOTOS = process.argv.includes('--all-photos')
const SLUG = process.argv.find((a) => a.startsWith('--slug='))?.split('=')[1]?.trim()
const LIMIT = Number(
  process.argv.find((a) => a.startsWith('--limit='))?.split('=')[1] ?? '12',
)

/** Agreed “looks like original” master for web */
const MAX_EDGE = Number(process.env.GALLERY_HQ_MAX_EDGE || '2800')
const JPEG_QUALITY = Number(process.env.GALLERY_HQ_JPEG_QUALITY || '94')

type ManifestPhoto = {
  relativePath: string
  matched?: boolean
  dumpAbsolutePath?: string
}

type ManifestStory = {
  title: string
  liveSlug: string
  cmsSlugHint?: string | null
  intro?: string | null
  matchedCount: number
  missingCount: number
  photos: ManifestPhoto[]
}

type ManifestPair = {
  liveSlug: string
  cmsSlug: string | null
  cmsId: number | null
}

type Manifest = {
  stories: ManifestStory[]
  pairs: ManifestPair[]
}

function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) throw new Error(`${name} is required`)
  return v
}

function resolveStory(manifest: Manifest, cmsSlug: string): ManifestStory {
  const pair = manifest.pairs.find((p) => p.cmsSlug === cmsSlug)
  const liveSlug = pair?.liveSlug ?? cmsSlug
  const story =
    manifest.stories.find((s) => s.liveSlug === liveSlug) ||
    manifest.stories.find((s) => s.cmsSlugHint === cmsSlug) ||
    manifest.stories.find((s) => s.liveSlug === cmsSlug)
  if (!story) {
    throw new Error(`No manifest story for CMS slug "${cmsSlug}" (liveSlug hint: ${liveSlug})`)
  }
  return story
}

async function prepareMaster(absPath: string): Promise<Buffer> {
  const img = sharp(absPath, { failOn: 'none' }).rotate()
  const meta = await img.metadata()
  const w = meta.width || 0
  const h = meta.height || 0
  const long = Math.max(w, h)

  let pipeline = sharp(absPath, { failOn: 'none' }).rotate()
  if (long > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_EDGE : undefined,
      height: h > w ? MAX_EDGE : undefined,
      withoutEnlargement: true,
      fit: 'inside',
    })
  }

  return pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
}

function pad(n: number): string {
  return String(n).padStart(3, '0')
}

async function main(): Promise<void> {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing to run without SEED_TARGET=production')
  }
  if (!SLUG) {
    throw new Error('Missing --slug=... (CMS gallery slug)')
  }

  loadSeedEnv()

  // R2 must be configured so payload.create stores on R2 (Simon imageSizes apply).
  requireEnv('R2_BUCKET')
  requireEnv('R2_ENDPOINT')
  requireEnv('R2_ACCESS_KEY_ID')
  requireEnv('R2_SECRET_ACCESS_KEY')
  requireEnv('R2_PUBLIC_URL')

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8')) as Manifest
  const story = resolveStory(manifest, SLUG)

  const matched = story.photos.filter((p) => p.matched && p.dumpAbsolutePath)
  const existing = matched.filter((p) => p.dumpAbsolutePath && existsSync(p.dumpAbsolutePath))
  const missingOnDisk = matched.length - existing.length

  const attachCount = ALL_PHOTOS ? existing.length : Math.min(LIMIT, existing.length)
  const toAttach = existing.slice(0, attachCount)

  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()
  payload.logger.info = (() => {}) as typeof payload.logger.info

  const galleryRes = await payload.find({
    collection: 'galleries',
    where: { slug: { equals: SLUG } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  const gallery = galleryRes.docs[0] as
    | {
        id: number
        slug: string
        title: string
        photos?: { id?: string; image?: number | null }[]
        coverImage?: number | null
      }
    | undefined

  if (!gallery) {
    throw new Error(`Gallery slug "${SLUG}" not found on production CMS`)
  }

  // Sample one file for size estimate
  let sampleMasterBytes = 0
  if (toAttach[0]?.dumpAbsolutePath) {
    sampleMasterBytes = (await prepareMaster(toAttach[0].dumpAbsolutePath)).byteLength
  }
  const estMastersMB = +((sampleMasterBytes * toAttach.length) / 1024 / 1024).toFixed(1)
  // Simon variants ~1.4× master on top (from earlier estimate ~2.36 total ⇒ variants ~1.36)
  const estTotalMB = +(estMastersMB * 2.36).toFixed(1)

  const plan = {
    mode: APPLY ? 'APPLY' : 'DRY_RUN',
    cmsSlug: SLUG,
    galleryId: gallery.id,
    galleryTitle: gallery.title,
    manifestLiveSlug: story.liveSlug,
    compress: { maxEdge: MAX_EDGE, jpegQuality: JPEG_QUALITY },
    photos: {
      matchedInManifest: matched.length,
      onDisk: existing.length,
      missingOnDisk,
      willUploadAndAttach: toAttach.length,
      allPhotosFlag: ALL_PHOTOS,
      limit: ALL_PHOTOS ? null : LIMIT,
    },
    naming: {
      pattern: `live-${SLUG}-NNN-hq.jpg`,
      example: `live-${SLUG}-001-hq.jpg`,
    },
    storage: {
      target: 'Cloudflare R2 (via Payload s3 plugin during this script)',
      publicHost: new URL(process.env.R2_PUBLIC_URL!).host,
      note: 'Do NOT set R2_* on Vercel yet — site keeps Blob for non-migrated media.',
    },
    sizeEstimateMB: {
      mastersOnly: estMastersMB,
      withSimonVariantsApprox: estTotalMB,
    },
    replaces: {
      coverImage: true,
      photosArray: true,
      caseStudyFrames: false,
      note: 'Pilot replaces cover + photos[]. Case-study hero/duo/venue frames stay on old Blob until a later pass.',
    },
  }

  const reportDir = path.join(
    REPO_ROOT,
    'scripts/prod-migration-backups',
    `gallery-hq-r2-${SLUG}-${new Date().toISOString().replace(/[:.]/g, '-')}`,
  )
  await mkdir(reportDir, { recursive: true })
  await writeFile(path.join(reportDir, 'plan.json'), JSON.stringify(plan, null, 2))

  console.log(JSON.stringify(plan, null, 2))
  console.log(`Plan written → ${reportDir}/plan.json`)

  if (!APPLY) {
    console.log('DRY-RUN only. Re-run with --apply to upload.')
    process.exit(0)
  }

  const createdIds: number[] = []
  let uploadedBytes = 0

  for (let i = 0; i < toAttach.length; i++) {
    const photo = toAttach[i]!
    const abs = photo.dumpAbsolutePath!
    const filename = `live-${SLUG}-${pad(i + 1)}-hq.jpg`
    const buffer = await prepareMaster(abs)
    uploadedBytes += buffer.byteLength

    const doc = await payload.create({
      collection: 'media',
      data: {
        alt: `${gallery.title} — ${i + 1}`,
      },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: filename,
        size: buffer.byteLength,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })

    createdIds.push(doc.id as number)
    console.log(
      `Uploaded ${filename} (${Math.round(buffer.byteLength / 1024)}KB) → media #${doc.id} url=${(doc as { url?: string }).url ?? ''}`,
    )
  }

  const coverImage = createdIds[0]
  await payload.update({
    collection: 'galleries',
    id: gallery.id,
    data: {
      coverImage,
      photos: createdIds.map((image) => ({ image })),
    },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })

  const result = {
    ok: true,
    galleryId: gallery.id,
    cmsSlug: SLUG,
    uploaded: createdIds.length,
    uploadedMastersMB: +(uploadedBytes / 1024 / 1024).toFixed(1),
    mediaIds: createdIds,
    checkUrl: `/galeria/${SLUG}`,
    next: 'Verify on live site. If OK, run next --slug=... If not, tell me what looks wrong.',
  }
  await writeFile(path.join(reportDir, 'result.json'), JSON.stringify(result, null, 2))
  console.log(JSON.stringify(result, null, 2))
  process.exit(0)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
