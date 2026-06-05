import { ScallopedBrandBadge } from '@/components/ScallopedBrandBadge'

import { AboutHeroBotanicalDecor } from './AboutHeroBotanicalDecor'
import { AboutHeroMainContent } from './AboutHeroMainContent'
import { AboutHeroPortrait } from './AboutHeroPortrait'
import { AboutHeroSecondaryPhoto } from './AboutHeroSecondaryPhoto'
import {
  ABOUT_HERO_FIGMA_NODES,
  ABOUT_HERO_LAYOUT,
  ABOUT_HERO_SHELL,
  type AboutHeroData,
  type AboutHeroLayoutVariant,
} from './constants'

type AboutHeroContentSectionProps = Pick<
  AboutHeroData,
  'cta' | 'description' | 'heading' | 'portrait' | 'secondaryPhoto'
> & {
  headingId: string
  variant: AboutHeroLayoutVariant
}

/**
 * Collage canvas — Figma `Content Section` (`7093:5569` / `7092:4208` / `6974:19429`).
 * Absolute positions come from `ABOUT_HERO_LAYOUT` metadata 1:1.
 */
export function AboutHeroContentSection({
  cta,
  description,
  heading,
  headingId,
  portrait,
  secondaryPhoto,
  variant,
}: AboutHeroContentSectionProps) {
  const layout = ABOUT_HERO_LAYOUT[variant]

  return (
    <div
      className="relative w-full overflow-visible"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.contentSection[variant]}
      data-name="Content Section"
      style={{ height: ABOUT_HERO_SHELL.contentHeight[variant] }}
    >
      <AboutHeroBotanicalDecor box={layout.botanical} variant={variant} />
      <AboutHeroPortrait alt={portrait.alt} box={layout.portrait} src={portrait.src} variant={variant} />
      <ScallopedBrandBadge
        figmaNode={ABOUT_HERO_FIGMA_NODES.scallopedBadge[variant]}
        left={layout.scallopedBadge.left}
        size={layout.scallopedBadge.size}
        top={layout.scallopedBadge.top}
      />
      <AboutHeroSecondaryPhoto
        alt={secondaryPhoto.alt}
        box={layout.secondaryPhoto}
        src={secondaryPhoto.src}
        variant={variant}
      />
      <AboutHeroMainContent
        buttonGap={layout.mainContent.buttonGap}
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
        introductionGap={layout.introductionGap}
        layout={layout.mainContent}
        variant={variant}
      />
    </div>
  )
}
