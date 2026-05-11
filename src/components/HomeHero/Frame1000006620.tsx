import { HeroBackground } from './HeroBackground'
import { HeroCopy } from './HeroCopy'
import { HeroScallopFrame } from './HeroScallopFrame'
import { HOME_HERO_FIGMA_NODES } from './constants'

export function Frame1000006620() {
  return (
    <section
      aria-labelledby="home-hero-heading"
      className="relative isolate flex min-h-[579px] overflow-hidden bg-[#e7e3df] text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-body)] md:min-h-[647px] lg:min-h-[640px]"
      data-figma-node={HOME_HERO_FIGMA_NODES.desktopFrame}
    >
      <HeroBackground />
      <HeroCopy />
      <HeroScallopFrame />
    </section>
  )
}
