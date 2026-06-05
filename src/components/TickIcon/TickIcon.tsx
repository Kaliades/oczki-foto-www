import { cn } from '@/utilities/ui'

import { TICK_ICON_LAYOUT, type TickIconVariant } from './constants'

type TickIconProps = {
  className?: string
  /** Figma `Checkbox` 24 px box; package `Tick icon` 18 px box. */
  variant?: TickIconVariant
}

const TICK_PATH =
  'M0.75 8.2502C0.75 8.2502 2.25 8.2502 4.25 11.7502C4.25 11.7502 9.80882 2.58354 14.75 0.750204'

/**
 * Figma `tick-01` (`6794:1861`) — tertiary stroke, inset inside `Checkbox` / `Tick icon` box.
 */
export function TickIcon({ className, variant = 'package' }: TickIconProps) {
  const { bleedInsetClassName, boxSizePx, containerOffsetClassName } = TICK_ICON_LAYOUT[variant]

  return (
    <div
      aria-hidden="true"
      className={cn('flex shrink-0 items-center', containerOffsetClassName, className)}
      data-name={variant === 'checklist' ? 'Checkbox Container' : 'Tick icon container'}
    >
      <div
        className="relative shrink-0 overflow-clip"
        data-name={variant === 'checklist' ? 'Checkbox' : 'Tick icon'}
        style={{ height: boxSizePx, width: boxSizePx }}
      >
        <div
          className="absolute bottom-1/4 left-[20.83%] right-[20.83%] top-[29.17%]"
          data-name="elements"
        >
          <svg
            aria-hidden
            className={cn('absolute block size-full max-w-none', bleedInsetClassName)}
            fill="none"
            viewBox="0 0 15.5002 12.5002"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d={TICK_PATH}
              stroke="var(--oczki-tertiary-700)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
