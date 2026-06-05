/**
 * Offer service — gallery preview ("Galeria") on `/oferta/[slug]`.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8271
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8309
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8347
 *
 * Same component tree as {@link GallerySection} — only heading copy and
 * gallery items differ from the homepage variant.
 */
export const OFFER_SERVICE_GALLERY_FIGMA_NODES = {
  desktop: '7105:8271',
  tablet: '7105:8309',
  mobile: '7105:8347',
} as const

export type {
  GallerySectionData as OfferServiceGalleryData,
  GallerySectionItem as OfferServiceGalleryItem,
} from '@/components/GallerySection'

import type { GallerySectionData } from '@/components/GallerySection'

/** Static defaults — sesje-kobiece copy from Figma desktop frame 7105:8271. */
export const offerServiceGallerySesjeKobieceDefaults: GallerySectionData = {
  heading: {
    start: 'Zobacz historie kobiet takich jak Ty',
    emphasis: '',
  },
  description:
    'Każda z nich jest inna, bo każda z bohaterek wniosła do zdjęć swoją własną, niepowtarzalną energię.',
  cta: {
    type: 'custom',
    url: '/galeria',
    label: 'Zobacz wszystkie zdjęcia',
    newTab: false,
  },
  items: [
    {
      imageSrc: '/figma/offer-gallery-small-1.png',
      imageAlt: 'Kobieta w białej sukni podczas sesji portretowej',
      caption: {
        title: 'Magda',
        subtitle: 'Sesja kobieca w naturalnym świetle',
      },
    },
    {
      imageSrc: '/figma/offer-gallery-small-2.png',
      imageAlt: 'Kobieta w różowym garniturze podczas sesji wizerunkowej',
      caption: {
        title: 'Ania',
        subtitle: 'Sesja biznesowa w architektonicznej scenerii',
      },
    },
    {
      imageSrc: '/figma/offer-gallery-large.png',
      imageAlt: 'Paula w różowym garniturze podczas sesji wizerunkowej w studio',
      caption: {
        title: 'Paula',
        subtitle: 'Kobieca sesja wizerunkowa w studio',
      },
    },
    {
      imageSrc: '/figma/offer-gallery-small-3.png',
      imageAlt: 'Kobieta w czarnej stylizacji podczas sesji portretowej',
      caption: {
        title: 'Kasia',
        subtitle: 'Sesja modowa w miejskiej scenerii',
      },
    },
    {
      imageSrc: '/figma/offer-gallery-small-4.png',
      imageAlt: 'Kobieta w jasnej stylizacji podczas sesji portretowej',
      caption: {
        title: 'Ola',
        subtitle: 'Sesja kobieca w plenerze',
      },
    },
  ],
}
