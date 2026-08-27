import type { Media } from '@/payload-types'

/**
 * Brand placeholders intentionally shared across offers (CMS UX: obvious "replace me").
 * Excluded from offer media auto-split / isolation.
 */
export function isSharedPlaceholderFilename(filename: string | null | undefined): boolean {
  return Boolean(filename && /^placeholder-offer[-.]/i.test(filename))
}

export function isSharedPlaceholderMedia(
  media: Pick<Media, 'filename'> | null | undefined,
): boolean {
  return isSharedPlaceholderFilename(media?.filename)
}
