import { AboutHeroDesktopLayout } from './AboutHeroDesktopLayout'
import { AboutHeroMobileLayout } from './AboutHeroMobileLayout'
import { AboutHeroTabletLayout } from './AboutHeroTabletLayout'
import { ABOUT_HERO_FIGMA_NODES, type AboutHeroData } from './constants'

type AboutHeroProps = {
  data: AboutHeroData
}

/**
 * About page hero — Figma `Page` (`6974:19430` / `7092:4198` / `7093:5559`).
 *
 * Three discrete shells (360 / 768 / 1366) — same pattern as `HomeCta`.
 * Navbar: global `OczkiNavbar` via layout — not rendered here.
 */
export function AboutHero({ data }: AboutHeroProps) {
  const { breadcrumbs, cta, description, heading, portrait, secondaryPhoto, title } = data
  const headingId = 'about-hero-heading'

  const layoutProps = {
    breadcrumbs,
    cta,
    description,
    heading,
    headingId,
    portrait,
    secondaryPhoto,
  }

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-200)] [font-family:var(--font-oczki-body)]"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.desktop}
    >
      <AboutHeroMobileLayout {...layoutProps} />
      <AboutHeroTabletLayout {...layoutProps} />
      <AboutHeroDesktopLayout {...layoutProps} />

      <span className="sr-only">{title}</span>
    </section>
  )
}
