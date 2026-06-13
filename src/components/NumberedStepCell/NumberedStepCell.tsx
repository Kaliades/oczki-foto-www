import { cn } from '@/utilities/ui'

import {
  NUMBERED_STEP_CELL_COPY_TYPOGRAPHY,
} from './constants'

type NumberedStepCellProps = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  isLast: boolean
  number: number
  title: string
  widthClassName?: string
}

/**
 * Handwritten index + title/body copy inside a perforated panel cell.
 *
 * Figma `Container` (`6972:15553`):
 *   <div Container> — centred column, gap 28 px, pt 16 / pb 20 / px 16
 *     ├── <p> — handwritten header/s, tertiary/700
 *     └── <div Container> — h 138 px copy stack, gap 6 px
 *         ├── title — body/xl, primary/800
 *         └── description — body/l, primary/700
 */
export function NumberedStepCell({
  description,
  figmaNodes,
  isLast,
  number,
  title,
  widthClassName,
}: NumberedStepCellProps) {
  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col items-center justify-center text-center [word-break:break-word]',
        'gap-2.5 px-2 pt-3 pb-4 md:min-h-[160px] md:gap-5 md:px-4 md:pb-5',
        'min-[1366px]:h-full min-[1366px]:gap-7 min-[1366px]:px-4 min-[1366px]:pt-4 min-[1366px]:pb-5',
        !isLast &&
          'border-b border-[var(--oczki-tertiary-300)] min-[1366px]:border-b-0 min-[1366px]:relative min-[1366px]:after:absolute min-[1366px]:after:top-5 min-[1366px]:after:bottom-5 min-[1366px]:after:right-0 min-[1366px]:after:w-px min-[1366px]:after:bg-[var(--oczki-tertiary-300)] min-[1366px]:after:content-[""]',
        widthClassName,
      )}
      data-figma-node={figmaNodes?.desktop}
      data-figma-node-mobile={figmaNodes?.mobile}
      data-figma-node-tablet={figmaNodes?.tablet}
      data-name="Container"
    >
      <p className="oczki-handwritten-s w-full shrink-0 leading-[0.98] text-[var(--oczki-tertiary-700)] min-[1366px]:w-[262px]">
        {number}
      </p>
      <div className="flex w-full flex-col items-start gap-1 leading-[1.48] md:gap-1.5 min-[1366px]:h-[138px] min-[1366px]:w-[262px] min-[1366px]:gap-1.5">
        <p
          className={cn(
            NUMBERED_STEP_CELL_COPY_TYPOGRAPHY.title,
            'w-full shrink-0 tracking-[-0.3px] text-[var(--oczki-primary-800)]',
          )}
        >
          {title}
        </p>
        <p
          className={cn(
            NUMBERED_STEP_CELL_COPY_TYPOGRAPHY.description,
            'w-full shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-700)]',
          )}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
