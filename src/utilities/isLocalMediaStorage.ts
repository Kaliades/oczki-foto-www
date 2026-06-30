/**
 * Local dev seeds write to `public/media/`. Vercel Blob must stay off when the
 * active Postgres URL points at Docker — otherwise admin thumbnails 404.
 */
export function isLocalMediaStorage(): boolean {
  const url = process.env.POSTGRES_URL ?? ''
  return url.includes('localhost') || url.includes('127.0.0.1')
}
