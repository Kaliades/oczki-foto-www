import { HOME_PROCESS_STEPS_FIGMA_NODES, type HomeProcessStepsData } from './constants'
import { ProcessSectionHeader } from './ProcessSectionHeader'
import { ProcessStepsRail } from './ProcessStepsRail'
import { WaxStampDecor } from './WaxStampDecor'

type HomeProcessStepsProps = {
  data: HomeProcessStepsData
}

/**
 * "Kroki do realizacji oferty" — the section that walks the visitor through
 * the three guiding principles of how a session unfolds.
 *
 * Figma references:
 * - Desktop: {@link HOME_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
 * - Tablet:  {@link HOME_PROCESS_STEPS_FIGMA_NODES.tabletFrame}
 * - Mobile:  {@link HOME_PROCESS_STEPS_FIGMA_NODES.mobileFrame}
 *
 * Responsive padding follows the source: 16/80 mobile, 80/96 tablet, 32/96 desktop.
 * The wax-stamp decoration is anchored absolutely against this section root,
 * so the root must remain `relative`.
 */
export const HomeProcessSteps = ({ data }: HomeProcessStepsProps) => {
  const { heading, intro, items, showWaxStamp = true } = data

  return (
    <section
      data-figma-node={HOME_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
      className="relative isolate flex w-full flex-col items-center gap-7 bg-[var(--oczki-primary-100)] px-4 pb-12 pt-20 [font-family:var(--font-oczki-body)] md:items-center md:px-20 md:pb-24 md:pt-24 lg:items-start lg:gap-8 lg:px-8 lg:pb-24 lg:pt-24"
    >
      {showWaxStamp ? <WaxStampDecor /> : null}
      <ProcessSectionHeader heading={heading} intro={intro} />
      <ProcessStepsRail items={items} />
    </section>
  )
}
