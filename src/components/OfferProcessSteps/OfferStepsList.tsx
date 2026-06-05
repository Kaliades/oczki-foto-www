import { OfferStepCard } from './OfferStepCard'
import type { OfferProcessStep } from './constants'

type OfferStepsListProps = {
  items: readonly OfferProcessStep[]
}

/**
 * Right column of "Kroki do realizacji oferty" on desktop — and the
 * second stacked block on tablet / mobile.
 *
 * Figma container: 7105:7517. Auto-layout vertical with `gap-[32px]`
 * between step rows. Each row itself is laid out by `OfferStepCard`.
 */
export const OfferStepsList = ({ items }: OfferStepsListProps) => {
  return (
    <ol className="flex min-w-0 flex-1 list-none flex-col items-start gap-8">
      {items.map((step, index) => (
        <li className="w-full" key={step.number}>
          <OfferStepCard index={index} step={step} />
        </li>
      ))}
    </ol>
  )
}
