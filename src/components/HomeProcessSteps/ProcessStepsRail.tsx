import type { ProcessStepItem } from './constants'
import { ProcessStepCard } from './ProcessStepCard'

type ProcessStepsRailProps = {
  items: readonly ProcessStepItem[]
}

/**
 * Layout container for the three process-step cards.
 *
 * Spacing:
 *   - mobile / tablet: vertical stack with extra gap so rotated cards do not
 *     overlap when the viewport narrows (Figma uses 12 / 8 px; we use 24 / 20
 *     px on top of per-slot `min-h` reserves in `ProcessStepCard`).
 *   - desktop: 3-column grid, 12 px horizontal gap (Figma 6789:17678).
 */
export const ProcessStepsRail = ({ items }: ProcessStepsRailProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-y-6 md:gap-y-5 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-0">
      {items.map((item, index) => (
        <ProcessStepCard key={index} index={index} item={item} />
      ))}
    </div>
  )
}
