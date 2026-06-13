export const CASE_STUDY_DETAILS_FIGMA_NODES = {
  desktop: '6952:17204',
  tablet: '7102:12455',
  mobile: '7102:16325',
  titleContainer: {
    desktop: '6952:17206',
    tablet: '7102:12456',
    mobile: '7102:16326',
  },
  sectionContainer: {
    desktop: '6972:18977',
    tablet: '7102:12458',
    mobile: '7102:16328',
  },
} as const

export type CaseStudyDetailItem = {
  title: string
  description: string
  figmaNodes?: {
    desktop?: string
    tablet?: string
    mobile?: string
  }
}

export type CaseStudyDetailsHeading = {
  start: string
  emphasis: string
}

export type CaseStudyDetailsData = {
  heading: CaseStudyDetailsHeading
  items: readonly CaseStudyDetailItem[]
}
