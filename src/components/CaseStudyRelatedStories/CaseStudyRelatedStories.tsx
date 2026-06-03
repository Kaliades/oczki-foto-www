import { PortraitPhotoStrip } from '@/components/PortraitPhotoStrip'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import {
  CASE_STUDY_RELATED_STORIES_FIGMA_NODES,
  CASE_STUDY_RELATED_STORIES_HEADING_SIZE_CLASSNAME,
  type CaseStudyRelatedStoriesData,
} from './constants'

type CaseStudyRelatedStoriesProps = {
  data: CaseStudyRelatedStoriesData
}

/**
 * Case study related galleries — Figma `Inne-uslugi` on gallery case-study page.
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     ├── SplitDisplayHeading (`Heading`, 292 px max)
 *     └── PortraitPhotoStrip → Images Container → CropFramedPhoto × 3
 *
 * Section padding (metadata): mobile 48/64 px 16, gap 28; tablet 96 vertical px 80,
 * gap 32; desktop 96 vertical px 32, row layout with heading + strip vertically centred.
 * Heading→strip gap: 32 tablet / 28 mobile; desktop uses justify-between (32 px between cols).
 */
export function CaseStudyRelatedStories({ data }: CaseStudyRelatedStoriesProps) {
  const { heading, items } = data
  const headingId = 'case-study-related-stories-heading'
  const nodes = CASE_STUDY_RELATED_STORIES_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-start gap-7 px-4 pb-16 pt-12 md:gap-8 md:px-20 md:py-24 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:py-24">
        <div
          className="w-full max-w-[292px] shrink-0"
          data-figma-node={nodes.heading.desktop}
          data-name="Heading"
        >
          <SplitDisplayHeading
            className="[word-break:break-word]"
            emphasis={heading.emphasis}
            emphasisPosition="end"
            id={headingId}
            sizeClassName={CASE_STUDY_RELATED_STORIES_HEADING_SIZE_CLASSNAME}
            start={heading.start}
          />
        </div>

        <PortraitPhotoStrip items={items} />
      </div>
    </section>
  )
}
