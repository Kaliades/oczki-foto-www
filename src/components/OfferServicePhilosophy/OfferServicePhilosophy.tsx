import { BorderedPrinciplesRail } from '@/components/BorderedPrinciplesRail'
import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'

import { OFFER_SERVICE_PHILOSOPHY_FIGMA_NODES, type OfferServicePhilosophyData } from './constants'

type OfferServicePhilosophyProps = {
  data: OfferServicePhilosophyData
}

/**
 * Philosophy / principles block on offer-service pages.
 *
 * Figma `Herosection`:
 *   <section> — primary/100, centred stack
 *     ├── <div Heading> — `CenteredSplitCopy`
 *     └── <div Container> — `BorderedPrinciplesRail`
 *
 * Section padding: mobile 48/16; tablet+ 96 top / 128 bottom / 80 horizontal.
 * Heading-to-rail gap: 36 px mobile/tablet, 48 px desktop.
 */
export function OfferServicePhilosophy({ data }: OfferServicePhilosophyProps) {
  const { heading, intro, principles } = data

  return (
    <section
      aria-labelledby="offer-service-philosophy-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={OFFER_SERVICE_PHILOSOPHY_FIGMA_NODES.desktopFrame}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-9 px-4 py-12 md:px-20 md:pb-32 md:pt-24 lg:gap-12">
        <CenteredSplitCopy body={intro} heading={heading} headingId="offer-service-philosophy-heading" />
        <BorderedPrinciplesRail items={principles} />
      </div>
    </section>
  )
}
