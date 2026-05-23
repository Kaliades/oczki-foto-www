import type { SectionLink } from '@/utilities/resolveLinkHref'

export const HOME_GALLERY_FIGMA_NODES = {
  desktopFrame: '7105:8499',
  tabletFrame: '7105:11600',
  mobileFrame: '7105:13895',
} as const

export type HomeGalleryItem = {
  imageSrc: string
  imageAlt: string
  /**
   * Optional crop classes applied to the underlying `<img>` so editors can
   * reframe a portrait or landscape source inside the fixed 211×262 (small)
   * or 296×366 / 393×486 (large) slot without uploading a new crop.
   */
  cropClassName?: string
  /**
   * Shown only while this slot is focused. Primary line uses body/xl,
   * secondary uses body/l. Items without a caption get a generic fallback
   * in `GalleryItem`.
   */
  caption?: {
    title: string
    subtitle: string
  }
}

export type HomeGalleryData = {
  heading: {
    start: string
    emphasis: string
  }
  description: string
  cta: SectionLink
  /** Five-item rail; one slot is enlarged at a time (click / carousel). */
  items: readonly HomeGalleryItem[]
}

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

/** Initial focused slot — middle of the rail (Figma default). */
export const getDefaultFocusedIndex = (count: number): number => Math.floor(count / 2)

/**
 * Whether a slot at `index` is a direct neighbour of the focused slot. On
 * mobile these neighbours sit higher (`pt-[52px]`) instead of `pt-[108px]`.
 */
export const isFocusedNeighbour = (
  index: number,
  focusedIndex: number,
  count: number,
): boolean => {
  if (count < 2) return false
  return Math.abs(index - focusedIndex) === 1
}