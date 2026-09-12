import { rewriteMediaUrlForR2Cutover } from '@/utilities/resolvePopulatedMediaUrl'

/**
 * Processes media resource URL to ensure proper formatting
 * @param url The original URL from the resource
 * @param cacheTag Optional cache tag to append to the URL
 * @returns Properly formatted URL with cache tag if provided
 *
 * Local paths (e.g. `/api/media/file/image.webp`) are kept relative so
 * Next.js image optimization treats them as local rather than fetching
 * through `remotePatterns`, which blocks private IPs since Next.js 16.
 * Exception: HQ files on R2 (`*-hq*`) are rewritten to the public R2 host
 * during the Blob→R2 cutover (see `rewriteMediaUrlForR2Cutover`).
 */
export const getMediaUrl = (
  url: string | null | undefined,
  cacheTag?: string | null,
  filename?: string | null,
): string => {
  if (!url) return ''

  const resolved = rewriteMediaUrlForR2Cutover(url, filename)

  if (cacheTag && cacheTag !== '') {
    cacheTag = encodeURIComponent(cacheTag)
  }

  return cacheTag ? `${resolved}?${cacheTag}` : resolved
}
