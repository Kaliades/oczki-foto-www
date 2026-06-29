import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { SCALLOP_TILE } from './constants'

type ScallopTileStripProps = {
  count: number
  orientation: 'horizontal' | 'vertical'
  size?: 'desktop' | 'mobile'
}

/**
 * Repeating scallop tile row — Figma `Container` segments in `Group 62`.
 */
export function ScallopTileStrip({ count, orientation, size = 'desktop' }: ScallopTileStripProps) {
  const isMobile = size === 'mobile'
  const tileWidth = isMobile ? SCALLOP_TILE.mobile.width : SCALLOP_TILE.desktop.width
  const tileHeight = isMobile ? SCALLOP_TILE.mobile.height : SCALLOP_TILE.desktop.height
  const overlap = isMobile
    ? SCALLOP_TILE.mobile.overlap
    : orientation === 'horizontal'
      ? SCALLOP_TILE.desktop.horizontalOverlap
      : SCALLOP_TILE.desktop.verticalOverlap

  const isHorizontal = orientation === 'horizontal'

  return (
    <div
      className={`flex items-center ${isHorizontal ? 'flex-row' : 'flex-col'}`}
      style={{ height: isHorizontal ? tileHeight : undefined, width: isHorizontal ? undefined : tileWidth }}
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="relative shrink-0 overflow-hidden"
          key={index}
          style={{
            height: tileHeight,
            width: tileWidth,
            marginRight: isHorizontal && index < count - 1 ? -overlap : undefined,
            marginBottom: !isHorizontal && index < count - 1 ? -overlap : undefined,
          }}
        >
          <Image
            alt=""
            aria-hidden
            className="block max-w-none"
            height={SCALLOP_TILE.desktop.height}
            src={SCALLOP_TILE.src}
            style={{ height: tileHeight, width: tileWidth }}
            width={SCALLOP_TILE.desktop.width}
          />
        </div>
      ))}
    </div>
  )
}
