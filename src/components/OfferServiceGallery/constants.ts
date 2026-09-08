/**
 * Offer service — gallery preview ("Galeria") on `/oferta/[slug]`.
 *
 * Sesje kobiece (rail carousel) — Figma file `uukPuuZgLMm4kTbXUJFdLI`:
 *   - desktop 1366: node `7105:8271`
 *   - tablet  768:  node `7105:8309`
 *   - mobile  360:  node `7105:8347`
 *
 * Reportaż ślubny mosaic — Figma file `S8AUxLTY5y4aMCSIchKAi2`:
 *   - desktop 1366: node `7353:9844`
 *   - tablet  768:  node `7356:11072`
 *   - mobile  360:  node `7356:11054`
 *
 * Reportaż ślubny stories rail (after process steps) — same file:
 *   - desktop 1366: node `7338:8308`
 *   - tablet  768:  node `7356:10973`
 *   - mobile  360:  node `7356:11016`
 */
export const OFFER_SERVICE_GALLERY_FIGMA_NODES = {
  desktop: '7105:8271',
  tablet: '7105:8309',
  mobile: '7105:8347',
} as const

export const OFFER_SERVICE_GALLERY_REPORTAZE_FIGMA_NODES = {
  desktop: '7353:9844',
  tablet: '7356:11072',
  mobile: '7356:11054',
} as const

export const OFFER_SERVICE_GALLERY_STORIES_REPORTAZE_FIGMA_NODES = {
  desktop: '7338:8308',
  tablet: '7356:10973',
  mobile: '7356:11016',
} as const

import type {
  GallerySectionData,
  GallerySectionItem,
} from '@/components/GallerySection'

export type OfferServiceGalleryItem = GallerySectionItem

export type OfferServiceGalleryData = Omit<GallerySectionData, 'heading'> & {
  /** `rail` = shared GallerySection carousel; `mosaic` = reportaż static grid. */
  layout?: 'rail' | 'mosaic'
  heading: {
    start: string
    /** Empty string renders a single plain heading line (no italic span). */
    emphasis: string
    /** Optional trailing regular run after emphasis (mosaic headings). */
    end?: string
  }
}

/** Static defaults — sesje-kobiece copy from Figma desktop frame 7105:8271. */
export const offerServiceGallerySesjeKobieceDefaults: OfferServiceGalleryData = {
  layout: 'rail',
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

/** Reportaż ślubny mosaic — Figma desktop `7353:9844`. */
export const offerServiceGalleryReportazeSlubneDefaults: OfferServiceGalleryData = {
  layout: 'mosaic',
  heading: {
    start: 'Zobacz ',
    emphasis: 'reportaże ślubne',
    end: ' w naszych kadrach',
  },
  description: '',
  cta: {
    type: 'custom',
    url: '/galeria',
    label: 'Zobacz więcej zdjęć',
    newTab: false,
  },
  items: [
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-1.png',
      imageAlt: 'Para młoda całująca się przed drewnianym budynkiem z oknem',
    },
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-2.png',
      imageAlt: 'Sylwetka panny młodej w welonie w jasnym progu',
      cropClassName: 'top-[-20.76%] h-[120.76%]',
    },
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-3.png',
      imageAlt: 'Para młoda na wzgórzu w mglistym świetle zachodzącego słońca',
    },
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-4.png',
      imageAlt: 'Para młoda spacerująca przez ogród w złotej godzinie',
    },
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-5.png',
      imageAlt: 'Portret pana młodego podczas przygotowań',
    },
    {
      imageSrc: '/figma/offer-gallery-reportaze-slubne-6.png',
      imageAlt: 'Para młoda całująca się pod welonem',
    },
  ],
}

/**
 * Reportaż stories rail — Figma desktop `7338:8308`.
 * Placed after process steps; does not replace mosaic or ClosingCta/FAQ.
 */
export const offerServiceGalleryStoriesReportazeSlubneDefaults: OfferServiceGalleryData =
  {
    layout: 'rail',
    heading: {
      start: 'Zobacz historie takie, jak Twoja',
      emphasis: '',
    },
    description:
      'Każda z nich jest inna, bo każda z par wniosła do zdjęć swoją własną, niepowtarzalną energię.',
    cta: {
      type: 'custom',
      url: '/galeria',
      label: 'Zobacz wszystkie zdjęcia',
      newTab: false,
    },
    items: [
      {
        imageSrc: '/figma/offer-gallery-stories-reportaze-slubne-1.png',
        imageAlt: 'Para młoda nad jeziorem w górach',
        cropClassName:
          'absolute h-[124.68%] left-[-71.38%] max-w-none top-[-24.75%] w-[232.31%]',
        caption: {
          title: 'Para młoda',
          subtitle: 'Reportaż ślubny',
        },
      },
      {
        imageSrc: '/figma/offer-gallery-stories-reportaze-slubne-2.png',
        imageAlt: 'Para młoda całująca się pod welonem',
        cropClassName:
          'absolute h-full left-[-74.61%] max-w-none top-0 w-[186.32%]',
        caption: {
          title: 'Para młoda',
          subtitle: 'Reportaż ślubny',
        },
      },
      {
        imageSrc: '/figma/offer-gallery-stories-reportaze-slubne-3.png',
        imageAlt: 'Ola i Mateusz spacerujący przez łąkę wśród gór',
        caption: {
          title: 'Ola i Mateusz',
          subtitle: 'Sesja poślubna',
        },
      },
      {
        imageSrc: '/figma/offer-gallery-stories-reportaze-slubne-4.png',
        imageAlt: 'Para młoda całująca się przed białą kolumnadą',
        cropClassName:
          'absolute h-[134.43%] left-[-93.75%] max-w-none top-[-34.43%] w-[250.47%]',
        caption: {
          title: 'Para młoda',
          subtitle: 'Sesja poślubna',
        },
      },
      {
        imageSrc: '/figma/offer-gallery-stories-reportaze-slubne-5.png',
        imageAlt: 'Para młoda obejmująca się w plenerze',
        caption: {
          title: 'Para młoda',
          subtitle: 'Reportaż ślubny',
        },
      },
    ],
  }
