import { existsSync } from 'fs'
import { mkdir, readFile, rm, writeFile } from 'fs/promises'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'

import sharp from 'sharp'
import type { Payload } from 'payload'

import { getCaseStudyBySlug } from '@/app/(frontend)/galeria/[slug]/constants'
import type { GallerySessionFilterId } from '@/components/GalleryHero/constants'

import { CASE_STUDY_SLUG, uploadCaseStudySectionMedia, buildCaseStudyImageFields } from './lib/gallerySeedShared'
import { createSeedImageUploader } from './lib/createSeedImageUploader'
import { loadSeedEnv } from './lib/seedEnv'
import { LIVE_SITE_ORIGIN } from './lib/liveGalleryScrape'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const STAGING_ROOT = path.join(REPO_ROOT, 'scripts/live-gallery-staging')
const MANIFEST_PATH = path.join(STAGING_ROOT, 'manifest.json')

/** Long edge for local CMS media — keeps public/media small enough for a full laptop disk. */
const LOCAL_MAX_EDGE = Number(process.env.LIVE_GALLERY_MAX_EDGE || '1600')
const LOCAL_JPEG_QUALITY = Number(process.env.LIVE_GALLERY_JPEG_QUALITY || '82')

type ManifestPhoto = {
  relativePath: string
  matched: boolean
  matchKind: string | null
  dumpAbsolutePath: string | null
  candidates?: string[]
}

type ManifestStory = {
  title: string
  liveSlug: string
  cmsSlugHint: string
  url: string
  archive: string
  category: GallerySessionFilterId
  intro: string
  photos: ManifestPhoto[]
}

type Manifest = {
  stories: ManifestStory[]
}

function assertLocalOnly(): void {
  if (process.env.SEED_TARGET === 'production') {
    throw new Error(
      'Refusing to run: SEED_TARGET=production. This script is local-only.',
    )
  }
  loadSeedEnv()
  const url = process.env.POSTGRES_URL ?? ''
  if (!url.includes('localhost') && !url.includes('127.0.0.1')) {
    throw new Error(
      `Refusing to run against non-local Postgres (${url.slice(0, 32)}…).`,
    )
  }
}

async function downloadCandidate(relativePath: string, dest: string): Promise<void> {
  const url = `${LIVE_SITE_ORIGIN}/wp-content/uploads/${relativePath}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OczkiLocalSeed/1.0)' },
  })
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`)
  await mkdir(path.dirname(dest), { recursive: true })
  await writeFile(dest, Buffer.from(await res.arrayBuffer()))
}

async function resolveSourceFile(
  photo: ManifestPhoto,
  tmpDir: string,
): Promise<string | null> {
  if (photo.dumpAbsolutePath && existsSync(photo.dumpAbsolutePath)) {
    return photo.dumpAbsolutePath
  }

  const candidates = photo.candidates?.length
    ? photo.candidates
    : [photo.relativePath]

  for (const candidate of candidates) {
    const dest = path.join(tmpDir, candidate)
    try {
      await downloadCandidate(candidate, dest)
      return dest
    } catch {
      // try next
    }
  }
  return null
}

async function optimizeForLocalUpload(sourcePath: string, tmpDir: string, index: number): Promise<{
  buffer: Buffer
  filename: string
  mimetype: string
}> {
  const outName = `${String(index).padStart(3, '0')}.jpg`
  const outPath = path.join(tmpDir, 'optimized', outName)
  await mkdir(path.dirname(outPath), { recursive: true })

  await sharp(sourcePath)
    .rotate()
    .resize({
      width: LOCAL_MAX_EDGE,
      height: LOCAL_MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .jpeg({ quality: LOCAL_JPEG_QUALITY, mozjpeg: true })
    .toFile(outPath)

  const buffer = await readFile(outPath)
  return { buffer, filename: outName, mimetype: 'image/jpeg' }
}

async function uploadBuffer(
  payload: Payload,
  file: { buffer: Buffer; filename: string; mimetype: string },
  alt: string,
  prefix: string,
): Promise<number> {
  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      name: `${prefix}-${file.filename}`,
      data: file.buffer,
      mimetype: file.mimetype,
      size: file.buffer.byteLength,
    },
    context: { disableRevalidate: true },
  })
  return doc.id as number
}

function pickId(ids: number[], index: number): number {
  return ids[Math.min(index, ids.length - 1)]!
}

function buildCaseStudyFieldsFromPhotos(options: {
  title: string
  intro: string
  photoIds: number[]
  isCanonicalCaseStudy: boolean
  /** Figma-cropped section frames for non-canonical galleries (shared). */
  skeletonFrames?: ReturnType<typeof buildCaseStudyImageFields>
}) {
  const { title, intro, photoIds, isCanonicalCaseStudy, skeletonFrames } = options
  const defaults = getCaseStudyBySlug(CASE_STUDY_SLUG)!
  const alt = title

  const photos = photoIds.map((image, i) => ({
    image,
    caption: `${title} — zdjęcie ${i + 1}`,
  }))

  if (isCanonicalCaseStudy) {
    return {
      photos,
      hero: {
        heading: {
          lead: defaults.hero.heading.lead,
          emphasis: defaults.hero.heading.emphasis,
          end: defaults.hero.heading.end,
        },
        description: defaults.hero.description,
        backgroundImage: pickId(photoIds, 0),
        backgroundAlt: defaults.hero.background.alt,
      },
      details: {
        heading: {
          start: defaults.details.heading.start,
          emphasis: defaults.details.heading.emphasis,
        },
        items: defaults.details.items.map((item) => ({
          title: item.title,
          description: item.description,
        })),
      },
      duoPerspective: {
        heading: {
          start: defaults.duoPerspective.heading.start,
          emphasis: defaults.duoPerspective.heading.emphasis,
        },
        leadParagraph: defaults.duoPerspective.leadParagraph,
        callout: defaults.duoPerspective.callout,
        photo: pickId(photoIds, 1),
        photoAlt: defaults.duoPerspective.photo.alt,
        highlights: defaults.duoPerspective.highlights.map((h) => ({
          title: h.title,
          description: h.description,
        })),
      },
      venueStory: {
        heading: {
          start: defaults.venueStory.heading.start,
          emphasis: defaults.venueStory.heading.emphasis,
        },
        body: defaults.venueStory.body,
        backImage: pickId(photoIds, 2),
        backAlt: defaults.venueStory.photos.desktop.back.alt,
        frontImage: pickId(photoIds, 3),
        frontAlt: defaults.venueStory.photos.desktop.front.alt,
        scallopImage: pickId(photoIds, 4),
        scallopAlt: defaults.venueStory.photos.desktop.scallop.alt,
      },
      photoGallery: {
        heading: {
          start: defaults.photoGallery.heading.start,
          emphasis: defaults.photoGallery.heading.emphasis,
          end: defaults.photoGallery.heading.end,
        },
        loadMoreLabel: defaults.photoGallery.loadMoreLabel,
      },
      testimonial: {
        heading: {
          start: defaults.testimonial.heading.start,
          emphasis: defaults.testimonial.heading.emphasis,
        },
        items: [
          {
            quote: defaults.testimonial.items[0]?.quote ?? '',
            author: defaults.testimonial.items[0]?.author ?? '',
            photo: pickId(photoIds, 5),
            photoAlt: defaults.testimonial.items[0]?.photoAlt ?? alt,
          },
        ],
      },
      memorableMoment: {
        title: defaults.memorableMoment.title,
        body: defaults.memorableMoment.body,
        portraitPhoto: pickId(photoIds, 6),
        portraitAlt: defaults.memorableMoment.portraitPhoto.alt,
        landscapePhoto: pickId(photoIds, 7),
        landscapeAlt: defaults.memorableMoment.landscapePhoto.alt,
      },
      closingCta: {
        heading: {
          start: defaults.closingCta.heading.start,
          emphasis: defaults.closingCta.heading.emphasis,
          end: defaults.closingCta.heading.end,
        },
        body: defaults.closingCta.body,
        cta: {
          label: defaults.closingCta.cta.label,
          url: defaults.closingCta.cta.url,
        },
      },
    }
  }

  if (!skeletonFrames) {
    throw new Error('skeletonFrames required for non-canonical live galleries')
  }

  const shortIntro =
    intro.trim() ||
    `Wybrane kadry z realizacji „${title}”. Te same zdjęcia, które są na stronie oczkifotografia.pl.`

  return {
    ...skeletonFrames,
    photos,
    hero: {
      ...skeletonFrames.hero,
      heading: { lead: '', emphasis: title, end: '' },
      description: shortIntro.slice(0, 600),
    },
    details: {
      heading: {
        start: defaults.details.heading.start,
        emphasis: defaults.details.heading.emphasis,
      },
      items: defaults.details.items.map((item) => ({
        title: item.title,
        description: item.description,
      })),
    },
    duoPerspective: {
      ...skeletonFrames.duoPerspective,
      heading: {
        start: defaults.duoPerspective.heading.start,
        emphasis: defaults.duoPerspective.heading.emphasis,
      },
      leadParagraph: defaults.duoPerspective.leadParagraph,
      callout: defaults.duoPerspective.callout,
      highlights: defaults.duoPerspective.highlights.map((h) => ({
        title: h.title,
        description: h.description,
      })),
    },
    venueStory: {
      ...skeletonFrames.venueStory,
      heading: {
        start: defaults.venueStory.heading.start,
        emphasis: defaults.venueStory.heading.emphasis,
      },
      body: shortIntro.slice(0, 800),
    },
    photoGallery: {
      heading: {
        start: defaults.photoGallery.heading.start,
        emphasis: defaults.photoGallery.heading.emphasis,
        end: defaults.photoGallery.heading.end,
      },
      loadMoreLabel: defaults.photoGallery.loadMoreLabel,
    },
    memorableMoment: {
      ...skeletonFrames.memorableMoment,
      title: defaults.memorableMoment.title,
      body: defaults.memorableMoment.body,
    },
    closingCta: {
      heading: {
        start: defaults.closingCta.heading.start,
        emphasis: defaults.closingCta.heading.emphasis,
        end: defaults.closingCta.heading.end,
      },
      body: defaults.closingCta.body,
      cta: {
        label: defaults.closingCta.cta.label,
        url: defaults.closingCta.cta.url,
      },
    },
  }
}

async function wipeLocalGalleriesAndOrphanMedia(payload: Payload): Promise<void> {
  const galleries = await payload.find({
    collection: 'galleries',
    limit: 500,
    pagination: false,
    depth: 0,
  })

  for (const doc of galleries.docs) {
    await payload.delete({
      collection: 'galleries',
      id: doc.id,
      context: { disableRevalidate: true },
    })
  }
  payload.logger.info(`Deleted ${galleries.docs.length} existing galleries`)

  // Best-effort: remove previous live-* uploads left after the ENOSPC run.
  const media = await payload.find({
    collection: 'media',
    limit: 2000,
    pagination: false,
    depth: 0,
  })
  let removedMedia = 0
  for (const doc of media.docs) {
    const filename = typeof doc.filename === 'string' ? doc.filename : ''
    if (!filename.startsWith('live-')) continue
    await payload.delete({
      collection: 'media',
      id: doc.id,
      context: { disableRevalidate: true },
    })
    removedMedia += 1
  }
  payload.logger.info(`Deleted ${removedMedia} leftover live-* media docs`)
}

export async function seedLiveGalleriesLocal(payload: Payload): Promise<void> {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(
      `Missing ${MANIFEST_PATH}. Run \`pnpm prepare:live-galleries:no-cms\` first.`,
    )
  }

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8')) as Manifest
  const maxPhotos = Number(process.env.LIVE_GALLERY_MAX_PHOTOS || '12')

  await wipeLocalGalleriesAndOrphanMedia(payload)

  const sharedUpload = createSeedImageUploader(payload, 'live-frames')
  const sharedFrames = await uploadCaseStudySectionMedia(sharedUpload, CASE_STUDY_SLUG)
  const skeletonFrames = buildCaseStudyImageFields(sharedFrames, CASE_STUDY_SLUG)

  const workDir = path.join(os.tmpdir(), `oczki-live-seed-${process.pid}`)
  await rm(workDir, { recursive: true, force: true })
  await mkdir(workDir, { recursive: true })

  try {
    let storyIndex = 0
    for (const story of manifest.stories) {
      storyIndex += 1
      const slug = story.cmsSlugHint
      const isCanonical = slug === CASE_STUDY_SLUG
      const photos = story.photos.slice(0, maxPhotos > 0 ? maxPhotos : undefined)

      payload.logger.info(
        `[${storyIndex}/${manifest.stories.length}] ${slug} — ${photos.length} photos (max ${maxPhotos || '∞'})…`,
      )

      const storyTmp = path.join(workDir, slug)
      await mkdir(storyTmp, { recursive: true })

      const photoIds: number[] = []
      for (const [i, photo] of photos.entries()) {
        const source = await resolveSourceFile(photo, storyTmp)
        if (!source) {
          payload.logger.warn(`  skip missing ${photo.relativePath}`)
          continue
        }

        const optimized = await optimizeForLocalUpload(source, storyTmp, i + 1)
        const id = await uploadBuffer(
          payload,
          optimized,
          `${story.title} — ${i + 1}`,
          `live-${slug}`,
        )
        photoIds.push(id)

        if ((i + 1) % 10 === 0 || i + 1 === photos.length) {
          payload.logger.info(`  … ${photoIds.length}/${photos.length} uploaded`)
        }
      }

      // Drop per-story temp files early to keep disk free.
      await rm(storyTmp, { recursive: true, force: true })

      if (photoIds.length === 0) {
        payload.logger.warn(`Skipping ${slug} — no photos resolved`)
        continue
      }

      const caseStudy = buildCaseStudyFieldsFromPhotos({
        title: story.title,
        intro: story.intro,
        photoIds,
        isCanonicalCaseStudy: isCanonical,
        skeletonFrames: isCanonical ? undefined : skeletonFrames,
      })

      const data = {
        title: story.title,
        intro: story.intro.slice(0, 1000) || story.title,
        coverImage: photoIds[0]!,
        slug,
        portfolioCategory: story.category,
        showOnPortfolio: true,
        _status: 'published' as const,
        publishedAt: new Date().toISOString(),
        ...caseStudy,
      }

      const created = await payload.create({
        collection: 'galleries',
        data,
        context: { disableRevalidate: true },
      })
      payload.logger.info(`Created "${slug}" (#${created.id}) with ${photoIds.length} photos`)
    }
  } finally {
    await rm(workDir, { recursive: true, force: true })
  }

  payload.logger.info('Local live-gallery seed complete. Production CMS was not touched.')
}

if (process.argv[1]?.includes('seedLiveGalleriesLocal')) {
  void (async () => {
    assertLocalOnly()
    const { getSeedPayload } = await import('./lib/seedPayload')
    await seedLiveGalleriesLocal(await getSeedPayload())
    process.exit(0)
  })().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
