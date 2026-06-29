import { PreviewSearchParams } from '@/app/(frontend)/next/preview/route'
import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  posts: '/posts',
  pages: '',
  offerItems: '/oferta',
  galleries: '/galeria',
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  if (slug === undefined || slug === null) {
    return null
  }

  // Encode to support slugs with special characters
  const encodedSlug = encodeURIComponent(slug)
  const prefix = collectionPrefixMap[collection] ?? ''
  const path = encodedSlug ? `${prefix}/${encodedSlug}` : prefix || '/'

  return buildPreviewRouteUrl(path)
}

/** Preview route for globals and other fixed frontend paths (e.g. /o-mnie). */
export const generateGlobalPreviewPath = (path: string) => {
  if (!path.startsWith('/')) {
    return null
  }

  return buildPreviewRouteUrl(path)
}

function buildPreviewRouteUrl(path: string) {
  const encodedParams = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)

  return `/next/preview?${encodedParams.toString()}`
}
