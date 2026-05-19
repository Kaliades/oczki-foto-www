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
        <h2 className="oczki-heading-l text-[var(--oczki-primary-800)]" id={headingId}>
          {headingStart} <em className="italic">{headingEmphasis}</em>
          {headingEnd}
        </h2>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-900)] md:w-[535px]">
          {subtitle}
        </p>
      </div>
    </header>
  )
}
