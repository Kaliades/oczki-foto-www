import { OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'

type OfferServiceHeroStackedBreadcrumbsProps = {
  items: readonly OczkiBreadcrumbItemData[]
}

/** Breadcrumb row — fluid px / min-height from layout CSS vars. */
export function OfferServiceHeroStackedBreadcrumbs({ items }: OfferServiceHeroStackedBreadcrumbsProps) {
  return (
    <div
      className="flex w-full flex-col justify-center px-[var(--offer-stacked-breadcrumb-px)] py-[var(--offer-stacked-breadcrumb-py)]"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.breadcrumbs.mobile}
      data-name="Container"
    >
      <div
        className="flex min-h-[var(--offer-stacked-breadcrumb-min-h)] items-center"
      >
        <OczkiBreadcrumbs items={items} />
      </div>
    </div>
  )
}
