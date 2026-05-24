import { AboutContentCard } from './AboutContentCard'
import { HOME_ABOUT_FIGMA_NODES, type HomeAboutData } from './constants'

export const HomeAbout = ({ data }: { data: HomeAboutData }) => {
  const { heading, paragraphs, portrait, cta } = data

  return (
    <section
      aria-labelledby="home-about-heading"
      className="relative w-full bg-[var(--oczki-primary-200)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_ABOUT_FIGMA_NODES.desktopFrame}
    >
      <div className="relative mx-auto w-full max-w-[1366px] px-4 py-16 md:px-20 md:py-24 lg:px-24 lg:py-24">
        <AboutContentCard cta={cta} heading={heading} paragraphs={paragraphs} portrait={portrait} />
      </div>
    </section>
  )
}
