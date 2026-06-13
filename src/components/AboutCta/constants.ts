import type { OrnateCtaData } from '@/components/OrnateCtaSection'

/**
 * About page — booking CTA ("Masz ochotę na sesję…").
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8698
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8746
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-8794
 */
export const ABOUT_CTA_FIGMA_NODES = {
  desktopFrame: '7105:8698',
  tabletFrame: '7105:8746',
  mobileFrame: '7105:8794',
} as const

export type AboutCtaData = OrnateCtaData

export const aboutCtaDefaults: AboutCtaData = {
  heading: {
    type: 'single',
    text: 'Masz ochotę na sesję, która będzie po prostu miłym dniem?',
  },
  body: 'Jeśli szukasz kogoś, kto zadba o Twój komfort i nie będzie Cię oceniać – napisz do mnie. Chętnie dowiem się, o jakich zdjęciach marzysz i sprawdzę, co możemy razem stworzyć.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję zdjęciową',
    newTab: false,
  },
}
