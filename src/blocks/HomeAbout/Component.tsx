import type { HomeAboutBlock as HomeAboutBlockProps } from '@/payload-types'

import { HomeAbout } from '@/components/HomeAbout/HomeAbout'
import { homeAboutDefaults, type HomeAboutData } from '@/components/HomeAbout/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'

function mediaUrl(image: HomeAboutBlockProps['portrait'] | undefined | null): string | null {
  if (!image || typeof image === 'number') return null
  return image.url ?? null
}

function resolveLink(cta: HomeAboutBlockProps['cta'] | undefined): SectionLink {
  const d = homeAboutDefaults.cta
  if (!cta) return d
  return {
    type: cta.type ?? d.type,
    url: cta.url ?? d.url,
    label: cta.label ?? d.label,
    newTab: cta.newTab ?? d.newTab,
    reference: (cta.reference as SectionLink['reference']) ?? null,
  }
}

export const HomeAboutBlock: React.FC<HomeAboutBlockProps> = (props) => {
  const portraitSrc = mediaUrl(props.portrait) ?? homeAboutDefaults.portrait.src

  const data: HomeAboutData = {
    heading: {
      start: props.heading?.start ?? homeAboutDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeAboutDefaults.heading.emphasis,
      end: props.heading?.end ?? homeAboutDefaults.heading.end,
    },
    paragraphs: [
      props.paragraphOne ?? homeAboutDefaults.paragraphs[0],
      props.paragraphTwo ?? homeAboutDefaults.paragraphs[1],
    ],
    portrait: {
      src: portraitSrc,
      alt: props.portraitAlt ?? homeAboutDefaults.portrait.alt,
    },
    cta: resolveLink(props.cta),
  }

  return <HomeAbout data={data} />
}
