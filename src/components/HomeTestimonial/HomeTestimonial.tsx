import { TestimonialSectionClient } from '@/components/TestimonialSection'

import type { HomeTestimonialData } from './constants'
import { HOME_TESTIMONIAL_FIGMA_NODES, homeTestimonialDefaults } from './constants'

type HomeTestimonialProps = {
  data: HomeTestimonialData
}

/**
 * "Opinie" — testimonials section (server entry → client carousel).
 *
 * @see TestimonialSectionClient for layout notes and Figma node references.
 */
export const HomeTestimonial = ({ data }: HomeTestimonialProps) => {
  return (
    <TestimonialSectionClient
      data={data}
      fallbackItems={homeTestimonialDefaults.items}
      figmaNodes={HOME_TESTIMONIAL_FIGMA_NODES}
      headingId="home-testimonial-heading"
    />
  )
}
