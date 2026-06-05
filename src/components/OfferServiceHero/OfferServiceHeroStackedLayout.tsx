import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

import { OFFER_SERVICE_HERO_FIGMA_NODES, type OfferServiceHeroData } from './constants'
import { offerServiceHeroStackedFluidStyle } from './stackedFluidSpacing'
import { OfferServiceHeroStackedBreadcrumbs } from './OfferServiceHeroStackedBreadcrumbs'
import { OfferServiceHeroStackedContent } from './OfferServiceHeroStackedContent'
import { OfferServiceHeroStackedImage } from './OfferServiceHeroStackedImage'

type OfferServiceHeroStackedLayoutProps = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  cta: OfferServiceHeroData['cta']
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
  image: OfferServiceHeroData['image']
}

/**
 * Mobile + tablet hero — Figma `7102:9481` / `7100:7810`.
 * Fluid spacing interpolates 360 px → 768 px via CSS vars on this root.
 */
export function OfferServiceHeroStackedLayout({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
  image,
}: OfferServiceHeroStackedLayoutProps) {
  return (
    <div
      className="flex w-full flex-col items-start lg:hidden"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.mobile}
      data-name="Main container"
      style={offerServiceHeroStackedFluidStyle()}
    >
      <div className="flex w-full flex-col" data-name="Breadcrumbs">
        <OfferServiceHeroStackedBreadcrumbs items={breadcrumbs} />
        <OfferServiceHeroStackedContent
          cta={cta}
          description={description}
          heading={heading}
          headingId={headingId}
        />
      </div>
      <OfferServiceHeroStackedImage alt={image.alt} src={image.src} />
    </div>
  )
}
