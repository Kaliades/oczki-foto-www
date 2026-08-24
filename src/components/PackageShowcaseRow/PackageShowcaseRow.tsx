import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import { PhotoUnitReveal } from '@/components/PhotoUnitReveal'

import { PackagePanel, type PackagePanelData } from '@/components/PackagePanel'
import { cn } from '@/utilities/ui'

export type PackageImagePosition = {
  heightPercent: number
  topPercent: number
}

type PackageShowcaseRowProps = {
  figmaNode?: string
  image: {
    alt: string
    figmaNode?: string
    position?: PackageImagePosition
    src: string
  }
  panel: PackagePanelData
}

/**
 * One package band — Figma `Row`.
 *
 * Desktop (1366): 50/50 row, image h 640.
 * Tablet (768): column — panel h 400, image aspect 768/720.
 * Mobile (360): column — auto panel, image aspect 360/337.
 */
export function PackageShowcaseRow({ figmaNode, image, panel }: PackageShowcaseRowProps) {
  const { position } = image

  return (
    <div
      className="flex w-full flex-col min-[1366px]:flex-row min-[1366px]:items-start"
      data-figma-node={figmaNode}
      data-name="Row"
    >
      <PackagePanel data={panel} />

      <div
        className={cn(
          'relative w-full shrink-0 overflow-hidden',
          'aspect-[360/337] md:aspect-[768/720] min-[1366px]:aspect-auto min-[1366px]:h-[640px] min-[1366px]:min-w-0 min-[1366px]:flex-1',
        )}
        data-figma-node={image.figmaNode}
        data-name="Image"
      >
        <PhotoUnitReveal className="absolute inset-0">
          {position ? (
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <Image
                alt={image.alt}
                className="absolute left-0 w-full max-w-none object-cover"
                height={1280}
                sizes="(min-width: 1366px) 683px, 100vw"
                src={image.src}
                style={{
                  height: `${position.heightPercent}%`,
                  top: `${position.topPercent}%`,
                }}
                width={1920}
              />
            </div>
          ) : (
            <Image
              alt={image.alt}
              className="object-cover"
              fill
              sizes="(min-width: 1366px) 683px, 100vw"
              src={image.src}
            />
          )}
        </PhotoUnitReveal>
      </div>
    </div>
  )
}
