import { cn } from '@/utilities/ui'

import { ACCORDION_CHEVRON_SRC } from './constants'

type AccordionChevronProps = {
  open: boolean
  className?: string
}

/**
 * FAQ accordion arrow — Figma `6` (`7064:15119`) inside 16×20 glyph, 20×26 icon frame.
 * Open: `rotate-90` (up); closed: `-rotate-90` (down).
 */
export function AccordionChevron({ open, className }: AccordionChevronProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('flex shrink-0 flex-col items-start pt-1.5', className)}
      data-figma-node="7064:15118"
    >
      <span className="flex h-5 w-4 items-center justify-center text-[var(--oczki-primary-700)]">
        <span className={cn('flex-none', open ? 'rotate-90' : '-rotate-90')}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="block h-4 w-5"
            height={16}
            src={ACCORDION_CHEVRON_SRC}
            width={20}
          />
        </span>
      </span>
    </span>
  )
}
