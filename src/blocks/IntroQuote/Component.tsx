import type { IntroQuoteBlock as IntroQuoteBlockProps } from '@/payload-types'

import { HomeIntroSection } from '@/components/HomeIntro/HomeIntroSection'
import { homeIntroDefaults, type HomeIntroData } from '@/components/HomeIntro/constants'

export const IntroQuoteBlock: React.FC<IntroQuoteBlockProps> = (props) => {
  const collageImage = props.collageImage
  const collageSrc =
    collageImage && typeof collageImage === 'object' && 'url' in collageImage && collageImage.url
      ? collageImage.url
      : homeIntroDefaults.collageImage.src

  const data: HomeIntroData = {
    heading: {
      start: props.heading?.start ?? homeIntroDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeIntroDefaults.heading.emphasis,
    },
    introLeadIn: props.introLeadIn ?? homeIntroDefaults.introLeadIn,
    quoteText: props.quoteText ?? homeIntroDefaults.quoteText,
    body: props.body ?? homeIntroDefaults.body,
    collageImage: {
      src: collageSrc,
      alt: props.collageImageAlt ?? homeIntroDefaults.collageImage.alt,
    },
    handwrittenQuote: props.handwrittenQuote ?? homeIntroDefaults.handwrittenQuote,
  }

  return <HomeIntroSection data={data} />
}
