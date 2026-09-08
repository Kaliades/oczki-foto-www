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
  /** Short “for you if…” line shown above the feature checklist. */
  description?: string
  features: readonly string[]
  figmaNodes?: {
    column?: string
    columnDetails?: string
    columnHeader?: string
    heading?: string
  }
  /**
   * Desktop details placement inside the fixed 640 px column.
   * - `end` (default) — pin details to the bottom (kobiece / Figma with price)
   * - `start` — stack under the header; empty space falls below the CTA
   *   (reportaż without price — avoids a stranded button at the column base)
   */
  detailsAlign?: 'start' | 'end'
  /** Omit or leave empty to hide the price (reportaż packages). */
  price?: string
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
 * ├── <Column Header container>
 * └── <Column details> — (description + features) + price/CTA as ONE cluster
 *     (gap 64 px desktop). Details never flex-grow internally.
 */
export function PackagePanel({ data }: PackagePanelProps) {
  const {
    badgeLabel,
    cta,
    description,
    detailsAlign = 'end',
    features,
    figmaNodes,
    price,
    theme,
    title,
  } = data
  const themeStyles = PACKAGE_PANEL_THEME_STYLES[theme]
  const pinDetailsToEnd = detailsAlign === 'end'

  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden md:min-h-[400px] min-[1366px]:h-[640px] min-[1366px]:min-h-[640px] min-[1366px]:flex-1',
        pinDetailsToEnd && 'min-[1366px]:justify-between',
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
        <div className="flex w-full flex-col gap-3">
          {description ? (
            <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-700)]">
              {description}
            </p>
          ) : null}
          <PackageFeatureList features={features} />
        </div>
        <PackagePriceCta cta={cta} price={price} />
      </div>
    </div>
  )
}
