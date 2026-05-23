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
 * Figma references (always desktop / tablet / mobile in parallel):
 * - Desktop: {@link HOME_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
 * - Tablet:  {@link HOME_PROCESS_STEPS_FIGMA_NODES.tabletFrame}
 * - Mobile:  {@link HOME_PROCESS_STEPS_FIGMA_NODES.mobileFrame}
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - outer `<section>` carries the full-bleed cream background, font-family
 *     and a relative isolated stacking context so the wax stamp keeps its
 *     own layer.
 *   - inner `<div>` carries the 1366 cap, mx-auto centring, layout flex,
 *     paddings and the absolute wax stamp decoration. Above 1366 px the
 *     cream background bleeds to both edges while the content stays in the
 *     capped box.
 *
 * Section padding follows Figma 1:1: 16/80 (mobile), 80/96 (tablet), 32/96
 * (desktop). Items alignment is start / center / start.
 */
export const HomeProcessSteps = ({ data }: HomeProcessStepsProps) => {
  const { heading, intro, items, showWaxStamp = true } = data

  return (
    <section
      data-figma-node={HOME_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
    >
      <div className="relative isolate mx-auto flex w-full max-w-[1366px] flex-col items-start gap-7 px-4 pb-12 pt-20 md:items-center md:gap-8 md:px-20 md:pb-24 md:pt-24 lg:items-start lg:px-8">
        {showWaxStamp ? <WaxStampDecor /> : null}
        <ProcessSectionHeader heading={heading} intro={intro} />
        <ProcessStepsRail items={items} />
      </div>
    </section>
  )
}
