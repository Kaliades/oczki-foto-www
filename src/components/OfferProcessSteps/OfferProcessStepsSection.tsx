import { OfferStepsIntro } from './OfferStepsIntro'
import { OfferStepsList } from './OfferStepsList'
import type { OfferProcessStepsData } from './constants'

export type OfferProcessStepsFigmaNodes = {
  desktop: string
  tablet: string
  mobile: string
}

type OfferProcessStepsSectionProps = {
  data: OfferProcessStepsData
  figmaNodes: OfferProcessStepsFigmaNodes
  headingId: string
}

/**
 * Shared "Kroki do realizacji oferty" shell — five-step walkthrough with
 * intro column + steps list.
 *
 * <section> full-bleed primary/100
 * └── inner 1366 cap
 *     ├── OfferStepsIntro (`7105:7510`) — heading + intro + CTA
 *     └── OfferStepsList (`7105:7517`) — numbered diamond rows
 *
 * Section padding (metadata `7105:7708` / `7105:7774` / `7105:7840`):
 * pt 96 px, pb 80 px; px 32 mobile/desktop, px 80 tablet.
 * Column gap 80 px on tablet/mobile stack; 231 px horizontal gap on
 * desktop two-column layout.
 */
export function OfferProcessStepsSection({
  data,
  figmaNodes,
  headingId,
}: OfferProcessStepsSectionProps) {
  const { heading, intro, cta, items } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktop}
    >
      <div
        className="relative mx-auto flex w-full max-w-[1366px] flex-col gap-20 px-8 pb-20 pt-24 md:px-20 lg:flex-row lg:items-start lg:gap-[231px] lg:px-8"
        data-figma-node-mobile={figmaNodes.mobile}
        data-figma-node-tablet={figmaNodes.tablet}
      >
        <OfferStepsIntro
          cta={cta}
          headingEmphasis={heading.emphasis}
          headingId={headingId}
          headingPlain={heading.plain}
          intro={intro}
        />
        <OfferStepsList items={items} />
      </div>
    </section>
  )
}
