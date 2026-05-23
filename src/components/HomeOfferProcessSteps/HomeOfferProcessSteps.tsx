import { HOME_OFFER_PROCESS_STEPS_FIGMA_NODES, type HomeOfferProcessStepsData } from './constants'
import { OfferStepsIntro } from './OfferStepsIntro'
import { OfferStepsList } from './OfferStepsList'

type HomeOfferProcessStepsProps = {
  data: HomeOfferProcessStepsData
}

/**
 * "Krok po kroku do pięknych zdjęć" — five-step walkthrough of how a
 * session unfolds, from the first conversation to the delivery of the
 * final photographs. Sits below the gallery / showcase sections on the
 * homepage and ends the page-level narrative before the footer.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 * - Desktop: {@link HOME_OFFER_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
 *   7105:8099 — two columns, intro (535 px) + 231 px gap + steps.
 * - Tablet:  {@link HOME_OFFER_PROCESS_STEPS_FIGMA_NODES.tabletFrame}
 *   7105:11601 — single column stack, ~80 px horizontal padding.
 * - Mobile:  {@link HOME_OFFER_PROCESS_STEPS_FIGMA_NODES.mobileFrame}
 *   7105:13896 — single column stack, 32 px horizontal padding, CTA
 *   stretches full-width.
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - Outer `<section>` carries the full-bleed cream background and the
 *     project body font.
 *   - Inner `<div>` carries the 1366 px cap, `mx-auto` centring, the
 *     responsive padding and the column / stack flex layout. Above
 *     1366 px the cream background bleeds to both edges while the
 *     content stays in the capped box.
 *
 * Vertical paddings are 1:1 with Figma at every breakpoint: `pt-24`
 * (96 px) / `pb-20` (80 px). The 80 px gap between intro and steps on
 * tablet / mobile is the row-wrap gap rendered in the Figma source —
 * collapses to a horizontal `gap-[231px]` once the layout switches to
 * the two-column desktop variant.
 */
export const HomeOfferProcessSteps = ({ data }: HomeOfferProcessStepsProps) => {
  const { heading, intro, cta, items } = data

  return (
    <section
      aria-labelledby="home-offer-process-steps-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_OFFER_PROCESS_STEPS_FIGMA_NODES.desktopFrame}
    >
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col gap-20 px-8 pb-20 pt-24 md:px-20 lg:flex-row lg:items-start lg:gap-[231px] lg:px-8">
        <OfferStepsIntro
          cta={cta}
          headingEmphasis={heading.emphasis}
          headingPlain={heading.plain}
          intro={intro}
        />
        <OfferStepsList items={items} />
      </div>
    </section>
  )
}
