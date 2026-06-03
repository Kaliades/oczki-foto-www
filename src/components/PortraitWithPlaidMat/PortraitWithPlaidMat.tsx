import Image from 'next/image'

import { TertiaryPlaidTile, type TertiaryPlaidTileSize } from '@/components/TertiaryPlaidTile'

type PortraitWithPlaidMatProps = {
  imageAlt: string
  imageSrc: string
  /** Portrait width × height from Figma `Main Image`. */
  photo: { width: number; height: number }
  /** Absolute offset of portrait inside the group. */
  photoOffset: { left: number; top: number }
  /** Absolute offset + size of plaid tile inside the group. */
  plaid: { left: number; size: TertiaryPlaidTileSize; top: number }
  /** Group bounding box (`Image Container`). */
  group: { height: number; width: number }
}

/**
 * Portrait photo with bottom fade + tertiary plaid mat — Figma `Image Container`.
 *
 * <div Image Container>
 * ├── TertiaryPlaidTile (`Thumbnails Container`) — back
 * └── Main Image — front, bottom gradient into primary-100
 */
export function PortraitWithPlaidMat({
  group,
  imageAlt,
  imageSrc,
  photo,
  photoOffset,
  plaid,
}: PortraitWithPlaidMatProps) {
  return (
    <div
      className="relative"
      data-name="Image Container"
      style={{ height: group.height, width: group.width }}
    >
      <div
        className="absolute"
        style={{ left: plaid.left, top: plaid.top }}
      >
        <TertiaryPlaidTile size={plaid.size} />
      </div>

      <div
        className="absolute overflow-hidden"
        data-name="Main Image"
        style={{
          height: photo.height,
          left: photoOffset.left,
          top: photoOffset.top,
          width: photo.width,
        }}
      >
        <Image
          alt={imageAlt}
          className="object-cover"
          fill
          sizes={`${photo.width}px`}
          src={imageSrc}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--oczki-primary-100)] from-10% to-transparent to-55%"
          style={{ height: Math.round(photo.height * 0.42) }}
        />
      </div>
    </div>
  )
}
