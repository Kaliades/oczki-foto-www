import type { ProcessStepItem } from './constants'
import { ProcessStepCard } from './ProcessStepCard'

type ProcessStepsRailProps = {
  items: readonly ProcessStepItem[]
}

/**
 * Layout container for the three process-step cards.
 *
 * Spacing reproduces the Figma source 1:1:
 *   - mobile  (Container 7105:13768 → 328 px wide): vertical stack, 12 px gap
 *   - tablet  (Container 7105:11473 → 608 px wide): vertical stack, 8 px gap
 *   - desktop (Container 6789:17678 → 1302 px wide): 3-column grid, 12 px gap
 *
 * The cards are slightly rotated and their backsplashes overflow their bounds
 * by design — we keep `overflow-visible` on the rail and let the section
 * absorb the visual extension.
 */
export const ProcessStepsRail = ({ items }: ProcessStepsRailProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-y-3 md:gap-y-2 lg:grid-cols-3 lg:gap-x-3 lg:gap-y-0">
      {items.map((item, index) => (
        <ProcessStepCard key={index} item={item} />
      ))}
    </div>
  )
}
