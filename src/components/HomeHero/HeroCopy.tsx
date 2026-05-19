import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type HeroCopyProps = {
  titleLineOne: string
  titleLineTwoItalic: string
  titleLineTwoRest: string
  titleLineThree: string
  description: string
  primaryCta: SectionLink
  secondaryCta: SectionLink
}

export function HeroCopy({
  titleLineOne,
  titleLineTwoItalic,
  titleLineTwoRest,
  titleLineThree,
  description,
  primaryCta,
  secondaryCta,
}: HeroCopyProps) {
  const primaryHref = resolveLinkHref(primaryCta)
  const secondaryHref = resolveLinkHref(secondaryCta)

  return (
    <div className="relative z-10 mx-auto flex min-h-[579px] w-full max-w-[1366px] flex-col items-center justify-between px-4 pb-20 pt-[76px] text-left md:min-h-[647px] md:px-20 md:pb-[180px] md:pt-[132px] md:text-center lg:min-h-[640px] lg:px-[396px] lg:pb-32">
      <div className="flex w-full max-w-[574px] flex-col items-start gap-2 md:items-center md:gap-3">
        <h1
          className="w-full max-w-[574px] text-[44px] font-light leading-[1.02] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)]"
          id="home-hero-heading"
        >
          {titleLineOne} <em className="italic tracking-[-0.01em]">{titleLineTwoItalic}</em>{' '}
          {titleLineTwoRest} <em className="italic tracking-[-0.01em]">{titleLineThree}</em>
        </h1>
        <p className="oczki-body-l w-full max-w-[486px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>

      <div className="flex w-full max-w-[328px] flex-col items-stretch justify-center md:max-w-none md:flex-row md:items-start md:gap-5">
        {primaryHref && primaryCta.label ? (
          <OczkiButton className="w-full md:w-auto" href={primaryHref}>
            {primaryCta.label}
          </OczkiButton>
        ) : null}
        {secondaryHref && secondaryCta.label ? (
          <OczkiButton className="w-full md:w-auto" href={secondaryHref} variant="secondary">
            {secondaryCta.label}
          </OczkiButton>
        ) : null}
      </div>
    </div>
  )
}
