import Image from 'next/image'

import { cn } from '@/utilities/ui'

import type { FullBleedPhotoCrop } from './constants'

type FullBleedPhotoLayerProps = {
  alt: string
  crop: FullBleedPhotoCrop
  figmaNode?: string
  src: string
}

/**
 * Full-bleed background photograph with a primary/100 fallback mat.
 *
 * Figma `Image` layer stack:
 *   <div aria-hidden absolute inset-0>
 *     ├── solid primary/100
 *     └── overflow clip → positioned `<img>` (breakpoint-specific crop)
 */
export function FullBleedPhotoLayer({ alt, crop, figmaNode, src }: FullBleedPhotoLayerProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0" data-figma-node={figmaNode}>
      <div className="absolute inset-0 bg-[var(--oczki-primary-100)]" />
      <div className="absolute inset-0 overflow-hidden">
        <Image
          alt={alt}
          className={cn('object-cover md:hidden', crop.mobile)}
          height={2048}
          sizes="100vw"
          src={src}
          width={1365}
        />
        <Image
          alt={alt}
          className={cn('hidden object-cover md:block min-[1366px]:hidden', crop.tablet)}
          height={2048}
          sizes="100vw"
          src={src}
          width={1365}
        />
        <Image
          alt={alt}
          className={cn('hidden object-cover min-[1366px]:block', crop.desktop)}
          height={2048}
          sizes="100vw"
          src={src}
          width={1365}
        />
      </div>
    </div>
  )
}
