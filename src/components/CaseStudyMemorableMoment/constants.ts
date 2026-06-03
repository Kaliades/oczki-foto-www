/**
 * Case study — “To, co zapamiętamy najbardziej” closing reflection.
 *
 * Figma references (desktop / tablet / mobile):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=6986-20043
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-12811
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-16692
 *
 * Page order (Figma y-coords): after `Opinie` testimonial, before footer.
 *
 * All positions below are section-absolute (flattened from Figma metadata).
 * Figma exports nested `Image Container` / `Additional Image Container` children
 * with canvas coords — internal offsets were verified against parent bbox.
 */
export const CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES = {
  desktop: '6986:20043',
  tablet: '7102:12811',
  mobile: '7102:16692',
  heroSection: {
    desktop: '6986:20043',
    tablet: '7102:12811',
    mobile: '7102:16692',
  },
  heading: {
    desktop: '6989:25337',
    tablet: '7102:12812',
    mobile: '7102:16693',
  },
  portrait: {
    desktop: '6989:25548',
    tablet: '7102:12872',
    mobile: '7102:16753',
  },
  plaid: {
    desktop: '6989:25550',
    tablet: '7102:12816',
    mobile: '7102:16697',
  },
  landscape: {
    desktop: '6989:25665',
    tablet: '7102:12874',
    mobile: '7102:16755',
  },
  dots: {
    desktop: '6989:25675',
    tablet: '7102:12875',
    mobile: '7102:16756',
  },
} as const

export type CaseStudyMemorableMomentData = {
  body: string
  landscapePhoto: { alt: string; src: string }
  portraitPhoto: { alt: string; src: string }
  title: string
}

/** Figma mobile reference width — stage is capped and centred on wider phones. */
export const CASE_STUDY_MEMORABLE_MOMENT_MOBILE_WIDTH = 360

/** Figma tablet reference width — stage is capped and centred between md and lg. */
export const CASE_STUDY_MEMORABLE_MOMENT_TABLET_WIDTH = 768

/** Stage shell — Figma `Herosection` bbox per breakpoint. */
export const CASE_STUDY_MEMORABLE_MOMENT_STAGE = {
  desktop: { figmaNode: '6986:20043', height: 596 },
  tablet: {
    figmaNode: '7102:12811',
    height: 960,
    width: CASE_STUDY_MEMORABLE_MOMENT_TABLET_WIDTH,
  },
  mobile: {
    figmaNode: '7102:16692',
    height: 720,
    width: CASE_STUDY_MEMORABLE_MOMENT_MOBILE_WIDTH,
  },
} as const

export type CaseStudyMemorableMomentVariant = keyof typeof CASE_STUDY_MEMORABLE_MOMENT_STAGE

/**
 * Section-absolute layout inside `Herosection`.
 *
 * Dots (`Warstwa_1`) outer bbox anchors to `Additional Image Container` origin —
 * upper-left bleed per Figma `get_design_context`, NOT the nested metadata offset
 * (316, 215) inside the container.
 *
 * Landscape photo uses container-relative offsets flattened to section coords.
 */
export const CASE_STUDY_MEMORABLE_MOMENT_LAYOUT = {
  desktop: {
    dots: { left: -73.353515625, top: 41.50244140625 },
    heading: { left: 426, top: 181.5 },
    landscape: { height: 195, left: 13.646484375, top: 353.50244140625, width: 294 },
    plaid: { left: 1006, size: 'desktop' as const, top: 262 },
    portrait: { height: 274, left: 1066, top: 83, width: 220 },
  },
  tablet: {
    dots: { left: -100.353515625, top: 439.50244140625 },
    heading: { left: 127, top: 427.5 },
    landscape: { height: 195, left: -40.353515625, top: 710.00244140625, width: 294 },
    plaid: { left: 405, size: 'desktop' as const, top: 239 },
    portrait: { height: 274, left: 489, top: 60, width: 220 },
  },
  mobile: {
    dots: { left: -89.904296875, top: 389.10986328125 },
    heading: { left: 16, top: 254.5 },
    // Figma metadata −71.9 bleeds off the 360 canvas; inset 16 px avoids left clip on mobile.
    landscape: { height: 132, left: 16, top: 571, width: 199 },
    plaid: { left: 136, size: 'mobile' as const, top: 132 },
    portrait: { height: 177, left: 201, top: 17, width: 142 },
  },
} as const

export const caseStudyMemorableMomentDefaults: CaseStudyMemorableMomentData = {
  title: 'To, co zapamiętamy najbardziej',
  body: 'Był taki moment tuż po przysiędze, kiedy Justyna i Krzyś spojrzeli na siebie tak, jakby na świecie nie było nikogo innego. Żadnego pozowania, żadnej reżyserii – tylko czysta, autentyczna bliskość. To właśnie dla takich kadrów kochamy tę pracę',
  portraitPhoto: {
    alt: 'Para młoda w czarno-białym ujęciu tuż po przysiędze',
    src: '/figma/case-study-memorable-portrait.png',
  },
  landscapePhoto: {
    alt: 'Panna młoda z wiankiem kwiatów, pan młody w tle',
    src: '/figma/case-study-memorable-landscape.png',
  },
}
