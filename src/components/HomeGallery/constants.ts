import type { GallerySectionData, GallerySectionItem } from '@/components/GallerySection'

export const HOME_GALLERY_FIGMA_NODES = {
  desktop: '7105:8499',
  tablet: '7105:11600',
  mobile: '7105:13895',
} as const

export type HomeGalleryItem = GallerySectionItem

export type HomeGalleryData = GallerySectionData

export const homeGalleryDefaults: HomeGalleryData = {
  heading: {
    start: 'Chwile zatrzymane w',
    emphasis: 'kadrze',
  },
  description: 'Zajrzyj do mojego portfolio i zobacz, jak wyglądają moje sesje.',
  cta: {
    type: 'custom',
    url: '/galeria',
    label: 'Zobacz wszystkie zdjęcia',
    newTab: false,
  },
  items: [
    {
      imageSrc: '/figma/gallery-small-1.png',
      imageAlt: 'Para podczas sesji plenerowej na łące',
      caption: {
        title: 'Ania i Tomek',
        subtitle: 'Sesja zaręczynowa w parku pod dębami',
      },
    },
    {
      imageSrc: '/figma/gallery-small-2.png',
      imageAlt: 'Para idąca przez łąkę o zachodzie słońca',
      caption: {
        title: 'Magda i Piotr',
        subtitle: 'Plener o złotej godzinie na łące',
      },
    },
    {
      imageSrc: '/figma/gallery-large.png',
      imageAlt: 'Para młoda z bukietem podczas sesji ślubnej',
      caption: {
        title: 'Gosia i Leszek',
        subtitle: 'Wesele w hotelu Monte Carlo na Śląsku',
      },
    },
    {
      imageSrc: '/figma/gallery-small-3.png',
      imageAlt: 'Kobieta w czarnym kombinezonie i futrzanej kurtce',
      caption: {
        title: 'Kasia',
        subtitle: 'Sesja modowa w miejskiej scenerii',
      },
    },
    {
      imageSrc: '/figma/gallery-small-4.png',
      imageAlt: 'Panna młoda przytulająca pana młodego w welonie',
      caption: {
        title: 'Ola i Michał',
        subtitle: 'Reportaż ślubny w welonie i świetle dnia',
      },
    },
  ],
}

/** @deprecated Import from `@/components/GallerySection` instead. */
export { getDefaultFocusedIndex, isFocusedNeighbour } from '@/components/GallerySection'
