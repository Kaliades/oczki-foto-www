import { ABOUT_CTA_PROFILE, OrnateCtaSection } from '@/components/OrnateCtaSection'

import { ABOUT_CTA_FIGMA_NODES, type AboutCtaData } from './constants'

type AboutCtaProps = {
  data: AboutCtaData
}

/**
 * About page closing CTA — Figma 7105:8698 / 7105:8746 / 7105:8794.
 *
 * Page order: after {@link AboutInstagramSection}, before footer.
 */
export function AboutCta({ data }: AboutCtaProps) {
  return (
    <OrnateCtaSection
      data={data}
      figmaNodes={ABOUT_CTA_FIGMA_NODES}
      headingId="about-cta-heading"
      profile={ABOUT_CTA_PROFILE}
    />
  )
}
