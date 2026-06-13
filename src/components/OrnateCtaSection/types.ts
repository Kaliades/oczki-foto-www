import type { SectionLink } from '@/utilities/resolveLinkHref'

export type OrnateCtaSplitHeading = {
  type: 'split'
  plain: string
  emphasis: string
}

export type OrnateCtaSingleHeading = {
  type: 'single'
  text: string
}

export type OrnateCtaHeading = OrnateCtaSplitHeading | OrnateCtaSingleHeading

export type OrnateCtaData = {
  heading: OrnateCtaHeading
  body: string
  cta: SectionLink
}

export type OrnateCtaFigmaNodes = {
  desktopFrame: string
  tabletFrame: string
  mobileFrame: string
}
