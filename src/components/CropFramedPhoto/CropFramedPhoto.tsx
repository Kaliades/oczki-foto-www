import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import Link from 'next/link'

import { cn } from '@/utilities/ui'

import { CROP_FRAMED_PHOTO_FIGMA_NODES } from './constants'

export type CropFramedPhotoProps = {
  alt: string
  src: string
  height: number
  sizes: string
  /** Omit when width is driven by the parent grid/flex track (`className="w-full"`). */
  width?: number
  /** Optional Figma crop — absolute positioned img inside overflow-hidden frame. */
  cropClassName?: string
  href?: string
  className?: string
  figmaNode?: string
}

/**
 * Fixed-size photo frame with optional Figma-export crop positioning.
 *
 * Root (relative, overflow-hidden, explicit w × h)
 * └── Image (object-cover fill, or absolute crop classes)
 */
export function CropFramedPhoto({
  alt,
  src,
  width,
  height,
  sizes,
  cropClassName,
  href,
  className,
  figmaNode,
}: CropFramedPhotoProps) {
  const image = (
    <Image
      alt={alt}
      className={cn('object-cover', cropClassName ?? 'size-full')}
      fill={!cropClassName}
      height={cropClassName ? 1280 : undefined}
      sizes={sizes}
      src={src}
      width={cropClassName ? 1920 : undefined}
    />
  )

  const rootClassName = cn(
    'relative block shrink-0 overflow-hidden border-0 bg-transparent p-0',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--oczki-primary-800)]',
    className,
  )

  const style = width === undefined ? { height } : { height, width }

  if (href) {
    return (
      <Link
        className={rootClassName}
        data-figma-node={figmaNode ?? CROP_FRAMED_PHOTO_FIGMA_NODES.image}
        href={href}
        style={style}
      >
        {image}
      </Link>
    )
  }

  return (
    <figure
      className={rootClassName}
      data-figma-node={figmaNode ?? CROP_FRAMED_PHOTO_FIGMA_NODES.image}
      style={style}
    >
      {image}
    </figure>
  )
}
