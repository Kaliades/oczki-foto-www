import { STORY_INTRO_COPY_FIGMA_NODES, type CaseStudyHeroHeading } from './constants'

type CaseStudyStoryCopyProps = {
  heading: CaseStudyHeroHeading
  headingId: string
}

/**
 * Framed story intro heading — reusable inside `ScallopedStoryFrame`.
 * Heading only (Figma `7394:10926` / `7394:13442`): no body copy in the hero card.
 * Mobile: 24 px lead + 32 px italic emphasis. Tablet+: 32 px throughout.
 */
export function CaseStudyStoryCopy({ heading, headingId }: CaseStudyStoryCopyProps) {
  return (
    <div className="w-full md:max-w-[402px]" data-figma-node={STORY_INTRO_COPY_FIGMA_NODES.desktop}>
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
    </div>
  )
}
