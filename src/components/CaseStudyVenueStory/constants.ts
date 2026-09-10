export const CASE_STUDY_VENUE_STORY_FIGMA_NODES = {
  desktop: '7356:12141',
  tablet: '7356:13481',
  mobile: '7356:14857',
  heroSection: {
    desktop: '7356:12142',
    tablet: '7356:13482',
    mobile: '7356:14858',
  },
  copy: {
    desktop: '7356:12154',
    tablet: '7356:13491',
    mobile: '7356:14859',
  },
  body: {
    desktop: '7356:12157',
    tablet: '7356:13494',
    mobile: '7356:14862',
  },
} as const

/**
 * CMS maxLength — matches the truncated Instagram-style reference sample
 * (“To było jedno z tych spotkań… jak to się”, 365 UTF-16 units / Payload count).
 * Display still uses line-clamp (D/T 6, M 9) so ellipsis sits at end of last full line.
 */
export const CASE_STUDY_VENUE_STORY_BODY_MAX_LENGTH = 365 as const

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

/** Copy block offsets inside `Herosection` — Figma metadata `7356:12154` / `13491` / `14859`. */
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

/** Outer section shell padding — Figma `Container` around `Herosection`. */
export const CASE_STUDY_VENUE_STORY_SECTION_PADDING = {
  mobile: { paddingTop: 48 },
  tablet: { paddingTop: 64 },
  desktop: { paddingTop: 80, paddingBottom: 48 },
} as const
