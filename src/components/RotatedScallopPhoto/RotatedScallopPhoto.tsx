'use client'

import { PhotoUnitReveal, usePhotoUnitRevealOnLoad } from '@/components/PhotoUnitReveal'
import { cn } from '@/utilities/ui'

import type {
  RotatedScallopPhotoContentMode,
  RotatedScallopPhotoVariant,
} from './constants'
import {
  ROTATED_SCALLOP_PHOTO_LAYOUT,
  ROTATED_SCALLOP_PHOTO_MASK,
} from './constants'

type RotatedScallopPhotoProps = {
  variant: RotatedScallopPhotoVariant
  imageSrc: string
  imageAlt: string
  /**
   * `figma-baked` — PNG already sideways (Figma seed export).
   * `upright` — normal CMS photo; counter-rotate + mask so subjects stay upright.
   */
  contentMode?: RotatedScallopPhotoContentMode
  className?: string
}

function ScallopBitmap({
  imageSrc,
  imageAlt,
  upright,
  layout,
  imageInset,
}: {
  imageSrc: string
  imageAlt: string
  upright: boolean
  layout: (typeof ROTATED_SCALLOP_PHOTO_LAYOUT)[RotatedScallopPhotoVariant]
  imageInset: { x: number; y: number }
}) {
  const reveal = usePhotoUnitRevealOnLoad()

  if (upright) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        alt={imageAlt}
        className="absolute left-1/2 top-1/2 max-w-none object-cover"
        height={layout.innerWidth}
        onLoad={reveal.onLoad}
        src={imageSrc}
        style={{
          height: layout.innerWidth,
          transform: 'translate(-50%, -50%) rotate(-90deg)',
          width: layout.innerHeight,
        }}
        width={layout.innerHeight}
      />
    )
  }

  return (
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
        onLoad={reveal.onLoad}
        src={imageSrc}
        width={layout.assetWidth}
      />
    </div>
  )
}

/**
 * Scalloped photo export rotated 90° — Figma `Union` inside `Herosection`.
 * Positions from `get_design_context` wrappers (metadata bbox x can be misleading).
 */
export function RotatedScallopPhoto({
  variant,
  imageSrc,
  imageAlt,
  contentMode = 'figma-baked',
  className,
}: RotatedScallopPhotoProps) {
  const layout = ROTATED_SCALLOP_PHOTO_LAYOUT[variant]
  const { imageInset } = layout
  const upright = contentMode === 'upright'

  return (
    <PhotoUnitReveal
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
          className="relative overflow-hidden"
          style={{
            height: layout.innerHeight,
            width: layout.innerWidth,
            ...(upright
              ? {
                  maskImage: `url(${ROTATED_SCALLOP_PHOTO_MASK})`,
                  maskMode: 'alpha',
                  maskRepeat: 'no-repeat',
                  maskSize: '100% 100%',
                  WebkitMaskImage: `url(${ROTATED_SCALLOP_PHOTO_MASK})`,
                  WebkitMaskRepeat: 'no-repeat',
                  WebkitMaskSize: '100% 100%',
                }
              : null),
          }}
        >
          <ScallopBitmap
            imageAlt={imageAlt}
            imageInset={imageInset}
            imageSrc={imageSrc}
            layout={layout}
            upright={upright}
          />
        </div>
      </div>
    </PhotoUnitReveal>
  )
}
