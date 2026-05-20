import type { ProcessStepItem } from './constants'
import { ProcessStepCard } from './ProcessStepCard'

type ProcessStepsRailProps = {
  items: readonly ProcessStepItem[]
}

/**
 * Layout container for the three process-step cards.
 *
 * - Mobile / Tablet (< lg): a vertical stack with generous vertical spacing so
 *   that the rotation overlap between cards stays balanced.
 * - Desktop (≥ lg): a 3-column grid, equal width, gap from Figma (12 px).
 *
 * Extra horizontal padding keeps the rotated backsplash + foreground from being
 * clipped at the section edges.
 */
export const ProcessStepsRail = ({ items }: ProcessStepsRailProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-y-12 px-2 md:gap-y-16 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-0 lg:px-0">
      {items.map((item, index) => (
        <ProcessStepCard key={index} item={item} />
      ))}
    </div>
  )
}
