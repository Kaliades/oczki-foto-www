import { ApproachBlocksRail } from '@/components/ApproachBlocksRail'
import { LeftAlignedSplitCopy } from '@/components/LeftAlignedSplitCopy'

import { OFFER_SERVICE_APPROACH_FIGMA_NODES, type OfferServiceApproachData } from './constants'

type OfferServiceApproachProps = {
  data: OfferServiceApproachData
}

/**
 * “Obiektyw nie gryzie…” approach section on offer-service pages.
 *
 * Figma `Container`:
 *   desktop `6986:20139` — px 32, py 80
 *   tablet  `7100:7847` — px 80, pt 80 pb 96
 *   mobile  `7102:9518` — px 16, py 48
 */
export function OfferServiceApproach({ data }: OfferServiceApproachProps) {
  const { blocks, heading, introParagraphs, portrait } = data

  return (
    <section
      aria-labelledby="offer-service-approach-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={OFFER_SERVICE_APPROACH_FIGMA_NODES.container.desktop}
    >
      <div className="mx-auto w-full max-w-[1366px] px-4 py-12 md:px-20 md:pt-20 md:pb-24 min-[1366px]:px-8 min-[1366px]:pt-20 min-[1366px]:pb-24">
        <div
          className="flex w-full flex-col items-start gap-9"
          data-figma-node={OFFER_SERVICE_APPROACH_FIGMA_NODES.sectionIntro.desktop}
          data-name="Section Intro"
        >
          <LeftAlignedSplitCopy
            bodyParagraphs={introParagraphs}
            figmaNode={OFFER_SERVICE_APPROACH_FIGMA_NODES.introCopy.desktop}
            heading={heading}
            headingId="offer-service-approach-heading"
          />
          <ApproachBlocksRail
            blocks={blocks}
            image={{
              alt: portrait.alt,
              figmaNode: OFFER_SERVICE_APPROACH_FIGMA_NODES.portraitImage.desktop,
              src: portrait.src,
            }}
          />
        </div>
      </div>
    </section>
  )
}
