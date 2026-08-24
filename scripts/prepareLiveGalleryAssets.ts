/**
 * Read-only prep for swapping WP portfolio photos into Payload later.
 *
 * - Scrapes published stories from oczkifotografia.pl /historie-*
 * - Matches each photo 1:1 against the local WP dump (no guessing across sessions)
 * - Hardlinks matched originals into scripts/live-gallery-staging/
 * - Optionally reads production Payload galleries (titles/slugs) — NEVER writes CMS
 *
 * Usage:
 *   pnpm exec tsx scripts/prepareLiveGalleryAssets.ts
 *   SEED_TARGET=production pnpm exec tsx scripts/prepareLiveGalleryAssets.ts
 */
import path from 'path'
import { fileURLToPath } from 'url'

import { loadSeedEnv } from './lib/seedEnv'
import {
  assertDumpRoot,
  prepareGalleryFolders,
  scrapeLiveGalleryStories,
  writeJson,
  type PreparedGallery,
} from './lib/liveGalleryScrape'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const STAGING_ROOT = path.join(REPO_ROOT, 'scripts/live-gallery-staging')
const DEFAULT_UPLOADS = '/Users/kamilkrzysztof/www/wp-content/uploads'

type CmsGallerySnapshot = {
  id: number | string
  title: string
  slug: string
  portfolioCategory: string | null
  showOnPortfolio: boolean | null
  photoCount: number
  coverUrl: string | null
}

function normalizeForMatch(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function scoreCmsMatch(cms: CmsGallerySnapshot, live: PreparedGallery): number {
  // Ignore placeholder portfolio seed docs — they are not client titles.
  if (cms.slug.startsWith('portfolio-')) return 0

  const cmsSlug = normalizeForMatch(cms.slug)
  const liveSlug = normalizeForMatch(live.cmsSlugHint)
  const liveOrig = normalizeForMatch(live.slug)
  const cmsTitle = normalizeForMatch(cms.title)
  const liveTitle = normalizeForMatch(live.title)

  if (cmsSlug === liveSlug || cmsSlug === liveOrig) return 100
  if (cmsSlug.includes(liveSlug) || liveSlug.includes(cmsSlug)) return 80
  if (cmsTitle && liveTitle && (cmsTitle.includes(liveTitle) || liveTitle.includes(cmsTitle))) {
    return 70
  }

  const cmsTokens = new Set(cmsTitle.split(' ').filter((t) => t.length > 3))
  const liveTokens = liveTitle.split(' ').filter((t) => t.length > 3)
  const overlap = liveTokens.filter((t) => cmsTokens.has(t)).length
  if (overlap >= 2) return 55 + overlap * 5

  return 0
}

function pairWithCms(
  prepared: PreparedGallery[],
  cmsGalleries: CmsGallerySnapshot[],
): Array<{
  live: PreparedGallery
  cms: CmsGallerySnapshot | null
  score: number
}> {
  const usedCms = new Set<string>()
  const pairs: Array<{ live: PreparedGallery; cms: CmsGallerySnapshot | null; score: number }> =
    []

  const ranked = prepared.map((live) => {
    const candidates = cmsGalleries
      .map((cms) => ({ cms, score: scoreCmsMatch(cms, live) }))
      .filter((c) => c.score >= 70)
      .sort((a, b) => b.score - a.score)
    return { live, candidates }
  })

  ranked.sort((a, b) => (b.candidates[0]?.score ?? 0) - (a.candidates[0]?.score ?? 0))

  for (const row of ranked) {
    const hit = row.candidates.find((c) => !usedCms.has(String(c.cms.id)))
    if (hit) {
      usedCms.add(String(hit.cms.id))
      pairs.push({ live: row.live, cms: hit.cms, score: hit.score })
    } else {
      pairs.push({ live: row.live, cms: null, score: 0 })
    }
  }

  return pairs.sort((a, b) => a.live.title.localeCompare(b.live.title, 'pl'))
}

async function readProductionGalleries(): Promise<CmsGallerySnapshot[] | null> {
  if (process.env.SEED_TARGET !== 'production') {
    console.log('Skipping CMS snapshot (set SEED_TARGET=production to read prod galleries).')
    return null
  }

  const { getSeedPayload } = await import('./lib/seedPayload')
  const payload = await getSeedPayload()

  const result = await payload.find({
    collection: 'galleries',
    depth: 1,
    limit: 500,
    pagination: false,
    overrideAccess: true,
  })

  return result.docs.map((doc) => {
    const cover =
      doc.coverImage && typeof doc.coverImage === 'object' && 'url' in doc.coverImage
        ? (doc.coverImage.url as string | null | undefined)
        : null

    return {
      id: doc.id,
      title: doc.title,
      slug: doc.slug ?? '',
      portfolioCategory: (doc.portfolioCategory as string | null) ?? null,
      showOnPortfolio: doc.showOnPortfolio ?? null,
      photoCount: Array.isArray(doc.photos) ? doc.photos.length : 0,
      coverUrl: cover ?? null,
    }
  })
}

function buildMarkdownReport(options: {
  prepared: PreparedGallery[]
  pairs: ReturnType<typeof pairWithCms> | null
  cmsGalleries: CmsGallerySnapshot[] | null
}): string {
  const { prepared, pairs, cmsGalleries } = options
  const totalPhotos = prepared.reduce((n, g) => n + g.photos.length, 0)
  const matchedPhotos = prepared.reduce((n, g) => n + g.matchedCount, 0)
  const missingPhotos = prepared.reduce((n, g) => n + g.missingCount, 0)

  const lines: string[] = [
    '# Live gallery prep report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- Stories scraped: **${prepared.length}**`,
    `- Photos listed on live posts: **${totalPhotos}**`,
    `- Matched in local dump: **${matchedPhotos}**`,
    `- Missing from dump: **${missingPhotos}**`,
    `- CMS galleries read: **${cmsGalleries?.length ?? 0}** (read-only)`,
    '',
    'No Payload writes were performed.',
    '',
    '## By category',
    '',
  ]

  const byCat = new Map<string, number>()
  for (const g of prepared) {
    byCat.set(g.category, (byCat.get(g.category) ?? 0) + 1)
  }
  for (const [cat, count] of [...byCat.entries()].sort()) {
    lines.push(`- \`${cat}\`: ${count}`)
  }

  lines.push('', '## Stories', '')

  const rows = pairs ?? prepared.map((live) => ({ live, cms: null, score: 0 }))
  for (const row of rows) {
    const { live, cms, score } = row
    lines.push(`### ${live.title}`)
    lines.push('')
    lines.push(`- Live: ${live.url}`)
    lines.push(`- Live slug: \`${live.slug}\``)
    lines.push(`- Suggested CMS slug: \`${live.cmsSlugHint}\``)
    lines.push(`- Category: \`${live.category}\` (from \`/${live.archive}/\`)`)
    lines.push(`- Photos: ${live.matchedCount}/${live.photos.length} matched in dump`)
    if (cms) {
      lines.push(
        `- CMS match: **${cms.title}** (\`${cms.slug}\`, id ${cms.id}, score ${score}, existing photos ${cms.photoCount})`,
      )
    } else {
      lines.push('- CMS match: _(none — new story or titles differ)_')
    }
    if (live.missingCount > 0) {
      const missing = live.photos.filter((p) => !p.matched).map((p) => p.relativePath)
      lines.push(`- Missing files: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`)
    }
    lines.push('')
  }

  if (cmsGalleries && pairs) {
    const matchedIds = new Set(
      pairs.filter((p) => p.cms).map((p) => String(p.cms!.id)),
    )
    const unmatchedCms = cmsGalleries.filter((g) => !matchedIds.has(String(g.id)))
    lines.push('## CMS galleries without a live match', '')
    if (unmatchedCms.length === 0) {
      lines.push('_All production galleries matched a live story._', '')
    } else {
      for (const g of unmatchedCms) {
        lines.push(
          `- **${g.title}** (\`${g.slug}\`, ${g.portfolioCategory ?? '—'}, photos ${g.photoCount})`,
        )
      }
      lines.push('')
    }
  }

  return `${lines.join('\n')}\n`
}

async function main(): Promise<void> {
  loadSeedEnv()

  const uploadsRoot = process.env.WP_UPLOADS_ROOT ?? DEFAULT_UPLOADS
  assertDumpRoot(uploadsRoot)

  console.log('1/4 Scraping live /historie-* archives…')
  const stories = await scrapeLiveGalleryStories()
  console.log(`   → ${stories.length} stories with photos`)

  console.log('2/4 Matching dump files + hardlinking into staging…')
  const prepared = await prepareGalleryFolders({
    stories,
    uploadsRoot,
    stagingRoot: STAGING_ROOT,
    downloadMissing: process.env.LIVE_GALLERY_DOWNLOAD_MISSING !== '0',
  })
  const matchedPhotos = prepared.reduce((n, g) => n + g.matchedCount, 0)
  const totalPhotos = prepared.reduce((n, g) => n + g.photos.length, 0)
  console.log(`   → ${matchedPhotos}/${totalPhotos} photos matched`)

  console.log('3/4 Reading CMS galleries (read-only)…')
  const cmsGalleries = await readProductionGalleries()
  const pairs = cmsGalleries ? pairWithCms(prepared, cmsGalleries) : null
  if (cmsGalleries) {
    const linked = pairs!.filter((p) => p.cms).length
    console.log(`   → ${cmsGalleries.length} CMS docs, ${linked} paired to live stories`)
  }

  console.log('4/4 Writing report…')
  const manifest = {
    generatedAt: new Date().toISOString(),
    uploadsRoot,
    stagingRoot: STAGING_ROOT,
    cmsWrite: false,
    stories: prepared.map((g) => ({
      title: g.title,
      liveSlug: g.slug,
      cmsSlugHint: g.cmsSlugHint,
      url: g.url,
      archive: g.archive,
      category: g.category,
      intro: g.intro,
      matchedCount: g.matchedCount,
      missingCount: g.missingCount,
      photos: g.photos.map((p) => ({
        relativePath: p.relativePath,
        matched: p.matched,
        matchKind: p.matchKind,
        dumpAbsolutePath: p.dumpAbsolutePath,
        candidates: p.candidates,
      })),
    })),
    cmsGalleries,
    pairs: pairs?.map((p) => ({
      liveSlug: p.live.slug,
      cmsSlug: p.cms?.slug ?? null,
      cmsId: p.cms?.id ?? null,
      cmsTitle: p.cms?.title ?? null,
      score: p.score,
    })),
  }

  await writeJson(path.join(STAGING_ROOT, 'manifest.json'), manifest)
  await writeJson(path.join(STAGING_ROOT, 'cms-galleries.json'), cmsGalleries ?? [])
  const report = buildMarkdownReport({ prepared, pairs, cmsGalleries })
  const { writeFile } = await import('fs/promises')
  await writeFile(path.join(STAGING_ROOT, 'REPORT.md'), report, 'utf8')

  console.log(`\nDone. Staging: ${STAGING_ROOT}`)
  console.log(`Report: ${path.join(STAGING_ROOT, 'REPORT.md')}`)
  console.log('CMS was not modified.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
