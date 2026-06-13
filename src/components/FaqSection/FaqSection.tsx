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
 * Hierarchy (Figma `FAQ` instance, e.g. kontakt `7100:7158` / `7100:7234` / `7100:7310`):
 *   <section> — primary/100 full bleed
 *   └── inner 1366 cap
 *       └── Question container (`7100:6959`)
 *           ├── Header container (`7100:6960`) — {@link FaqSectionIntro}
 *           └── FAQs container (`7100:6963`) — {@link Accordion}
 *
 * Section padding: mobile 48/16; tablet 80/80; desktop 80/32.
 * Stacked gap intro→list: mobile 24; tablet 36; desktop side-by-side (438 + 663, justify-between).
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
      <div className="relative mx-auto w-full max-w-[1366px] px-4 py-12 md:px-20 md:py-20 min-[1366px]:px-8">
        <div
          className="flex w-full flex-col items-start gap-6 md:gap-9 min-[1366px]:flex-row min-[1366px]:justify-between min-[1366px]:gap-0"
          data-figma-node="7100:6959"
          data-name="Question container"
        >
          <FaqSectionIntro
            className="w-full shrink-0 min-[1366px]:w-[438px]"
            heading={heading}
            headingId={headingId}
            intro={intro}
          />
          <Accordion
            className="w-full shrink-0 min-[1366px]:w-[663px]"
            idPrefix={accordionIdPrefix}
            items={items}
          />
        </div>
      </div>
    </section>
  )
}
