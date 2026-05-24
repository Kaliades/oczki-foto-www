import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type CtaContentProps = {
  headingPlain: string
  headingEmphasis: string
  body: string
  cta: SectionLink
  headingId?: string
  variant: 'desktop' | 'tablet' | 'mobile'
}

/**
 * Copy + CTA — Figma 7105:8641 / 8604 / 8567.
 *
 * Tablet (8605): text 480 px, heading/body gap 16 px, stack→button gap 36 px,
 * heading 36 px (oczki-heading-l), body 16 px (oczki-body-l).
 */
export const CtaContent = ({
  headingPlain,
  headingEmphasis,
  body,
  cta,
  headingId = 'home-cta-heading',
  variant,
}: CtaContentProps) => {
  const href = resolveLinkHref(cta)

  const textClusterClassName =
    variant === 'mobile'
      ? 'flex w-full max-w-[296px] flex-col items-start gap-[10px]'
      : variant === 'tablet'
        ? 'flex w-full max-w-[480px] flex-col items-center gap-4'
        : 'flex w-full max-w-[598px] flex-col items-start gap-4'

  const bodyClassName =
    variant === 'desktop'
      ? 'oczki-body-l w-[490px] max-w-full text-center text-[var(--oczki-primary-700)]'
      : 'oczki-body-l w-full text-center text-[var(--oczki-primary-700)]'

  return (
    <>
      <div className={textClusterClassName}>
        <h2
          className="oczki-heading-l w-full text-center text-[var(--oczki-primary-800)]"
          id={headingId}
        >
          {headingPlain}
          <em className="italic">{headingEmphasis}</em>?
        </h2>
        <div className="flex w-full flex-col items-center">
          <p className={bodyClassName}>{body}</p>
        </div>
      </div>

      {href && cta.label ? (
        <OczkiButton
          className={
            variant === 'mobile'
              ? 'w-[296px] max-w-full shrink-0'
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
