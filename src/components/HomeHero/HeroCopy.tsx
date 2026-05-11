import { OczkiButton } from '@/components/OczkiButton'

import { homeHeroCopy } from './constants'

export function HeroCopy() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[579px] w-full max-w-[1366px] flex-col items-center justify-between px-4 pb-20 pt-[76px] text-left md:min-h-[647px] md:px-20 md:pb-[180px] md:pt-[132px] md:text-center lg:min-h-[640px] lg:px-[396px] lg:pb-32">
      <div className="flex w-full max-w-[574px] flex-col items-start gap-2 md:items-center md:gap-3">
        <h1
          className="w-full max-w-[574px] text-[44px] font-light leading-[1.02] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)]"
          id="home-hero-heading"
        >
          {homeHeroCopy.titleLineOne}{' '}
          <em className="italic tracking-[-0.01em]">{homeHeroCopy.titleLineTwoItalic}</em>{' '}
          {homeHeroCopy.titleLineTwoRest}{' '}
          <em className="italic tracking-[-0.01em]">{homeHeroCopy.titleLineThree}</em>
        </h1>
        <p className="oczki-body-l w-full max-w-[486px] text-[var(--oczki-primary-700)]">
          {homeHeroCopy.description}
        </p>
      </div>

      <div className="flex w-full max-w-[328px] flex-col items-stretch justify-center md:max-w-none md:flex-row md:items-start md:gap-5">
        <OczkiButton className="w-full md:w-auto" href={homeHeroCopy.primaryCta.href}>
          {homeHeroCopy.primaryCta.label}
        </OczkiButton>
        <OczkiButton
          className="w-full md:w-auto"
          href={homeHeroCopy.secondaryCta.href}
          variant="secondary"
        >
          {homeHeroCopy.secondaryCta.label}
        </OczkiButton>
      </div>
    </div>
  )
}
