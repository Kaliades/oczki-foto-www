import {
  SCALLOPED_BRAND_BADGE_SHADOW_ASSET,
  SCALLOPED_BRAND_BADGE_SHADOW_BLEED,
  SCALLOPED_BRAND_BADGE_STAMP_ASSET,
} from './constants'

type ScallopedBrandBadgeProps = {
  figmaNode: string
  left: number
  size: number
  top: number
}

/**
 * Scalloped wax stamp — Figma `Decorative Icon`.
 *
 * Two layers (siblings in Figma export):
 * 1. Shadow bleed — 131×131 export (`7000:26977`)
 * 2. Noise stamp — 96×96 `Subtract` (`7092:4345`), scaled to the slot
 */
export function ScallopedBrandBadge({ figmaNode, left, size, top }: ScallopedBrandBadgeProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-[2] overflow-visible"
      data-figma-node={figmaNode}
      data-name="Decorative Icon"
      style={{ height: size, left, top, width: size }}
    >
      <div
        className="absolute"
        style={{
          bottom: SCALLOPED_BRAND_BADGE_SHADOW_BLEED.bottom,
          left: SCALLOPED_BRAND_BADGE_SHADOW_BLEED.left,
          right: SCALLOPED_BRAND_BADGE_SHADOW_BLEED.right,
          top: SCALLOPED_BRAND_BADGE_SHADOW_BLEED.top,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none select-none"
          src={SCALLOPED_BRAND_BADGE_SHADOW_ASSET}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="absolute inset-0 block size-full max-w-none select-none"
        src={SCALLOPED_BRAND_BADGE_STAMP_ASSET}
      />
    </div>
  )
}
