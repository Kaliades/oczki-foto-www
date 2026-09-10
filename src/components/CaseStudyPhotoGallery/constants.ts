import type { BentoPhotoTileData } from '@/components/BentoPhotoTile'

export const CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES = {
  desktop: '7356:12161',
  tablet: '7356:13501',
  mobile: '7356:14877',
  imageGallery: {
    desktop: '7356:12163',
    tablet: '7356:13503',
    mobile: '7356:14879',
  },
  loadMore: {
    desktop: '7356:12178',
    tablet: '7356:13518',
    mobile: '7356:14894',
  },
} as const

export const CASE_STUDY_PHOTO_GALLERY_LOAD_MORE_LABEL = 'Zobacz więcej zdjęć' as const

/**
 * `typography/header/m` from Figma variable defs — 24 / 28 / 32 px.
 * `get_design_context` incorrectly emits 32 px on all breakpoints; metadata
 * heading heights (50 / 58 / 66) confirm the stepped scale.
 */
export const CASE_STUDY_PHOTO_GALLERY_HEADING_SIZE_CLASSNAME =
  'text-[24px] tracking-[-0.24px] md:text-[28px] md:tracking-[-0.28px] lg:text-[32px] lg:tracking-[-0.32px]' as const

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
