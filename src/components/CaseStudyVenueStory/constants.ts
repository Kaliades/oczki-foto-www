export const CASE_STUDY_VENUE_STORY_FIGMA_NODES = {
  desktop: '6986:20005',
  tablet: '7102:12727',
  mobile: '7102:16653',
  heroSection: {
    desktop: '6952:17246',
    tablet: '7102:12728',
    mobile: '7102:16654',
  },
  copy: {
    desktop: '6952:17250',
    tablet: '7102:12740',
    mobile: '7102:16666',
  },
  body: {
    desktop: '6952:17252',
    tablet: '7102:12742',
    mobile: '7102:16668',
  },
} as const

export type CaseStudyVenueStoryHeading = {
  emphasis: string
  start: string
}

export type CaseStudyVenueStoryPhotoSet = {
  back: { src: string; alt: string }
  front: { src: string; alt: string }
  scallop: { src: string; alt: string }
}

export type CaseStudyVenueStoryData = {
  heading: CaseStudyVenueStoryHeading
  body: string
  photos: {
    desktop: CaseStudyVenueStoryPhotoSet
    tablet: CaseStudyVenueStoryPhotoSet
    mobile: CaseStudyVenueStoryPhotoSet
  }
}

/** Copy block offsets inside `Herosection` — Figma metadata. */
export const CASE_STUDY_VENUE_STORY_COPY_LAYOUT = {
  desktop: {
    left: 32,
    top: 36,
    width: 695,
    paddingLeft: 180,
    gap: 16,
    bodyPaddingRight: 32,
  },
  tablet: {
    left: 119,
    top: 471.5,
    width: 530,
    paddingLeft: 0,
    gap: 16,
    bodyPaddingRight: 32,
  },
  mobile: {
    left: 16,
    top: 303,
    width: 328,
    paddingLeft: 0,
    gap: 10,
    bodyPaddingRight: 0,
  },
} as const
