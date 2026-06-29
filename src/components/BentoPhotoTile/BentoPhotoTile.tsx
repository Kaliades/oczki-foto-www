import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import {
  BENTO_PHOTO_TILE_COL_SPAN,
  BENTO_PHOTO_TILE_FIGMA_NODES,
  BENTO_PHOTO_TILE_HEIGHT_CLASS,
  type BentoPhotoSpan,
} from './constants'

export type BentoPhotoTileData = {
  id: string
  imageAlt: string
  imageSrc: string
  /** Optional Figma crop — absolute positioned img inside overflow-hidden frame. */
  cropClassName?: string
}

type BentoPhotoTileProps = {
  item: BentoPhotoTileData
  span: BentoPhotoSpan
  sizes: string
  className?: string
}

/**
 * Single tile in a bento photo grid — Figma `Image` rounded-rectangle.
 *
 * Root (relative, col-span 1|2, fixed row height per breakpoint)
 * └── Image (object-cover fill)
 *
 * Tile width is derived from the parent CSS grid track — 2 cols below lg, 4 cols at lg+.
 */
export function BentoPhotoTile({ item, span, sizes, className }: BentoPhotoTileProps) {
  const { imageAlt, imageSrc, cropClassName } = item

  return (
    <figure
      className={cn(
        'relative min-w-0 overflow-hidden',
        BENTO_PHOTO_TILE_COL_SPAN[span],
        BENTO_PHOTO_TILE_HEIGHT_CLASS[span],
        className,
      )}
      data-figma-node={BENTO_PHOTO_TILE_FIGMA_NODES.image}
    >
      <Image
        alt={imageAlt}
        className={cn('object-cover', cropClassName ?? 'size-full')}
        fill={!cropClassName}
        height={cropClassName ? 1024 : undefined}
        sizes={sizes}
        src={imageSrc}
        width={cropClassName ? 683 : undefined}
      />
    </figure>
  )
}
