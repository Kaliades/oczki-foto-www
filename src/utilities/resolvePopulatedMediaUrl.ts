/**
 * Populated Payload `media` relationship (id or expanded doc with `url`).
 * During the Blob→R2 cutover, Vercel still runs the Blob plugin, which rewrites
 * stored R2 absolute URLs to `/api/media/file/...`. Those HQ objects live only
 * on R2, so we map them back to the public R2 base for the frontend.
 */
export type PopulatedMedia =
  | number
  | {
      url?: string | null
      filename?: string | null
      updatedAt?: string | null
    }
  | null
  | undefined

const R2_PUBLIC_FALLBACK = 'https://pub-f08ca938f3b44eb9b31d41195f527ff1.r2.dev'

function getR2PublicBase(): string {
  return (process.env.NEXT_PUBLIC_R2_PUBLIC_URL || R2_PUBLIC_FALLBACK).replace(/\/$/, '')
}

/**
 * Blob plugin serves `/api/media/file/<filename>`; R2 HQ uploads use `-hq` in the
 * filename (masters and size variants like `…-hq-300x450.jpg`).
 */
export function rewriteMediaUrlForR2Cutover(
  url: string,
  filename?: string | null,
): string {
  const r2 = getR2PublicBase()
  if (url.startsWith(r2) || url.includes('.r2.dev/')) return url

  const fromPath = url.match(/\/api\/media\/file\/([^?]+)/)
  const name = filename || (fromPath ? decodeURIComponent(fromPath[1]) : null)
  if (!name || !name.includes('-hq')) return url

  return `${r2}/${name}`
}

export function resolvePopulatedMediaUrl(media: PopulatedMedia): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    const filename =
      'filename' in media && typeof media.filename === 'string' ? media.filename : null
    const url = rewriteMediaUrlForR2Cutover(media.url, filename)
    const version =
      'updatedAt' in media && media.updatedAt != null ? String(media.updatedAt) : null

    if (!version) return url

    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}v=${encodeURIComponent(version)}`
  }
  return null
}
