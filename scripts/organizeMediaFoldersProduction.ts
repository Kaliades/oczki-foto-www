/**
 * Organize production Media into Payload folders.
 *
 * Tree:
 *   common/{global|pages}/{slug?}
 *   galleries/{gallerySlug}
 *   offers/{offerSlug}
 *   orphans
 *
 * Usage:
 *   SEED_TARGET=production pnpm exec tsx scripts/organizeMediaFoldersProduction.ts
 *   SEED_TARGET=production pnpm exec tsx scripts/organizeMediaFoldersProduction.ts --apply
 */
import { mkdirSync, writeFileSync } from 'fs'
import path from 'path'

import { loadSeedEnv } from './lib/seedEnv'

loadSeedEnv()

const APPLY = process.argv.includes('--apply')

const MEDIA_KEY_RE = /(image|photo|media|portrait|landscape|cover|scallop|background|icon|logo|og)/i

function collectMediaIds(node: unknown, pathKey: string, out: number[]) {
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
    if ('id' in o && typeof o.id === 'number' && ('url' in o || 'filename' in o || 'mimeType' in o)) {
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

type OwnerKind = 'gallery' | 'offer' | 'page' | 'global' | 'orphan'

type Assignment = {
  mediaId: number
  kind: OwnerKind
  folderPath: string[]
  ownerLabel: string
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
      ? {
          and: [{ name: { equals: name } }, { folder: { exists: false } }],
        }
      : {
          and: [{ name: { equals: name } }, { folder: { equals: parentId } }],
        }

  const existing = await payload.find({
    collection: 'payload-folders',
    where,
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
    // Dry-run: allocate negative ids so paths stay unique in-memory
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

async function ensureFolderPath(
  payload: Awaited<ReturnType<typeof import('payload').getPayload>>,
  parts: string[],
  cache: Map<string, number>,
): Promise<number> {
  let parent: number | null = null
  let id = 0
  for (const part of parts) {
    id = await ensureFolder(payload, part, parent, cache)
    parent = id
  }
  return id
}

async function main() {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing: set SEED_TARGET=production for this script.')
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

  const assignments = new Map<number, Assignment>()

  const setAssignment = (mediaId: number, next: Assignment) => {
    const prev = assignments.get(mediaId)
    if (!prev) {
      assignments.set(mediaId, next)
      return
    }
    // Prefer more specific owners if a heuristic ever double-hits
    const rank: Record<OwnerKind, number> = {
      gallery: 4,
      offer: 3,
      page: 2,
      global: 1,
      orphan: 0,
    }
    if (rank[next.kind] > rank[prev.kind]) assignments.set(mediaId, next)
  }

  // Galleries
  {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: 'galleries',
        limit: 50,
        page,
        depth: 0,
        draft: true,
        overrideAccess: true,
      })
      for (const doc of res.docs) {
        const slug = String(doc.slug || doc.id)
        const ids: number[] = []
        collectMediaIds(doc, '', ids)
        for (const id of new Set(ids)) {
          setAssignment(id, {
            mediaId: id,
            kind: 'gallery',
            folderPath: ['galleries', slug],
            ownerLabel: `galleries:${slug}`,
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  // Offers
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
        const slug = String(doc.slug || doc.id)
        const ids: number[] = []
        collectMediaIds(doc, '', ids)
        for (const id of new Set(ids)) {
          setAssignment(id, {
            mediaId: id,
            kind: 'offer',
            folderPath: ['offers', slug],
            ownerLabel: `offers:${slug}`,
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  // Pages
  {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: 'pages',
        limit: 50,
        page,
        depth: 0,
        draft: true,
        overrideAccess: true,
      })
      for (const doc of res.docs) {
        const slug = String(doc.slug || doc.id)
        const ids: number[] = []
        collectMediaIds(doc, '', ids)
        for (const id of new Set(ids)) {
          setAssignment(id, {
            mediaId: id,
            kind: 'page',
            folderPath: ['common', 'pages', slug],
            ownerLabel: `pages:${slug}`,
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  // Globals
  for (const g of [
    'header',
    'footer',
    'siteSettings',
    'galleryPage',
    'aboutPage',
    'contactPage',
    'privacyPolicyPage',
    'cookieConsent',
  ] as const) {
    try {
      const doc = await payload.findGlobal({
        slug: g,
        depth: 0,
        overrideAccess: true,
        draft: true,
      })
      const ids: number[] = []
      collectMediaIds(doc, '', ids)
      for (const id of new Set(ids)) {
        setAssignment(id, {
          mediaId: id,
          kind: 'global',
          folderPath: ['common', g],
          ownerLabel: `global:${g}`,
        })
      }
    } catch {
      // ignore
    }
  }

  // All media → orphans if unassigned
  {
    let page = 1
    while (true) {
      const res = await payload.find({
        collection: 'media',
        limit: 100,
        page,
        depth: 0,
        overrideAccess: true,
      })
      for (const m of res.docs) {
        const id = m.id as number
        if (!assignments.has(id)) {
          setAssignment(id, {
            mediaId: id,
            kind: 'orphan',
            folderPath: ['orphans'],
            ownerLabel: 'orphan',
          })
        }
      }
      if (!res.hasNextPage) break
      page++
    }
  }

  const byFolder = new Map<string, number>()
  const byKind: Record<OwnerKind, number> = {
    gallery: 0,
    offer: 0,
    page: 0,
    global: 0,
    orphan: 0,
  }
  for (const a of assignments.values()) {
    byKind[a.kind]++
    const key = a.folderPath.join('/')
    byFolder.set(key, (byFolder.get(key) || 0) + 1)
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outDir = path.join('scripts/prod-migration-backups', `folders-organize-${stamp}`)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(
    path.join(outDir, 'plan.json'),
    JSON.stringify(
      {
        apply: APPLY,
        at: new Date().toISOString(),
        totalAssignments: assignments.size,
        byKind,
        folders: [...byFolder.entries()].sort((a, b) => a[0].localeCompare(b[0])),
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
        totalAssignments: assignments.size,
        byKind,
        folderCount: byFolder.size,
      },
      null,
      2,
    ),
  )

  if (!APPLY) {
    console.log('Dry-run only. Re-run with --apply to create folders and move media.')
    process.exit(0)
  }

  const folderCache = new Map<string, number>()
  let moved = 0
  let skipped = 0
  const errors: Array<{ mediaId: number; error: string }> = []

  // Create all folder paths first
  const uniquePaths = [...new Set([...assignments.values()].map((a) => a.folderPath.join('\0')))]
  for (const key of uniquePaths) {
    const parts = key.split('\0')
    await ensureFolderPath(payload, parts, folderCache)
  }
  console.log(`folders ready: ${folderCache.size}`)

  for (const a of assignments.values()) {
    try {
      const folderId = await ensureFolderPath(payload, a.folderPath, folderCache)
      const current = await payload.findByID({
        collection: 'media',
        id: a.mediaId,
        depth: 0,
        overrideAccess: true,
      })
      const currentFolder =
        typeof (current as { folder?: unknown }).folder === 'number'
          ? ((current as { folder: number }).folder as number)
          : (current as { folder?: { id?: number } | null }).folder &&
              typeof (current as { folder?: { id?: number } }).folder === 'object'
            ? (current as { folder: { id: number } }).folder.id
            : null
      if (currentFolder === folderId) {
        skipped++
        continue
      }
      await payload.update({
        collection: 'media',
        id: a.mediaId,
        data: { folder: folderId },
        overrideAccess: true,
        context: { disableRevalidate: true },
        depth: 0,
      })
      moved++
      if (moved % 50 === 0) console.log(`moved ${moved}/${assignments.size}`)
    } catch (e) {
      errors.push({ mediaId: a.mediaId, error: String((e as Error)?.message || e) })
    }
  }

  writeFileSync(
    path.join(outDir, 'apply-result.json'),
    JSON.stringify({ moved, skipped, errors, folderCacheSize: folderCache.size }, null, 2),
  )
  console.log(JSON.stringify({ moved, skipped, errorCount: errors.length, outDir }, null, 2))
  process.exit(errors.length ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
