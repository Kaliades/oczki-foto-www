import { OrnateCtaSection, HOME_FINAL_CTA_PROFILE } from '@/components/OrnateCtaSection'

import { HOME_CTA_FIGMA_NODES, type HomeCtaData } from './constants'

type HomeCtaProps = {
  data: HomeCtaData
}

/**
 * Final homepage CTA — Figma 7105:8981 / 7118:9246 / 7105:14226.
 */
export const HomeCta = ({ data }: HomeCtaProps) => {
  const { heading, body, cta } = data

  return (
    <OrnateCtaSection
      data={{
        body,
        cta,
        heading: {
          type: 'split',
          emphasis: heading.emphasis,
          plain: heading.plain,
        },
      }}
      figmaNodes={HOME_CTA_FIGMA_NODES}
      headingId="home-cta-heading"
      profile={HOME_FINAL_CTA_PROFILE}
    />
  )
}
