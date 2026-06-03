import { cn } from '@/utilities/ui'

import type { BrandSygnetBadgeVariant } from './constants'
import { BRAND_SYGNET_BADGE_ASSET, BRAND_SYGNET_BADGE_LAYOUT } from './constants'

type BrandSygnetBadgeProps = {
  variant: BrandSygnetBadgeVariant
  className?: string
}

/**
 * Frosted rose sygnet badge — Figma `Container` + `Sygnet` (`6986:20009`).
 * Single SVG (outer ring, noise fill, icon); scaled per breakpoint shell size.
 */
export function BrandSygnetBadge({ variant, className }: BrandSygnetBadgeProps) {
  const layout = BRAND_SYGNET_BADGE_LAYOUT[variant]

  return (
    <div
      aria-hidden
      className={cn('relative shrink-0', className)}
      data-figma-node={layout.figmaNode}
      data-name="Container"
      style={{ height: layout.shellSize, width: layout.shellSize }}
    >
      {/* Native img keeps SVG noise filter intact (Next/Image can strip filters). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="block size-full max-w-none"
        data-name="Sygnet"
        height={layout.shellSize}
        src={BRAND_SYGNET_BADGE_ASSET}
        width={layout.shellSize}
      />
    </div>
  )
}
