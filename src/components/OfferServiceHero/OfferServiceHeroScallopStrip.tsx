import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  OFFER_SERVICE_HERO_DESKTOP_LAYOUT,
  OFFER_SERVICE_HERO_FIGMA_NODES,
  OFFER_SERVICE_HERO_SCALLOP_ASSET,
} from './constants'

const { frameHeight, scallop } = OFFER_SERVICE_HERO_DESKTOP_LAYOUT

/**
 * Vertical scallop seam — desktop only. Figma `6994:25754`.
 *
 * `inset-y-0` on the 569 px story column — flush with `Main image` top and bottom.
 * Figma asset frame is 566 px; inner width stretches to `frameHeight` after `-rotate-90`.
 */
export function OfferServiceHeroScallopStrip() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 left-[381px] flex w-[434px] items-start justify-center overflow-hidden"
      data-figma-node={OFFER_SERVICE_HERO_FIGMA_NODES.scallopStrip.desktop}
      data-name="Image list"
    >
      <div className="-rotate-90 flex-none">
        <div className="relative h-[434px]" style={{ width: frameHeight }}>
          <div
            className="absolute inset-y-0"
            style={{
              left: `-${scallop.imageBleedXPercent}%`,
              right: `-${scallop.imageBleedXPercent}%`,
            }}
          >
            <Image
              alt=""
              className="block size-full max-w-none"
              height={434}
              src={OFFER_SERVICE_HERO_SCALLOP_ASSET}
              width={964}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
