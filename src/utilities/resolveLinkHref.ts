import type { Page, Post } from '@/payload-types'

export type SectionLinkReference = {
  relationTo: 'pages' | 'posts'
  value: Page | Post | string | number
}

/**
 * Shape mirrors the Payload `link` field (see `src/fields/link.ts`).
 *
 * Used by section components so the same data structure works for:
 * - static defaults in `constants.ts`
 * - CMS-driven block props once Payload blocks are wired.
 */
export type SectionLink = {
  type?: 'reference' | 'custom' | null
  label?: string | null
  newTab?: boolean | null
  url?: string | null
  reference?: SectionLinkReference | null
  appearance?: 'default' | 'outline' | null
}

const collectionPathPrefix: Record<SectionLinkReference['relationTo'], string> = {
  pages: '',
  posts: '/posts',
}

export function resolveLinkHref(link: SectionLink | null | undefined): string | null {
  if (!link) return null

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference

    if (typeof value === 'object' && value && 'slug' in value && value.slug) {
      return `${collectionPathPrefix[relationTo] ?? ''}/${value.slug}`
    }

    return null
  }

  return link.url ?? null
}

export function isLinkResolvable(link: SectionLink | null | undefined): boolean {
  return resolveLinkHref(link) !== null
}
