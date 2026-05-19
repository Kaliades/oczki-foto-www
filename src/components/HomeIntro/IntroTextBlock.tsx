import { InlineQuote } from './InlineQuote'

type IntroTextBlockProps = {
  headingStart: string
  headingEmphasis: string
  introLeadIn: string
  quoteText: string
  body: string
  headingId?: string
}

export function IntroTextBlock({
  headingStart,
  headingEmphasis,
  introLeadIn,
  quoteText,
  body,
  headingId = 'home-intro-heading',
}: IntroTextBlockProps) {
  return (
    <div className="flex w-full max-w-[328px] flex-col items-start gap-3 md:max-w-[514px] md:gap-5 lg:w-[514px]">
      <h2 className="oczki-heading-l w-full text-[var(--oczki-primary-800)]" id={headingId}>
        {headingStart} <em className="italic">{headingEmphasis}</em>
      </h2>

      <div className="flex w-full flex-col items-start gap-2.5 md:w-[466px]">
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)] md:w-[442px]">
          {introLeadIn}
        </p>
        <InlineQuote>{quoteText}</InlineQuote>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)] md:w-[442px]">{body}</p>
      </div>
    </div>
  )
}
