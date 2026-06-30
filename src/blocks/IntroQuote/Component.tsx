import type { IntroQuoteBlock as IntroQuoteBlockProps } from '@/payload-types'

import { HomeIntroSection } from '@/components/HomeIntro/HomeIntroSection'
import { homeIntroDefaults, type HomeIntroData } from '@/components/HomeIntro/constants'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export const IntroQuoteBlock: React.FC<IntroQuoteBlockProps> = (props) => {
  const collageSrc = resolvePopulatedMediaUrl(props.collageImage) ?? ''

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
