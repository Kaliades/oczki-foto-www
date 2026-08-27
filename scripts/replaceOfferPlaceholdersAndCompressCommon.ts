/**
 * 1) Replace offer-shared seed images with cohesive brand placeholders (shared IDs).
 * 2) Compress media under Payload folder `common/` (max edge + PNG→JPEG).
 *
 * Usage:
 *   SEED_TARGET=production pnpm exec tsx scripts/replaceOfferPlaceholdersAndCompressCommon.ts
 *   SEED_TARGET=production pnpm exec tsx scripts/replaceOfferPlaceholdersAndCompressCommon.ts --apply
 */
import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'

import sharp from 'sharp'

import { loadSeedEnv } from './lib/seedEnv'

loadSeedEnv()

const APPLY = process.argv.includes('--apply')
const MAX_EDGE = Number(process.env.COMMON_COMPRESS_MAX_EDGE || '1600')
const JPEG_QUALITY = Number(process.env.COMMON_COMPRESS_JPEG_QUALITY || '92')
const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'https://oczki-foto-www.vercel.app'

const COLORS = {
  bg: '#f1eee8',
  frame: '#d8b68f',
  text: '#4f3a26',
  muted: '#8e7a65',
}

type PlaceholderKind = 'portrait' | 'landscape' | 'scallop'

const PLACEHOLDERS: Record<
  PlaceholderKind,
  { width: number; height: number; filename: string; label: string }
> = {
  portrait: {
    width: 1067,
    height: 1600,
    filename: 'placeholder-offer-portrait.jpg',
    label: 'DO ZAMIANY',
  },
  landscape: {
    width: 1600,
    height: 1067,
    filename: 'placeholder-offer-landscape.jpg',
    label: 'DO ZAMIANY',
  },
  scallop: {
    width: 512,
    height: 716,
    filename: 'placeholder-offer-scallop.jpg',
    label: 'DO ZAMIANY',
  },
}

function isOfferSharedSeed(filename: string | null | undefined): boolean {
  const f = filename || ''
  return /offer-shared/i.test(f) || /^placeholder-offer-.*-split-/i.test(f)
}

function pickKind(width?: number | null, height?: number | null, filename?: string | null): PlaceholderKind {
  const f = (filename || '').toLowerCase()
  if (f.includes('scallop')) return 'scallop'
  if (f.includes('landscape')) return 'landscape'
  if (f.includes('portrait')) return 'portrait'
  const w = width || 0
  const h = height || 0
  if (w > 0 && h > 0 && w < 700 && h < 900) return 'scallop'
  if (w >= h) return 'landscape'
  return 'portrait'
}

async function renderPlaceholder(kind: PlaceholderKind): Promise<Buffer> {
  const { width, height, label } = PLACEHOLDERS[kind]
  const titleSize = kind === 'scallop' ? 28 : 56
  const subSize = kind === 'scallop' ? 16 : 28
  const pad = kind === 'scallop' ? 28 : 64
  const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="${COLORS.bg}"/>
  <rect x="${pad}" y="${pad}" width="${width - pad * 2}" height="${height - pad * 2}"
        fill="none" stroke="${COLORS.frame}" stroke-width="${kind === 'scallop' ? 3 : 5}"
        stroke-dasharray="${kind === 'scallop' ? '10 8' : '18 14'}"/>
  <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, serif"
        font-size="${titleSize}" fill="${COLORS.text}" letter-spacing="4">${label}</text>
  <text x="50%" y="54%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="${subSize}" fill="${COLORS.muted}">Placeholder oferty</text>
  <text x="50%" y="60%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="${Math.max(12, subSize - 6)}" fill="${COLORS.muted}">Podmień na zdjęcie</text>
</svg>`

  return sharp(Buffer.from(svg))
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer()
}

async function ensureFolder(
  payload: Awaited<ReturnType<typeof import('payload').getPayload>>,
  name: string,
  parentId: number | null,
  cache: Map<string, number>,
): Promise<number> {
  const cacheKey = parentId == null ? name : `${parentId}/${name}`
  const cached = cache.get(cacheKey)
  if (cached != null) return cached

  const where =
    parentId == null
      ? ({ and: [{ name: { equals: name } }, { folder: { exists: false } }] } as const)
      : ({ and: [{ name: { equals: name } }, { folder: { equals: parentId } }] } as const)

  const existing = await payload.find({
    collection: 'payload-folders',
    where: where as never,
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    const id = existing.docs[0].id as number
    cache.set(cacheKey, id)
    return id
  }

  if (!APPLY) {
    const fake = -1 * (cache.size + 1)
    cache.set(cacheKey, fake)
    return fake
  }

  const created = await payload.create({
    collection: 'payload-folders',
    data: {
      name,
      folderType: ['media'],
      ...(parentId != null ? { folder: parentId } : {}),
    },
    overrideAccess: true,
    context: { disableRevalidate: true },
  })
  const id = created.id as number
  cache.set(cacheKey, id)
  return id
}

async function compressBuffer(source: Buffer, mime: string | null | undefined): Promise<{
  buffer: Buffer
  mimetype: string
  ext: string
}> {
  const meta = await sharp(source).metadata()
  const edge = Math.max(meta.width || 0, meta.height || 0)
  const needsResize = edge > MAX_EDGE
  const isPng = (mime || '').includes('png') || meta.format === 'png'
  const isJpeg = (mime || '').includes('jpeg') || (mime || '').includes('jpg') || meta.format === 'jpeg'

  if (!needsResize && isJpeg && !isPng) {
    return { buffer: source, mimetype: 'image/jpeg', ext: 'jpg' }
  }

  let pipeline = sharp(source).rotate()
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_EDGE,
      height: MAX_EDGE,
      fit: 'inside',
      withoutEnlargement: true,
    })
  }

  const buffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer()
  return { buffer, mimetype: 'image/jpeg', ext: 'jpg' }
}

function mapImageId(
  value: unknown,
  mediaById: Map<number, { filename?: string; width?: number; height?: number }>,
  placeholders: Record<PlaceholderKind, number>,
): number | unknown {
  const id =
    typeof value === 'number'
      ? value
      : value && typeof value === 'object' && typeof (value as { id?: unknown }).id === 'number'
        ? ((value as { id: number }).id as number)
        : null
  if (id == null) return value
  const m = mediaById.get(id)
  if (!m || !isOfferSharedSeed(m.filename)) return id
  return placeholders[pickKind(m.width, m.height, m.filename)]
}

async function main() {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing: set SEED_TARGET=production')
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outDir = path.join('scripts/prod-migration-backups', `placeholders-common-${stamp}`)
  mkdirSync(outDir, { recursive: true })

  // --- Placeholders ---
  const folderCache = new Map<string, number>()
  const offersRoot = await ensureFolder(payload, 'offers', null, folderCache)
  const sharedFolder = await ensureFolder(payload, '_shared', offersRoot, folderCache)

  const placeholderIds = {} as Record<PlaceholderKind, number>
  const placeholderPlan: Array<{ kind: PlaceholderKind; filename: string; kb: number; id?: number }> =
    []

  for (const kind of Object.keys(PLACEHOLDERS) as PlaceholderKind[]) {
    const spec = PLACEHOLDERS[kind]
    const buffer = await renderPlaceholder(kind)
    placeholderPlan.push({ kind, filename: spec.filename, kb: Math.round(buffer.length / 1024) })

    if (!APPLY) {
      placeholderIds[kind] = -100 - Object.keys(placeholderIds).length
      continue
    }

    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: spec.filename } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })

    let id: number
    if (existing.docs[0]) {
      id = existing.docs[0].id as number
      await payload.update({
        collection: 'media',
        id,
        data: {
          alt: 'Placeholder oferty — podmień na zdjęcie',
          folder: sharedFolder,
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: spec.filename,
          size: buffer.byteLength,
        },
        overrideAccess: true,
        context: { disableRevalidate: true },
        depth: 0,
      })
    } else {
      const created = await payload.create({
        collection: 'media',
        data: {
          alt: 'Placeholder oferty — podmień na zdjęcie',
          folder: sharedFolder,
        },
        file: {
          data: buffer,
          mimetype: 'image/jpeg',
          name: spec.filename,
          size: buffer.byteLength,
        },
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      id = created.id as number
    }
    placeholderIds[kind] = id
    placeholderPlan[placeholderPlan.length - 1].id = id
  }

  // --- Media index ---
  const mediaAll = await payload.find({
    collection: 'media',
    limit: 5000,
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  const mediaById = new Map(
    mediaAll.docs.map((m) => [
      m.id as number,
      m as { filename?: string; width?: number; height?: number; folder?: unknown; mimeType?: string },
    ]),
  )

  const seedIds = new Set(
    [...mediaById.entries()]
      .filter(([, m]) => isOfferSharedSeed(m.filename))
      .map(([id]) => id),
  )

  // --- Rewire offers ---
  const offers = await payload.find({
    collection: 'offerItems',
    limit: 50,
    depth: 0,
    draft: true,
    overrideAccess: true,
  })

  const rewirePlan: Array<{ slug: string; changes: Array<{ path: string; from: number; to: number }> }> =
    []

  for (const doc of offers.docs as Array<Record<string, any>>) {
    const changes: Array<{ path: string; from: number; to: number }> = []
    const data: Record<string, unknown> = {}

    const mapLeaf = (current: unknown, pathLabel: string): number | unknown => {
      const next = mapImageId(current, mediaById, placeholderIds)
      if (typeof current === 'number' && typeof next === 'number' && current !== next) {
        changes.push({ path: pathLabel, from: current, to: next })
      } else if (
        current &&
        typeof current === 'object' &&
        typeof (current as { id?: number }).id === 'number' &&
        typeof next === 'number' &&
        (current as { id: number }).id !== next
      ) {
        changes.push({ path: pathLabel, from: (current as { id: number }).id, to: next })
      }
      return next
    }

    if (doc.care && typeof doc.care === 'object') {
      data.care = {
        ...doc.care,
        image: mapLeaf(doc.care.image, 'care.image'),
      }
    }

    if (doc.inclusions && typeof doc.inclusions === 'object') {
      data.inclusions = {
        ...doc.inclusions,
        mainImage: mapLeaf(doc.inclusions.mainImage, 'inclusions.mainImage'),
        scallopImage: mapLeaf(doc.inclusions.scallopImage, 'inclusions.scallopImage'),
      }
    }

    if (doc.packages && typeof doc.packages === 'object' && Array.isArray(doc.packages.items)) {
      data.packages = {
        ...doc.packages,
        items: doc.packages.items.map((item: any, i: number) => ({
          ...item,
          image: mapLeaf(item?.image, `packages.items[${i}].image`),
        })),
      }
    }

    if (doc.gallery && typeof doc.gallery === 'object' && Array.isArray(doc.gallery.items)) {
      data.gallery = {
        ...doc.gallery,
        items: doc.gallery.items.map((item: any, i: number) => ({
          ...item,
          image: mapLeaf(item?.image, `gallery.items[${i}].image`),
        })),
      }
    }

    rewirePlan.push({ slug: String(doc.slug), changes })

    if (APPLY && changes.length) {
      await payload.update({
        collection: 'offerItems',
        id: doc.id,
        data: data as never,
        overrideAccess: true,
        // Keep intentional shared placeholders; skip ISR (revalidate separately on Vercel).
        context: { disableRevalidate: true, disableMediaDedupe: true },
        draft: false,
      })
    }
  }

  // --- Delete orphaned offer-shared seeds ---
  const referenced = new Set<number>()
  for (const c of ['galleries', 'offerItems', 'pages', 'posts'] as const) {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: c,
        limit: 50,
        page,
        depth: 0,
        draft: true,
        overrideAccess: true,
      })
      for (const doc of res.docs) {
        const walk = (node: unknown) => {
          if (node == null) return
          if (typeof node === 'number' && Number.isInteger(node)) {
            referenced.add(node)
            return
          }
          if (Array.isArray(node)) {
            for (const n of node) walk(n)
            return
          }
          if (typeof node === 'object') {
            for (const v of Object.values(node as Record<string, unknown>)) walk(v)
          }
        }
        walk(doc)
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  const orphanSeeds = [...seedIds].filter((id) => !referenced.has(id) && !Object.values(placeholderIds).includes(id))
  // After dry-run placeholders are fake negative ids; seed ids stay. In apply, rewire first then seeds become orphan.

  // --- Compress common/ ---
  const folders = await payload.find({
    collection: 'payload-folders',
    limit: 200,
    depth: 0,
    overrideAccess: true,
  })
  const folderById = new Map(folders.docs.map((f) => [f.id as number, f as { name?: string; folder?: unknown }]))
  const pathOf = (id: number | null | undefined): string => {
    const parts: string[] = []
    let cur = id
    const seen = new Set<number>()
    while (cur != null && !seen.has(cur)) {
      seen.add(cur)
      const f = folderById.get(cur)
      if (!f) break
      parts.unshift(String(f.name || ''))
      cur =
        typeof f.folder === 'number'
          ? f.folder
          : f.folder && typeof f.folder === 'object' && 'id' in (f.folder as object)
            ? Number((f.folder as { id: number }).id)
            : null
    }
    return parts.join('/')
  }
  const commonFolderIds = new Set(
    [...folderById.keys()].filter((id) => pathOf(id).startsWith('common')),
  )

  const commonPlan: Array<{
    id: number
    filename: string
    beforeKb: number
    afterKb?: number
    action: string
  }> = []

  for (const m of mediaAll.docs as Array<Record<string, any>>) {
    const fid = typeof m.folder === 'number' ? m.folder : m.folder?.id
    if (!commonFolderIds.has(fid)) continue
    const beforeKb = Math.round((m.filesize || 0) / 1024)
    const edge = Math.max(m.width || 0, m.height || 0)
    const isPng = String(m.mimeType || '').includes('png') || String(m.filename || '').endsWith('.png')
    const needsWork = edge > MAX_EDGE || isPng || beforeKb > 400
    if (!needsWork) {
      commonPlan.push({ id: m.id, filename: m.filename, beforeKb, action: 'skip' })
      continue
    }
    commonPlan.push({
      id: m.id,
      filename: m.filename,
      beforeKb,
      action: isPng ? 'png→jpeg+resize?' : 'resize/recompress',
    })
  }

  writeFileSync(
    path.join(outDir, 'plan.json'),
    JSON.stringify(
      {
        apply: APPLY,
        placeholders: placeholderPlan,
        placeholderIds,
        rewire: rewirePlan,
        seedIds: [...seedIds],
        orphanSeedsAfterRewireEstimate: APPLY ? orphanSeeds.length : seedIds.size,
        common: commonPlan,
      },
      null,
      2,
    ),
  )

  console.log(
    JSON.stringify(
      {
        mode: APPLY ? 'apply' : 'dry-run',
        outDir,
        placeholders: placeholderPlan,
        offersTouched: rewirePlan.filter((r) => r.changes.length).length,
        totalFieldRewires: rewirePlan.reduce((s, r) => s + r.changes.length, 0),
        offerSharedSeedCount: seedIds.size,
        commonToCompress: commonPlan.filter((c) => c.action !== 'skip').length,
        commonSkip: commonPlan.filter((c) => c.action === 'skip').length,
      },
      null,
      2,
    ),
  )

  if (!APPLY) {
    console.log('Dry-run only. Re-run with --apply to execute.')
    process.exit(0)
  }

  // Delete orphaned seeds (re-scan refs after rewire)
  const referencedAfter = new Set<number>()
  {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: 'offerItems',
        limit: 50,
        page,
        depth: 0,
        draft: true,
        overrideAccess: true,
      })
      for (const doc of res.docs) {
        const walk = (node: unknown) => {
          if (node == null) return
          if (typeof node === 'number' && Number.isInteger(node)) {
            referencedAfter.add(node)
            return
          }
          if (Array.isArray(node)) {
            for (const n of node) walk(n)
            return
          }
          if (typeof node === 'object') {
            for (const v of Object.values(node as Record<string, unknown>)) walk(v)
          }
        }
        walk(doc)
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  let deletedSeeds = 0
  const deleteErrors: Array<{ id: number; error: string }> = []
  for (const id of seedIds) {
    if (referencedAfter.has(id)) continue
    if (Object.values(placeholderIds).includes(id)) continue
    try {
      await payload.delete({
        collection: 'media',
        id,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      deletedSeeds++
      if (deletedSeeds % 10 === 0) console.log(`deleted seeds ${deletedSeeds}`)
    } catch (e) {
      deleteErrors.push({ id, error: String((e as Error)?.message || e) })
    }
  }

  // Compress common
  let compressed = 0
  let savedBytes = 0
  const compressErrors: Array<{ id: number; error: string }> = []
  for (const row of commonPlan.filter((c) => c.action !== 'skip')) {
    try {
      const m = mediaById.get(row.id) as any
      const filename = m.filename as string
      const res = await fetch(`${SERVER_URL}/api/media/file/${encodeURIComponent(filename)}`)
      if (!res.ok) throw new Error(`download ${filename} → ${res.status}`)
      const source = Buffer.from(await res.arrayBuffer())
      const { buffer, mimetype, ext } = await compressBuffer(source, m.mimeType)
      const base = filename.replace(/\.[^.]+$/, '')
      const newName = `${base}.${ext}`
      await payload.update({
        collection: 'media',
        id: row.id,
        data: {
          alt: m.alt ?? undefined,
          folder: typeof m.folder === 'number' ? m.folder : m.folder?.id,
        },
        file: {
          data: buffer,
          mimetype,
          name: newName,
          size: buffer.byteLength,
        },
        overrideAccess: true,
        context: { disableRevalidate: true },
        depth: 0,
      })
      savedBytes += Math.max(0, source.byteLength - buffer.byteLength)
      compressed++
      console.log(
        `compressed #${row.id} ${filename} ${Math.round(source.byteLength / 1024)}KB → ${Math.round(buffer.byteLength / 1024)}KB`,
      )
    } catch (e) {
      compressErrors.push({ id: row.id, error: String((e as Error)?.message || e) })
    }
  }

  writeFileSync(
    path.join(outDir, 'apply-result.json'),
    JSON.stringify(
      {
        placeholderIds,
        deletedSeeds,
        deleteErrors,
        compressed,
        savedMB: Math.round((savedBytes / 1024 / 1024) * 10) / 10,
        compressErrors,
      },
      null,
      2,
    ),
  )

  console.log(
    JSON.stringify(
      {
        placeholderIds,
        deletedSeeds,
        deleteErrorCount: deleteErrors.length,
        compressed,
        savedMB: Math.round((savedBytes / 1024 / 1024) * 10) / 10,
        compressErrorCount: compressErrors.length,
        outDir,
      },
      null,
      2,
    ),
  )
  process.exit(deleteErrors.length || compressErrors.length ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
