import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'
import { FramedDetailCardsRail } from '@/components/StripedDetailFrame'

import {
  EXPERTISE_SECTION_FIGMA_NODES,
  resolveExpertiseCardStretchContent,
  type ExpertiseSectionData,
} from './constants'

type ExpertiseSectionProps = {
  data: ExpertiseSectionData
  headingId: string
}

/**
 * "Wiedza, która zamienia się w Twój spokój" — four expertise reassurance cards.
 *
 * Figma `Main Container` (`6972:15565` / `7092:4524` / `7093:5889`):
 *   <section> — primary/100, full bleed
 *     └── inner 1366 cap
 *         ├── <CenteredSplitCopy> — display heading + intro
 *         └── <FramedDetailCardsRail variant="expertise"> — sage-mat cards
 *
 * Section padding (metadata): mobile 48/16; tablet+ 96 top / 129 bottom /
 * 80 px horizontal (tablet) / 32 px (desktop). Heading-to-rail gap: 32 px mobile, 36 px tablet+.
 */
export function ExpertiseSection({ data, headingId }: ExpertiseSectionProps) {
  const { heading, intro, cards } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={EXPERTISE_SECTION_FIGMA_NODES.desktop}
      data-figma-node-mobile={EXPERTISE_SECTION_FIGMA_NODES.mobile}
      data-figma-node-tablet={EXPERTISE_SECTION_FIGMA_NODES.tablet}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-8 px-4 py-12 md:gap-9 md:max-[1365px]:px-20 md:pb-[129px] md:pt-24 min-[1366px]:px-8">
        <CenteredSplitCopy
          body={intro}
          containerClassName="gap-2.5 md:w-[442px] md:gap-4"
          emphasisPosition="end"
          figmaNodes={{
            body: EXPERTISE_SECTION_FIGMA_NODES.heading.mobile,
            heading: EXPERTISE_SECTION_FIGMA_NODES.heading.desktop,
          }}
          heading={heading}
          headingId={headingId}
        />

        <FramedDetailCardsRail
          containerFigmaNode={EXPERTISE_SECTION_FIGMA_NODES.cardContainer.desktop}
          items={cards}
          resolveStretchContent={resolveExpertiseCardStretchContent}
          variant="expertise"
        />
      </div>
    </section>
  )
}
