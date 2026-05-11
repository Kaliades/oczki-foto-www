import { InlineQuote } from './InlineQuote'
import { homeIntroCopy } from './constants'

export function IntroTextBlock() {
  return (
    <div className="flex w-full max-w-[328px] flex-col items-start gap-3 md:max-w-[514px] md:gap-5 lg:w-[514px]">
      <h2 className="oczki-heading-l w-full text-[var(--oczki-primary-800)]" id="home-intro-heading">
        {homeIntroCopy.headingStart}{' '}
        <em className="italic">{homeIntroCopy.headingEmphasis}</em>
      </h2>

      <div className="flex w-full flex-col items-start gap-2.5 md:w-[466px]">
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)] md:w-[442px]">
          {homeIntroCopy.intro}
        </p>
        <InlineQuote>{homeIntroCopy.quote}</InlineQuote>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)] md:w-[442px]">
          {homeIntroCopy.body}
        </p>
      </div>
    </div>
  )
}
