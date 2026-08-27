/**
 * Export local live galleries into a portable JSON package (filenames + metadata).
 * Read-only against local Docker Postgres. Never touches production.
 *
 * Usage:
 *   pnpm exec tsx scripts/exportLocalLiveGalleriesPackage.ts
 *   OUT_DIR=scripts/prod-migration-backups/foo pnpm exec tsx scripts/exportLocalLiveGalleriesPackage.ts
 */
import { existsSync } from 'fs'
import { mkdir, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

import type { Payload } from 'payload'

import { loadSeedEnv } from './lib/seedEnv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const MEDIA_DIR = path.join(REPO_ROOT, 'public/media')

type MediaRef = {
  id: number
  filename: string
  alt: string | null
  filesize: number | null
}

function asMedia(value: unknown): MediaRef | null {
  if (!value || typeof value !== 'object') return null
  const doc = value as {
    id?: number
    filename?: string | null
    alt?: string | null
    filesize?: number | null
  }
  if (typeof doc.id !== 'number' || typeof doc.filename !== 'string' || !doc.filename) return null
  return {
    id: doc.id,
    filename: doc.filename,
    alt: typeof doc.alt === 'string' ? doc.alt : null,
    filesize: typeof doc.filesize === 'number' ? doc.filesize : null,
  }
}

function mediaIdOrFilename(value: unknown): string | null {
  const m = asMedia(value)
  if (m) return m.filename
  if (typeof value === 'number') return `id:${value}`
  return null
}

function assertLocalOnly(): void {
  if (process.env.SEED_TARGET === 'production') {
    throw new Error('Refusing: SEED_TARGET=production. Export is local-only.')
  }
  loadSeedEnv()
  const url = process.env.POSTGRES_URL ?? ''
  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    throw new Error(`Refusing non-local Postgres (${url.slice(0, 40)}…).`)
  }
}

export async function exportLocalLiveGalleriesPackage(payload: Payload): Promise<void> {
  assertLocalOnly()

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').replace(/Z$/, 'Z')
  const outDir =
    process.env.OUT_DIR ||
    path.join(REPO_ROOT, 'scripts/prod-migration-backups', `local-live-package-${stamp}`)
  await mkdir(outDir, { recursive: true })

  const result = await payload.find({
    collection: 'galleries',
    depth: 2,
    limit: 500,
    pagination: false,
    sort: 'slug',
    overrideAccess: true,
  })

  const mediaIndex = new Map<string, MediaRef>()
  const missingFiles: string[] = []

  const galleries = result.docs.map((doc) => {
    const g = doc as unknown as Record<string, unknown>
    const collect = (value: unknown) => {
      const m = asMedia(value)
      if (!m) return
      mediaIndex.set(m.filename, m)
      const abs = path.join(MEDIA_DIR, m.filename)
      if (!existsSync(abs)) missingFiles.push(m.filename)
    }

    collect(g.coverImage)
    const photos = Array.isArray(g.photos) ? g.photos : []
    for (const row of photos) {
      if (row && typeof row === 'object') collect((row as { image?: unknown }).image)
    }

    const hero = (g.hero ?? {}) as Record<string, unknown>
    const duo = (g.duoPerspective ?? {}) as Record<string, unknown>
    const venue = (g.venueStory ?? {}) as Record<string, unknown>
    const testimonial = (g.testimonial ?? {}) as Record<string, unknown>
    const memorable = (g.memorableMoment ?? {}) as Record<string, unknown>
    const meta = (g.meta ?? {}) as Record<string, unknown>

    collect(hero.backgroundImage)
    collect(duo.photo)
    collect(venue.backImage)
    collect(venue.frontImage)
    collect(venue.scallopImage)
    collect(memorable.portraitPhoto)
    collect(memorable.landscapePhoto)
    collect(meta.image)
    const tItems = Array.isArray(testimonial.items) ? testimonial.items : []
    for (const item of tItems) {
      if (item && typeof item === 'object') collect((item as { photo?: unknown }).photo)
    }

    return {
      localId: g.id,
      slug: g.slug,
      title: g.title,
      intro: g.intro ?? null,
      portfolioCategory: g.portfolioCategory ?? null,
      _status: g._status ?? 'draft',
      coverImage: mediaIdOrFilename(g.coverImage),
      photos: photos.map((row, index) => {
        const r = row as { image?: unknown; caption?: string | null }
        return {
          index,
          image: mediaIdOrFilename(r.image),
          caption: r.caption ?? null,
        }
      }),
      hero: {
        heading: hero.heading ?? null,
        description: hero.description ?? null,
        backgroundImage: mediaIdOrFilename(hero.backgroundImage),
        backgroundAlt: hero.backgroundAlt ?? null,
      },
      details: g.details ?? null,
      duoPerspective: {
        heading: duo.heading ?? null,
        leadParagraph: duo.leadParagraph ?? null,
        callout: duo.callout ?? null,
        photo: mediaIdOrFilename(duo.photo),
        photoAlt: duo.photoAlt ?? null,
        highlights: duo.highlights ?? null,
      },
      venueStory: {
        heading: venue.heading ?? null,
        body: venue.body ?? null,
        backImage: mediaIdOrFilename(venue.backImage),
        backAlt: venue.backAlt ?? null,
        frontImage: mediaIdOrFilename(venue.frontImage),
        frontAlt: venue.frontAlt ?? null,
        scallopImage: mediaIdOrFilename(venue.scallopImage),
        scallopAlt: venue.scallopAlt ?? null,
      },
      photoGallery: g.photoGallery ?? null,
      testimonial: {
        heading: testimonial.heading ?? null,
        items: tItems.map((item) => {
          const t = item as {
            quote?: string | null
            author?: string | null
            photo?: unknown
            photoAlt?: string | null
          }
          return {
            quote: t.quote ?? null,
            author: t.author ?? null,
            photo: mediaIdOrFilename(t.photo),
            photoAlt: t.photoAlt ?? null,
          }
        }),
      },
      memorableMoment: {
        title: memorable.title ?? null,
        body: memorable.body ?? null,
        portraitPhoto: mediaIdOrFilename(memorable.portraitPhoto),
        portraitAlt: memorable.portraitAlt ?? null,
        landscapePhoto: mediaIdOrFilename(memorable.landscapePhoto),
        landscapeAlt: memorable.landscapeAlt ?? null,
      },
      closingCta: g.closingCta ?? null,
      meta: {
        title: meta.title ?? null,
        description: meta.description ?? null,
        image: mediaIdOrFilename(meta.image),
      },
    }
  })

  const mediaFiles = [...mediaIndex.values()].sort((a, b) => a.filename.localeCompare(b.filename))
  const totalBytes = mediaFiles.reduce((sum, m) => sum + (m.filesize ?? 0), 0)

  const pkg = {
    exportedAt: new Date().toISOString(),
    source: 'local-docker',
    mediaDir: 'public/media',
    counts: {
      galleries: galleries.length,
      uniqueMediaFiles: mediaFiles.length,
      totalBytes,
      totalMB: Number((totalBytes / 1024 / 1024).toFixed(1)),
      missingFilesOnDisk: missingFiles.length,
    },
    missingFilesOnDisk: [...new Set(missingFiles)].sort(),
    mediaFiles,
    galleries,
  }

  await writeFile(path.join(outDir, 'package.json'), JSON.stringify(pkg, null, 2))
  await writeFile(
    path.join(outDir, 'README.md'),
    `# Local live galleries package

Exported: ${pkg.exportedAt}

- Galleries: ${pkg.counts.galleries}
- Unique media files: ${pkg.counts.uniqueMediaFiles} (~${pkg.counts.totalMB} MB)
- Missing on disk: ${pkg.counts.missingFilesOnDisk}

Import with:
\`\`\`
pnpm import:live-galleries:production          # dry-run
pnpm import:live-galleries:production:apply    # writes (explicit)
\`\`\`

Pass PACKAGE_PATH=${outDir}/package.json
`,
  )

  payload.logger.info(`Wrote package → ${outDir}`)
  payload.logger.info(JSON.stringify(pkg.counts))
}

if (process.argv[1]?.includes('exportLocalLiveGalleriesPackage')) {
  void (async () => {
    assertLocalOnly()
    const { getSeedPayload } = await import('./lib/seedPayload')
    const payload = await getSeedPayload()
    await exportLocalLiveGalleriesPackage(payload)
    process.exit(0)
  })().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
