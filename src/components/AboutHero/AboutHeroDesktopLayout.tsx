import { AboutHeroContentSection } from './AboutHeroContentSection'
import { AboutHeroHeader } from './AboutHeroHeader'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroData } from './constants'

type AboutHeroDesktopLayoutProps = Pick<
  AboutHeroData,
  'breadcrumbs' | 'cta' | 'description' | 'heading' | 'portrait' | 'secondaryPhoto'
> & {
  headingId: string
}

/** Desktop page shell — Figma `6974:19430` (1366 reference). */
export function AboutHeroDesktopLayout({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
  portrait,
  secondaryPhoto,
}: AboutHeroDesktopLayoutProps) {
  return (
    <div
      className="relative mx-auto hidden w-full max-w-[1366px] overflow-visible min-[1366px]:block"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.desktop}
    >
      <AboutHeroHeader breadcrumbs={breadcrumbs} variant="desktop" />
      <AboutHeroContentSection
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
        portrait={portrait}
        secondaryPhoto={secondaryPhoto}
        variant="desktop"
      />
    </div>
  )
}
