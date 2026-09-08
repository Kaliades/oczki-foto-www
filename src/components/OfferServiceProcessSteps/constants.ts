import {
  defaultOfferProcessStepItems,
  type OfferProcessStepsData,
} from '@/components/OfferProcessSteps'

/**
 * Offer service — process steps ("Kroki do realizacji oferty") on
 * `/oferta/[slug]`.
 *
 * Sesje kobiece — Figma file `uukPuuZgLMm4kTbXUJFdLI`:
 *   - desktop 1366: node `7105:7708`
 *   - tablet  768:  node `7105:7774`
 *   - mobile  360:  node `7105:7840`
 *
 * Reportaż ślubny — Figma file `S8AUxLTY5y4aMCSIchKAi2` (same shell, content overlay):
 *   - desktop 1366: node `7338:8307`
 *   - tablet  768:  node `7356:10841`
 *   - mobile  360:  node `7356:10907`
 */
export const OFFER_SERVICE_PROCESS_STEPS_FIGMA_NODES = {
  desktop: '7105:7708',
  tablet: '7105:7774',
  mobile: '7105:7840',
} as const

export const OFFER_SERVICE_PROCESS_STEPS_REPORTAZE_FIGMA_NODES = {
  desktop: '7338:8307',
  tablet: '7356:10841',
  mobile: '7356:10907',
} as const

export type OfferServiceProcessStepsData = OfferProcessStepsData

/** Static defaults — sesje-kobiece copy from Figma desktop frame 7105:7708. */
export const offerServiceProcessStepsSesjeKobieceDefaults: OfferServiceProcessStepsData = {
  heading: {
    plain: 'Od pierwszego „Hej!” po ',
    emphasis: 'zachwyt nad gotową galerią',
  },
  intro:
    'Chcę, abyś od pierwszej wiadomości czuła, że jesteś w dobrych rękach. Nasza współpraca to przejrzysty proces, w którym Ty po prostu cieszysz się chwilą.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję',
    newTab: false,
  },
  items: defaultOfferProcessStepItems,
}

/** Reportaż ślubny — Figma desktop `7338:8307` (same shell as kobiece). */
export const offerServiceProcessStepsReportazeSlubneDefaults: OfferServiceProcessStepsData = {
  heading: {
    plain: 'Od pierwszego „Hej!” po ',
    emphasis: 'zachwyt nad gotową galerią',
  },
  intro:
    'Chcemy, abyście od pierwszej wiadomości czuli, że jesteście w dobrych rękach. Nasza współpraca to przejrzysty, bezstresowy proces, w którym Wy po prostu cieszycie się Waszym dniem.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję',
    newTab: false,
  },
  items: [
    {
      number: 1,
      title: 'Krótka rozmowa i poznanie Waszych potrzeb',
      paragraphs: [
        'Zanim ustalimy szczegóły, rozmawiamy — przy dobrej kawie lub online. Chcemy poznać Waszą historię, Wasze obawy i to, czego naprawdę oczekujecie od fotoreportażu ślubnego.',
      ],
    },
    {
      number: 2,
      title: 'Pomagamy Wam poukładać ten dzień',
      paragraphs: [
        'Dzielimy się naszym doświadczeniem, pomagamy zaplanować harmonogram dnia tak, aby uniknąć pośpiechu, oraz odpowiadamy na wszystkie nurtujące Was pytania. Dzięki temu podchodzicie do ślubu spokojniejsi i bardziej pewni siebie.',
      ],
    },
    {
      number: 3,
      title: 'Reportaż ślubny w praktyce',
      paragraphs: [
        'W dniu ślubu jesteśmy z Wami w dyskretny, ciepły sposób. Pracując w duecie, wyłapujemy autentyczne emocje i ważne chwile bez narzucania się i zbędnej reżyserii. Wy możecie po prostu skupić się na sobie i swoich bliskich, a nie na aparatach.',
      ],
    },
    {
      number: 4,
      title: 'Autorska obróbka i selekcja',
      paragraphs: [
        'Po ślubie wybieramy najpiękniejsze kadry i poddajemy je starannej, obróbce. Stawiamy na naturalny, ponadczasowy styl, dzięki czemu Wasze zdjęcia będą zachwycać tak samo dzisiaj, jak i za kilkadziesiąt lat.',
      ],
    },
    {
      number: 5,
      title: 'Premiera i oddanie pamiątek',
      paragraphs: [
        'Już chwilę po ślubie otrzymujecie szybką zapowiedź, a niedługo potem pełną, elegancką galerię online chronioną hasłem. Dokładnie wiecie, kiedy i w jakiej formie trafią do Was zdjęcia.',
      ],
    },
  ],
}
