import { CaseStudyVenueStoryStage } from './CaseStudyVenueStoryStage'
import { CASE_STUDY_VENUE_STORY_FIGMA_NODES, type CaseStudyVenueStoryData } from './constants'

type CaseStudyVenueStoryProps = {
  data: CaseStudyVenueStoryData
}

/**
 * Case study venue story — Figma `Container` (`7356:12141` / `13481` / `14857`).
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     └── Herosection (per breakpoint)
 *         ├── LayeredMatCollage → back `Image` + CreamMatPhoto
 *         ├── RotatedScallopPhoto → boolean `Union` (mask + cream rim stroke)
 *         ├── CaseStudyVenueStoryCopy → SplitDisplayHeading + body
 *         └── BrandSygnetBadge
 *
 * Outer padding (metadata): mobile pt 48; tablet pt 64; desktop pt 80 / pb 48.
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
        <div className="pt-12 md:hidden" data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.mobile}>
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="mobile" />
        </div>

        <div
          className="hidden pt-16 md:block lg:hidden"
          data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.tablet}
        >
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="tablet" />
        </div>

        <div
          className="hidden pb-12 pt-20 lg:block"
          data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.desktop}
        >
          <CaseStudyVenueStoryStage data={data} headingId={headingId} variant="desktop" />
        </div>
      </div>
    </section>
  )
}
