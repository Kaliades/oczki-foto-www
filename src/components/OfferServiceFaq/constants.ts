import type { FaqSectionData } from '@/components/FaqSection'

/**
 * Offer service — FAQ ("Rozwiejmy ostatnie wątpliwości") on `/oferta/[slug]`.
 *
 * Sesje kobiece — file `uukPuuZgLMm4kTbXUJFdLI`:
 *   - desktop / tablet / mobile: 7100:7617 / 7100:8623 / 7102:10289
 *
 * Reportaż ślubny — file `S8AUxLTY5y4aMCSIchKAi2` (same shell, content overlay):
 *   - desktop / tablet / mobile: 7338:8609 / 7356:10509 / 7356:10593
 *
 * Same component tree as {@link FaqSection}.
 */
export const OFFER_SERVICE_FAQ_FIGMA_NODES = {
  desktop: '7100:7617',
  tablet: '7100:8623',
  mobile: '7102:10289',
} as const

export const OFFER_SERVICE_FAQ_REPORTAZE_FIGMA_NODES = {
  desktop: '7338:8609',
  tablet: '7356:10509',
  mobile: '7356:10593',
} as const

export type { FaqSectionData as OfferServiceFaqData } from '@/components/FaqSection'

export { faqSesjeKobieceDefaults as offerServiceFaqSesjeKobieceDefaults } from '@/components/FaqSection'

/**
 * Reportaż ślubny — Figma desktop `7338:8609`.
 *
 * Q1 answer is from the open accordion in Figma. Q2–Q9 answers were not
 * overridden in the design (collapsed items still carry kobiece placeholder
 * text) — fill them in CMS (`OfferItems.faq.items`).
 */
export const offerServiceFaqReportazeSlubneDefaults: FaqSectionData = {
  heading: {
    emphasis: 'Rozwiejmy',
    start: ' ostatnie wątpliwości',
  },
  intro:
    'Wiemy, że w Waszej głowie może pojawić się jeszcze kilka pytań. Spokojnie, przygotowaliśmy na nie odpowiedzi, żebyście mogli podjąć decyzję z pełnym spokojem.',
  items: [
    {
      id: 'booking',
      question: 'Jak wygląda proces rezerwacji terminu?',
      answer:
        'Proces jest bardzo prosty! Pierwszym krokiem jest kontakt i umówienie spotkania. Następnie umawiamy się na krótkie, niezobowiązujące spotkanie (na kawę lub online), by się poznać, omówić Wasze oczekiwania i odpowiedzieć na pytania. Gwarancją rezerwacji terminu jest podpisanie przejrzystej umowy oraz wpłata zadatku.',
    },
    {
      id: 'weather',
      question:
        'Co jeśli w dniu ślubu będzie brzydka pogoda lub miejsce okaże się mało fotogeniczne?',
      answer: '',
    },
    {
      id: 'posed-group',
      question: 'Czy robicie zdjęcia pozowane z Rodziną i Gośćmi?',
      answer: '',
    },
    {
      id: 'wedding-day-outdoor',
      question: 'Czy wykonujecie sesję plenerową w dniu ślubu?',
      answer: '',
    },
    {
      id: 'inspiration',
      question:
        'Czy możemy wprowadzić własne sugestie do listy kadrów lub pokazać Wam nasze inspiracje z Pinterest/Instagrama?',
      answer: '',
    },
    {
      id: 'date-change',
      question: 'Co w sytuacji, gdy musimy przełożyć datę ślubu z przyczyn losowych?',
      answer: '',
    },
    {
      id: 'engagement',
      question: 'Co wchodzi w skład sesji narzeczeńskiej i dlaczego warto ją zrobić?',
      answer: '',
    },
    {
      id: 'locations',
      question:
        'W jakich miejscowościach pracujecie i czy dojeżdżacie w dowolne miejsce w Polsce?',
      answer: '',
    },
    {
      id: 'delivery',
      question: 'Jak szybko po ślubie zobaczymy nasze zdjęcia?',
      answer: '',
    },
  ],
}
