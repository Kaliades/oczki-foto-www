import Image from 'next/image'

import { ROTATED_BOTANICAL_ORNAMENT } from './constants'

/**
 * Centred botanical sprig — Figma `OBJECTS` (`6999:26932` / `7102:9529`).
 * Mobile: 47×31 slot; tablet/desktop: 64×42 slot.
 */
export function RotatedBotanicalOrnament() {
  const { desktop, mobile, src } = ROTATED_BOTANICAL_ORNAMENT

  return (
    <>
      <div
        aria-hidden="true"
        className="flex shrink-0 items-center justify-center md:hidden"
        style={{ height: mobile.slotHeightPx, width: mobile.slotWidthPx }}
      >
        <div className="rotate-90">
          <Image
            alt=""
            className="pointer-events-none block select-none"
            height={mobile.assetHeightPx}
            src={src}
            width={mobile.assetWidthPx}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="hidden shrink-0 items-center justify-center md:flex"
        style={{ height: desktop.slotHeightPx, width: desktop.slotWidthPx }}
      >
        <div className="rotate-90">
          <Image
            alt=""
            className="pointer-events-none block select-none"
            height={desktop.assetHeightPx}
            src={src}
            width={desktop.assetWidthPx}
          />
        </div>
      </div>
    </>
  )
}
