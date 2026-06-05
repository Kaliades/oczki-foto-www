import { BorderedPrinciplesRail } from '@/components/BorderedPrinciplesRail'
import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'

import {
  PHILOSOPHY_INTRO_BODY_MOBILE_CLASS,
  PHILOSOPHY_INTRO_BODY_TABLET_DESKTOP_CLASS,
  PHILOSOPHY_PRINCIPLES_SECTION_FIGMA_NODES,
  type PhilosophyPrinciplesSectionData,
} from './constants'
import { PhilosophyPrinciplesTitle } from './PhilosophyPrinciplesTitle'

type PhilosophyPrinciplesSectionProps = {
  data: PhilosophyPrinciplesSectionData
  headingId: string
}

/**
 * Centred philosophy intro + bordered principles rail.
 *
 * Figma `Herosection` (`7001:2443` / `7092:4348` / `7093:5709`):
 *   <section> — primary/100, centred stack
 *     └── inner 1366 cap
 *         ├── <div Heading> — `CenteredSplitCopy`
 *         └── <div Container> — `BorderedPrinciplesRail`
 *
 * Section padding (metadata): mobile 48/16; tablet+ 96 top / 128 bottom / 80 horizontal.
 * Heading-to-rail gap: 36 px mobile/tablet; 48 px desktop (≥1366 px).
 */
export function PhilosophyPrinciplesSection({ data, headingId }: PhilosophyPrinciplesSectionProps) {
  const { heading, intro, principles } = data

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={PHILOSOPHY_PRINCIPLES_SECTION_FIGMA_NODES.desktop}
      data-figma-node-mobile={PHILOSOPHY_PRINCIPLES_SECTION_FIGMA_NODES.mobile}
      data-figma-node-tablet={PHILOSOPHY_PRINCIPLES_SECTION_FIGMA_NODES.tablet}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-9 px-4 py-12 md:px-20 md:pb-32 md:pt-24 min-[1366px]:gap-12">
        <CenteredSplitCopy
          Title={PhilosophyPrinciplesTitle}
          body={intro}
          bodyMobileClassName={PHILOSOPHY_INTRO_BODY_MOBILE_CLASS}
          bodyTabletDesktopClassName={PHILOSOPHY_INTRO_BODY_TABLET_DESKTOP_CLASS}
          heading={heading}
          headingId={headingId}
        />
        <BorderedPrinciplesRail items={principles} />
      </div>
    </section>
  )
}
