import type { CenteredMessageStackHeading } from '@/components/CenteredMessageStack'
import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Case study closing thank-you CTA — Figma `Card Container`.
 *
 * Figma references (desktop / tablet / mobile) — Copy-NNN:
 *   - desktop 1366: node `7356:12253`
 *   - tablet  768:  node `7356:13593`
 *   - mobile  360:  node `7356:14969`
 *
 * Page order: after photo gallery, before related stories.
 */
export const CASE_STUDY_CLOSING_CTA_FIGMA_NODES = {
  desktop: '7356:12253',
  tablet: '7356:13593',
  mobile: '7356:14969',
  button: {
    desktop: '7356:12398',
    tablet: '7356:13738',
    mobile: '7356:15255',
  },
} as const

/** Figma `Card Container` bbox height per reference breakpoint. */
export const CASE_STUDY_CLOSING_CTA_PANEL = {
  desktop: { height: 436, width: 1366 },
  tablet: { height: 420, width: 768 },
  mobile: { height: 472, width: 360 },
} as const

export type CaseStudyClosingCtaData = {
  body: string
  cta: SectionLink
  heading: CenteredMessageStackHeading
}

export const caseStudyClosingCtaDefaults: CaseStudyClosingCtaData = {
  heading: {
    start: 'Podoba Wam się ten ',
    emphasis: 'klimat',
    end: '?',
  },
  body: 'Marzycie o reportażu, który nie będzie sztuczny, ale pełen Waszych prawdziwych emocji?',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Opowiedz też naszą historię',
    newTab: false,
  },
}
