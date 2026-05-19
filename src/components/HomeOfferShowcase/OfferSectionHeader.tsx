import { homeOfferCopy } from './constants'

export function OfferSectionHeader() {
  return (
    <header className="flex w-full justify-center">
      <div className="flex w-full max-w-[328px] flex-col items-center gap-2.5 text-center md:max-w-[560px] md:gap-4">
        <h2 className="oczki-heading-l text-[var(--oczki-primary-800)]" id="home-offer-heading">
          {homeOfferCopy.headingStart} <em className="italic">{homeOfferCopy.headingEmphasis}</em>
          {homeOfferCopy.headingEnd}
        </h2>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-900)] md:w-[535px]">
          {homeOfferCopy.subtitle}
        </p>
      </div>
    </header>
  )
}
