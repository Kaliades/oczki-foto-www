import { CaseStudyMemorableMomentStage } from './CaseStudyMemorableMomentStage'
import {
  CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES,
  type CaseStudyMemorableMomentData,
} from './constants'

type CaseStudyMemorableMomentProps = {
  data: CaseStudyMemorableMomentData
}

/**
 * Case study closing reflection — Figma `Herosection` “To, co zapamiętamy najbardziej”.
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     └── Herosection (per breakpoint)
 *         ├── LandscapeWithDotDecor
 *         ├── PortraitWithPlaidMat
 *         └── CenteredSectionCopy
 */
export function CaseStudyMemorableMoment({ data }: CaseStudyMemorableMomentProps) {
  const headingId = 'case-study-memorable-moment-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full overflow-x-clip bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)] lg:overflow-x-visible"
      data-figma-node={CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES.desktop}
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div
          className="flex justify-center md:hidden"
          data-figma-node={CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES.mobile}
        >
          <CaseStudyMemorableMomentStage data={data} headingId={headingId} variant="mobile" />
        </div>

        <div
          className="hidden justify-center md:flex lg:hidden"
          data-figma-node={CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES.tablet}
        >
          <CaseStudyMemorableMomentStage data={data} headingId={headingId} variant="tablet" />
        </div>

        <div className="hidden lg:block" data-figma-node={CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES.desktop}>
          <CaseStudyMemorableMomentStage data={data} headingId={headingId} variant="desktop" />
        </div>
      </div>
    </section>
  )
}
