import { BorderedFeatureCell } from '@/components/BorderedFeatureCell'
import { cn } from '@/utilities/ui'

import { BORDERED_FEATURE_LIST_FIGMA_NODES } from './constants'

export type BorderedFeatureItem = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  title: string
}

type BorderedFeatureListProps = {
  cellDensity?: 'compact' | 'default'
  figmaNode?: string
  items: readonly BorderedFeatureItem[]
  listClassName?: string
}

/**
 * Vertical stack of bordered feature cells — Figma `Container`.
 *
 * Root (`6972:15592` / `7092:4635` / `7093:6020`): flex-col, items-end, full width.
 * Desktop adds 8 px row gap; tablet/mobile rely on divider borders only.
 */
export function BorderedFeatureList({
  cellDensity = 'default',
  figmaNode,
  items,
  listClassName,
}: BorderedFeatureListProps) {
  const lastIndex = items.length - 1

  return (
    <div
      className={cn(
        'flex w-full flex-col items-end min-[1366px]:gap-2',
        listClassName,
      )}
      data-figma-node={figmaNode ?? BORDERED_FEATURE_LIST_FIGMA_NODES.desktop}
      data-name="Container"
    >
      {items.map((item, index) => (
        <BorderedFeatureCell
          density={cellDensity}
          description={item.description}
          figmaNode={item.figmaNodes?.desktop}
          key={item.title}
          showDivider={index < lastIndex}
          title={item.title}
        />
      ))}
    </div>
  )
}
