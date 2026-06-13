import { OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

import { CONTACT_HERO_FIGMA_NODES } from './constants'

type ContactHeroTopBarProps = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
}

/** Breadcrumb row inside the textured hero — Figma `Top bar`. */
export function ContactHeroTopBar({ breadcrumbs }: ContactHeroTopBarProps) {
  return (
    <div
      className="relative z-10 flex h-11 w-full items-center px-4 md:h-auto md:px-20 md:py-1 lg:px-8"
      data-figma-node={CONTACT_HERO_FIGMA_NODES.topBar.desktop}
    >
      <div data-figma-node={CONTACT_HERO_FIGMA_NODES.breadcrumbs.desktop}>
        <OczkiBreadcrumbs items={breadcrumbs} />
      </div>
    </div>
  )
}
