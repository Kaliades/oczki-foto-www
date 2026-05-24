import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Home — "Hej, jestem Asia" about section (Figma frame name: Proces).
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=6724-13354
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-11603
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-13898
 */
export const HOME_ABOUT_FIGMA_NODES = {
  desktopFrame: '6724:13354',
  tabletFrame: '7105:11603',
  mobileFrame: '7105:13898',
} as const

export type HomeAboutData = {
  heading: {
    start: string
    emphasis: string
    end: string
  }
  paragraphs: readonly [string, string]
  portrait: {
    src: string
    alt: string
  }
  cta: SectionLink
}

export const homeAboutDefaults: HomeAboutData = {
  heading: {
    start: 'Hej, jestem',
    emphasis: 'Asia',
    end: '! Fotografka z uśmiechem (i zapasem sucharów) w kieszeni',
  },
  paragraphs: [
    'Fotografia to dla mnie sposób patrzenia na świat. Szukam emocji, światła i momentów pomiędzy — tych, które czuje się bardziej, niż da się je zaplanować.',
    'Fotografuję od lat, ale najważniejsze jest dla mnie nie to jak, tylko kogo mam przed obiektywem. Dlatego moje sesje są spokojne, naturalne i prowadzone tak, żebyś nie musiała nic udawać ani „umieć”. Jeśli szukasz naturalnych zdjęć, w których widać prawdziwe emocje — jesteś w dobrym miejscu.',
  ],
  portrait: {
    src: '/figma/about-portrait-source.png',
    alt: 'Asia — fotografka Oczki Fotografia z aparatem w dłoni',
  },
  cta: {
    type: 'custom',
    label: 'Poznaj mnie bliżej',
    url: '/o-mnie',
    newTab: false,
  },
}
