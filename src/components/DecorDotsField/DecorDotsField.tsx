import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import type { DecorDotsFieldVariant } from './constants'
import { DECOR_DOTS_FIELD_LAYOUT } from './constants'

type DecorDotsFieldProps = {
  variant: DecorDotsFieldVariant
  className?: string
}

/**
 * Soft bokeh dots (Figma `Warstwa_1` / `6962:4007`).
 * Placement wrapper + −47.32° rotation matches Figma dev export.
 */
export function DecorDotsField({ variant, className }: DecorDotsFieldProps) {
  const layout = DECOR_DOTS_FIELD_LAYOUT[variant]

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute flex items-center justify-center overflow-visible',
        className,
      )}
      data-figma-node={layout.figmaNode}
      style={{
        height: layout.height,
        left: layout.left,
        right: layout.right,
        top: layout.top,
        width: layout.width,
      }}
    >
      <div
        className="flex-none"
        style={{ transform: `rotate(${layout.rotateDeg}deg)` }}
      >
        <Image
          alt=""
          className="max-w-none"
          height={layout.assetHeight}
          src="/figma/ease-decor-dots.svg"
          width={layout.assetWidth}
        />
      </div>
    </div>
  )
}
