import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Home — final booking CTA ("Czy to jest ten moment…").
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8981
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7118-9246
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-14226
 */
export const HOME_CTA_FIGMA_NODES = {
  desktopFrame: '7105:8981',
  tabletFrame: '7118:9246',
  mobileFrame: '7105:14226',
} as const

export type HomeCtaData = {
  heading: {
    plain: string
    emphasis: string
  }
  body: string
  cta: SectionLink
}

export const homeCtaDefaults: HomeCtaData = {
  heading: {
    plain: 'Czy to jest ten moment, w którym robimy ',
    emphasis: 'coś pięknego',
  },
  body: 'Nie musisz mieć doświadczenia przed aparatem ani wiedzieć dokładnie, czego oczekujesz. Moim zadaniem jest sprawić, żeby Twoja sesja była spokojna, naturalna i pełna prawdziwych emocji.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję zdjęciową',
    newTab: false,
  },
}
