/**
 * Home — testimonials ("Opinie") section.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14473
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-11602
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-13897
 */
export const HOME_TESTIMONIAL_FIGMA_NODES = {
  desktopFrame: '7102:14473',
  tabletFrame: '7105:11602',
  mobileFrame: '7105:13897',
} as const

export type TestimonialItem = {
  /**
   * The quote text shown in the centre column. Polish quotation marks
   * („...") are part of the content, the component renders them verbatim
   * to keep editors in control of punctuation.
   */
  quote: string
  /** Display name of the person credited under the quote. */
  author: string
  /** Photograph used inside the polaroid decoration. */
  photoSrc: string
  /** Accessible description of the photograph. */
  photoAlt: string
}

export type HomeTestimonialData = {
  heading: {
    start: string
    /** Italic, hand-set fragment that closes the title. */
    emphasis: string
  }
  items: readonly TestimonialItem[]
  /**
   * Hides the right-hand polaroid decoration (used by editors who want to
   * showcase a quote without the photo). Default is `true`.
   */
  showPolaroid?: boolean
}

export const homeTestimonialDefaults: HomeTestimonialData = {
  heading: {
    start: 'Wasze słowa to moje',
    emphasis: 'paliwo do działania',
  },
  items: [
    {
      quote:
        '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!"',
      author: 'Justyna Kazimierz',
      photoSrc: '/figma/testimonial-back-photo.png',
      photoAlt: 'Klientka Justyna podczas sesji w księgarni',
    },
  ],
  showPolaroid: true,
}
