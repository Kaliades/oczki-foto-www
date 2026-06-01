import { GalleryHero, galleryHeroDefaults } from '@/components/GalleryHero'
import { GalleryPortfolio, galleryPortfolioDefaults } from '@/components/GalleryPortfolio'
import { HomeEase } from '@/components/HomeEase/HomeEase'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import { GalleryCta } from '@/components/GalleryCta/GalleryCta'
import { galleryCtaDefaults } from '@/components/GalleryCta/constants'
import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import { homeFooterNewsletterDefaults } from '@/components/HomeFooterNewsletter/constants'
import { HomeFaq } from '@/components/HomeFaq/HomeFaq'
import { homeFaqDefaults } from '@/components/HomeFaq/constants'
import {
  OczkiBreadcrumbContainer,
  OczkiBreadcrumbs,
} from '@/components/OczkiBreadcrumbs'
import type { Metadata } from 'next'

import {
  GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES,
  GALLERY_PAGE_BREADCRUMBS,
} from './constants'

export const metadata: Metadata = {
  title: 'Galeria | Oczki fotografia',
}

export default function GaleriaPage() {
  return (
    <main className="min-h-screen bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]">
      <OczkiBreadcrumbContainer>
        <OczkiBreadcrumbs items={GALLERY_PAGE_BREADCRUMBS} />
      </OczkiBreadcrumbContainer>
      <GalleryHero data={galleryHeroDefaults} />
      <GalleryPortfolio data={galleryPortfolioDefaults} />
      {/* TODO(galeria/ease): Drive HomeEase from Payload when gallery ease block is wired. */}
      <HomeEase data={homeEaseDefaults} />
      {/* TODO(galeria/faq): Drive HomeFaq from Payload when gallery FAQ block is wired. */}
      <HomeFaq data={homeFaqDefaults} />
      {/* TODO(galeria/cta): Drive GalleryCta from Payload when gallery CTA block is wired. */}
      <GalleryCta data={galleryCtaDefaults} />
      {/* TODO(galeria/footer): Drive HomeFooterNewsletter from Payload when gallery footer block is wired. */}
      <HomeFooterNewsletter
        data={homeFooterNewsletterDefaults}
        figmaNodes={GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES}
      />
    </main>
  )
}
