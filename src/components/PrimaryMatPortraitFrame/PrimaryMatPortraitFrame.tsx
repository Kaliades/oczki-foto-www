import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  PRIMARY_MAT_PORTRAIT_CROP_CLASS,
  PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES,
} from './constants'

type PrimaryMatPortraitFrameProps = {
  alt: string
  figmaNode?: string
  imageFigmaNode?: string
  src: string
}

/**
 * Portrait in a primary/200 mat — Figma `Image container`.
 *
 * <div Image container> — bg primary-200, p 64
 *   └── <div Image> — cover photo
 *
 * Mobile outer aspect 360/470, inner 232/342.
 * Tablet: auto outer height (p 64 + image h 875) — no aspect ratio; scaling 768/1003
 *   with viewport width left dead mat space below the fixed-height image.
 * Desktop: half-width column, image flex-1 fill.
 */
export function PrimaryMatPortraitFrame({
  alt,
  figmaNode,
  imageFigmaNode,
  src,
}: PrimaryMatPortraitFrameProps) {
  return (
    <div
      className="flex w-full shrink-0 flex-col items-start bg-[var(--oczki-primary-200)] p-16 aspect-[360/470] md:aspect-auto min-[1366px]:aspect-auto min-[1366px]:w-1/2 min-[1366px]:self-stretch"
      data-figma-node={figmaNode ?? PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES.desktop}
      data-figma-node-mobile={PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES.mobile}
      data-figma-node-tablet={PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES.tablet}
      data-name="Image container"
    >
      <div
        className="relative w-full shrink-0 overflow-hidden aspect-[232/342] md:aspect-auto md:h-[875px] min-[1366px]:min-h-px min-[1366px]:flex-1 min-[1366px]:aspect-auto"
        data-figma-node={imageFigmaNode ?? PRIMARY_MAT_PORTRAIT_FRAME_FIGMA_NODES.image.desktop}
        data-name="Image"
      >
        <Image
          alt={alt}
          className={PRIMARY_MAT_PORTRAIT_CROP_CLASS}
          fill
          sizes="(min-width: 1366px) 555px, (min-width: 768px) 640px, 232px"
          src={src}
        />
      </div>
    </div>
  )
}
