import { SERVICE_AREA_SECTION_FIGMA_NODES } from './constants'

type ServiceAreaSectionHeadingProps = {
  heading: string
  headingId: string
}

/**
 * Centred display heading — Figma `Header` (`6884:13696` / `7084:3618` / `7086:4549`).
 *
 * Typography: header/m — 32 px The Seasons, tracking −0.32 px, max 575 px on desktop.
 */
export function ServiceAreaSectionHeading({ heading, headingId }: ServiceAreaSectionHeadingProps) {
  return (
    <h2
      className="w-full max-w-[575px] text-center text-[32px] font-normal leading-[1.04] tracking-[-0.32px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] [word-break:break-word]"
      data-figma-node={SERVICE_AREA_SECTION_FIGMA_NODES.heading.desktop}
      data-figma-node-mobile={SERVICE_AREA_SECTION_FIGMA_NODES.heading.mobile}
      data-figma-node-tablet={SERVICE_AREA_SECTION_FIGMA_NODES.heading.tablet}
      id={headingId}
    >
      {heading}
    </h2>
  )
}
