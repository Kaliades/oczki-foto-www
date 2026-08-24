import { existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import { copyFile, link, mkdir, writeFile } from 'fs/promises'
import path from 'path'

import type { GallerySessionFilterId } from '@/components/GalleryHero/constants'

export const LIVE_SITE_ORIGIN = 'https://oczkifotografia.pl'

/** Live archive → new-site portfolio filter. */
export const LIVE_ARCHIVE_TO_CATEGORY: Record<
  string,
  GallerySessionFilterId
> = {
  'historie-kobiece': 'kobieca',
  'historie-milosne': 'narzezenska',
  'historie-rodzinne': 'rodzinna',
  'historie-slubne': 'slubny',
}

/** Nav / offer pages that appear in archive HTML but are not gallery stories. */
export const LIVE_SLUG_BLOCKLIST = new Set([
  'profesjonalna-kobieca-sesja-wizerunkowa-krakow-i-malopolska',
  'reportaze-slubne-wydarzenia',
  'sesja-krakow-przemysl-i-okolice',
  'warsztaty-fotografii-slubnej',
  'albumy-i-vouchery',
  'o-nas',
  'oferta',
  'kontakt',
  'historie',
  'historie-kobiece',
  'historie-milosne',
  'historie-rodzinne',
  'historie-slubne',
])

/** Known CMS ↔ live slug aliases (case-study already in Payload). */
export const LIVE_SLUG_ALIASES: Record<string, string> = {
  'slub-w-kosciele-w-wieprzu-i-wesele-w-parkhotel-lyson-justyna-i-krzys-reportaz-slubny-z-goracego-czerwca':
    'slub-justyny-i-krzysia',
}

const UPLOAD_PATH_RE =
  /\/wp-content\/uploads\/(\d{4}\/\d{2}\/[^"'?\s>]+\.(?:jpe?g|png|webp))/gi
const SIZE_SUFFIX_RE = /-\d+x\d+(?=\.(?:jpe?g|png|webp)$)/i
const SCALED_SUFFIX_RE = /-scaled(?=\.(?:jpe?g|png|webp)$)/i

const SKIP_BASENAME_RE =
  /^(cropped-)?RGB_LOGO|logo|favicon|sprite|placeholder|Dummy|dummy/i

export type LiveGalleryPhoto = {
  /** Preferred relative path under uploads, e.g. `2022/04/Dominika-007.jpg` */
  relativePath: string
  basename: string
  /** All upload-relative variants seen in HTML (original + srcset sizes), best first. */
  candidates: string[]
}

export type LiveGalleryStory = {
  slug: string
  url: string
  title: string
  archive: keyof typeof LIVE_ARCHIVE_TO_CATEGORY
  category: GallerySessionFilterId
  photos: LiveGalleryPhoto[]
  intro: string
}

export type MatchedPhoto = LiveGalleryPhoto & {
  dumpAbsolutePath: string | null
  matched: boolean
  matchKind: 'exact' | 'extension' | 'resized' | 'basename' | 'gallery' | 'download' | null
}

export type PreparedGallery = Omit<LiveGalleryStory, 'photos'> & {
  cmsSlugHint: string
  photos: MatchedPhoto[]
  matchedCount: number
  missingCount: number
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
}

export function normalizeOriginalUploadPath(relativePath: string): string {
  let cleaned = relativePath.replace(/\\/g, '/')
  cleaned = cleaned.replace(SIZE_SUFFIX_RE, '')
  cleaned = cleaned.replace(SCALED_SUFFIX_RE, '')
  return cleaned
}

export function resolvePortfolioCategory(
  archive: keyof typeof LIVE_ARCHIVE_TO_CATEGORY,
  slug: string,
  title: string,
): GallerySessionFilterId {
  const base = LIVE_ARCHIVE_TO_CATEGORY[archive]
  if (archive !== 'historie-kobiece') return base

  const haystack = `${slug} ${title}`.toLowerCase()
  if (haystack.includes('wizerunkowa') || haystack.includes('biznesowa')) {
    return 'wizerunkowa'
  }
  return 'kobieca'
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; OczkiGalleryPrep/1.0; +local-dev-import)',
      Accept: 'text/html,application/xhtml+xml',
    },
  })
  if (!res.ok) {
    throw new Error(`GET ${url} → ${res.status}`)
  }
  return res.text()
}

function extractPostLinks(html: string, archive: string): string[] {
  const re = new RegExp(
    `href="(${LIVE_SITE_ORIGIN.replace(/\./g, '\\.')}/([a-z0-9-]+)/)"`,
    'gi',
  )
  const slugs = new Set<string>()
  for (const match of html.matchAll(re)) {
    const slug = match[2]
    if (!slug || LIVE_SLUG_BLOCKLIST.has(slug)) continue
    if (slug === archive || slug.startsWith('page')) continue
    if (slug === 'feed' || slug === 'comments') continue
    slugs.add(slug)
  }
  return [...slugs]
}

function extractTitle(html: string): string {
  const h1 = html.match(/<h1[^>]*class="[^"]*post-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i)
  if (h1?.[1]) {
    return decodeHtmlEntities(h1[1].replace(/<[^>]+>/g, '').trim())
  }
  const og = html.match(/<meta\s+property="og:title"\s+content="([^"]+)"/i)
  if (og?.[1]) return decodeHtmlEntities(og[1].trim())
  const title = html.match(/<title>([^<]+)<\/title>/i)
  if (title?.[1]) {
    return decodeHtmlEntities(
      title[1].replace(/\s*[–-]\s*Oczki Fotografia\s*$/i, '').trim(),
    )
  }
  return ''
}

function extractIntro(html: string): string {
  const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html
  const paragraphs = [...article.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) =>
      decodeHtmlEntities(
        m[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim(),
      ),
    )
    .filter((t) => t.length > 40 && !/^Share/i.test(t))
  return paragraphs[0] ?? ''
}

function extractPhotosFromArticle(html: string): LiveGalleryPhoto[] {
  const article = html.match(/<article[\s\S]*?<\/article>/i)?.[0] ?? html
  /** stemKey → raw paths exactly as seen in HTML (may include -WxH). */
  const groups = new Map<string, string[]>()
  const order: string[] = []

  for (const match of article.matchAll(UPLOAD_PATH_RE)) {
    const raw = match[1]
    const basename = path.basename(raw)
    if (SKIP_BASENAME_RE.test(basename)) continue

    const normalized = normalizeOriginalUploadPath(raw)
    const stemKey = normalized.replace(/\.(jpe?g|png|webp)$/i, '').toLowerCase()
    if (!groups.has(stemKey)) {
      groups.set(stemKey, [])
      order.push(stemKey)
    }
    const list = groups.get(stemKey)!
    if (!list.includes(raw)) list.push(raw)
  }

  const photos: LiveGalleryPhoto[] = []

  for (const stemKey of order) {
    const rawList = groups.get(stemKey) ?? []
    if (rawList.length === 0) continue

    const trueOriginals = rawList.filter((p) => !SIZE_SUFFIX_RE.test(path.basename(p)))
    const preferred =
      trueOriginals[0] ?? pickLargestSizedPath(rawList) ?? rawList[0]
    if (!preferred) continue

    const lookupExtras = rawList.flatMap((raw) => {
      const normalized = normalizeOriginalUploadPath(raw)
      const stem = normalized.replace(/\.(jpe?g|png|webp)$/i, '')
      return [
        normalized,
        `${stem}.jpg`,
        `${stem}.jpeg`,
        `${stem}.png`,
        `${stem}.webp`,
        `${stem}-jpg.webp`,
      ]
    })

    photos.push({
      relativePath: preferred,
      basename: path.basename(preferred),
      candidates: rankCandidates(preferred, [...rawList, ...lookupExtras]),
    })
  }

  return photos
}

function parseWxH(fileName: string): number {
  const m = fileName.match(/-(\d+)x(\d+)\.(?:jpe?g|png|webp)$/i)
  if (!m) return 0
  return Number(m[1]) * Number(m[2])
}

function pickLargestSizedPath(paths: string[]): string | null {
  let best: string | null = null
  let bestScore = -1
  for (const p of paths) {
    const score = parseWxH(path.basename(p))
    if (score > bestScore) {
      bestScore = score
      best = p
    }
  }
  return best
}

function rankCandidates(preferred: string, all: string[]): string[] {
  const stem = preferred.replace(/\.(jpe?g|png|webp)$/i, '')
  const dir = path.posix.dirname(preferred)
  const alts = [
    preferred,
    `${stem}.jpg`,
    `${stem}.jpeg`,
    `${stem}.png`,
    `${stem}.webp`,
    `${stem}-jpg.webp`,
    ...all,
  ]

  const uniq: string[] = []
  const seen = new Set<string>()
  for (const item of alts) {
    const rel = item.includes('/') ? item : path.posix.join(dir, item)
    const key = rel.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    uniq.push(rel)
  }

  // Keep preferred first, then extension twins, then largest resized.
  return uniq.sort((a, b) => {
    const aBase = path.basename(a)
    const bBase = path.basename(b)
    const aOrig = !SIZE_SUFFIX_RE.test(aBase) ? 1 : 0
    const bOrig = !SIZE_SUFFIX_RE.test(bBase) ? 1 : 0
    if (aOrig !== bOrig) return bOrig - aOrig
    return parseWxH(bBase) - parseWxH(aBase)
  })
}

export async function scrapeLiveGalleryStories(): Promise<LiveGalleryStory[]> {
  const stories: LiveGalleryStory[] = []
  const seenSlugs = new Set<string>()

  for (const archive of Object.keys(LIVE_ARCHIVE_TO_CATEGORY) as Array<
    keyof typeof LIVE_ARCHIVE_TO_CATEGORY
  >) {
    const archiveUrl = `${LIVE_SITE_ORIGIN}/${archive}/`
    const archiveHtml = await fetchText(archiveUrl)
    const slugs = extractPostLinks(archiveHtml, archive)

    for (const slug of slugs) {
      if (seenSlugs.has(slug)) continue
      seenSlugs.add(slug)

      const url = `${LIVE_SITE_ORIGIN}/${slug}/`
      const html = await fetchText(url)
      const title = extractTitle(html) || slug
      const photos = extractPhotosFromArticle(html)
      if (photos.length === 0) continue

      stories.push({
        slug,
        url,
        title,
        archive,
        category: resolvePortfolioCategory(archive, slug, title),
        photos,
        intro: extractIntro(html),
      })
    }
  }

  return stories
}

/** Index dump uploads (originals + resized) and NextGEN gallery folders. */
export function buildDumpUploadIndex(uploadsRoot: string): {
  byRelative: Map<string, string>
  byBasename: Map<string, string[]>
  byStemInDir: Map<string, string[]>
} {
  const byRelative = new Map<string, string>()
  const byBasename = new Map<string, string[]>()
  const byStemInDir = new Map<string, string[]>()

  const indexFile = (absolute: string, relative: string) => {
    byRelative.set(relative, absolute)
    byRelative.set(relative.toLowerCase(), absolute)

    const base = path.basename(relative)
    const list = byBasename.get(base) ?? []
    list.push(absolute)
    byBasename.set(base, list)
    byBasename.set(base.toLowerCase(), list)

    const dir = path.posix.dirname(relative)
    const stem = base.replace(/\.(jpe?g|png|webp)$/i, '').replace(SIZE_SUFFIX_RE, '').replace(SCALED_SUFFIX_RE, '')
    const stemKey = `${dir}/${stem}`.toLowerCase()
    const stemList = byStemInDir.get(stemKey) ?? []
    stemList.push(absolute)
    byStemInDir.set(stemKey, stemList)
  }

  const yearDirs = readdirSync(uploadsRoot).filter((name) => /^\d{4}$/.test(name))

  for (const year of yearDirs) {
    const yearPath = path.join(uploadsRoot, year)
    if (!statSync(yearPath).isDirectory()) continue

    for (const month of readdirSync(yearPath)) {
      if (!/^\d{2}$/.test(month)) continue
      const monthPath = path.join(yearPath, month)
      if (!statSync(monthPath).isDirectory()) continue

      for (const file of readdirSync(monthPath)) {
        if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
        if (file.endsWith('.jpg_backup') || file.endsWith('_backup')) continue
        indexFile(path.join(monthPath, file), `${year}/${month}/${file}`)
      }
    }
  }

  // NextGEN classic galleries live beside uploads: wp-content/gallery/<album>/
  const galleryRoot = path.join(path.dirname(uploadsRoot), 'gallery')
  if (existsSync(galleryRoot)) {
    for (const album of readdirSync(galleryRoot)) {
      const albumPath = path.join(galleryRoot, album)
      if (!statSync(albumPath).isDirectory()) continue
      for (const file of readdirSync(albumPath)) {
        if (!/\.(jpe?g|png|webp)$/i.test(file)) continue
        if (file.includes('_backup')) continue
        indexFile(path.join(albumPath, file), `gallery/${album}/${file}`)
      }
    }
  }

  return { byRelative, byBasename, byStemInDir }
}

function pickBestAbsolute(paths: string[]): string | null {
  if (paths.length === 0) return null
  return (
    [...paths].sort((a, b) => {
      const aBase = path.basename(a)
      const bBase = path.basename(b)
      const aOrig = !SIZE_SUFFIX_RE.test(aBase) && !SCALED_SUFFIX_RE.test(aBase) ? 1 : 0
      const bOrig = !SIZE_SUFFIX_RE.test(bBase) && !SCALED_SUFFIX_RE.test(bBase) ? 1 : 0
      if (aOrig !== bOrig) return bOrig - aOrig
      // Prefer jpg/png originals over webp derivatives when same class.
      const aJpg = /\.jpe?g$/i.test(aBase) ? 1 : 0
      const bJpg = /\.jpe?g$/i.test(bBase) ? 1 : 0
      if (aJpg !== bJpg) return bJpg - aJpg
      return parseWxH(bBase) - parseWxH(aBase)
    })[0] ?? null
  )
}

export function matchPhotosToDump(
  photos: LiveGalleryPhoto[],
  index: ReturnType<typeof buildDumpUploadIndex>,
): MatchedPhoto[] {
  return photos.map((photo) => {
    for (const candidate of photo.candidates) {
      const direct =
        index.byRelative.get(candidate) ?? index.byRelative.get(candidate.toLowerCase())
      if (direct) {
        const kind: MatchedPhoto['matchKind'] =
          path.basename(direct) === path.basename(photo.relativePath)
            ? 'exact'
            : SIZE_SUFFIX_RE.test(path.basename(direct))
              ? 'resized'
              : 'extension'
        return { ...photo, dumpAbsolutePath: direct, matched: true, matchKind: kind }
      }
    }

    // Stem lookup in the same year/month folder (covers .webp → .jpg and -1024x683).
    for (const candidate of photo.candidates) {
      const dir = path.posix.dirname(candidate)
      const stem = path
        .basename(candidate)
        .replace(/\.(jpe?g|png|webp)$/i, '')
        .replace(SIZE_SUFFIX_RE, '')
        .replace(SCALED_SUFFIX_RE, '')
        .replace(/-jpg$/i, '')
      const stemKey = `${dir}/${stem}`.toLowerCase()
      const hits = index.byStemInDir.get(stemKey) ?? []
      const best = pickBestAbsolute(hits)
      if (best) {
        return {
          ...photo,
          dumpAbsolutePath: best,
          matched: true,
          matchKind: SIZE_SUFFIX_RE.test(path.basename(best)) ? 'resized' : 'extension',
        }
      }
    }

    const byName =
      index.byBasename.get(photo.basename) ??
      index.byBasename.get(photo.basename.toLowerCase()) ??
      []
    const preferred = pickBestAbsolute(
      byName.filter((abs) =>
        abs.replace(/\\/g, '/').includes(`/${photo.relativePath.split('/').slice(0, 2).join('/')}/`),
      ),
    )
    if (preferred) {
      return { ...photo, dumpAbsolutePath: preferred, matched: true, matchKind: 'basename' }
    }

    // NextGEN / basename-only fallback (same filename anywhere in dump).
    const anyName = pickBestAbsolute(byName)
    if (anyName) {
      return { ...photo, dumpAbsolutePath: anyName, matched: true, matchKind: 'gallery' }
    }

    const stemOnly = photo.basename
      .replace(/\.(jpe?g|png|webp)$/i, '')
      .replace(SIZE_SUFFIX_RE, '')
      .replace(/-jpg$/i, '')
    const stemHits: string[] = []
    for (const [key, absList] of index.byStemInDir) {
      if (key.endsWith(`/${stemOnly.toLowerCase()}`)) stemHits.push(...absList)
    }
    const stemBest = pickBestAbsolute(stemHits)
    if (stemBest) {
      return { ...photo, dumpAbsolutePath: stemBest, matched: true, matchKind: 'gallery' }
    }

    return { ...photo, dumpAbsolutePath: null, matched: false, matchKind: null }
  })
}

export async function hardlinkOrCopy(src: string, dest: string): Promise<void> {
  await mkdir(path.dirname(dest), { recursive: true })
  try {
    await link(src, dest)
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code
    if (code === 'EEXIST') return
    if (code === 'EXDEV' || code === 'EPERM' || code === 'ENOTSUP') {
      await copyFile(src, dest)
      return
    }
    throw err
  }
}

export function slugifyFolderName(slug: string): string {
  return slug.replace(/[^a-z0-9-]+/gi, '-').replace(/-+/g, '-').toLowerCase()
}

export async function prepareGalleryFolders(options: {
  stories: LiveGalleryStory[]
  uploadsRoot: string
  stagingRoot: string
  /** When dump miss, try downloading the best live candidate into staging. */
  downloadMissing?: boolean
}): Promise<PreparedGallery[]> {
  const index = buildDumpUploadIndex(options.uploadsRoot)
  const prepared: PreparedGallery[] = []
  const downloadsRoot = path.join(options.stagingRoot, 'downloads')

  for (const story of options.stories) {
    let matched = matchPhotosToDump(story.photos, index)

    if (options.downloadMissing) {
      matched = await fillMissingByDownload(matched, downloadsRoot)
    }

    const cmsSlugHint = LIVE_SLUG_ALIASES[story.slug] ?? story.slug
    const folder = path.join(
      options.stagingRoot,
      'galleries',
      `${story.category}__${slugifyFolderName(cmsSlugHint)}`,
    )

    mkdirSync(folder, { recursive: true })

    let order = 0
    for (const photo of matched) {
      if (!photo.dumpAbsolutePath) continue
      order += 1
      const destName = `${String(order).padStart(3, '0')}__${path.basename(photo.dumpAbsolutePath)}`
      await hardlinkOrCopy(photo.dumpAbsolutePath, path.join(folder, destName))
    }

    prepared.push({
      ...story,
      cmsSlugHint,
      photos: matched,
      matchedCount: matched.filter((p) => p.matched).length,
      missingCount: matched.filter((p) => !p.matched).length,
    })
  }

  return prepared
}

async function fillMissingByDownload(
  photos: MatchedPhoto[],
  downloadsRoot: string,
): Promise<MatchedPhoto[]> {
  const out: MatchedPhoto[] = []

  for (const photo of photos) {
    if (photo.matched && photo.dumpAbsolutePath) {
      out.push(photo)
      continue
    }

    const tried = new Set<string>()
    let saved: string | null = null

    for (const candidate of photo.candidates) {
      if (tried.has(candidate)) continue
      tried.add(candidate)
      const dest = path.join(downloadsRoot, candidate)
      try {
        await downloadRemoteOriginal(candidate, dest)
        saved = dest
        break
      } catch {
        // try next candidate
      }
    }

    if (saved) {
      out.push({
        ...photo,
        dumpAbsolutePath: saved,
        matched: true,
        matchKind: 'download',
      })
    } else {
      out.push(photo)
    }
  }

  return out
}

export async function writeJson(filePath: string, data: unknown): Promise<void> {
  await mkdir(path.dirname(filePath), { recursive: true })
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

/** Optional helper if a dump file is missing and we later choose to fill gaps. */
export async function downloadRemoteOriginal(
  relativePath: string,
  destAbsolute: string,
): Promise<void> {
  const url = `${LIVE_SITE_ORIGIN}/wp-content/uploads/${relativePath}`
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; OczkiGalleryPrep/1.0)' },
  })
  if (!res.ok) {
    throw new Error(`Download failed ${url} → ${res.status}`)
  }
  await mkdir(path.dirname(destAbsolute), { recursive: true })
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(destAbsolute, buf)
}

export function assertDumpRoot(uploadsRoot: string): void {
  if (!existsSync(uploadsRoot)) {
    throw new Error(`WordPress uploads root not found: ${uploadsRoot}`)
  }
}
