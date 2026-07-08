/** Populated Payload `media` relationship (id or expanded doc with `url`). */
export type PopulatedMedia =
  | number
  | { url?: string | null; updatedAt?: string | null }
  | null
  | undefined

export function resolvePopulatedMediaUrl(media: PopulatedMedia): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    const url = media.url
    const version =
      'updatedAt' in media && media.updatedAt != null ? String(media.updatedAt) : null

    if (!version) return url

    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}v=${encodeURIComponent(version)}`
  }
  return null
}
