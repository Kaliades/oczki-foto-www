import type { GalleryPortfolioListingItem } from '@/app/(frontend)/galeria/GaleriaPageClient'
import { GaleriaPageClient } from '@/app/(frontend)/galeria/GaleriaPageClient'
import { mapGalleryPage } from '@/app/(frontend)/galeria/mapGalleryPage'
import type { GallerySessionFilterId } from '@/components/GalleryHero/constants'
import { GalleryCta } from '@/components/GalleryCta/GalleryCta'
import { galleryCtaDefaults } from '@/components/GalleryCta/constants'
import { HomeEase } from '@/components/HomeEase/HomeEase'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import { HomeFaq } from '@/components/HomeFaq/HomeFaq'
import { homeFaqDefaults } from '@/components/HomeFaq/constants'
import {
  OczkiBreadcrumbContainer,
  OczkiBreadcrumbs,
} from '@/components/OczkiBreadcrumbs'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { GALLERY_PAGE_BREADCRUMBS } from './constants'

export const revalidate = 60

const GALLERY_META_DESCRIPTION =
  'Portfolio ślubne i kobiece z Krakowa i okolic — naturalne kadry, autentyczne emocje. Przeglądaj reportaże ślubne, sesje kobiece i wizerunkowe.'

export const metadata: Metadata = {
  title: 'Galeria | Oczki fotografia',
  description: GALLERY_META_DESCRIPTION,
  openGraph: mergeOpenGraph({
    title: 'Galeria — portfolio Oczki Fotografia',
    description: GALLERY_META_DESCRIPTION,
    url: '/galeria',
  }),
}

function mediaUrl(media: unknown): string | null {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: unknown }).url
    if (typeof url === 'string') return url
  }
  return null
}

async function getGalleryPageSettings() {
  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({ slug: 'galleryPage', depth: 0 })
    return mapGalleryPage(doc)
  } catch {
    return mapGalleryPage(null)
  }
}

/**
 * Published galleries flagged for the portfolio listing, mapped to grid cards
 * with a session category for hero filters.
 */
async function getPortfolioListingItems(): Promise<readonly GalleryPortfolioListingItem[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'galleries',
      draft: false,
      depth: 1,
      limit: 500,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      where: {
        showOnPortfolio: { equals: true },
      },
    })

    return result.docs.flatMap((gallery) => {
      const imageSrc = mediaUrl(gallery.coverImage)
      if (!imageSrc) return []

      const category = (gallery.portfolioCategory ?? 'kobieca') as GallerySessionFilterId

      return [
        {
          id: String(gallery.id),
          imageSrc,
          imageAlt: gallery.intro || gallery.title,
          caption: { title: gallery.title, subtitle: gallery.intro || '' },
          href: `/galeria/${gallery.slug}`,
          category,
        },
      ]
    })
  } catch {
    return []
  }
}

export default async function GaleriaPage() {
  const [pageSettings, portfolioItems] = await Promise.all([
    getGalleryPageSettings(),
    getPortfolioListingItems(),
  ])

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={GALLERY_PAGE_BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <GaleriaPageClient
        hero={pageSettings.hero}
        initialCount={pageSettings.initialCount}
        items={portfolioItems}
        loadMoreBatchSize={pageSettings.loadMoreBatchSize}
        loadMoreLabel={pageSettings.loadMoreLabel}
      />
      {/* TODO(galeria/ease): Drive HomeEase from Payload when gallery ease block is wired. */}
      <HomeEase data={homeEaseDefaults} />
      {/* TODO(galeria/faq): Drive HomeFaq from Payload when gallery FAQ block is wired. */}
      <HomeFaq data={homeFaqDefaults} />
      {/* TODO(galeria/cta): Drive GalleryCta from Payload when gallery CTA block is wired. */}
      <GalleryCta data={galleryCtaDefaults} />
      <SiteFooterNewsletter variant="home" />
    </main>
  )
}
