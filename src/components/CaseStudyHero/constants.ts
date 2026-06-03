import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

export const CASE_STUDY_HERO_FIGMA_NODES = {
  desktop: '6972:17250',
  tablet: '7102:11851',
  mobile: '7102:15721',
  background: {
    desktop: '6972:17251',
    tablet: '7102:11852',
    mobile: '7102:15722',
  },
  breadcrumbs: {
    desktop: '6972:18555',
    tablet: '7102:11855',
    mobile: '7102:15725',
  },
  mainContainer: {
    desktop: '6972:17820',
    tablet: '7102:11866',
    mobile: '7102:15736',
  },
} as const

/** Section shell metrics from Figma `Frame 1000006620` metadata. */
export const CASE_STUDY_HERO_LAYOUT = {
  frameMinHeight: { mobile: 623, tablet: 631, desktop: 631 },
  breadcrumbRowHeight: { mobile: 44, tablet: 52, desktop: 52 },
  breadcrumbInsetY: { mobile: 0, tablet: 4, desktop: 4 },
  mainMinHeight: 579,
  /** `Group 62` offset inside `Main Container`. */
  storyPanelOffsetTop: { mobile: 22, tablet: 32, desktop: 31 },
  storyPanelOffsetLeft: { mobile: 3, tablet: 80, desktop: 32 },
  sectionPaddingX: { mobile: 16, tablet: 80, desktop: 32 },
} as const

export const STORY_INTRO_COPY_FIGMA_NODES = {
  desktop: '6972:17845',
  tablet: '7102:12451',
  mobile: '7130:9648',
} as const

export type CaseStudyHeroHeading = {
  lead: string
  emphasis: string
  end: string
}

export type CaseStudyHeroData = {
  background: {
    alt: string
    src: string
  }
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  description: string
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
  description:
    'To był jeden z tych czerwcowych dni, kiedy słońce nie brało jeńców, a termometry uparcie pokazywały ponad 30 stopni. Jednak u Justyny i Krzysia upał był tylko tłem dla emocji, które biły od nich od samego rana. Zapraszam Was do obejrzenia historii, która udowadnia, że najlepszy przepis na ślub to spokój i otaczanie się ludźmi, przy których można być w pełni sobą.',
}

export const CASE_STUDY_HERO_BACKGROUND = {
  src: '/figma/case-study-hero-bg.png',
} as const
