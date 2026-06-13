import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type TintedAccordionWellProps = {
  children: ReactNode
  className?: string
  figmaNode?: string
}

/**
 * Primary/200 inline well for bordered accordion lists.
 *
 * Figma `Text Section` (`7001:2404` / `7084:3635` / `7086:4566`):
 *   bg primary/200, gap 16, px 12, pt 12, pb 20.
 */
export function TintedAccordionWell({ children, className, figmaNode }: TintedAccordionWellProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-start gap-4 bg-[var(--oczki-primary-200)] px-3 pt-3 pb-5',
        className,
      )}
      data-figma-node={figmaNode}
      data-name="Text Section"
    >
      {children}
    </div>
  )
}
