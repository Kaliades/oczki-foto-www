import { cn } from '@/utilities/ui'

import { BORDERED_PRINCIPLE_COPY_TYPOGRAPHY } from './constants'

type BorderedPrincipleCellProps = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  isLast: boolean
  title: string
  widthClassName?: string
}

/**
 * Title + body copy cell with a responsive divider edge.
 *
 * Figma `Container` (`7001:2520`):
 *   <div Container> — p 16 px; gap 10 px between title and body
 *     ├── <p Subtitle> — body/l, primary-800
 *     └── <p Text> — body/m, primary-700
 *
 * Tablet/mobile (`7092:4353`): border-b + px 64 py 16.
 * Desktop (`7001:2520`): border-r on first two columns; last column has no border.
 */
export function BorderedPrincipleCell({
  description,
  figmaNodes,
  isLast,
  title,
  widthClassName,
}: BorderedPrincipleCellProps) {
  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col items-start gap-2 py-4 md:gap-2.5 md:px-16 md:py-4 min-[1366px]:gap-2.5 min-[1366px]:p-4',
        !isLast &&
          'border-b border-[var(--oczki-primary-300)] min-[1366px]:border-b-0 min-[1366px]:border-r',
        widthClassName,
      )}
      data-figma-node={figmaNodes?.desktop}
      data-figma-node-mobile={figmaNodes?.mobile}
      data-figma-node-tablet={figmaNodes?.tablet}
      data-name="Container"
    >
      <p
        className={cn(
          BORDERED_PRINCIPLE_COPY_TYPOGRAPHY.title,
          'w-full shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-800)]',
        )}
      >
        {title}
      </p>
      <p
        className={cn(
          BORDERED_PRINCIPLE_COPY_TYPOGRAPHY.description,
          'w-full shrink-0 tracking-[-0.14px] text-[var(--oczki-primary-700)]',
        )}
      >
        {description}
      </p>
    </div>
  )
}
