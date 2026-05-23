type OfferSectionHeaderProps = {
  headingStart: string
  headingEmphasis: string
  headingEnd: string
  subtitle: string
  headingId?: string
}

export function OfferSectionHeader({
  headingStart,
  headingEmphasis,
  headingEnd,
  subtitle,
  headingId = 'home-offer-heading',
}: OfferSectionHeaderProps) {
  return (
    <header className="flex w-full justify-center">
      <div className="flex w-full max-w-[328px] flex-col items-center gap-2.5 text-center md:max-w-[560px] md:gap-4">
        {/* Heading: typography/header/l has different values per breakpoint
            in Figma (mobile 28 / tablet 32 / desktop 36). Inlined here instead
            of using `oczki-heading-l` (which is fixed 36px) until that utility
            is made responsive. */}
        <h2
          className="text-[28px] font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:text-[32px] lg:text-[36px]"
          id={headingId}
        >
          {headingStart}{' '}
          <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
            {headingEmphasis}
          </em>
          {headingEnd}
        </h2>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-900)] md:w-[535px]">
          {subtitle}
        </p>
      </div>
    </header>
  )
}
