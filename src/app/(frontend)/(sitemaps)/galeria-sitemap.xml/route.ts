import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const SITE_URL = () =>
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  'https://example.com'

const getGaleriaSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const siteUrl = SITE_URL()
    const dateFallback = new Date().toISOString()

    const results = await payload.find({
      collection: 'galleries',
      overrideAccess: false,
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })

    const slugEntries = results.docs
      .filter((doc) => Boolean(doc?.slug))
      .map((doc) => ({
        loc: `${siteUrl}/galeria/${doc.slug}`,
        lastmod: doc.updatedAt || dateFallback,
        changefreq: 'monthly' as const,
        priority: 0.7,
      }))

    return [
      {
        loc: `${siteUrl}/galeria`,
        lastmod: dateFallback,
        changefreq: 'weekly' as const,
        priority: 0.8,
      },
      ...slugEntries,
    ]
  },
  ['galeria-sitemap'],
  { tags: ['galeria-sitemap'] },
)

export async function GET() {
  const sitemap = await getGaleriaSitemap()
  return getServerSideSitemap(sitemap)
}
