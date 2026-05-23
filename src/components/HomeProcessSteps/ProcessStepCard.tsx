import { getStepDecoration, type ProcessStepItem } from './constants'
import { StepBacksplash } from './StepBacksplash'
import { StepForegroundCard } from './StepForegroundCard'

type ProcessStepCardProps = {
  item: ProcessStepItem
  index: number
}

/**
 * Pairs a green striped backsplash with a beige foreground card, rotated in
 * opposite directions to produce the slightly off-axis composition from Figma.
 *
 * Width per breakpoint — Figma values × 0.95 (both backsplash + foreground
 * share this box via `inset-0` / `w-full`):
 *   - mobile  ≤ 312 px (328 × 0.95)
 *   - tablet  ≤ 456 px (480 × 0.95)
 *   - desktop ≤ 405 px (≈ 426 × 0.95 grid column)
 */
export const ProcessStepCard = ({ item, index }: ProcessStepCardProps) => {
  const { slotMinHeightClass } = getStepDecoration(index)

  return (
    <div
      className={[
        'relative isolate mx-auto flex w-full max-w-[312px] items-center md:max-w-[456px] lg:min-h-0 lg:max-w-[405px]',
        slotMinHeightClass,
      ].join(' ')}
    >
      <div className="relative w-full">
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
    </div>
  )
}
