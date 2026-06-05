import { FloralSideCluster } from '@/components/FloralSideCluster/FloralSideCluster'

import { ABOUT_HERO_ASSETS, ABOUT_HERO_FIGMA_NODES, type AboutHeroLayoutVariant } from './constants'

type BotanicalBox = {
  height: number
  left: number
  top: number
  width: number
}

type AboutHeroBotanicalDecorProps = {
  box: BotanicalBox
  variant: AboutHeroLayoutVariant
}

/**
 * Right-side botanical line art — Figma `OBJECTS` (`7001:2533`).
 * Backmost layer in `Content Section` (under photos and copy).
 */
export function AboutHeroBotanicalDecor({ box, variant }: AboutHeroBotanicalDecorProps) {
  return (
    <FloralSideCluster
      figmaNode={ABOUT_HERO_FIGMA_NODES.botanical[variant]}
      height={box.height}
      left={box.left}
      src={ABOUT_HERO_ASSETS.botanical}
      top={box.top}
      width={box.width}
    />
  )
}
