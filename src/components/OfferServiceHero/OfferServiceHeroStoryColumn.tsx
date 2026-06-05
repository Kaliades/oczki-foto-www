import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

import type { OfferServiceHeroData } from './constants'
import { OfferServiceHeroBreadcrumbs } from './OfferServiceHeroBreadcrumbs'
import { OfferServiceHeroContent } from './OfferServiceHeroContent'
import { OfferServiceHeroScallopStrip } from './OfferServiceHeroScallopStrip'

type OfferServiceHeroStoryColumnProps = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  cta: OfferServiceHeroData['cta']
  description: string
  heading: OfferServiceHeroData['heading']
  headingId: string
}

/**
 * Left story column — Figma `Breadcrumbs` frame (`6994:25769`).
 *
 * <div> story column (598 px desktop)
 * ├── OfferServiceHeroBreadcrumbs — breadcrumb row
 * └── OfferServiceHeroContent — copy + CTA + scallop
 */
export function OfferServiceHeroStoryColumn({
  breadcrumbs,
  cta,
  description,
  heading,
  headingId,
}: OfferServiceHeroStoryColumnProps) {
  return (
    <div
      className="relative flex w-full flex-col lg:h-[569px] lg:w-[598px] lg:shrink-0"
      data-name="Breadcrumbs"
    >
      <OfferServiceHeroBreadcrumbs items={breadcrumbs} />
      <OfferServiceHeroContent
        cta={cta}
        description={description}
        heading={heading}
        headingId={headingId}
      />
      <OfferServiceHeroScallopStrip />
    </div>
  )
}
