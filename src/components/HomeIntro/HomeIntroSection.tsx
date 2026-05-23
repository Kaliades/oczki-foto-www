import { IntroImageCollage } from './IntroImageCollage'
import { IntroTextBlock } from './IntroTextBlock'
import { HOME_INTRO_FIGMA_NODES, type HomeIntroData } from './constants'

type HomeIntroSectionProps = {
  data: HomeIntroData
}

export function HomeIntroSection({ data }: HomeIntroSectionProps) {
  const { heading, introLeadIn, quoteText, body, collageImage, handwrittenQuote } = data

  return (
    <section
      aria-labelledby="home-intro-heading"
      className="relative w-full overflow-hidden bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_INTRO_FIGMA_NODES.desktopContainer}
    >
      <div className="relative mx-auto flex min-h-[880px] w-full max-w-[1366px] flex-col items-center gap-3 px-4 pb-16 pt-9 md:min-h-[970px] md:gap-7 md:px-20 md:pb-24 md:pt-20 lg:min-h-[604px] lg:flex-row lg:justify-between lg:gap-0 lg:px-28 lg:pb-[137px] lg:pt-[121px]">
        <IntroTextBlock
          headingStart={heading.start}
          headingEmphasis={heading.emphasis}
          introLeadIn={introLeadIn}
          quoteText={quoteText}
          body={body}
        />
        <IntroImageCollage
          imageSrc={collageImage.src}
          imageAlt={collageImage.alt}
          handwrittenQuote={handwrittenQuote}
        />
      </div>
    </section>
  )
}
