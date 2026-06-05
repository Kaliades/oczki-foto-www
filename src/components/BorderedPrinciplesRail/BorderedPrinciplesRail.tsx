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
 *   Desktop — row, gap 8 px, full inner width; vertical dividers between columns.
 *   Tablet/mobile — column, gap 8 px; horizontal dividers.
 */
export function BorderedPrinciplesRail({ items }: BorderedPrinciplesRailProps) {
  return (
    <div
      className="flex w-full flex-col items-end gap-0 md:gap-2 min-[1366px]:flex-row min-[1366px]:items-start"
      data-figma-node={BORDERED_PRINCIPLES_RAIL_FIGMA_NODES.desktop}
      data-figma-node-mobile={BORDERED_PRINCIPLES_RAIL_FIGMA_NODES.mobile}
      data-figma-node-tablet={BORDERED_PRINCIPLES_RAIL_FIGMA_NODES.tablet}
      data-name="Container"
    >
      {items.map((item, index) => (
        <BorderedPrincipleCell
          description={item.description}
          figmaNodes={item.figmaNodes}
          isLast={index === items.length - 1}
          key={item.title}
          title={item.title}
          widthClassName={
            BORDERED_PRINCIPLES_RAIL_DESKTOP_COLUMN_WIDTHS[index] ?? 'min-[1366px]:min-w-0 min-[1366px]:flex-1'
          }
        />
      ))}
    </div>
  )
}
