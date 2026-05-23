import type { ProcessStepItem } from './constants'
import { StepBacksplash } from './StepBacksplash'
import { StepForegroundCard } from './StepForegroundCard'

type ProcessStepCardProps = {
  item: ProcessStepItem
}

/**
 * Pairs a green striped backsplash with a beige foreground card, rotated in
 * opposite directions to produce the slightly off-axis composition from Figma.
 *
 * Width per breakpoint (matches Figma):
 *   - mobile  ≤ 328 px (Container 7105:13768 inner)
 *   - tablet  ≤ 480 px (Container 7105:11473 inner card slot)
 *   - desktop = 100 % of the grid column (≈ 426 px in Container 6789:17678)
 */
export const ProcessStepCard = ({ item }: ProcessStepCardProps) => {
  return (
    <div className="relative isolate mx-auto w-full max-w-[328px] md:max-w-[480px] lg:max-w-none">
      <StepBacksplash rotation={item.backsplashRotation} />
      <div className="relative z-10">
        <StepForegroundCard
          title={item.title}
          paragraphs={item.paragraphs}
          ornamentSrc={item.ornamentSrc}
          rotation={item.foregroundRotation}
        />
      </div>
    </div>
  )
}
