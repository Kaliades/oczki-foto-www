import { AboutHeroHeader } from './AboutHeroHeader'
import { AboutHeroMobileContentSection } from './AboutHeroMobileContentSection'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroData } from './constants'

type AboutHeroMobileLayoutProps = Pick<
  AboutHeroData,
  'breadcrumbs' | 'cta' | 'description' | 'heading' | 'portrait' | 'secondaryPhoto'
> & {
  headingId: string
}

/** Mobile page shell — Figma `7093:5559` (360 reference). */
export function AboutHeroMobileLayout({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
  portrait,
  secondaryPhoto,
}: AboutHeroMobileLayoutProps) {
  return (
    <div
      className="relative mx-auto w-full max-w-[360px] overflow-visible md:hidden"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.mobile}
    >
      <AboutHeroHeader breadcrumbs={breadcrumbs} variant="mobile" />
      <AboutHeroMobileContentSection
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
        portrait={portrait}
        secondaryPhoto={secondaryPhoto}
      />
    </div>
  )
}
