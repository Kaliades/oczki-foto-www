import { OczkiBreadcrumbs } from '@/components/OczkiBreadcrumbs'
import type { OczkiBreadcrumbItemData } from '@/components/OczkiBreadcrumbs'

import { ABOUT_HERO_FIGMA_NODES, ABOUT_HERO_SHELL, type AboutHeroLayoutVariant } from './constants'

type AboutHeroHeaderProps = {
  breadcrumbs: readonly OczkiBreadcrumbItemData[]
  variant: AboutHeroLayoutVariant
}

/** Breadcrumb row — Figma `Header` per breakpoint. */
export function AboutHeroHeader({ breadcrumbs, variant }: AboutHeroHeaderProps) {
  const { breadcrumbPaddingX, breadcrumbPaddingY, breadcrumbRowHeight } = ABOUT_HERO_SHELL

  return (
    <div
      className="flex items-center"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.header[variant]}
      data-name="Header"
      style={{
        height: breadcrumbRowHeight[variant],
        paddingLeft: breadcrumbPaddingX[variant],
        paddingRight: breadcrumbPaddingX[variant],
        paddingTop: breadcrumbPaddingY[variant],
        paddingBottom: breadcrumbPaddingY[variant],
      }}
    >
      <OczkiBreadcrumbs items={breadcrumbs} />
    </div>
  )
}
