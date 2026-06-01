import { GalleryHero, galleryHeroDefaults } from '@/components/GalleryHero'
import { GalleryPortfolio, galleryPortfolioDefaults } from '@/components/GalleryPortfolio'
import { HomeEase } from '@/components/HomeEase/HomeEase'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import {
  OczkiBreadcrumbContainer,
  OczkiBreadcrumbs,
} from '@/components/OczkiBreadcrumbs'
import type { Metadata } from 'next'

import { GALLERY_PAGE_BREADCRUMBS } from './constants'

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
    </main>
  )
}
