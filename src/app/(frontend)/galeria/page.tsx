import type { GalleryPortfolioListingItem } from '@/app/(frontend)/galeria/GaleriaPageClient'
import { GaleriaPageClient } from '@/app/(frontend)/galeria/GaleriaPageClient'
import { mapGalleryPage } from '@/app/(frontend)/galeria/mapGalleryPage'
import type { GallerySessionFilterId } from '@/components/GalleryHero/constants'
import { GalleryCta } from '@/components/GalleryCta/GalleryCta'
import { HomeEase } from '@/components/HomeEase/HomeEase'
import { SiteFooterNewsletter } from '@/components/SiteFooterNewsletter'
import { HomeFaq } from '@/components/HomeFaq/HomeFaq'
import {
  OczkiBreadcrumbContainer,
  OczkiBreadcrumbs,
} from '@/components/OczkiBreadcrumbs'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import type { Metadata } from 'next'

import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import { GALLERY_PAGE_BREADCRUMBS } from './constants'

const GALLERY_META_DESCRIPTION =
  'Portfolio ślubne i kobiece z Krakowa i okolic — naturalne kadry, autentyczne emocje. Przeglądaj reportaże ślubne, sesje kobiece i wizerunkowe.'

function mediaUrl(media: unknown): string | null {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: unknown }).url
    if (typeof url === 'string') return url
  }
  return null
}

/** Hover card caption is a narrow Figma box — keep only a short lead-in. */
function truncateHoverCaption(text: string, maxChars = 110): string {
  const cleaned = text.replace(/\s+/g, ' ').trim()
  if (!cleaned) return ''
  if (cleaned.length <= maxChars) return cleaned

  const sentence = cleaned.match(/^(.+?[.!?…])(?:\s|$)/)?.[1]
  if (sentence && sentence.length <= maxChars) return sentence

  const slice = cleaned.slice(0, maxChars)
  const lastSpace = slice.lastIndexOf(' ')
  return `${(lastSpace > 40 ? slice.slice(0, lastSpace) : slice).trim()}…`
}

const queryGalleryPageSettings = cache(async () => {
  const { isEnabled: draft } = await draftMode()

  try {
    const payload = await getPayload({ config: configPromise })
    const doc = await payload.findGlobal({
      slug: 'galleryPage',
      depth: 1,
      draft,
      overrideAccess: draft,
    })
    return mapGalleryPage(doc)
  } catch {
    return mapGalleryPage(null)
  }
})

/**
 * Published galleries flagged for the portfolio listing, mapped to grid cards
 * with a session category for hero filters.
 */
const queryPortfolioListingItems = cache(
  async (): Promise<readonly GalleryPortfolioListingItem[]> => {
    const { isEnabled: draft } = await draftMode()

    try {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'galleries',
        draft,
        depth: 1,
        limit: 500,
        overrideAccess: draft,
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
        const subtitle = truncateHoverCaption(gallery.intro || '')

        return [
          {
            id: String(gallery.id),
            imageSrc,
            imageAlt: gallery.intro || gallery.title,
            caption: { title: gallery.title, subtitle },
            href: `/galeria/${gallery.slug}`,
            category,
          },
        ]
      })
    } catch {
      return []
    }
  },
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Galeria | Oczki fotografia',
    description: GALLERY_META_DESCRIPTION,
    openGraph: mergeOpenGraph({
      title: 'Galeria — portfolio Oczki Fotografia',
      description: GALLERY_META_DESCRIPTION,
      url: '/galeria',
    }),
  }
}

export default async function GaleriaPage() {
  const { isEnabled: draft } = await draftMode()
  const [pageSettings, portfolioItems] = await Promise.all([
    queryGalleryPageSettings(),
    queryPortfolioListingItems(),
  ])

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      {draft && <LivePreviewListener />}
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
      <HomeEase data={pageSettings.ease} />
      <HomeFaq data={pageSettings.faq} />
      <GalleryCta data={pageSettings.cta} />
      <SiteFooterNewsletter variant="gallery" />
    </main>
  )
}
