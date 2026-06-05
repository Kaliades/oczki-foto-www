import { AboutHeroContentSection } from './AboutHeroContentSection'
import { AboutHeroHeader } from './AboutHeroHeader'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroData } from './constants'

type AboutHeroTabletLayoutProps = Pick<
  AboutHeroData,
  'breadcrumbs' | 'cta' | 'description' | 'heading' | 'portrait' | 'secondaryPhoto'
> & {
  headingId: string
}

/** Tablet page shell — Figma `7092:4198` (768 reference). */
export function AboutHeroTabletLayout({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
  portrait,
  secondaryPhoto,
}: AboutHeroTabletLayoutProps) {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[768px] overflow-visible md:max-[1365px]:block"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.tablet}
    >
      <AboutHeroHeader breadcrumbs={breadcrumbs} variant="tablet" />
      <AboutHeroContentSection
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
        portrait={portrait}
        secondaryPhoto={secondaryPhoto}
        variant="tablet"
      />
    </div>
  )
}
