import { NumberedStepCell } from '@/components/NumberedStepCell'

import {
  NUMBERED_STEPS_RAIL_DESKTOP_COLUMN_WIDTHS,
  NUMBERED_STEPS_RAIL_FIGMA_NODES,
} from './constants'

export type NumberedStepItem = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  number: number
  title: string
}

type NumberedStepsRailProps = {
  items: readonly NumberedStepItem[]
}

/**
 * Responsive rail of numbered step cells inside the perforated panel.
 *
 * Desktop — row, gap 8 px, fixed column widths.
 * Tablet/mobile — column stack, gap 8 px, horizontal dividers.
 */
export function NumberedStepsRail({ items }: NumberedStepsRailProps) {
  return (
    <div
      className="flex w-full flex-col gap-2 min-[1366px]:h-full min-[1366px]:flex-row min-[1366px]:items-stretch min-[1366px]:gap-2"
      data-figma-node={NUMBERED_STEPS_RAIL_FIGMA_NODES.desktop}
      data-figma-node-mobile={NUMBERED_STEPS_RAIL_FIGMA_NODES.mobile}
      data-figma-node-tablet={NUMBERED_STEPS_RAIL_FIGMA_NODES.tablet}
      data-name="Container"
    >
      {items.map((item, index) => (
        <NumberedStepCell
          description={item.description}
          figmaNodes={item.figmaNodes}
          isLast={index === items.length - 1}
          key={item.title}
          number={item.number}
          title={item.title}
          widthClassName={NUMBERED_STEPS_RAIL_DESKTOP_COLUMN_WIDTHS[index]}
        />
      ))}
    </div>
  )
}
