import { ChecklistFeatureCard } from '@/components/ChecklistFeatureCard'
import type { ChecklistFeatureCardTilt } from '@/components/ChecklistFeatureCard'

export type ChecklistFeatureListItem = {
  description: string
  figmaNode?: string
  id: string
  tilt?: ChecklistFeatureCardTilt
  title: string
}

type ChecklistFeatureListProps = {
  figmaNode?: string
  items: readonly ChecklistFeatureListItem[]
}

/**
 * Vertical checklist rail — Figma `gap-[8px]` base; `gap-[12px]` gives tilted cards
 * breathing room so rotated edges do not visually overlap.
 */
export function ChecklistFeatureList({ figmaNode, items }: ChecklistFeatureListProps) {
  return (
    <div
      className="flex w-full flex-col items-end gap-3"
      data-figma-node={figmaNode}
      data-name="Text Block Container"
    >
      {items.map((item) => (
        <ChecklistFeatureCard
          description={item.description}
          figmaNode={item.figmaNode}
          key={item.id}
          tilt={item.tilt}
          title={item.title}
        />
      ))}
    </div>
  )
}
