import { HeroBackground } from './HeroBackground'
import { HeroCopy } from './HeroCopy'
import { HeroScallopFrame } from './HeroScallopFrame'
import { HOME_HERO_FIGMA_NODES, type HomeHeroData } from './constants'

type HomeHeroProps = {
  data: HomeHeroData
}

/**
 * Home hero section.
 *
 * NOTE: Filename `Frame1000006620.tsx` is a Figma frame ID and is scheduled
 * for removal in Phase 2 of the CMS migration, when this becomes a Payload
 * `homeHero` block.
 */
export function Frame1000006620({ data }: HomeHeroProps) {
  const { title, description, primaryCta, secondaryCta, background, showScallop = true } = data

  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate flex min-h-[579px] overflow-hidden bg-[#e7e3df] text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-body)] md:min-h-[647px] lg:min-h-[640px]"
      data-figma-node={HOME_HERO_FIGMA_NODES.desktopFrame}
    >
      <HeroBackground src={background.src} alt={background.alt} />
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
    </section>
  )
}
