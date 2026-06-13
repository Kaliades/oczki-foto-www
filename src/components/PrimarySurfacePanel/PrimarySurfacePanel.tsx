import type { ReactNode } from 'react'

import { cn } from '@/utilities/ui'

type PrimarySurfacePanelProps = {
  children: ReactNode
  className?: string
  figmaNode?: string
}

/**
 * Cream primary/100 content card for photo-overlay sections.
 *
 * Figma `Container` (`7000:26957` / `7092:4631` / `7093:6016`):
 *   <div Container> — primary/100, flex-col, items-start
 *     └── children (intro stack + feature list, …)
 */
export function PrimarySurfacePanel({ children, className, figmaNode }: PrimarySurfacePanelProps) {
  return (
    <div
      className={cn(
        'relative flex w-full shrink-0 flex-col items-start bg-[var(--oczki-primary-100)] p-5',
        'gap-8 md:w-[514px] md:gap-12 md:p-12',
        'min-[1366px]:gap-9',
        className,
      )}
      data-figma-node={figmaNode}
      data-name="Container"
    >
      {children}
    </div>
  )
}
