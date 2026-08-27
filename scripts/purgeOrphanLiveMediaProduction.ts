/**
 * Delete unreferenced live-* media on production (old q75 uploads after HQ replace).
 *
 * Usage:
 *   SEED_TARGET=production pnpm exec tsx scripts/purgeOrphanLiveMediaProduction.ts
 *   SEED_TARGET=production pnpm exec tsx scripts/purgeOrphanLiveMediaProduction.ts --apply
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

async function main() {
  if (process.env.SEED_TARGET !== 'production') {
    throw new Error('Refusing: set SEED_TARGET=production')
  }

  const { getPayload } = await import('payload')
  const { default: config } = await import('../src/payload.config')
  const payload = await getPayload({ config })

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
        const ids: number[] = []
        collectMediaIds(doc, '', ids)
        for (const id of ids) referenced.add(id)
      }
      if (!res.hasNextPage) break
      page++
    }
  }
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
      const doc = await payload.findGlobal({ slug: g, depth: 0, overrideAccess: true, draft: true })
      const ids: number[] = []
      collectMediaIds(doc, '', ids)
      for (const id of ids) referenced.add(id)
    } catch {
      // ignore
    }
  }

  const orphans: Array<{ id: number; filename: string | null; filesize: number | null }> = []
  let page = 1
  while (true) {
    const res = await payload.find({
      collection: 'media',
      where: { filename: { like: 'live-%' } },
      limit: 100,
      page,
      depth: 0,
      overrideAccess: true,
    })
    for (const m of res.docs) {
      const id = m.id as number
      if (referenced.has(id)) continue
      orphans.push({
        id,
        filename: (m as { filename?: string }).filename ?? null,
        filesize: (m as { filesize?: number }).filesize ?? null,
      })
    }
    if (!res.hasNextPage) break
    page++
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
  const outDir = path.join('scripts/prod-migration-backups', `purge-orphan-live-${stamp}`)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(path.join(outDir, 'plan.json'), JSON.stringify({ apply: APPLY, orphans }, null, 2))

  const bytes = orphans.reduce((s, o) => s + (o.filesize || 0), 0)
  console.log(
    JSON.stringify(
      {
        mode: APPLY ? 'apply' : 'dry-run',
        outDir,
        orphanCount: orphans.length,
        orphanMB: Math.round(bytes / 1024 / 1024),
        sample: orphans.slice(0, 8),
      },
      null,
      2,
    ),
  )

  if (!APPLY) {
    console.log('Dry-run only. Re-run with --apply to delete.')
    process.exit(0)
  }

  let deleted = 0
  const errors: Array<{ id: number; error: string }> = []
  for (const o of orphans) {
    try {
      await payload.delete({
        collection: 'media',
        id: o.id,
        overrideAccess: true,
        context: { disableRevalidate: true },
      })
      deleted++
      if (deleted % 25 === 0) console.log(`deleted ${deleted}/${orphans.length}`)
    } catch (e) {
      errors.push({ id: o.id, error: String((e as Error)?.message || e) })
    }
  }

  writeFileSync(path.join(outDir, 'apply-result.json'), JSON.stringify({ deleted, errors }, null, 2))
  console.log(JSON.stringify({ deleted, errorCount: errors.length, outDir }, null, 2))
  process.exit(errors.length ? 1 : 0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
