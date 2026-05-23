import { HeroBackground } from './HeroBackground'
import { HeroCopy } from './HeroCopy'
import { HeroScallopFrame } from './HeroScallopFrame'
import { HOME_HERO_FIGMA_NODES, type HomeHeroData } from './constants'

type HomeHeroProps = {
  data: HomeHeroData
}

export function HomeHero({ data }: HomeHeroProps) {
  const { title, description, primaryCta, secondaryCta, background, showScallop = true } = data

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate w-full min-h-[579px] overflow-hidden bg-[#e7e3df] text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-body)] md:min-h-[647px] lg:min-h-[640px]"
      data-figma-node={HOME_HERO_FIGMA_NODES.desktopFrame}
    >
      <HeroBackground src={background.src} alt={background.alt} />
      <div className="relative mx-auto w-full max-w-[1366px]">
        <HeroCopy
          titleLineOne={title.lineOne}
          titleLineTwoItalic={title.lineTwoItalic}
          titleLineTwoRest={title.lineTwoRest}
          titleLineThree={title.lineThree}
          description={description}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
        />
        {showScallop ? <HeroScallopFrame /> : null}
      </div>
    </section>
  )
}
