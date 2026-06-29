import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { HOME_HERO_FIGMA_NODES } from './constants'

const SCALLOP_COUNT = 96
const scallopItems = Array.from({ length: SCALLOP_COUNT }, (_, index) => index)

/**
 * Overlapping scallop tiles at the hero bottom (Figma 6797:4776).
 *
 * Mounted on the full-width section shell — not the 1366 px content cap —
 * so the row spans the viewport on ultra-wide screens (Figma bbox 1412 px at
 * x = −23 on the 1366 artboard).
 */
export function HeroScallopFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-[-20px] h-[54px] overflow-hidden"
      data-figma-node={HOME_HERO_FIGMA_NODES.scallopFrame}
    >
      <div className="absolute left-1/2 flex h-full w-max -translate-x-1/2 items-start">
        {scallopItems.map((item) => (
          <div
            className="relative h-[54px] w-[68px] shrink-0 [&:not(:last-child)]:mr-[-12px]"
            key={item}
          >
            <Image
              alt=""
              className="block h-[54px] w-[68px] max-w-none"
              height={54}
              src="/figma/scallop-repeat.svg"
              width={68}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
