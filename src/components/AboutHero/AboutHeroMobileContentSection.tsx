import { ScallopedBrandBadge } from '@/components/ScallopedBrandBadge'

import { AboutHeroBotanicalDecor } from './AboutHeroBotanicalDecor'
import { AboutHeroMainContent } from './AboutHeroMainContent'
import { AboutHeroPortrait } from './AboutHeroPortrait'
import {
  ABOUT_HERO_FIGMA_NODES,
  ABOUT_HERO_LAYOUT,
  ABOUT_HERO_SHELL,
  type AboutHeroData,
} from './constants'

type AboutHeroMobileContentSectionProps = Pick<
  AboutHeroData,
  'cta' | 'description' | 'heading' | 'portrait' | 'secondaryPhoto'
> & {
  headingId: string
}

/**
 * Mobile collage — Figma `7093:5569` (360×640).
 *
 * Flat canvas: portrait/badge bleed to edges; copy + CTA + secondary photo flow
 * from y=196 with Figma gaps (24 px / 42 px at 360 reference).
 */
export function AboutHeroMobileContentSection({
  cta,
  description,
  heading,
  headingId,
  portrait,
  secondaryPhoto,
}: AboutHeroMobileContentSectionProps) {
  const layout = ABOUT_HERO_LAYOUT.mobile

  return (
    <div
      className="relative w-full overflow-visible"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.contentSection.mobile}
      data-name="Content Section"
      style={{ minHeight: ABOUT_HERO_SHELL.contentHeight.mobile }}
    >
      <AboutHeroBotanicalDecor box={layout.botanical} variant="mobile" />
      <AboutHeroPortrait alt={portrait.alt} box={layout.portrait} src={portrait.src} variant="mobile" />
      <ScallopedBrandBadge
        figmaNode={ABOUT_HERO_FIGMA_NODES.scallopedBadge.mobile}
        left={layout.scallopedBadge.left}
        size={layout.scallopedBadge.size}
        top={layout.scallopedBadge.top}
      />
      <AboutHeroMainContent
        buttonGap={layout.mainContent.buttonGap}
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
        introductionGap={layout.introductionGap}
        layout={layout.mainContent}
        secondaryPhoto={{
          alt: secondaryPhoto.alt,
          box: layout.secondaryPhoto,
          src: secondaryPhoto.src,
        }}
        secondaryPhotoGap={layout.secondaryPhotoGap}
        variant="mobile"
      />
    </div>
  )
}
