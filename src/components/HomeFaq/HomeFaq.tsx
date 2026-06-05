import { FaqSection } from '@/components/FaqSection'

import type { HomeFaqData } from './constants'
import { HOME_FAQ_FIGMA_NODES } from './constants'

type HomeFaqProps = {
  data: HomeFaqData
}

/**
 * Gallery page FAQ — reuses {@link FaqSection} with gallery-page Figma nodes.
 *
 * Figma: desktop `7104:17886`, tablet `7104:18237`, mobile `7104:19438`.
 */
export function HomeFaq({ data }: HomeFaqProps) {
  return (
    <FaqSection
      accordionIdPrefix="home-faq"
      data={data}
      figmaNodes={HOME_FAQ_FIGMA_NODES}
      headingId="home-faq-heading"
    />
  )
}
