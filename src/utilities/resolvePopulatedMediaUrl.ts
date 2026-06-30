/** Populated Payload `media` relationship (id or expanded doc with `url`). */
export type PopulatedMedia = number | { url?: string | null } | null | undefined

export function resolvePopulatedMediaUrl(media: PopulatedMedia): string | null {
  if (media && typeof media === 'object' && 'url' in media && typeof media.url === 'string') {
    return media.url
  }
  return null
}
