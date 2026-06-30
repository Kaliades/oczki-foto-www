import type { TestimonialBlock as TestimonialBlockProps } from '@/payload-types'

import { HomeTestimonial } from '@/components/HomeTestimonial/HomeTestimonial'
import {
  homeTestimonialDefaults,
  type HomeTestimonialData,
  type TestimonialItem,
} from '@/components/HomeTestimonial/constants'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export const TestimonialBlock: React.FC<TestimonialBlockProps> = (props) => {
  const fromCms: TestimonialItem[] = (props.items ?? []).map((item, index) => ({
    quote: item.quote,
    author: item.author,
    photoSrc: resolvePopulatedMediaUrl(item.photo) ?? '',
    photoAlt:
      item.photoAlt ??
      homeTestimonialDefaults.items[index]?.photoAlt ??
      '',
  }))

  const data: HomeTestimonialData = {
    heading: {
      start: props.heading?.start ?? homeTestimonialDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeTestimonialDefaults.heading.emphasis,
    },
    items: fromCms,
    showPolaroid: props.showPolaroid ?? homeTestimonialDefaults.showPolaroid,
  }

  return <HomeTestimonial data={data} />
}
