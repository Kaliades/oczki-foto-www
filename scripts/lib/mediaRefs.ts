/** Shared helpers for detecting and splitting cross-document media references. */

export type MediaReplacement = {
  path: string
  from: number
  to: number
}

export type CmsEntityKey = string

export type CmsEntityDescriptor = {
  key: CmsEntityKey
  label: string
  mediaIds: readonly number[]
}

export function resolveMediaId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    return typeof id === 'number' ? id : null
  }
  return null
}

/**
 * For media IDs referenced by more than one CMS entity, the lexicographically
 * first entity key keeps the original file; others receive duplicates.
 */
export function buildGlobalCanonicalOwners(
  entities: readonly CmsEntityDescriptor[],
): Map<number, CmsEntityKey> {
  const usage = new Map<number, CmsEntityKey[]>()

  for (const entity of entities) {
    for (const mediaId of entity.mediaIds) {
      const keys = usage.get(mediaId) ?? []
      keys.push(entity.key)
      usage.set(mediaId, keys)
    }
  }

  const canonical = new Map<number, CmsEntityKey>()
  for (const [mediaId, keys] of usage) {
    const unique = [...new Set(keys)]
    if (unique.length <= 1) continue
    unique.sort()
    canonical.set(mediaId, unique[0])
  }

  return canonical
}

export type DuplicateFn = (sourceId: number, label: string) => Promise<number>

export type SplitMediaOptions = {
  apply: boolean
}

export function entityKey(collection: string, id: number | string): CmsEntityKey {
  return `${collection}:${id}`
}
