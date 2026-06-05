import { GallerySection } from '@/components/GallerySection'

import { HOME_GALLERY_FIGMA_NODES, type HomeGalleryData } from './constants'

type HomeGalleryProps = {
  data: HomeGalleryData
}

/**
 * Homepage "Chwile zatrzymane w kadrze" — thin wrapper around
 * {@link GallerySection} with home Figma instance nodes.
 */
export function HomeGallery({ data }: HomeGalleryProps) {
  return (
    <GallerySection
      data={data}
      figmaNodes={HOME_GALLERY_FIGMA_NODES}
      headingId="home-gallery-heading"
    />
  )
}
