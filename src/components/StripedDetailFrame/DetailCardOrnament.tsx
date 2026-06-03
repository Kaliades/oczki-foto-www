import Image from 'next/image'

import { DETAIL_CARD_ORNAMENT } from './constants'

/**
 * Botanical sprig in the bottom-right of a framed detail card.
 * Figma rotates the portrait asset −90° inside a 48.6×27 slot.
 */
export function DetailCardOrnament() {
  const { heightPx, slotHeightPx, slotWidthPx, src, widthPx } = DETAIL_CARD_ORNAMENT

  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center"
      style={{ height: slotHeightPx, width: slotWidthPx }}
    >
      <div className="-rotate-90">
        <Image
          alt=""
          className="pointer-events-none block select-none"
          height={heightPx}
          src={src}
          width={widthPx}
        />
      </div>
    </div>
  )
}
