import type { CenteredSplitCopyHeading } from '@/components/CenteredSplitCopy'
import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'
import { PunchedTagCardRail } from '@/components/PunchedTagCardRail'
import type { PunchedTagCardRailItem } from '@/components/PunchedTagCardRail'

import { COLLABORATION_PILLARS_SECTION_FIGMA_NODES } from './constants'

export type CollaborationPillarsSectionData = {
  heading: CenteredSplitCopyHeading
  intro: string
  pillars: readonly PunchedTagCardRailItem[]
}

type CollaborationPillarsSectionProps = {
  data: CollaborationPillarsSectionData
  headingId: string
}

/**
 * "Jak wspólnie działamy nad Waszą historią?" — duo philosophy with three tilted tags.
 *
 * Figma `Kroki do realizacji oferty` (`6994:26165` / `7092:4671` / `7093:6056`):
 *   <section> — primary/100, full bleed
 *     └── inner 1366 cap — centred column
 *         ├── <CenteredSplitCopy> — header/m + body/l
 *         └── <PunchedTagCardRail> — three `PunchedTagCard` instances + mobile ribbon on rail (`7093:6075`)
 *
 * Section padding: mobile 48/16, gap 20; tablet 96/80, gap 28; desktop 96/32, gap 32.
 * Intro gap: 10 mobile; 16 tablet+.
 */
export function CollaborationPillarsSection({ data, headingId }: CollaborationPillarsSectionProps) {
  const { heading, intro, pillars } = data
  const nodes = COLLABORATION_PILLARS_SECTION_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
      data-figma-node-mobile={nodes.mobile}
      data-figma-node-tablet={nodes.tablet}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-center gap-5 px-4 py-12 md:max-[1365px]:px-20 md:gap-7 md:py-24 min-[1366px]:gap-8 min-[1366px]:px-8 min-[1366px]:py-24">
        <CenteredSplitCopy
          body={intro}
          bodyClassName="md:max-w-none md:px-0"
          containerClassName="gap-2.5 md:w-[442px] md:gap-4"
          emphasisPosition="end"
          figmaNodes={{
            body: nodes.intro.body.desktop,
            heading: nodes.intro.section.desktop,
          }}
          heading={heading}
          headingId={headingId}
          headingSizeClassName="text-[32px] tracking-[-0.32px]"
        />

        <PunchedTagCardRail figmaNode={nodes.rail.desktop} items={pillars} />
      </div>
    </section>
  )
}
