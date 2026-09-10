import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import {
  CASE_STUDY_VENUE_STORY_COPY_LAYOUT,
  CASE_STUDY_VENUE_STORY_FIGMA_NODES,
  type CaseStudyVenueStoryHeading,
} from './constants'

type CaseStudyVenueStoryCopyVariant = keyof typeof CASE_STUDY_VENUE_STORY_COPY_LAYOUT

type CaseStudyVenueStoryCopyProps = {
  variant: CaseStudyVenueStoryCopyVariant
  heading: CaseStudyVenueStoryHeading
  body: string
  headingId: string
}

/** Matches Figma body heights: D/T 144px (6 lines), M 216px (9 lines) at body/l 16×1.48. */
const BODY_LINE_CLAMP_CLASS = {
  desktop: 'line-clamp-6',
  tablet: 'line-clamp-6',
  mobile: 'line-clamp-9',
} as const

/**
 * Venue story title + body inside `Herosection`.
 * Overflow uses CSS line-clamp so ellipsis sits at the end of the last full line.
 */
export function CaseStudyVenueStoryCopy({
  variant,
  heading,
  body,
  headingId,
}: CaseStudyVenueStoryCopyProps) {
  const layout = CASE_STUDY_VENUE_STORY_COPY_LAYOUT[variant]
  const nodes = CASE_STUDY_VENUE_STORY_FIGMA_NODES.copy[variant]

  return (
    <div
      className="relative z-10 flex flex-col items-start"
      data-figma-node={nodes}
      data-name="Container"
      style={{
        gap: layout.gap,
        left: layout.left,
        paddingLeft: layout.paddingLeft,
        top: layout.top,
        width: layout.width,
      }}
    >
      <SplitDisplayHeading
        className="[word-break:break-word]"
        emphasis={heading.emphasis}
        emphasisPosition="start"
        id={headingId}
        sizeClassName="oczki-heading-l text-[36px]"
        start={heading.start}
      />

      <div
        className="flex w-full flex-col items-start"
        data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.body[variant]}
        data-name="Container"
        style={{ paddingRight: layout.bodyPaddingRight }}
      >
        <p
          className={`oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)] ${BODY_LINE_CLAMP_CLASS[variant]}`}
        >
          {body}
        </p>
      </div>
    </div>
  )
}
