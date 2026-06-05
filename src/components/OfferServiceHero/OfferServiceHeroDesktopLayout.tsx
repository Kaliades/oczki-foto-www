import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

import type { OfferServiceHeroData } from './constants'
import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'
import { OfferServiceHeroImage } from './OfferServiceHeroImage'
import { OfferServiceHeroStoryColumn } from './OfferServiceHeroStoryColumn'

type OfferServiceHeroDesktopLayoutProps = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  cta: OfferServiceHeroData['cta']
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
  image: OfferServiceHeroData['image']
}

/**
 * Desktop hero row — Figma `6994:25771`.
 *
 * <div> Main container (flex row, h 569)
 * ├── OfferServiceHeroStoryColumn
 * └── OfferServiceHeroImage
 */
export function OfferServiceHeroDesktopLayout({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
  image,
}: OfferServiceHeroDesktopLayoutProps) {
  return (
    <div
      className="hidden h-[569px] w-full flex-row items-start overflow-hidden lg:flex"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.desktop}
      data-name="Main container"
    >
      <OfferServiceHeroStoryColumn
        breadcrumbs={breadcrumbs}
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
      />
      <OfferServiceHeroImage alt={image.alt} src={image.src} />
    </div>
  )
}
