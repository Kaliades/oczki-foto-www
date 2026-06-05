import {
  defaultOfferProcessStepItems,
  type OfferProcessStepsData,
} from '@/components/OfferProcessSteps'

/**
 * Figma source nodes for the homepage "Krok po kroku do pięknych zdjęć"
 * variant of the shared process-steps section.
 */
export const HOME_OFFER_PROCESS_STEPS_FIGMA_NODES = {
  desktop: '7105:8099',
  tablet: '7105:11601',
  mobile: '7105:13896',
} as const

export type HomeOfferProcessStepsData = OfferProcessStepsData

/**
 * Static defaults — homepage copy from Figma desktop frame 7105:8099.
 */
export const homeOfferProcessStepsDefaults: HomeOfferProcessStepsData = {
  heading: {
    plain: 'Krok po kroku do ',
    emphasis: 'pięknych zdjęć',
  },
  intro:
    'Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje”. Powstają wtedy, gdy pojawia się spokój, zaufanie i odrobina luzu. Właśnie na tym opiera się mój sposób pracy.',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Umów sesję',
    newTab: false,
  },
  items: defaultOfferProcessStepItems,
}
