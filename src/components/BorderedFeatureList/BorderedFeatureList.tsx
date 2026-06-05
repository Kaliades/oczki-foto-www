import { BorderedFeatureCell } from '@/components/BorderedFeatureCell'

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
  figmaNode?: string
  items: readonly BorderedFeatureItem[]
}

/**
 * Vertical stack of bordered feature cells — Figma `Container`.
 *
 * Root (`6998:26821`): flex-col, items-end, full width.
 * Each child is a `BorderedFeatureCell` with border-b except the visual rhythm
 * comes from every row carrying border-b (including the last visible divider in Figma).
 */
export function BorderedFeatureList({ figmaNode, items }: BorderedFeatureListProps) {
  return (
    <div
      className="flex w-full flex-col items-end"
      data-figma-node={figmaNode ?? BORDERED_FEATURE_LIST_FIGMA_NODES.desktop}
      data-name="Container"
    >
      {items.map((item) => (
        <BorderedFeatureCell
          description={item.description}
          figmaNode={item.figmaNodes?.desktop}
          key={item.title}
          title={item.title}
        />
      ))}
    </div>
  )
}
