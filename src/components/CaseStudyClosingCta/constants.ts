import type { CenteredMessageStackHeading } from '@/components/CenteredMessageStack'
import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Case study closing thank-you CTA — Figma `Card Container`.
 *
 * Figma references (desktop / tablet / mobile):
 *   - desktop 1366: https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=6952-17279
 *   - tablet  768:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-12884
 *   - mobile  360:  https://www.figma.com/design/uukPuuZgLMm4kTbXUJFdLI/?node-id=7102-16765
 *
 * Page order (Figma y-coords): after `To, co zapamiętamy najbardziej`, before footer.
 */
export const CASE_STUDY_CLOSING_CTA_FIGMA_NODES = {
  desktop: '6952:17279',
  tablet: '7102:12884',
  mobile: '7102:16765',
  button: {
    desktop: '7063:14401',
    tablet: '7102:13029',
    mobile: '7102:16910',
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
    start: 'Justyno, Krzysiu – ',
    emphasis: 'dziękujemy',
    end: ', że mogliśmy być Waszymi „oczami” w tym dniu. Wasz luz i zaufanie do nas sprawiły, że te zdjęcia po prostu „dzieją się” same.',
  },
  body: 'Podoba Wam się ten klimat? Marzycie o reportażu, który nie będzie sztuczny, ale pełen Waszych prawdziwych emocji?',
  cta: {
    type: 'custom',
    url: '/kontakt',
    label: 'Opowiedz też naszą historię',
    newTab: false,
  },
}
