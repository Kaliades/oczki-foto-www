import { TICK_ICON } from './constants'

/**
 * Figma `tick-01` (`6794:1861`) — 18×18 checkmark in feature lists.
 */
export function TickIcon() {
  return (
    <span
      aria-hidden="true"
      className="flex shrink-0 items-center pt-0.5"
      data-name="Tick icon container"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="block size-[18px]"
        height={TICK_ICON.sizePx}
        src={TICK_ICON.src}
        width={TICK_ICON.sizePx}
      />
    </span>
  )
}
