import { PackageBadge } from '@/components/PackageBadge'
import { PackageFeatureList } from '@/components/PackageFeatureList'
import { PackageOrnamentHeading } from '@/components/PackageOrnamentHeading'
import { PackagePriceCta } from '@/components/PackagePriceCta'
import { cn } from '@/utilities/ui'
import type { SectionLink } from '@/utilities/resolveLinkHref'

import { PACKAGE_PANEL_THEME_STYLES, type PackagePanelTheme } from './constants'

export type PackagePanelData = {
  badgeLabel?: string
  cta: SectionLink
  features: readonly string[]
  figmaNodes?: {
    column?: string
    columnDetails?: string
    columnHeader?: string
    heading?: string
  }
  price: string
  theme: PackagePanelTheme
  title: string
}

type PackagePanelProps = {
  data: PackagePanelData
}

/**
 * Coloured package copy column — Figma `Column`.
 *
 * <Column>
 * ├── <Column Header container> — border-b, ornament heading, optional badge
 * └── <Column details> — feature list + price/CTA
 *
 * Desktop: column stretches to row height; header + details pinned with justify-between.
 * Tablet/mobile: natural stack; details follow header immediately.
 */
export function PackagePanel({ data }: PackagePanelProps) {
  const { badgeLabel, cta, features, figmaNodes, price, theme, title } = data
  const themeStyles = PACKAGE_PANEL_THEME_STYLES[theme]

  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden md:h-[400px] min-[1366px]:min-h-[640px] min-[1366px]:flex-1 min-[1366px]:justify-between',
        themeStyles.backgroundClassName,
      )}
      data-figma-node={figmaNodes?.column}
      data-name="Column"
    >
      <div
        className={cn(
          'flex w-full shrink-0 border-b border-solid',
          themeStyles.headerBorderClassName,
          badgeLabel
            ? 'flex-col items-start gap-3 p-4 md:flex-row md:items-center md:justify-between md:gap-0 md:px-20 md:pt-8 md:pb-7 min-[1366px]:px-8'
            : 'items-center p-4 md:px-20 md:pt-8 md:pb-7 min-[1366px]:px-8',
        )}
        data-figma-node={figmaNodes?.columnHeader}
        data-name="Column Header container"
      >
        <PackageOrnamentHeading
          figmaNode={figmaNodes?.heading}
          theme={theme}
          title={title}
        />
        {badgeLabel ? <PackageBadge label={badgeLabel} /> : null}
      </div>

      <div
        className="flex w-full shrink-0 flex-col gap-8 px-4 pt-5 pb-8 md:gap-16 md:px-20 md:py-8 min-[1366px]:gap-16 min-[1366px]:p-8"
        data-figma-node={figmaNodes?.columnDetails}
        data-name="Column details"
      >
        <PackageFeatureList features={features} />
        <PackagePriceCta cta={cta} price={price} />
      </div>
    </div>
  )
}
