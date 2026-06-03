import { STORY_INTRO_COPY_FIGMA_NODES, type CaseStudyHeroHeading } from './constants'

type CaseStudyStoryCopyProps = {
  description: string
  heading: CaseStudyHeroHeading
  headingId: string
}

/**
 * Framed story intro copy — reusable inside `ScallopedStoryFrame`.
 * Mobile (`7130:9648`): 24 px lead + 32 px italic emphasis; gap 10 px.
 * Tablet+ (`6972:17845`): 32 px heading; gap 16 px.
 */
export function CaseStudyStoryCopy({ description, heading, headingId }: CaseStudyStoryCopyProps) {
  return (
    <div
      className="flex w-full flex-col gap-2.5 md:max-w-[402px] md:gap-4"
      data-figma-node={STORY_INTRO_COPY_FIGMA_NODES.desktop}
    >
      <h1
        className="w-full text-left font-normal leading-[1.04] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] md:text-[32px] md:tracking-[-0.02em] [font-feature-settings:'lnum'_1,'pnum'_1]"
        id={headingId}
      >
        <span className="text-[24px] tracking-[-0.24px] md:text-[32px] md:tracking-[-0.02em]">
          {heading.lead}
        </span>
        <em className="text-[32px] italic tracking-[-0.32px] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1] md:tracking-[-0.01em]">
          {heading.emphasis}
        </em>
        <span className="text-[24px] tracking-[-0.24px] md:text-[32px] md:tracking-[-0.02em]">
          {heading.end}
        </span>
      </h1>
      <p className="oczki-body-l text-[var(--oczki-primary-700)]">{description}</p>
    </div>
  )
}
