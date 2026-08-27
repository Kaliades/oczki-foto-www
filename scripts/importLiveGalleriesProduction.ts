/**
 * Import local live-gallery package into production (additive).
 *
 * Safety defaults:
 * - dry-run unless `--apply` is passed
 * - never deletes galleries or media
 * - skips slugs that already exist on prod (unless `--replace-existing`)
 * - refuses to run without SEED_TARGET=production
 * - refuses if package has missing files on disk
 *
 * Usage:
 *   pnpm import:live-galleries:production
 *   pnpm import:live-galleries:production:apply
 *   PACKAGE_PATH=... pnpm import:live-galleries:production
 */
import { existsSync, readdirSync, statSync } from 'fs'
import { mkdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import sharp from 'sharp'
import type { Payload } from 'payload'

import { loadSeedEnv } from './lib/seedEnv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const MEDIA_DIR = path.join(REPO_ROOT, 'public/media')
const APPLY = process.argv.includes('--apply')
const REPLACE_EXISTING = process.argv.includes('--replace-existing')
/** Optional: `--replace-slugs=slug-a,slug-b` — replace only these existing slugs. */
const REPLACE_SLUGS = new Set(
  (process.argv.find((a) => a.startsWith('--replace-slugs='))?.split('=')[1] ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
)

/**
 * Resize only when longer edge exceeds max. Prefer passthrough (no re-encode) for
 * files already within the cap — JPEG q75 recompress was visibly destroying quality.
 * Set LIVE_IMPORT_PASSTHROUGH=0 to force re-encode at LIVE_IMPORT_JPEG_QUALITY.
 */
const IMPORT_MAX_EDGE = Number(process.env.LIVE_IMPORT_MAX_EDGE || '1600')
const IMPORT_JPEG_QUALITY = Number(process.env.LIVE_IMPORT_JPEG_QUALITY || '92')
const IMPORT_PASSTHROUGH = process.env.LIVE_IMPORT_PASSTHROUGH !== '0'
/** Filename suffix when a same-named live file already exists on prod. */
const IMPORT_NAME_SUFFIX = process.env.LIVE_IMPORT_NAME_SUFFIX || '-hq'
type PackageMedia = {
  id: number
  filename: string
  alt: string | null
  filesize: number | null
}

type PackageGallery = {
  slug: string
  title: string
  intro: string | null
  portfolioCategory: string | null
  _status: 'draft' | 'published'
  coverImage: string | null
  photos: { index: number; image: string | null; caption: string | null }[]
  hero: Record<string, unknown>
  details: unknown
  duoPerspective: Record<string, unknown>
  venueStory: Record<string, unknown>
  photoGallery: unknown
  testimonial: {
    heading: unknown
    items: { quote: string | null; author: string | null; photo: string | null; photoAlt: string | null }[]
  }
  memorableMoment: Record<string, unknown>
  closingCta: unknown
  meta: { title: unknown; description: unknown; image: string | null }
}

type LivePackage = {
  exportedAt: string
  counts: { galleries: number; uniqueMediaFiles: number; totalBytes: number; missingFilesOnDisk: number }
  missingFilesOnDisk: string[]
  mediaFiles: PackageMedia[]
  galleries: PackageGallery[]
}

function findLatestPackage(): string {
  const root = path.join(REPO_ROOT, 'scripts/prod-migration-backups')
  if (!existsSync(root)) throw new Error(`No backups dir at ${root}`)

  const candidates: string[] = []

  const walk = (dir: string, depth: number) => {
    if (depth > 3) return
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name)
      let st
      try {
        st = statSync(full)
      } catch {
        continue
      }
      if (st.isDirectory()) walk(full, depth + 1)
      else if (name === 'package.json' && full.includes('local-live-package')) {
        candidates.push(full)
      }
    }
  }
  walk(root, 0)

  candidates.sort((a, b) => statSync(b).mtimeMs - statSync(a).mtimeMs)
  if (!candidates[0]) throw new Error('No local-live-package found. Run export first.')
  return candidates[0]
}

function mapFilename(
  filename: string | null | undefined,
  idByFilename: Map<string, number>,
): number | undefined {
  if (!filename) return undefined
  const id = idByFilename.get(filename)
  if (!id) throw new Error(`Missing uploaded media for ${filename}`)
  return id
}

function collectGalleryFilenames(g: PackageGallery): string[] {
  const names = new Set<string>()
  const add = (v: unknown) => {
    if (typeof v === 'string' && v.length > 0) names.add(v)
  }
  add(g.coverImage)
  for (const p of g.photos) add(p.image)
  add(g.hero?.backgroundImage)
  add(g.duoPerspective?.photo)
  add(g.venueStory?.backImage)
  add(g.venueStory?.frontImage)
  add(g.venueStory?.scallopImage)
  add(g.memorableMoment?.portraitPhoto)
  add(g.memorableMoment?.landscapePhoto)
  add(g.meta?.image)
  for (const item of g.testimonial?.items ?? []) add(item.photo)
  return [...names]
}

async function compressForImport(sourcePath: string): Promise<Buffer> {
  const meta = await sharp(sourcePath).metadata()
  const edge = Math.max(meta.width || 0, meta.height || 0)

  // Keep original bytes when already within the size budget (best visual quality).
  if (IMPORT_PASSTHROUGH && edge <= IMPORT_MAX_EDGE) {
    return readFile(sourcePath)
  }

  return sharp(sourcePath)
    .rotate()
    .resize({
      width: IMPORT_MAX_EDGE,
      height: IMPORT_MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: IMPORT_JPEG_QUALITY, mozjpeg: true })
    .toBuffer()
}

export async function importLiveGalleriesProduction(payload: Payload): Promise<void> {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing: set SEED_TARGET=production for this script.')
  }

  const packagePath = process.env.PACKAGE_PATH || findLatestPackage()
  const pkg = JSON.parse(await readFile(packagePath, 'utf8')) as LivePackage

  if (pkg.missingFilesOnDisk?.length) {
    throw new Error(
      `Package reports ${pkg.missingFilesOnDisk.length} missing files on disk. Aborting.`,
    )
  }

  for (const m of pkg.mediaFiles) {
    if (!existsSync(path.join(MEDIA_DIR, m.filename))) {
      throw new Error(`Missing on disk: public/media/${m.filename}`)
    }
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN missing — production uploads require Vercel Blob.')
  }

  const existing = await payload.find({
    collection: 'galleries',
    depth: 0,
    limit: 500,
    pagination: false,
    overrideAccess: true,
  })
  const existingBySlug = new Map(
    existing.docs.map((d) => [String((d as { slug?: string }).slug), d as { id: number; slug: string }]),
  )

  const existingLiveMedia = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 5000,
    pagination: false,
    overrideAccess: true,
    where: { filename: { like: 'live-%' } },
  })
  const existingLiveFilenames = new Set(
    existingLiveMedia.docs
      .map((d) => (d as { filename?: string }).filename)
      .filter((f): f is string => typeof f === 'string'),
  )

  const shouldReplace = (slug: string) =>
    REPLACE_EXISTING || REPLACE_SLUGS.has(slug)

  const toCreate = pkg.galleries.filter((g) => !existingBySlug.has(g.slug))
  const toSkip = pkg.galleries.filter((g) => existingBySlug.has(g.slug) && !shouldReplace(g.slug))
  const toReplace = pkg.galleries.filter((g) => existingBySlug.has(g.slug) && shouldReplace(g.slug))

  const neededFilenames = new Set<string>()
  for (const g of [...toCreate, ...toReplace]) {
    if (g.coverImage) neededFilenames.add(g.coverImage)
    for (const p of g.photos) if (p.image) neededFilenames.add(p.image)
    for (const key of ['backgroundImage'] as const) {
      const v = g.hero?.[key]
      if (typeof v === 'string') neededFilenames.add(v)
    }
    for (const key of ['photo'] as const) {
      const v = g.duoPerspective?.[key]
      if (typeof v === 'string') neededFilenames.add(v)
    }
    for (const key of ['backImage', 'frontImage', 'scallopImage'] as const) {
      const v = g.venueStory?.[key]
      if (typeof v === 'string') neededFilenames.add(v)
    }
    for (const key of ['portraitPhoto', 'landscapePhoto'] as const) {
      const v = g.memorableMoment?.[key]
      if (typeof v === 'string') neededFilenames.add(v)
    }
    for (const item of g.testimonial?.items ?? []) {
      if (item.photo) neededFilenames.add(item.photo)
    }
    if (typeof g.meta?.image === 'string') neededFilenames.add(g.meta.image)
  }

  const mediaMeta = new Map(pkg.mediaFiles.map((m) => [m.filename, m]))
  const uploadPlan = [...neededFilenames].sort().map((filename) => {
    const meta = mediaMeta.get(filename)
    return {
      filename,
      filesize: meta?.filesize ?? null,
      alreadyOnProd: existingLiveFilenames.has(filename),
    }
  })

  const plan = {
    mode: APPLY ? 'APPLY' : 'DRY-RUN',
    packagePath,
    packageExportedAt: pkg.exportedAt,
    replaceExisting: REPLACE_EXISTING,
    replaceSlugs: [...REPLACE_SLUGS],
    compress: {
      maxEdge: IMPORT_MAX_EDGE,
      jpegQuality: IMPORT_JPEG_QUALITY,
      passthrough: IMPORT_PASSTHROUGH,
      nameSuffix: IMPORT_NAME_SUFFIX,
    },
    galleries: {
      inPackage: pkg.galleries.length,
      create: toCreate.map((g) => g.slug),
      skipExisting: toSkip.map((g) => g.slug),
      replace: toReplace.map((g) => g.slug),
    },
    media: {
      uniqueNeeded: uploadPlan.length,
      alreadyOnProdSameFilename: uploadPlan.filter((m) => m.alreadyOnProd).length,
      willUpload: uploadPlan.length,
      totalBytesNeeded: uploadPlan.reduce((s, m) => s + (m.filesize ?? 0), 0),
    },
    note:
      REPLACE_EXISTING || REPLACE_SLUGS.size
        ? 'Replace mode: re-uploads media (passthrough when ≤ maxEdge) and rewires gallery docs. Old live media become orphans for a later purge.'
        : 'Additive only. Portfolio placeholders are NOT deleted in this step.',
  }

  const reportDir = path.join(
    REPO_ROOT,
    'scripts/prod-migration-backups',
    `import-plan-${new Date().toISOString().replace(/[:.]/g, '-')}`,
  )
  await mkdir(reportDir, { recursive: true })
  await writeFile(path.join(reportDir, 'plan.json'), JSON.stringify({ plan, uploadPlan }, null, 2))

  payload.logger.info(`Import plan written → ${reportDir}/plan.json`)
  payload.logger.info(JSON.stringify(plan, null, 2))

  if (!APPLY) {
    payload.logger.info('DRY-RUN complete — no writes. Re-run with --apply to execute.')
    return
  }

  payload.logger.info(
    `APPLY media: maxEdge=${IMPORT_MAX_EDGE} jpegQuality=${IMPORT_JPEG_QUALITY} passthrough=${IMPORT_PASSTHROUGH} suffix=${IMPORT_NAME_SUFFIX}`,
  )

  const idByFilename = new Map<string, number>()
  const created: string[] = []
  const replaced: string[] = []

  const ensureUploaded = async (filename: string) => {
    if (idByFilename.has(filename)) return idByFilename.get(filename)!
    const meta = mediaMeta.get(filename)
    let absName = filename
    if (existingLiveFilenames.has(absName)) {
      absName = filename.replace(/(\.[^.]+)$/, `${IMPORT_NAME_SUFFIX}$1`)
    }
    // Avoid colliding with a previous -hq / -import upload
    let n = 2
    while (existingLiveFilenames.has(absName)) {
      absName = filename.replace(/(\.[^.]+)$/, `${IMPORT_NAME_SUFFIX}${n}$1`)
      n++
    }
    const buffer = await compressForImport(path.join(MEDIA_DIR, filename))
    const doc = await payload.create({
      collection: 'media',
      data: { alt: meta?.alt ?? filename },
      file: {
        data: buffer,
        mimetype: 'image/jpeg',
        name: absName,
        size: buffer.byteLength,
      },
      overrideAccess: true,
      context: { disableRevalidate: true },
    })
    idByFilename.set(filename, doc.id as number)
    existingLiveFilenames.add(absName)
    payload.logger.info(
      `Uploaded ${absName} (${Math.round(buffer.byteLength / 1024)}KB) → media #${doc.id}`,
    )
    return doc.id as number
  }

  const buildGalleryData = (g: PackageGallery) => {
    const coverImage = mapFilename(g.coverImage, idByFilename)
    return {
      title: g.title,
      slug: g.slug,
      intro: g.intro,
      portfolioCategory: g.portfolioCategory,
      _status: g._status === 'published' ? 'published' : 'draft',
      coverImage,
      photos: g.photos
        .filter((p) => p.image)
        .map((p) => ({
          image: mapFilename(p.image, idByFilename),
          caption: p.caption,
        })),
      hero: {
        heading: g.hero.heading,
        description: g.hero.description,
        backgroundImage: mapFilename(
          typeof g.hero.backgroundImage === 'string' ? g.hero.backgroundImage : null,
          idByFilename,
        ),
        backgroundAlt: g.hero.backgroundAlt,
      },
      details: g.details,
      duoPerspective: {
        heading: g.duoPerspective.heading,
        leadParagraph: g.duoPerspective.leadParagraph,
        callout: g.duoPerspective.callout,
        photo: mapFilename(
          typeof g.duoPerspective.photo === 'string' ? g.duoPerspective.photo : null,
          idByFilename,
        ),
        photoAlt: g.duoPerspective.photoAlt,
        highlights: g.duoPerspective.highlights,
      },
      venueStory: {
        heading: g.venueStory.heading,
        body: g.venueStory.body,
        backImage: mapFilename(
          typeof g.venueStory.backImage === 'string' ? g.venueStory.backImage : null,
          idByFilename,
        ),
        backAlt: g.venueStory.backAlt,
        frontImage: mapFilename(
          typeof g.venueStory.frontImage === 'string' ? g.venueStory.frontImage : null,
          idByFilename,
        ),
        frontAlt: g.venueStory.frontAlt,
        scallopImage: mapFilename(
          typeof g.venueStory.scallopImage === 'string' ? g.venueStory.scallopImage : null,
          idByFilename,
        ),
        scallopAlt: g.venueStory.scallopAlt,
      },
      photoGallery: g.photoGallery,
      testimonial: {
        heading: g.testimonial.heading,
        items: (g.testimonial.items ?? []).map((item) => ({
          quote: item.quote,
          author: item.author,
          photo: mapFilename(item.photo, idByFilename),
          photoAlt: item.photoAlt,
        })),
      },
      memorableMoment: {
        title: g.memorableMoment.title,
        body: g.memorableMoment.body,
        portraitPhoto: mapFilename(
          typeof g.memorableMoment.portraitPhoto === 'string'
            ? g.memorableMoment.portraitPhoto
            : null,
          idByFilename,
        ),
        portraitAlt: g.memorableMoment.portraitAlt,
        landscapePhoto: mapFilename(
          typeof g.memorableMoment.landscapePhoto === 'string'
            ? g.memorableMoment.landscapePhoto
            : null,
          idByFilename,
        ),
        landscapeAlt: g.memorableMoment.landscapeAlt,
      },
      closingCta: g.closingCta,
      meta: {
        title: g.meta.title,
        description: g.meta.description,
        image: mapFilename(g.meta.image, idByFilename),
      },
    }
  }

  for (const g of [...toCreate, ...toReplace]) {
    for (const filename of collectGalleryFilenames(g)) {
      await ensureUploaded(filename)
    }
    const data = buildGalleryData(g)
    const existingDoc = existingBySlug.get(g.slug)
    if (existingDoc && shouldReplace(g.slug)) {
      await payload.update({
        collection: 'galleries',
        id: existingDoc.id,
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      replaced.push(g.slug)
      payload.logger.info(`Replaced gallery ${g.slug} → #${existingDoc.id}`)
    } else {
      const createdDoc = await payload.create({
        collection: 'galleries',
        data: data as never,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      created.push(g.slug)
      payload.logger.info(`Created gallery ${g.slug} → #${createdDoc.id}`)
    }
  }

  await writeFile(
    path.join(reportDir, 'apply-result.json'),
    JSON.stringify(
      {
        created,
        replaced,
        skipped: toSkip.map((g) => g.slug),
        uploadedFilenames: [...idByFilename.keys()],
        compress: {
          maxEdge: IMPORT_MAX_EDGE,
          jpegQuality: IMPORT_JPEG_QUALITY,
          passthrough: IMPORT_PASSTHROUGH,
          nameSuffix: IMPORT_NAME_SUFFIX,
        },
      },
      null,
      2,
    ),
  )

  payload.logger.info('APPLY complete. Portfolio placeholders untouched.')
}

if (process.argv[1]?.includes('importLiveGalleriesProduction')) {
  void (async () => {
    loadSeedEnv()
    const { getSeedPayload } = await import('./lib/seedPayload')
    const payload = await getSeedPayload()
    await importLiveGalleriesProduction(payload)
    process.exit(0)
  })().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
