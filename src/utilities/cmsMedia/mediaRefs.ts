export type MediaReplacement = {
  path: string
  from: number
  to: number
}

export type CmsEntityKey = string

export function resolveMediaId(value: unknown): number | null {
  if (typeof value === 'number') return value
  if (value && typeof value === 'object' && 'id' in value) {
    const id = (value as { id: unknown }).id
    return typeof id === 'number' ? id : null
  }
  return null
}

export function entityKey(collection: string, id: number | string): CmsEntityKey {
  return `${collection}:${id}`
}
