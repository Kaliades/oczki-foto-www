import { OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs/constants'

import { OFFER_SERVICE_HERO_FIGMA_NODES } from './constants'

type OfferServiceHeroBreadcrumbsProps = {
  items: readonly OczkiBreadcrumbItemData[]
}

/** Breadcrumb row — desktop only. Figma `6989:25515`. */
export function OfferServiceHeroBreadcrumbs({ items }: OfferServiceHeroBreadcrumbsProps) {
  return (
    <div
      className="flex h-[52px] w-full flex-col justify-center px-8 py-1"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.breadcrumbs.desktop}
      data-name="Container"
    >
      <div className="flex h-11 items-center">
        <OczkiBreadcrumbs items={items} />
      </div>
    </div>
  )
}
