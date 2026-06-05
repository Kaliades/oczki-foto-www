import { Fragment } from 'react'

import { cn } from '@/utilities/ui'

import {
  PHILOSOPHY_MOBILE_HEADING_PHRASES,
  PHILOSOPHY_TABLET_DESKTOP_HEADING_PHRASES,
} from './constants'

type PhilosophyPrinciplesTitleProps = {
  emphasis: string
  headingId: string
  phrases: readonly string[]
  className?: string
}

function PhilosophyPrinciplesTitleRun({
  className,
  emphasis,
  headingId,
  phrases,
}: PhilosophyPrinciplesTitleProps) {
  return (
    <h2
      className={cn(
        "w-full text-center text-balance text-[32px] font-normal leading-[1.04] tracking-[-0.32px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1]",
        className,
      )}
      id={headingId}
    >
      {phrases.map((phrase) => (
        <Fragment key={phrase}>
          <span className="whitespace-nowrap">{phrase}</span>{' '}
        </Fragment>
      ))}
      <em className="whitespace-nowrap italic tracking-[-0.32px] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
        {emphasis.replace(' ', '\u00A0')}
      </em>
    </h2>
  )
}

type PhilosophyPrinciplesResponsiveTitleProps = {
  emphasis: string
  headingId: string
}

/**
 * Phrase-wrapped H2 on every breakpoint — same pattern as {@link AboutHeroMobileTitle}.
 *
 * Mobile (`7093:5711`) and tablet/desktop (`7001:2445`) use different phrase units
 * for Figma line boxes at 328 px vs 514 px.
 */
export function PhilosophyPrinciplesTitle({
  emphasis,
  headingId,
}: PhilosophyPrinciplesResponsiveTitleProps) {
  return (
    <>
      <PhilosophyPrinciplesTitleRun
        className="md:hidden"
        emphasis={emphasis}
        headingId={headingId}
        phrases={PHILOSOPHY_MOBILE_HEADING_PHRASES}
      />
      <PhilosophyPrinciplesTitleRun
        className="hidden md:block"
        emphasis={emphasis}
        headingId={headingId}
        phrases={PHILOSOPHY_TABLET_DESKTOP_HEADING_PHRASES}
      />
    </>
  )
}
