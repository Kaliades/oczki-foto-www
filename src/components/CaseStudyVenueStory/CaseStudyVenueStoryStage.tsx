import { BrandSygnetBadge } from '@/components/BrandSygnetBadge'
import { LAYERED_MAT_COLLAGE_LAYOUT, LayeredMatCollage } from '@/components/LayeredMatCollage'
import { RotatedScallopPhoto } from '@/components/RotatedScallopPhoto'

import { CaseStudyVenueStoryCopy } from './CaseStudyVenueStoryCopy'
import {
  CASE_STUDY_VENUE_STORY_FIGMA_NODES,
  type CaseStudyVenueStoryData,
  type CaseStudyVenueStoryPhotoSet,
} from './constants'

type CaseStudyVenueStoryStageProps = {
  variant: 'desktop' | 'tablet' | 'mobile'
  data: CaseStudyVenueStoryData
  headingId: string
}

/**
 * One breakpoint slice of the venue story `Herosection`.
 *
 * Layer order (back → front): back photo, cream mat, scallop union, copy (z-10), sygnet (z-20).
 */
export function CaseStudyVenueStoryStage({
  variant,
  data,
  headingId,
}: CaseStudyVenueStoryStageProps) {
  const collageLayout = LAYERED_MAT_COLLAGE_LAYOUT[variant]
  const photos: CaseStudyVenueStoryPhotoSet = data.photos[variant]

  return (
    <div
      className="relative w-full shrink-0 overflow-hidden"
      data-figma-node={CASE_STUDY_VENUE_STORY_FIGMA_NODES.heroSection[variant]}
      data-name="Herosection"
      style={{ height: collageLayout.stageHeight }}
    >
      <LayeredMatCollage images={photos} variant={variant} />

      <RotatedScallopPhoto
        contentMode={
          photos.scallop.src.includes('case-study-venue-scallop')
            ? 'figma-baked'
            : 'upright'
        }
        imageAlt={photos.scallop.alt}
        imageSrc={photos.scallop.src}
        variant={variant}
      />

      <CaseStudyVenueStoryCopy
        body={data.body}
        heading={data.heading}
        headingId={headingId}
        variant={variant}
      />

      <div
        className="absolute z-20"
        style={{
          left: collageLayout.sygnetBadge.left,
          top: collageLayout.sygnetBadge.top,
        }}
      >
        <BrandSygnetBadge variant={variant} />
      </div>
    </div>
  )
}
