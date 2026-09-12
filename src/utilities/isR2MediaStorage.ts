import { isLocalMediaStorage } from '@/utilities/isLocalMediaStorage'

/**
 * Production / remote CMS media on Cloudflare R2 (via S3-compatible API).
 * Local Docker Postgres keeps files in `public/media/` instead.
 *
 * Requires explicit `ENABLE_R2_MEDIA_STORAGE=true` so Vercel can keep Blob
 * during the HQ gallery cutover even if R2_* credentials exist in env
 * (migration scripts use them locally without flipping the live plugin).
 */
export function isR2MediaStorage(): boolean {
  if (isLocalMediaStorage()) return false
  if (process.env.ENABLE_R2_MEDIA_STORAGE !== 'true') return false

  return Boolean(
    process.env.R2_BUCKET &&
      process.env.R2_ACCESS_KEY_ID &&
      process.env.R2_SECRET_ACCESS_KEY &&
      process.env.R2_ENDPOINT &&
      process.env.R2_PUBLIC_URL,
  )
}

export function getR2PublicBaseUrl(): string | null {
  const url = process.env.R2_PUBLIC_URL?.replace(/\/$/, '')
  return url || null
}
