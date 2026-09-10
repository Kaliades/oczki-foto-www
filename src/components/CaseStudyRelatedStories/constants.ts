/**
 * Case study — “Inne opowieści” related galleries strip.
 *
 * Figma references (desktop / tablet / mobile) — Copy-NNN:
 *   - desktop 1366: node `7356:12540`
 *   - tablet  768:  node `7356:13880`
 *   - mobile  360:  node `7356:15256`
 *
 * Page order: after closing CTA, before footer.
 */
export const CASE_STUDY_RELATED_STORIES_FIGMA_NODES = {
  desktop: '7356:12540',
  tablet: '7356:13880',
  mobile: '7356:15256',
  heading: {
    desktop: '7356:12541',
    tablet: '7356:13881',
    mobile: '7356:15257',
  },
} as const

/**
 * `typography/header/m` from Figma variable defs — 24 / 28 / 32 px.
 * `get_design_context` incorrectly emits 32 px on all breakpoints.
 */
export const CASE_STUDY_RELATED_STORIES_HEADING_SIZE_CLASSNAME =
  'text-[24px] tracking-[-0.24px] md:text-[28px] md:tracking-[-0.28px] lg:text-[32px] lg:tracking-[-0.32px]' as const

/** Figma-exported crops — identical across breakpoints inside each `Image` frame. */
const RELATED_STORY_CROP_LEFT =
  'absolute left-[-71.38%] top-[-24.75%] h-[124.68%] w-[232.31%] max-w-none' as const
const RELATED_STORY_CROP_CENTER =
  'absolute left-[-74.61%] top-0 h-full w-[186.32%] max-w-none' as const
const RELATED_STORY_CROP_RIGHT =
  'absolute left-[-93.75%] top-[-34.43%] h-[134.43%] w-[250.47%] max-w-none' as const

const RELATED_STORY_IMAGE = (index: 1 | 2 | 3) =>
  `/figma/case-study-related-stories-${index}.png` as const

export type CaseStudyRelatedStoriesData = {
  heading: {
    start: string
    emphasis: string
  }
  items: readonly {
    id: string
    imageAlt: string
    imageSrc: string
    cropClassName?: string
    href?: string
    figmaNodes?: {
      desktop?: string
      tablet?: string
      mobile?: string
    }
  }[]
}

export const caseStudyRelatedStoriesDefaults: CaseStudyRelatedStoriesData = {
  heading: {
    start: 'Każda miłość ma inny rytm. Odkryj ',
    emphasis: 'pozostałe opowieści',
  },
  items: [
    {
      id: 'related-1',
      imageAlt: 'Para młoda na drewnianym pomoście nad jeziorem o zachodzie słońca',
      imageSrc: RELATED_STORY_IMAGE(1),
      cropClassName: RELATED_STORY_CROP_LEFT,
      figmaNodes: {
        desktop: '6974:19246',
        tablet: '7102:13174',
        mobile: '7102:17055',
      },
    },
    {
      id: 'related-2',
      imageAlt: 'Para młoda w parku nad stawem w jesiennej scenerii',
      imageSrc: RELATED_STORY_IMAGE(2),
      cropClassName: RELATED_STORY_CROP_CENTER,
      figmaNodes: {
        desktop: '6974:19247',
        tablet: '7102:13175',
        mobile: '7102:17056',
      },
    },
    {
      id: 'related-3',
      imageAlt: 'Para młoda całująca się przed białym pałacykiem',
      imageSrc: RELATED_STORY_IMAGE(3),
      cropClassName: RELATED_STORY_CROP_RIGHT,
      figmaNodes: {
        desktop: '6974:19248',
        tablet: '7102:13176',
        mobile: '7102:17057',
      },
    },
  ],
}
