import { OFFER_SERVICE_HERO_FIGMA_NODES, type OfferServiceHeroData } from './constants'
import { OfferServiceHeroDesktopLayout } from './OfferServiceHeroDesktopLayout'
import { OfferServiceHeroStackedLayout } from './OfferServiceHeroStackedLayout'

type OfferServiceHeroProps = {
  data: OfferServiceHeroData
}

/**
 * Offer service page hero — Figma `Konkretna usługa (szablon)`.
 *
 * Two independent layouts sharing copy data:
 *   - OfferServiceHeroStackedLayout — mobile `7102:9481` + tablet `7100:7810` (< lg)
 *   - OfferServiceHeroDesktopLayout — desktop `6994:25771` (≥ lg)
 *
 * Navbar: global `OczkiNavbar` via layout — not rendered here.
 */
export function OfferServiceHero({ data }: OfferServiceHeroProps) {
  const { breadcrumbs, cta, description, heading, image } = data
  const headingId = 'offer-service-hero-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.desktop}
    >
      <div className="mx-auto w-full max-w-[1366px]">
        <OfferServiceHeroStackedLayout
          breadcrumbs={breadcrumbs}
          cta={cta}
          description={description}
          heading={heading}
          headingId={headingId}
          image={image}
        />
        <OfferServiceHeroDesktopLayout
          breadcrumbs={breadcrumbs}
          cta={cta}
          description={description}
          heading={heading}
          headingId={headingId}
          image={image}
        />
      </div>
    </section>
  )
}
