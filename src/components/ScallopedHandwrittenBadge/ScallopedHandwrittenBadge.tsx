import type { ScallopedHandwrittenBadgeVariant } from './constants'
import { SCALLOPED_HANDWRITTEN_BADGE_LAYOUT } from './constants'

type ScallopedHandwrittenBadgeProps = {
  quote: string
  variant: ScallopedHandwrittenBadgeVariant
}

/**
 * Scalloped wax-paper quote blob — Figma `6952:19954`.
 * Shape and text share the group pivot (AABB center) so both rotate as one unit.
 */
export function ScallopedHandwrittenBadge({ quote, variant }: ScallopedHandwrittenBadgeProps) {
  const layout = SCALLOPED_HANDWRITTEN_BADGE_LAYOUT[variant]
  const { text } = layout
  const pivotX = layout.width / 2
  const pivotY = layout.height / 2
  const assetLeft = (layout.width - layout.assetWidth) / 2
  const assetTop = (layout.height - layout.assetHeight) / 2

  const textRotateDeg = layout.rotateDeg + layout.textRotateOffsetDeg

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-[3] overflow-visible"
      data-figma-node={layout.figmaNode}
      style={{
        height: layout.height,
        left: layout.left,
        top: layout.top,
        width: layout.width,
      }}
    >
      <div
        className="absolute flex-none"
        style={{
          height: layout.assetHeight,
          left: assetLeft,
          top: assetTop,
          transform: `rotate(${layout.rotateDeg}deg)`,
          transformOrigin: 'center center',
          width: layout.assetWidth,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none select-none"
          height={layout.assetHeight}
          src={layout.shapeAsset}
          width={layout.assetWidth}
        />
      </div>

      <p
        className="absolute text-center font-normal text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-handwritten),cursive] [font-feature-settings:'lnum'_1,'pnum'_1]"
        style={{
          fontSize: text.fontSize,
          left: text.left,
          lineHeight: text.lineHeight,
          top: text.top,
          transform: `rotate(${textRotateDeg}deg)`,
          transformOrigin: `${pivotX - text.left}px ${pivotY - text.top}px`,
          width: text.width,
        }}
      >
        {quote}
      </p>
    </div>
  )
}
