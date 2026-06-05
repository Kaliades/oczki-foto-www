import { Accordion } from '@/components/Accordion/Accordion'

import type { FaqSectionData } from './constants'
import { FaqSectionIntro } from './FaqSectionIntro'

export type FaqSectionFigmaNodes = {
  desktop: string
  tablet: string
  mobile: string
}

type FaqSectionProps = {
  accordionIdPrefix: string
  data: FaqSectionData
  figmaNodes: FaqSectionFigmaNodes
  headingId: string
}

/**
 * "Rozwiejmy ostatnie wątpliwości" — two-column FAQ shell with accordion list.
 *
 * Hierarchy (Figma `FAQ` instance `7100:7617` / `7100:8623` / `7102:10289`):
 *   <section> — primary/100 full-bleed
 *   └── inner 1366 cap — px 32, py 80 (all breakpoints)
 *       └── Question container (`7100:6959`)
 *           ├── Header container (`7100:6960`) — {@link FaqSectionIntro}
 *           └── FAQs container (`7100:6963`) — {@link Accordion}
 *
 * Layout: stacked on mobile/tablet; side-by-side on desktop
 * (438 px intro / 663 px list, `justify-between`).
 */
export function FaqSection({
  accordionIdPrefix,
  data,
  figmaNodes,
  headingId,
}: FaqSectionProps) {
  const { heading, intro, items } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktop}
      data-figma-node-mobile={figmaNodes.mobile}
      data-figma-node-tablet={figmaNodes.tablet}
    >
      <div className="relative mx-auto w-full max-w-[1366px] px-8 py-20">
        <div
          className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-0"
          data-figma-node="7100:6959"
          data-name="Question container"
        >
          <FaqSectionIntro
            className="w-full shrink-0 lg:w-[438px]"
            heading={heading}
            headingId={headingId}
            intro={intro}
          />
          <Accordion
            className="w-full shrink-0 lg:w-[663px]"
            idPrefix={accordionIdPrefix}
            items={items}
          />
        </div>
      </div>
    </section>
  )
}
