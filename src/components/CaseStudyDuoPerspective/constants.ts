export const CASE_STUDY_DUO_PERSPECTIVE_FIGMA_NODES = {
  desktop: '6952:17230',
  tablet: '7102:12559',
  mobile: '7102:16485',
  sectionIntro: {
    desktop: '6952:17232',
    tablet: '7102:12710',
    mobile: '7102:16636',
  },
  introCopy: {
    desktop: '6952:17234',
    tablet: '7102:12711',
    mobile: '7102:16637',
  },
  highlights: {
    desktop: '6952:17239',
    tablet: '7102:12716',
    mobile: '7102:16642',
  },
} as const

export type CaseStudyDuoHighlight = {
  title: string
  description: string
  figmaNodes?: {
    desktop?: string
    tablet?: string
    mobile?: string
  }
}

export type CaseStudyDuoPerspectiveHeading = {
  start: string
  emphasis: string
}

export type CaseStudyDuoPerspectiveData = {
  heading: CaseStudyDuoPerspectiveHeading
  leadParagraph: string
  callout: string
  photo: {
    src: string
    alt: string
  }
  highlights: readonly CaseStudyDuoHighlight[]
}
