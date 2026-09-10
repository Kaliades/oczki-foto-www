import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

export const CASE_STUDY_HERO_FIGMA_NODES = {
  desktop: '7394:10325',
  tablet: '7394:12196',
  mobile: '7394:12805',
  background: {
    desktop: '7394:10326',
    tablet: '7394:12197',
    mobile: '7394:12806',
  },
  breadcrumbs: {
    desktop: '7394:10329',
    tablet: '7394:12200',
    mobile: '7394:12809',
  },
  mainContainer: {
    desktop: '7394:10340',
    tablet: '7394:12211',
    mobile: '7394:12820',
  },
} as const

/** Section shell metrics from Figma `Frame 1000006621` metadata. */
export const CASE_STUDY_HERO_LAYOUT = {
  frameMinHeight: { mobile: 623, tablet: 631, desktop: 631 },
  breadcrumbRowHeight: { mobile: 44, tablet: 52, desktop: 52 },
  breadcrumbInsetY: { mobile: 0, tablet: 4, desktop: 4 },
  mainMinHeight: 579,
  sectionPaddingX: { mobile: 16, tablet: 80, desktop: 32 },
} as const

export const STORY_INTRO_COPY_FIGMA_NODES = {
  desktop: '7394:10926',
  tablet: '7394:12797',
  mobile: '7394:13442',
} as const

export type CaseStudyHeroHeading = {
  lead: string
  emphasis: string
  end: string
}

/** CMS + UI guardrails — keep the scalloped card inside the hero shell. */
export const CASE_STUDY_HERO_HEADING_MAX_LENGTH = {
  lead: 120,
  emphasis: 60,
  end: 8,
} as const

export type CaseStudyHeroData = {
  background: {
    alt: string
    src: string
  }
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  heading: CaseStudyHeroHeading
  title: string
}

export const caseStudyHeroDefaults: CaseStudyHeroData = {
  title: 'Ślub Justyny i Krzysia',
  background: {
    alt: 'Para młoda tańcząca na parkiecie weselnym',
    src: '/figma/case-study-hero-bg.png',
  },
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'Galeria', href: '/galeria' },
    { label: 'Ślub Justyny i Krzysia' },
  ],
  heading: {
    lead: 'Gorący czerwiec, chłodne mury kościoła w Wieprzu i wesele pełne luzu. Poznajcie historię ',
    emphasis: 'Justyny i Krzysia',
    end: '.',
  },
}

export const CASE_STUDY_HERO_BACKGROUND = {
  src: '/figma/case-study-hero-bg.png',
} as const
