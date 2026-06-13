import { PrimaryBorderedPanel } from '@/components/PrimaryBorderedPanel'
import { cn } from '@/utilities/ui'

import { PRIMARY_BORDERED_PANEL_LIST_FIGMA_NODES } from './constants'

export type PrimaryBorderedPanelItem = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  title: string
}

type PrimaryBorderedPanelListProps = {
  figmaNode?: string
  items: readonly PrimaryBorderedPanelItem[]
  listClassName?: string
}

/**
 * Vertical stack of primary-bordered panels — Figma `Content container`.
 *
 * Root: flex-col, items-end, full width.
 * Desktop/tablet gap 8 px; mobile gap 6 px.
 */
export function PrimaryBorderedPanelList({
  figmaNode,
  items,
  listClassName,
}: PrimaryBorderedPanelListProps) {
  return (
    <div
      className={cn('flex w-full flex-col items-end gap-1.5 md:gap-2', listClassName)}
      data-figma-node={figmaNode ?? PRIMARY_BORDERED_PANEL_LIST_FIGMA_NODES.desktop}
      data-figma-node-mobile={PRIMARY_BORDERED_PANEL_LIST_FIGMA_NODES.mobile}
      data-figma-node-tablet={PRIMARY_BORDERED_PANEL_LIST_FIGMA_NODES.tablet}
      data-name="Content container"
    >
      {items.map((item) => (
        <PrimaryBorderedPanel
          description={item.description}
          figmaNode={item.figmaNodes?.desktop}
          key={item.title}
          title={item.title}
        />
      ))}
    </div>
  )
}
