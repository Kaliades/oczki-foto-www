import type { ProcessStepItem } from './constants'
import { StepBacksplash } from './StepBacksplash'
import { StepForegroundCard } from './StepForegroundCard'

type ProcessStepCardProps = {
  item: ProcessStepItem
}

/**
 * Pairs a green striped backsplash with a beige foreground card, rotated in
 * opposite directions to produce the slightly off-axis composition from Figma.
 * The wrapper takes its size from the foreground card; the backsplash is
 * absolutely positioned behind, slightly inset.
 */
export const ProcessStepCard = ({ item }: ProcessStepCardProps) => {
  return (
    <div className="relative isolate w-full">
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
