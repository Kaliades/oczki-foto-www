import { Fragment } from 'react'

import { ABOUT_HERO_MOBILE_HEADING_PHRASES } from './constants'

type AboutHeroMobileTitleProps = {
  emphasis: string
  headingId: string
}

/**
 * Mobile H1 — Figma `7093:5699`.
 *
 * Semantic phrase wrapping: 2 lines at 360 px reference; extra lines on narrower
 * viewports without orphan splits (31 px — Cormorant in 328 px; Figma 36 px / The Seasons).
 */
export function AboutHeroMobileTitle({ emphasis, headingId }: AboutHeroMobileTitleProps) {
  return (
    <h1
      className="w-full text-center text-balance text-[31px] font-normal leading-[1.04] tracking-[-0.72px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1]"
      id={headingId}
    >
      {ABOUT_HERO_MOBILE_HEADING_PHRASES.map((phrase) => (
        <Fragment key={phrase}>
          <span className="whitespace-nowrap">{phrase}</span>{' '}
        </Fragment>
      ))}
      <em className="whitespace-nowrap italic tracking-[-0.36px] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
        {emphasis.replace(' ', '\u00A0')}
      </em>
    </h1>
  )
}
