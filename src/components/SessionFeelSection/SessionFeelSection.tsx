import { CenteredSplitCopy } from '@/components/CenteredSplitCopy'
import { GinghamStripeBackdrop } from '@/components/GinghamStripeBackdrop'

import {
  SESSION_FEEL_SECTION_FIGMA_NODES,
  type SessionFeelSectionData,
} from './constants'
import { SessionFeelStepsPanel } from './SessionFeelStepsPanel'
import { SessionFeelTitle } from './SessionFeelTitle'

type SessionFeelSectionProps = {
  data: SessionFeelSectionData
  headingId: string
}

/**
 * "Sesja jak spotkanie z przyjaciółką" — four-step session feel walkthrough.
 *
 * Figma `Navbar` (`6972:15546` / `7092:4362` / `7093:5723`):
 *   <section> — tertiary/300 gingham, full bleed
 *     ├── <GinghamStripeBackdrop>
 *     └── inner 1366 cap
 *         ├── <CenteredSplitCopy> — display heading + intro
 *         └── <SessionFeelStepsPanel> — kulki + numbered steps (one unit)
 *
 * Section padding: mobile 32/64/20; tablet+ 80/112 with 80 px horizontal on
 * tablet and 64 px on desktop. Heading-to-panel gap: 48 px mobile, 64 px tablet+.
 */
export function SessionFeelSection({ data, headingId }: SessionFeelSectionProps) {
  const { heading, intro, steps } = data

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-[var(--oczki-tertiary-300)] [font-family:var(--font-oczki-body)]"
      data-figma-node={SESSION_FEEL_SECTION_FIGMA_NODES.desktop}
      data-figma-node-mobile={SESSION_FEEL_SECTION_FIGMA_NODES.mobile}
      data-figma-node-tablet={SESSION_FEEL_SECTION_FIGMA_NODES.tablet}
    >
      <GinghamStripeBackdrop figmaNode={SESSION_FEEL_SECTION_FIGMA_NODES.ginghamBackdrop} />

      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-center gap-12 px-5 pb-16 pt-8 md:gap-16 md:px-20 md:pb-28 md:pt-20 min-[1366px]:px-16">
        <CenteredSplitCopy
          Title={SessionFeelTitle}
          body={intro}
          bodyClassName="text-[var(--oczki-primary-800)] md:max-w-[442px] md:px-11"
          containerClassName="w-full gap-2.5 md:w-[530px] md:gap-4"
          figmaNodes={{
            body: SESSION_FEEL_SECTION_FIGMA_NODES.heading.mobile,
            heading: SESSION_FEEL_SECTION_FIGMA_NODES.heading.desktop,
          }}
          heading={heading}
          headingId={headingId}
        />

        <SessionFeelStepsPanel steps={steps} />
      </div>
    </section>
  )
}
