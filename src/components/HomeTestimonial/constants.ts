/**
 * Home — testimonials ("Opinie") section.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14473
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-11602
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-13897
 */
export const HOME_TESTIMONIAL_FIGMA_NODES = {
  desktop: '7102:14473',
  tablet: '7105:11602',
  mobile: '7105:13897',
} as const

export type {
  TestimonialItem,
  TestimonialSectionData as HomeTestimonialData,
} from '@/components/TestimonialSection'

export {
  TESTIMONIAL_SLIDE_BODY_MIN_HEIGHT_CLASS,
  TESTIMONIAL_SLIDE_COUNT as HOME_TESTIMONIAL_SLIDE_COUNT,
  resolveTestimonialSlides,
} from '@/components/TestimonialSection'

import type { TestimonialSectionData } from '@/components/TestimonialSection'

export const homeTestimonialDefaults: TestimonialSectionData = {
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
      photoAlt: 'Klientka podczas sesji w księgarni',
    },
  ],
  showPolaroid: true,
}
