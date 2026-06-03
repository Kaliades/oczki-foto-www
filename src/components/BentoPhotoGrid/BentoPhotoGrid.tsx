import {
  BentoPhotoTile,
  type BentoPhotoTileData,
  BENTO_PHOTO_GRID_CLASS,
  BENTO_PHOTO_SPANS,
} from '@/components/BentoPhotoTile'

import { BENTO_PHOTO_GRID_FIGMA_NODES, BENTO_PHOTO_GRID_IMAGE_SIZES } from './constants'

type BentoPhotoGridProps = {
  items: readonly BentoPhotoTileData[]
}

/**
 * Figma `Image Container` — CSS grid bento layout.
 *
 * Root (grid, 2 cols mobile/tablet / 4 cols desktop, gap 8/10)
 * └── BentoPhotoTile × n (col-span 1 narrow / 2 wide, fixed row height)
 *
 * Column widths scale with the section inner cap so tracks match Figma at reference
 * widths (328 / 608 / 1302) without flex-wrap overflow between 1024–1365 px.
 */
export function BentoPhotoGrid({ items }: BentoPhotoGridProps) {
  return (
    <div
      className={BENTO_PHOTO_GRID_CLASS}
      data-figma-node={BENTO_PHOTO_GRID_FIGMA_NODES.imageContainer.desktop}
    >
      {items.map((item, index) => (
        <BentoPhotoTile
          key={item.id}
          item={item}
          sizes={BENTO_PHOTO_GRID_IMAGE_SIZES}
          span={BENTO_PHOTO_SPANS[index] ?? 'narrow'}
        />
      ))}
    </div>
  )
}
