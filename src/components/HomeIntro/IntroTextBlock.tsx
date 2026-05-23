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
      {/* H2 size matches Figma `header/l`: mobile 28 / tablet 32 / desktop 36.
          Earlier the code used `oczki-heading-l` (fixed 36) across all
          breakpoints; inlined here to avoid touching the global utility. */}
      <h2
        className="w-full text-[28px] font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:text-[32px] lg:text-[36px]"
        id={headingId}
      >
        {headingStart}{' '}
        <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
          {headingEmphasis}
        </em>
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
