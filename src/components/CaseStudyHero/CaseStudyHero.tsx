import { OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import { ScallopedStoryFrame } from '@/components/ScallopedStoryFrame'

import { CaseStudyHeroBackground } from './CaseStudyHeroBackground'
import { CaseStudyStoryCopy } from './CaseStudyStoryCopy'
import { CASE_STUDY_HERO_FIGMA_NODES, type CaseStudyHeroData } from './constants'

type CaseStudyHeroProps = {
  data: CaseStudyHeroData
}

/**
 * Case study page hero — Figma `Frame 1000006620`.
 *
 * <section> (full-bleed photo + gradient)
 * └── inner 1366 cap
 *     ├── breadcrumb row (on photo)
 *     └── main column (`Main Container`)
 *         └── ScallopedStoryFrame (`Group 62`)
 *             └── CaseStudyStoryCopy
 *
 * Navbar: global `OczkiNavbar` via layout — not rendered here.
 */
export function CaseStudyHero({ data }: CaseStudyHeroProps) {
  const { background, breadcrumbs, description, heading, title } = data
  const headingId = 'case-study-hero-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="relative isolate w-full min-h-[623px] overflow-hidden md:min-h-[631px] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_HERO_FIGMA_NODES.desktop}
    >
      <CaseStudyHeroBackground alt={background.alt} src={background.src} />

      <div className="relative mx-auto w-full max-w-[1366px]">
        <div
          className="relative z-10 flex h-11 items-center px-4 md:h-[52px] md:px-20 md:py-1 lg:px-8"
          data-figma-node={CASE_STUDY_HERO_FIGMA_NODES.breadcrumbs.desktop}
        >
          <OczkiBreadcrumbs items={breadcrumbs} variant="onPhoto" />
        </div>

        <div
          className="relative z-10 flex min-h-[579px] flex-col items-start pl-[3px] pr-4 pb-12 pt-[22px] md:pl-20 md:pr-20 md:pt-8 lg:pl-8 lg:pr-8 lg:pt-[31px]"
          data-figma-node={CASE_STUDY_HERO_FIGMA_NODES.mainContainer.desktop}
        >
          <ScallopedStoryFrame>
            <CaseStudyStoryCopy
              description={description}
              heading={heading}
              headingId={headingId}
            />
          </ScallopedStoryFrame>
        </div>
      </div>

      <span className="sr-only">{title}</span>
    </section>
  )
}
