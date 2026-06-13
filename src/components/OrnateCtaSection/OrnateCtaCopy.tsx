import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import type { OrnateCtaData } from './types'

type OrnateCtaCopyProps = {
  body: string
  cta: OrnateCtaData['cta']
  heading: OrnateCtaData['heading']
  headingId?: string
  variant: 'desktop' | 'tablet' | 'mobile'
}

/**
 * Copy + CTA — Figma 7105:8641 / 8604 / 8567.
 *
 * Text cluster gap 16 px; stack→button gap 36 px (panel wrapper).
 * Heading `oczki-heading-l` (36 px); body `oczki-body-l` (16 px).
 */
export function OrnateCtaCopy({
  body,
  cta,
  heading,
  headingId = 'ornate-cta-heading',
  variant,
}: OrnateCtaCopyProps) {
  const href = resolveLinkHref(cta)

  const textClusterClassName =
    variant === 'mobile'
      ? 'flex w-full max-w-[296px] flex-col items-start gap-[10px]'
      : variant === 'tablet'
        ? 'flex w-full max-w-[416px] flex-col items-center gap-4'
        : 'flex w-full max-w-[598px] flex-col items-start gap-4'

  const bodyClassName =
    variant === 'desktop'
      ? 'oczki-body-l w-[490px] max-w-full text-center text-[var(--oczki-primary-700)]'
      : 'oczki-body-l w-full text-center text-[var(--oczki-primary-700)]'

  return (
    <>
      <div className={textClusterClassName} data-name="Text container">
        <h2
          className="oczki-heading-l w-full text-center text-[var(--oczki-primary-800)]"
          id={headingId}
        >
          {heading.type === 'single' ? (
            heading.text
          ) : (
            <>
              {heading.plain}
              <em className="italic">{heading.emphasis}</em>?
            </>
          )}
        </h2>
        <div className="flex w-full flex-col items-center" data-name="Secondary text container">
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
