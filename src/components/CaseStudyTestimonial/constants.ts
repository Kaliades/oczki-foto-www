/**
 * Case study — testimonials ("Opinie") section on gallery detail page.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14533
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14592
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-16691
 *
 * Same component tree as home `Opinie` — only the polaroid inner photo differs
 * (`7102:13810` → case-study swing photo vs home bookstore session).
 */
export const CASE_STUDY_TESTIMONIAL_FIGMA_NODES = {
  desktop: '7102:14533',
  tablet: '7102:14592',
  mobile: '7102:16691',
} as const

export type CaseStudyTestimonialData = {
  heading: {
    start: string
    emphasis: string
  }
  items: readonly {
    quote: string
    author: string
    photoSrc: string
    photoAlt: string
  }[]
  showPolaroid?: boolean
}

export const caseStudyTestimonialDefaults: CaseStudyTestimonialData = {
  heading: {
    start: 'Wasze słowa to moje',
    emphasis: 'paliwo do działania',
  },
  items: [
    {
      quote:
        '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!”',
      author: 'Justyna i Krzysiek',
      photoSrc: '/figma/case-study-testimonial-polaroid-photo.png',
      photoAlt: 'Para młoda na huśtawce podczas sesji ślubnej',
    },
  ],
  showPolaroid: true,
}
