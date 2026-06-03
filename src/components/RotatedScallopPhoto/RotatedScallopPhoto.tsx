import { cn } from '@/utilities/ui'

import type { RotatedScallopPhotoVariant } from './constants'
import { ROTATED_SCALLOP_PHOTO_LAYOUT } from './constants'

type RotatedScallopPhotoProps = {
  variant: RotatedScallopPhotoVariant
  imageSrc: string
  imageAlt: string
  className?: string
}

/**
 * Scalloped photo export rotated 90° — Figma `Union` inside `Herosection`.
 * Positions from `get_design_context` wrappers (metadata bbox x can be misleading).
 */
export function RotatedScallopPhoto({
  variant,
  imageSrc,
  imageAlt,
  className,
}: RotatedScallopPhotoProps) {
  const layout = ROTATED_SCALLOP_PHOTO_LAYOUT[variant]
  const { imageInset } = layout

  return (
    <div
      className={cn(
        'pointer-events-none absolute flex items-center justify-center',
        className,
      )}
      data-figma-node={layout.figmaNode}
      data-name="Union"
      style={{
        height: layout.boxHeight,
        left: layout.left,
        top: layout.top,
        width: layout.boxWidth,
      }}
    >
      <div className="flex-none rotate-90">
        <div
          className="relative"
          style={{ height: layout.innerHeight, width: layout.innerWidth }}
        >
          <div
            className="absolute"
            style={{
              bottom: `${-imageInset.y}%`,
              left: `${-imageInset.x}%`,
              right: `${-imageInset.x}%`,
              top: `${-imageInset.y}%`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={imageAlt}
              className="block size-full max-w-none"
              height={layout.assetHeight}
              src={imageSrc}
              width={layout.assetWidth}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
