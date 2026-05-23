import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type CtaContentProps = {
  headingPlain: string
  headingEmphasis: string
  body: string
  cta: SectionLink
  headingId?: string
}

/**
 * Centred copy + button inside the ornate CTA frame.
 *
 * Figma text container (7105:8642 / 7105:8605 / 7105:8568):
 *   - desktop: px-336 py-64 inside 1270×370 container
 *   - tablet:  p-64 inside 608×362 container
 *   - mobile:  px-16 pt-24 inside 328×345 container (offset within 593 frame shell)
 */
export const CtaContent = ({
  headingPlain,
  headingEmphasis,
  body,
  cta,
  headingId = 'home-cta-heading',
}: CtaContentProps) => {
  const href = resolveLinkHref(cta)

  return (
    <div className="relative z-10 flex w-full flex-col items-center gap-9 px-4 pb-6 pt-[163px] md:px-16 md:py-16 md:pt-16 lg:gap-9 lg:px-[336px] lg:py-16">
      <div className="flex w-full max-w-[296px] flex-col items-center gap-[10px] md:max-w-[480px] md:gap-4 lg:max-w-[598px]">
        <h2
          className="oczki-heading-l w-full text-center text-[var(--oczki-primary-800)]"
          id={headingId}
        >
          {headingPlain}
          <em className="italic">{headingEmphasis}</em>?
        </h2>
        <p className="oczki-body-l w-full text-center text-[var(--oczki-primary-700)] lg:max-w-[490px]">
          {body}
        </p>
      </div>

      {href && cta.label ? (
        <OczkiButton className="w-full md:w-auto" href={href}>
          {cta.label}
        </OczkiButton>
      ) : null}
    </div>
  )
}
