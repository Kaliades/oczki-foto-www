/**
 * Offer service — testimonials ("Opinie") section on `/oferta/[slug]`.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14004
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-13944
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-13884
 *
 * Same component tree as {@link TestimonialSectionClient} — only the section
 * heading differs from home/case-study variants.
 */
export const OFFER_SERVICE_TESTIMONIAL_FIGMA_NODES = {
  desktop: '7102:14004',
  tablet: '7102:13944',
  mobile: '7102:13884',
} as const

export type {
  TestimonialItem,
  TestimonialSectionData as OfferServiceTestimonialData,
} from '@/components/TestimonialSection'

import type { TestimonialSectionData } from '@/components/TestimonialSection'

export const offerServiceTestimonialSesjeKobieceDefaults: TestimonialSectionData = {
  heading: {
    start: 'One też miały obawy... a teraz nie mogą przestać patrzeć na',
    emphasis: 'swoje zdjęcia',
  },
  items: [
    {
      quote:
        '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!”',
      author: 'Justyna Kazimierz',
      photoSrc: '/figma/testimonial-back-photo.png',
      photoAlt: 'Klientka podczas sesji w księgarni',
    },
  ],
  showPolaroid: true,
}
