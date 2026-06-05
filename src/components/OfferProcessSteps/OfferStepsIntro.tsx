import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type OfferStepsIntroProps = {
  headingPlain: string
  headingEmphasis: string
  intro: string
  cta: SectionLink
  headingId?: string
}

/**
 * Left column of "Kroki do realizacji oferty" on desktop — and the top
 * stacked block on tablet / mobile.
 *
 * Figma references:
 * - Desktop column 7105:7510 — fixed `w-[535px]`, vertical auto-layout
 *   with `gap-[32px]` between the heading cluster and the CTA.
 * - Heading cluster 7105:7511 — vertical auto-layout with `gap-[16px]`.
 * - The heading uses `header/l` (36 px The Seasons) with an italic
 *   emphasis on the second run; the body uses `body/l` (16 px
 *   Instrument Sans). Both kept identical across breakpoints — the
 *   only thing that changes is the surrounding column width.
 *
 * The CTA is full-width on mobile (matches Figma mobile node 7105:7516
 * where the button stretches across the 296 px content area) and
 * collapses to its natural width on tablet+ so the scallop ends stay
 * snug against the label.
 */
export const OfferStepsIntro = ({
  headingPlain,
  headingEmphasis,
  intro,
  cta,
  headingId,
}: OfferStepsIntroProps) => {
  const ctaHref = resolveLinkHref(cta)

  return (
    <div className="flex w-full flex-col items-start gap-8 lg:w-[535px] lg:shrink-0">
      <div className="flex w-full flex-col items-start gap-4">
        <h2
          className="oczki-heading-l w-full text-[var(--oczki-primary-800)]"
          id={headingId}
        >
          {headingPlain}
          <em className="italic">{headingEmphasis}</em>
        </h2>
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)]">{intro}</p>
      </div>

      {ctaHref && cta.label ? (
        <OczkiButton className="w-full md:w-auto" href={ctaHref}>
          {cta.label}
        </OczkiButton>
      ) : null}
    </div>
  )
}
