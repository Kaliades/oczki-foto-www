import { OfferProcessStepsSection } from '@/components/OfferProcessSteps'

import { HOME_OFFER_PROCESS_STEPS_FIGMA_NODES, type HomeOfferProcessStepsData } from './constants'

type HomeOfferProcessStepsProps = {
  data: HomeOfferProcessStepsData
}

/**
 * Homepage "Krok po kroku do pięknych zdjęć" — reuses
 * {@link OfferProcessStepsSection} with homepage Figma nodes and copy.
 *
 * Sits below the gallery / showcase sections on the homepage and ends the
 * page-level narrative before the footer.
 */
export const HomeOfferProcessSteps = ({ data }: HomeOfferProcessStepsProps) => {
  return (
    <OfferProcessStepsSection
      data={data}
      figmaNodes={HOME_OFFER_PROCESS_STEPS_FIGMA_NODES}
      headingId="home-offer-process-steps-heading"
    />
  )
}
