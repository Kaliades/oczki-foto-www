import { OfferStepDiamond } from './OfferStepDiamond'
import type { OfferProcessStep } from './constants'

type OfferStepCardProps = {
  step: OfferProcessStep
  /** Index in the list. Step 0 (the first one) uses the rose accent. */
  index: number
}

/**
 * Single row in the "Krok po kroku do pięknych zdjęć" list — a diamond
 * step indicator on the left and a title + body block on the right.
 *
 * Figma references (per breakpoint, all share the same row geometry):
 * - Desktop / tablet / mobile: 7105:7518 (Step Container) — diamond
 *   54 × 54, 20 px gap to info column, info column has `pt-[12px]` so
 *   the heading sits visually centred on the diamond.
 *
 * The first step (index 0) uses the rose/tertiary palette to mark the
 * starting point. All later steps fall back to the muted primary look.
 */
export const OfferStepCard = ({ step, index }: OfferStepCardProps) => {
  const variant = index === 0 ? 'active' : 'muted'

  return (
    <div className="flex w-full items-start gap-5">
      <OfferStepDiamond value={step.number} variant={variant} />
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2 pt-[12px]">
        <h3 className="oczki-body-xl w-full text-[var(--oczki-primary-800)]">{step.title}</h3>
        <div className="flex w-full flex-col gap-0 text-[var(--oczki-primary-700)]">
          {step.paragraphs.map((paragraph, paragraphIndex) => (
            <p className="oczki-body-m" key={paragraphIndex}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
