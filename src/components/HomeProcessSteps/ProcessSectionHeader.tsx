import type { HomeProcessStepsData } from './constants'

type ProcessSectionHeaderProps = {
  heading: HomeProcessStepsData['heading']
  intro: HomeProcessStepsData['intro']
}

/**
 * Header for the "Kroki do realizacji oferty" section.
 *
 * Layout per Figma:
 * - Desktop: left-aligned, max width ≈ 535 px.
 * - Tablet: centered, same max width.
 * - Mobile: left-aligned, full width.
 *
 * The H2 mixes italic and roman runs of "The Seasons" exactly like in the source —
 * uses the project-wide `oczki-heading-l` utility (declared in `globals.css`)
 * which already maps `font-family: var(--font-oczki-display)` and the right
 * OpenType features for italic runs.
 */
export const ProcessSectionHeader = ({ heading, intro }: ProcessSectionHeaderProps) => {
  return (
    <header className="flex w-full flex-col gap-[10px] text-left md:max-w-[535px] md:gap-4 md:text-center lg:items-start lg:text-left">
      <h2 className="oczki-heading-l text-[36px] leading-[1.04] text-[var(--oczki-primary-800)]">
        <em className="italic">{heading.italicOne}</em>
        {heading.plainOne}
        <em className="italic">{heading.italicTwo}</em>
        {heading.plainTwo}
      </h2>
      <div className="oczki-body-l flex flex-col gap-[6px] tracking-[-0.24px] text-[var(--oczki-primary-700)]">
        <p>{intro.paragraphOne}</p>
        <p>{intro.paragraphTwo}</p>
      </div>
    </header>
  )
}
