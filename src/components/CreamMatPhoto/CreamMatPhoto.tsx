import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { PhotoUnitReveal } from '@/components/PhotoUnitReveal'

import { cn } from '@/utilities/ui'

import type { CreamMatPhotoVariant } from './constants'
import { CREAM_MAT_PHOTO_LAYOUT } from './constants'

type CreamMatPhotoProps = {
  variant: CreamMatPhotoVariant
  imageSrc: string
  imageAlt: string
  className?: string
}

/**
 * Cream mat with primary border and drop shadow wrapping a cover photo.
 * Figma `Container` around portrait shots in venue / collage sections.
 */
export function CreamMatPhoto({ variant, imageSrc, imageAlt, className }: CreamMatPhotoProps) {
  const layout = CREAM_MAT_PHOTO_LAYOUT[variant]

  return (
    <PhotoUnitReveal className={cn(className)}>
      <div
        className="flex items-center border border-[var(--oczki-primary-300)] bg-[var(--oczki-primary-200)]"
        data-figma-node={layout.figmaNode}
        data-name="Container"
        style={{
          boxShadow: layout.shadow,
          height: layout.shellHeight,
          padding: layout.padding,
          width: layout.shellWidth,
        }}
      >
        <div
          className="relative shrink-0 overflow-hidden"
          data-name="Image"
          style={{ height: layout.imageHeight, width: layout.imageWidth }}
        >
          <Image
            alt={imageAlt}
            className="object-cover"
            fill
            sizes={`${layout.imageWidth}px`}
            src={imageSrc}
          />
        </div>
      </div>
    </PhotoUnitReveal>
  )
}
