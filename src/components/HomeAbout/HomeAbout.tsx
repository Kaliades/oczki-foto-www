import { AboutContentCard } from './AboutContentCard'
import { AboutFloralBottomSection, AboutFloralDecor } from './AboutFloralDecor'
import { HOME_ABOUT_FIGMA_NODES, type HomeAboutData } from './constants'

type HomeAboutProps = {
  data: HomeAboutData
}

/**
 * "Hej, jestem Asia" — photographer bio section with portrait.
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - outer `<section>` — full-bleed cream (`primary/200`) background
 *   - inner `<div>` — 1366 cap, paddings, absolute floral decorations,
 *     white content card
 */
export const HomeAbout = ({ data }: HomeAboutProps) => {
  const { heading, paragraphs, portrait, cta } = data

  return (
    <section
      aria-labelledby="home-about-heading"
      className="relative w-full overflow-x-clip bg-[var(--oczki-primary-200)] [font-family:var(--font-oczki-body)] lg:overflow-y-visible"
      data-figma-node={HOME_ABOUT_FIGMA_NODES.desktopFrame}
    >
      <div className="relative isolate mx-auto w-full max-w-[1366px] overflow-x-clip px-4 py-16 md:px-20 md:py-24 lg:overflow-y-visible lg:px-24 lg:py-24">
        <AboutFloralDecor />
        <AboutFloralBottomSection />
        <AboutContentCard
          cta={cta}
          heading={heading}
          paragraphs={paragraphs}
          portrait={portrait}
        />
      </div>
    </section>
  )
}
