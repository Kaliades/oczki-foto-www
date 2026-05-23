import type { HomeTestimonialData } from './constants'
import { HomeTestimonialClient } from './HomeTestimonialClient'

type HomeTestimonialProps = {
  data: HomeTestimonialData
}

/**
 * "Opinie" — testimonials section (server entry → client carousel).
 *
 * @see HomeTestimonialClient for layout notes and Figma node references.
 */
export const HomeTestimonial = ({ data }: HomeTestimonialProps) => {
  return <HomeTestimonialClient data={data} />
}
