import { TestimonialSectionClient } from '@/components/TestimonialSection'

import {
  CASE_STUDY_TESTIMONIAL_FIGMA_NODES,
  caseStudyTestimonialDefaults,
  type CaseStudyTestimonialData,
} from './constants'

type CaseStudyTestimonialProps = {
  data: CaseStudyTestimonialData
}

/**
 * Case study “Opinie” — reuses {@link TestimonialSectionClient} with
 * case-study Figma nodes and the Justyna & Krzysiek polaroid photo.
 *
 * Page order (Figma y-coords): after `Galeria` photo grid, before footer.
 */
export function CaseStudyTestimonial({ data }: CaseStudyTestimonialProps) {
  return (
    <TestimonialSectionClient
      data={data}
      fallbackItems={caseStudyTestimonialDefaults.items}
      figmaNodes={CASE_STUDY_TESTIMONIAL_FIGMA_NODES}
      headingId="case-study-testimonial-heading"
    />
  )
}
