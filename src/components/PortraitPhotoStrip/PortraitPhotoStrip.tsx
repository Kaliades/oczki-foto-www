import { CropFramedPhoto } from '@/components/CropFramedPhoto'

import {
  PORTRAIT_PHOTO_STRIP_FIGMA_NODES,
  PORTRAIT_PHOTO_STRIP_LAYOUT,
} from './constants'

export type PortraitPhotoStripItem = {
  id: string
  imageAlt: string
  imageSrc: string
  cropClassName?: string
  href?: string
  figmaNodes?: {
    desktop?: string
    tablet?: string
    mobile?: string
  }
}

type PortraitPhotoStripProps = {
  items: readonly PortraitPhotoStripItem[]
}

/**
 * Horizontal row of portrait crop frames — Figma `Images Container`.
 *
 * Root (flex / grid by breakpoint)
 * └── CropFramedPhoto × n
 *
 * Desktop: fixed 318 × 395 px tiles, 12 px gap (978 px row).
 * Tablet / mobile: 3 equal columns, fixed row height, 12 / 8 px gap.
 */
export function PortraitPhotoStrip({ items }: PortraitPhotoStripProps) {
  const desktop = PORTRAIT_PHOTO_STRIP_LAYOUT.desktop
  const tablet = PORTRAIT_PHOTO_STRIP_LAYOUT.tablet
  const mobile = PORTRAIT_PHOTO_STRIP_LAYOUT.mobile
  const nodes = PORTRAIT_PHOTO_STRIP_FIGMA_NODES

  return (
    <>
      <div
        className="hidden shrink-0 gap-3 lg:flex"
        data-figma-node={nodes.imagesContainer.desktop}
        data-name="Images Container"
      >
        {items.map((item, index) => (
          <CropFramedPhoto
            alt={item.imageAlt}
            cropClassName={item.cropClassName}
            figmaNode={item.figmaNodes?.desktop ?? nodes.image.desktop[index]}
            height={desktop.tileHeight}
            href={item.href}
            key={item.id}
            sizes={`${desktop.tileWidth}px`}
            src={item.imageSrc}
            width={desktop.tileWidth}
          />
        ))}
      </div>

      <div
        className="hidden w-full shrink-0 grid-cols-3 gap-3 md:grid lg:hidden"
        data-figma-node={nodes.imagesContainer.tablet}
        data-name="Images Container"
        style={{ height: tablet.tileHeight }}
      >
        {items.map((item, index) => (
          <CropFramedPhoto
            alt={item.imageAlt}
            className="min-w-0 w-full"
            cropClassName={item.cropClassName}
            figmaNode={item.figmaNodes?.tablet ?? nodes.image.tablet[index]}
            height={tablet.tileHeight}
            href={item.href}
            key={item.id}
            sizes="(max-width: 1023px) 33vw, 318px"
            src={item.imageSrc}
          />
        ))}
      </div>

      <div
        className="grid w-full shrink-0 grid-cols-3 gap-2 md:hidden"
        data-figma-node={nodes.imagesContainer.mobile}
        data-name="Images Container"
        style={{ height: mobile.tileHeight }}
      >
        {items.map((item, index) => (
          <CropFramedPhoto
            alt={item.imageAlt}
            className="min-w-0 w-full"
            cropClassName={item.cropClassName}
            figmaNode={item.figmaNodes?.mobile ?? nodes.image.mobile[index]}
            height={mobile.tileHeight}
            href={item.href}
            key={item.id}
            sizes="104px"
            src={item.imageSrc}
          />
        ))}
      </div>
    </>
  )
}
