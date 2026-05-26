import { GalleryHero, galleryHeroDefaults } from '@/components/GalleryHero'
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
    </main>
  )
}
