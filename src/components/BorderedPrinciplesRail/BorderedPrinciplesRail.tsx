import { BorderedPrincipleCell } from '@/components/BorderedPrincipleCell'

import {
  BORDERED_PRINCIPLES_RAIL_DESKTOP_COLUMN_WIDTHS,
  BORDERED_PRINCIPLES_RAIL_FIGMA_NODES,
} from './constants'

export type BorderedPrincipleItem = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  title: string
}

type BorderedPrinciplesRailProps = {
  items: readonly BorderedPrincipleItem[]
}

/**
 * Responsive rail of bordered principle cells.
 *
 * Figma `Container` (`7001:2519`):
 *   Desktop — row, gap 8 px, justify-end, 906 px wide; vertical dividers.
 *   Tablet/mobile — column, gap 8 px, items-end; horizontal dividers.
 */
export function BorderedPrinciplesRail({ items }: BorderedPrinciplesRailProps) {
  return (
    <div
      className="flex w-full flex-col items-end gap-2 lg:w-[906px] lg:flex-row lg:items-start lg:justify-end"
      data-figma-node={BORDERED_PRINCIPLES_RAIL_FIGMA_NODES.desktop}
      data-name="Container"
    >
      {items.map((item, index) => (
        <BorderedPrincipleCell
          description={item.description}
          figmaNode={item.figmaNodes?.desktop}
          isLast={index === items.length - 1}
          key={item.title}
          title={item.title}
          widthClassName={BORDERED_PRINCIPLES_RAIL_DESKTOP_COLUMN_WIDTHS[index] ?? 'lg:flex-1 lg:min-w-0'}
        />
      ))}
    </div>
  )
}
