import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import { CaseStudyDetailsRail } from './CaseStudyDetailsRail'
import { CASE_STUDY_DETAILS_FIGMA_NODES, type CaseStudyDetailsData } from './constants'

type CaseStudyDetailsProps = {
  data: CaseStudyDetailsData
}

/**
 * Case study “detale, które stworzyły klimat” — Figma frame `Kroki do realizacji oferty`
 * on the gallery case-study page (not the homepage process-steps section).
 *
 * <section> full-bleed cream
 * └── inner 1366 cap, centred column
 *     ├── Title Container (`SplitDisplayHeading`, max 456 px)
 *     └── Section Container (`CaseStudyDetailsRail` → `FramedDetailCard` × 4)
 *
 * Section padding (metadata): mobile 48/48 px 16; tablet+ 80 top, 64 bottom,
 * 80 px horizontal (tablet) / 32 px (desktop). Title→rail gap: 28 mobile, 36 tablet+.
 */
export function CaseStudyDetails({ data }: CaseStudyDetailsProps) {
  const { heading, items } = data
  const headingId = 'case-study-details-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_DETAILS_FIGMA_NODES.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-7 px-4 py-12 md:gap-9 md:px-20 md:pb-16 md:pt-20 lg:px-8">
        <div
          className="w-full max-w-[456px] text-center"
          data-figma-node={CASE_STUDY_DETAILS_FIGMA_NODES.titleContainer.desktop}
          data-name="Title Container"
        >
          <SplitDisplayHeading
            className="text-center [word-break:break-word]"
            emphasis={heading.emphasis}
            emphasisPosition="end"
            id={headingId}
            start={heading.start}
          />
        </div>

        <CaseStudyDetailsRail items={items} />
      </div>
    </section>
  )
}
