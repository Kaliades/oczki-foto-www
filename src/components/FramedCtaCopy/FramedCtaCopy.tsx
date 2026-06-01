import { OczkiButton } from '@/components/OczkiButton'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

export type FramedCtaHeading = {
  start: string
  emphasis: string
  end?: string
}

type FramedCtaCopyProps = {
  body: string
  cta: SectionLink
  heading: FramedCtaHeading
  headingId?: string
  /** Full-width primary button on mobile (gallery CTA); auto width on tablet+. */
  fullWidthButtonOnMobile?: boolean
}

/**
 * Copy stack for ornate-framed CTA panels — Figma 6962:4041 / 7104:19142 / 7104:19453.
 *
 * Text cluster gap 16 px; stack→button gap 36 px (applied by the panel wrapper).
 * Heading uses display `oczki-heading-l` (36 px); body uses `oczki-body-l` (16 px).
 */
export function FramedCtaCopy({
  body,
  cta,
  heading,
  headingId = 'framed-cta-heading',
  fullWidthButtonOnMobile = true,
}: FramedCtaCopyProps) {
  const href = resolveLinkHref(cta)

  return (
    <>
      <div
        className="flex w-full flex-col items-start gap-4"
        data-figma-node="6962:4041"
        data-name="Text container"
      >
        <SplitDisplayHeading
          className="oczki-heading-l text-center text-[var(--oczki-primary-800)]"
          emphasis={heading.emphasis}
          end={heading.end}
          id={headingId}
          sizeClassName=""
          start={heading.start}
        />
        <div
          className="flex w-full flex-col items-center"
          data-name="Secondary text container"
        >
          <p className="oczki-body-l w-full max-w-[490px] text-center text-[var(--oczki-primary-700)]">
            {body}
          </p>
        </div>
      </div>

      {href && cta.label ? (
        <OczkiButton
          className={
            fullWidthButtonOnMobile
              ? 'w-full shrink-0 md:w-auto md:self-center'
              : 'shrink-0 self-center'
          }
          href={href}
        >
          {cta.label}
        </OczkiButton>
      ) : null}
    </>
  )
}
