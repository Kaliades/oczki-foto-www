import type { SectionLink } from '@/utilities/resolveLinkHref'

export const HOME_HERO_FIGMA_NODES = {
  desktopFrame: '6730:17313',
  scallopFrame: '6797:4776',
} as const

export type HomeHeroData = {
  title: {
    lineOne: string
    lineTwoItalic: string
    lineTwoRest: string
    lineThree: string
  }
  description: string
  primaryCta: SectionLink
  secondaryCta: SectionLink
  background: {
    src: string
    alt?: string
  }
  showScallop?: boolean
}

export const homeHeroDefaults: HomeHeroData = {
  title: {
    lineOne: 'Zdjęcia, przy których możesz',
    lineTwoItalic: 'odetchnąć',
    lineTwoRest: 'i być dokładnie',
    lineThree: 'taka, jaka jesteś',
  },
  description:
    'Naturalna fotografia kobieca i ślubna w Krakowie, Przemyślu i okolicach. Tworzę bezpieczną przestrzeń, w której zamiast sztywnych póz, znajdziesz czułość, śmiech i swobodę.',
  primaryCta: {
    type: 'custom',
    url: '/o-mnie',
    label: 'Poznaj mnie bliżej',
    newTab: false,
  },
  secondaryCta: {
    type: 'custom',
    url: '/galeria',
    label: 'Zobacz moje kadry',
    newTab: false,
  },
  background: {
    src: '/figma/home-hero-bg.png',
    alt: '',
  },
  showScallop: true,
}
