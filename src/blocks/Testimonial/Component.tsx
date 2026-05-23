import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { HomeTestimonial } from '@/components/HomeTestimonial/HomeTestimonial'
import {
  homeTestimonialDefaults,
  type HomeTestimonialData,
  type TestimonialItem,
} from '@/components/HomeTestimonial/constants'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = (props) => {
  const fromCms: TestimonialItem[] = (props.items ?? []).map((item, index) => {
    const photo = item.photo
    const photoSrc =
      photo && typeof photo === 'object' && 'url' in photo && photo.url
        ? photo.url
        : (homeTestimonialDefaults.items[index]?.photoSrc ??
          homeTestimonialDefaults.items[0]!.photoSrc)

    return {
      quote: item.quote,
      author: item.author,
      photoSrc,
      photoAlt:
        item.photoAlt ??
        homeTestimonialDefaults.items[index]?.photoAlt ??
        homeTestimonialDefaults.items[0]!.photoAlt,
    }
  })

  const data: HomeTestimonialData = {
    heading: {
      start: props.heading?.start ?? homeTestimonialDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeTestimonialDefaults.heading.emphasis,
    },
    items: fromCms.length > 0 ? fromCms : homeTestimonialDefaults.items,
    showPolaroid: props.showPolaroid ?? homeTestimonialDefaults.showPolaroid,
  }

  return <HomeTestimonial data={data} />
}
