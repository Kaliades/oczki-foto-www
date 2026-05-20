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
 * The H2 mixes italic and roman runs of "The Seasons" exactly like in the source.
 */
export const ProcessSectionHeader = ({ heading, intro }: ProcessSectionHeaderProps) => {
  return (
    <header className="flex w-full flex-col gap-[10px] text-left md:max-w-[535px] md:gap-4 md:text-center lg:items-start lg:text-left">
      <h2
        className="font-oczki-display text-[clamp(28px,5.4vw,36px)] leading-[1.04] tracking-[-0.36px] text-[var(--oczki-primary-800)]"
        style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
      >
        <em
          className="italic"
          style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
        >
          {heading.italicOne}
        </em>
        {heading.plainOne}
        <em
          className="italic"
          style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
        >
          {heading.italicTwo}
        </em>
        {heading.plainTwo}
      </h2>
      <div className="flex flex-col gap-[6px] text-[16px] leading-[1.48] tracking-[-0.24px] text-[var(--oczki-primary-700)]">
        <p>{intro.paragraphOne}</p>
        <p>{intro.paragraphTwo}</p>
      </div>
    </header>
  )
}
