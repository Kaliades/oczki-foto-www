import { Accordion } from '@/components/Accordion/Accordion'

import type { HomeFaqData } from './constants'
import { HOME_FAQ_FIGMA_NODES } from './constants'
import { FaqSectionIntro } from './FaqSectionIntro'

type HomeFaqProps = {
  data: HomeFaqData
}

/**
 * "Rozwiejmy ostatnie wątpliwości" — FAQ accordion below gallery ease section.
 *
 * Figma: desktop `7104:17886`, tablet `7104:18237`, mobile `7104:19438`.
 *
 * Shell: outer `<section>` (full-bleed cream bg) + inner cap (`max-w-[1366px]`).
 * Layout: stacked header + accordion on mobile/tablet; side-by-side on desktop
 * (438 px intro / 663 px list, `justify-between`).
 */
export function HomeFaq({ data }: HomeFaqProps) {
  const { heading, intro, items } = data

  return (
    <section
      aria-labelledby="home-faq-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_FAQ_FIGMA_NODES.desktopFrame}
    >
      <div className="relative mx-auto w-full max-w-[1366px] px-8 py-20">
        <div
          className="flex w-full flex-col items-start gap-8 lg:flex-row lg:justify-between lg:gap-0"
          data-figma-node="7100:6959"
          data-name="Question container"
        >
          <FaqSectionIntro
            className="w-full shrink-0 lg:w-[438px]"
            heading={heading}
            intro={intro}
          />
          <Accordion
            className="w-full shrink-0 lg:w-[663px]"
            idPrefix="home-faq"
            items={items}
          />
        </div>
      </div>
    </section>
  )
}
