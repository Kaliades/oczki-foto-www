import type { BentoPhotoTileData } from '@/components/BentoPhotoTile'

export const CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES = {
  desktop: '6952:17255',
  tablet: '7102:12747',
  mobile: '7102:16673',
  imageGallery: {
    desktop: '6972:19194',
    tablet: '7102:12749',
    mobile: '7102:16675',
  },
  loadMore: {
    desktop: '6972:19208',
    tablet: '7102:12763',
    mobile: '7102:16689',
  },
} as const

export const CASE_STUDY_PHOTO_GALLERY_LOAD_MORE_LABEL = 'Zobacz więcej zdjęć' as const

const GALLERY_IMAGE = (index: number) => `/figma/case-study-gallery-${index}.png` as const

export type CaseStudyPhotoGalleryData = {
  heading: {
    start: string
    emphasis: string
    end?: string
  }
  items: readonly BentoPhotoTileData[]
  loadMoreLabel?: string
}

export const caseStudyPhotoGalleryDefaults: CaseStudyPhotoGalleryData = {
  heading: {
    start: 'Zobacz tą ',
    emphasis: 'piękną opowieść',
    end: ' w naszych kadrach',
  },
  loadMoreLabel: CASE_STUDY_PHOTO_GALLERY_LOAD_MORE_LABEL,
  items: [
    {
      id: '1',
      imageSrc: GALLERY_IMAGE(1),
      imageAlt: 'Oprawione zdjęcie z dedykacją dla pary młodej',
    },
    {
      id: '2',
      imageSrc: GALLERY_IMAGE(2),
      imageAlt: 'Pan młody przy oknie podczas przygotowań',
    },
    {
      id: '3',
      imageSrc: GALLERY_IMAGE(3),
      imageAlt: 'Panowie podczas przygotowań do ślubu',
    },
    {
      id: '4',
      imageSrc: GALLERY_IMAGE(4),
      imageAlt: 'Pan młody poprawiający krawat',
    },
    {
      id: '5',
      imageSrc: GALLERY_IMAGE(5),
      imageAlt: 'Portret panów młodych podczas przygotowań',
    },
    {
      id: '6',
      imageSrc: GALLERY_IMAGE(6),
      imageAlt: 'Detal spinki do mankietu pana młodego',
    },
    {
      id: '7',
      imageSrc: GALLERY_IMAGE(7),
      imageAlt: 'Spinki do mankietów w pudełku',
    },
    {
      id: '8',
      imageSrc: GALLERY_IMAGE(8),
      imageAlt: 'Buty i zaproszenie ślubne',
    },
    {
      id: '9',
      imageSrc: GALLERY_IMAGE(9),
      imageAlt: 'Panna młoda w szlafroku podczas makijażu',
    },
    {
      id: '10',
      imageSrc: GALLERY_IMAGE(10),
      imageAlt: 'Panna młoda oglądająca suknię ślubną',
    },
    {
      id: '11',
      imageSrc: GALLERY_IMAGE(11),
      imageAlt: 'Przygotowania panny młodej w jasnym wnętrzu',
    },
    {
      id: '12',
      imageSrc: GALLERY_IMAGE(12),
      imageAlt: 'Panna młoda w sukni podczas ostatnich poprawek',
    },
  ],
}
