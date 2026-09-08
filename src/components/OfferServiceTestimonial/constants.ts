/**
 * Offer service — testimonials ("Opinie") section on `/oferta/[slug]`.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-14004
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-13944
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-13884
 *
 * Reportaż instance (same shell): `7338:8306` / `7338:8966` / `7338:9626`
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

const justynaKazimierzItem = {
  quote:
    '„Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii, zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze oczekiwania! Gorąco polecam!”',
  author: 'Justyna Kazimierz',
  photoSrc: '/figma/testimonial-back-photo.png',
  photoAlt: 'Klientka podczas sesji w księgarni',
} as const

export const offerServiceTestimonialSesjeKobieceDefaults: TestimonialSectionData = {
  heading: {
    start: 'One też miały obawy... a teraz nie mogą przestać patrzeć na',
    emphasis: 'swoje zdjęcia',
  },
  items: [justynaKazimierzItem],
  showPolaroid: true,
}

/** Reportaż `7338:8306` — same quote/polaroid; heading matches Figma instance copy. */
export const offerServiceTestimonialReportazeSlubneDefaults: TestimonialSectionData = {
  heading: {
    start: 'Oni też miały obawy... a teraz nie mogą przestać patrzeć na',
    emphasis: 'swoje zdjęcia',
  },
  items: [justynaKazimierzItem],
  showPolaroid: true,
}
