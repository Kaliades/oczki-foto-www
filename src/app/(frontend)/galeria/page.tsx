import { GalleryHero, galleryHeroDefaults } from '@/components/GalleryHero'
import { GalleryPortfolio, galleryPortfolioDefaults } from '@/components/GalleryPortfolio'
import type { GalleryPortfolioData } from '@/components/GalleryPortfolio'
import { HomeEase } from '@/components/HomeEase/HomeEase'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import { GalleryCta } from '@/components/GalleryCta/GalleryCta'
import { galleryCtaDefaults } from '@/components/GalleryCta/constants'
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

/**
 * Builds the portfolio grid from published galleries. Each card links to its
 * case-study detail page. Falls back to the static design defaults when no
 * galleries exist yet (or the database is unavailable at build-planning time).
 */
async function getPortfolioData(): Promise<GalleryPortfolioData> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'galleries',
      draft: false,
      depth: 1,
      limit: 100,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
    })

    const items = result.docs
      .map((gallery) => {
        const imageSrc = mediaUrl(gallery.coverImage)
        if (!imageSrc) return null
        return {
          id: String(gallery.id),
          imageSrc,
          imageAlt: gallery.intro || gallery.title,
          caption: { title: gallery.title, subtitle: gallery.intro || '' },
          href: `/galeria/${gallery.slug}`,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null)

    if (items.length === 0) return galleryPortfolioDefaults
    return { loadMoreLabel: galleryPortfolioDefaults.loadMoreLabel, items }
  } catch {
    return galleryPortfolioDefaults
  }
}

export default async function GaleriaPage() {
  const portfolioData = await getPortfolioData()

  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={GALLERY_PAGE_BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <GalleryHero data={galleryHeroDefaults} />
      <GalleryPortfolio data={portfolioData} />
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
