import { IntroImageCollage } from './IntroImageCollage'
import { IntroTextBlock } from './IntroTextBlock'
import { HOME_INTRO_FIGMA_NODES } from './constants'

export function HomeIntroSection() {
  return (
    <section
      aria-labelledby="home-intro-heading"
      className="flex min-h-[880px] flex-col items-center gap-3 overflow-hidden bg-[var(--oczki-primary-100)] px-4 pb-16 pt-9 [font-family:var(--font-oczki-body)] md:min-h-[970px] md:gap-7 md:px-20 md:pb-24 md:pt-20 lg:min-h-[604px] lg:flex-row lg:justify-between lg:gap-0 lg:px-28"
      data-figma-node={HOME_INTRO_FIGMA_NODES.desktopContainer}
    >
      <IntroTextBlock />
      <IntroImageCollage />
    </section>
  )
}
