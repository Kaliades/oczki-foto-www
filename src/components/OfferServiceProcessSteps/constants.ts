import {
  defaultOfferProcessStepItems,
  type OfferProcessStepsData,
} from '@/components/OfferProcessSteps'

/**
 * Offer service — process steps ("Kroki do realizacji oferty") on
 * `/oferta/[slug]`.
 *
 * Figma references (desktop / tablet / mobile in parallel):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-7708
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-7774
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7105-7840
 */
export const OFFER_SERVICE_PROCESS_STEPS_FIGMA_NODES = {
  desktop: '7105:7708',
  tablet: '7105:7774',
  mobile: '7105:7840',
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
