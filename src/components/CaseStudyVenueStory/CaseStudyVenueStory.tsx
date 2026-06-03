import { CaseStudyVenueStoryStage } from './CaseStudyVenueStoryStage'
import { CASE_STUDY_VENUE_STORY_FIGMA_NODES, type CaseStudyVenueStoryData } from './constants'

type CaseStudyVenueStoryProps = {
  data: CaseStudyVenueStoryData
}

/**
 * Case study venue story — Figma `Container` on gallery case-study page.
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     └── Herosection (per breakpoint)
 *         ├── LayeredMatCollage → back `Image` + CreamMatPhoto + BrandSygnetBadge
 *         ├── RotatedScallopPhoto → boolean `Union`
 *         └── CaseStudyVenueStoryCopy → SplitDisplayHeading + body
 *
 * Section padding (metadata): desktop outer py 48 only; hero child coords use
 * the full cap width (copy x=32, images from y=0). Tablet/mobile: no outer py.
 */
export function CaseStudyVenueStory({ data }: CaseStudyVenueStoryProps) {
  const headingId = 'case-study-venue-story-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.desktop}
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <div className="md:hidden" data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.mobile}>
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="mobile" />
        </div>

        <div
          className="hidden md:block lg:hidden"
          data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.tablet}
        >
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="tablet" />
        </div>

        <div className="hidden py-12 lg:block" data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.desktop}>
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="desktop" />
        </div>
      </div>
    </section>
  )
}
