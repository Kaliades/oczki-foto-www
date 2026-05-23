import { AboutCtaLink } from './AboutCtaLink'
import { AboutFloralBottomDesktop } from './AboutFloralDecor'
import { AboutFlowerIcons } from './AboutFlowerIcons'
import type { HomeAboutData } from './constants'

type AboutTextColumnProps = Pick<HomeAboutData, 'heading' | 'paragraphs' | 'cta'> & {
  headingId?: string
}

export const AboutTextColumn = ({
  heading,
  paragraphs,
  cta,
  headingId = 'home-about-heading',
}: AboutTextColumnProps) => {
  return (
    <div className="relative flex w-full flex-col items-start gap-4 overflow-visible px-2 pb-4 pt-2 md:items-center md:gap-8 md:px-12 md:pb-8 md:pt-9 lg:w-[653px] lg:shrink-0 lg:items-center lg:gap-8 lg:px-20 lg:pb-8 lg:pt-12">
      <AboutFloralBottomDesktop />

      <div className="relative z-[2] flex w-full flex-col items-start gap-5 md:items-center md:gap-7 lg:max-w-[493px]">
        <AboutFlowerIcons />

        <div className="flex w-full flex-col items-start gap-2.5 text-left md:items-center md:gap-4 md:text-center">
          <h2
            className="w-full text-[32px] font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1]"
            id={headingId}
          >
            {heading.start}{' '}
            <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
              {heading.emphasis}
            </em>
            {heading.end}
          </h2>

          <div className="flex w-full flex-col gap-1.5 md:px-7">
            {paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="oczki-body-l text-[var(--oczki-primary-700)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      <AboutCtaLink cta={cta} />
    </div>
  )
}
