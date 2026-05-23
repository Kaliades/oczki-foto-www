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

  // mobile gutter `px-6` (24 px) is a deliberate deviation from Figma's 16 px:
  // on real devices the 16 px gutter felt too tight (per owner feedback);
  // 24 px is the standard Material/iOS mobile content gutter. Tablet
  // (md:px-20 = 80) and desktop (lg:px-[396px]) remain 1:1 with Figma.
  //
  // Vertical text→buttons gap is enforced via `gap-*` (not relying on
  // justify-between alone) because our display-font fallback wraps the
  // heading taller than Figma's source font, which would otherwise consume
  // all the free space. Values are 1:1 with Figma (mobile 75 / tablet 85 /
  // desktop 113 px between Text Container and Buttons Container).
  return (
    <div className="relative z-10 flex min-h-[579px] w-full flex-col items-center justify-between gap-[75px] px-6 pb-20 pt-[76px] text-left md:min-h-[647px] md:gap-[85px] md:px-20 md:pb-[180px] md:pt-[132px] md:text-center lg:min-h-[640px] lg:gap-[113px] lg:px-[396px] lg:pb-32">
      <div className="flex w-full max-w-[574px] flex-col items-start gap-2 md:items-center md:gap-3">
        {/* H1 size matches Figma `header/xl`: mobile 32 / tablet 36 / desktop 44.
            Earlier the code used a single fixed 44 px across all breakpoints. */}
        <h1
          className="w-full max-w-[574px] text-[32px] font-light leading-[1.02] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] md:text-[36px] lg:text-[44px]"
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
