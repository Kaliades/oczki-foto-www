import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import type { TiltedPhotoFrameVariant } from './constants'
import { TILTED_PHOTO_FRAME_LAYOUT } from './constants'

type TiltedPhotoFrameProps = {
  variant: TiltedPhotoFrameVariant
  imageSrc: string
  imageAlt: string
  className?: string
  /** Override shell position — e.g. envelope-relative coords inside `EaseEnvelope`. */
  shellOffset?: { left: number; top: number }
  /** Override shell rotation — envelope-local degrees when parent group already rotates. */
  shellRotateDeg?: number
}

/**
 * Tilted cream mat with drop shadow and cover photo (Figma `6952:19918`).
 */
export function TiltedPhotoFrame({
  variant,
  imageSrc,
  imageAlt,
  className,
  shellOffset,
  shellRotateDeg,
}: TiltedPhotoFrameProps) {
  const layout = TILTED_PHOTO_FRAME_LAYOUT[variant]
  const rotateDeg = shellRotateDeg ?? layout.rotateDeg

  return (
    <div
      className={cn('pointer-events-none absolute flex items-center justify-center', className)}
      data-figma-node={layout.figmaNode}
      style={{
        height: layout.shellHeight,
        left: shellOffset?.left ?? layout.left,
        top: shellOffset?.top ?? layout.top,
        width: layout.shellWidth,
      }}
    >
      <div
        className="flex-none"
        style={{ transform: `rotate(${rotateDeg}deg)` }}
      >
        <div
          className="flex flex-col items-start bg-[var(--oczki-primary-200)] shadow-[1px_4px_2.9px_rgba(53,39,25,0.2),6px_11px_6.65px_rgba(53,39,25,0.12)]"
          style={{
            height: layout.frameHeight,
            padding: layout.padding,
            width: layout.frameWidth,
          }}
        >
          <div className="relative w-full shrink-0" style={{ height: layout.imageHeight }}>
            <Image
              alt={imageAlt}
              className="object-cover"
              fill
              sizes={`${layout.frameWidth}px`}
              src={imageSrc}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
