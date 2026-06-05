import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type PackagePriceCtaProps = {
  cta: SectionLink
  price: string
}

/**
 * Price + booking CTA — Figma `Price container`.
 *
 * Mobile: column, gap 4 px, full-width button.
 * Tablet/desktop: row, gap 32 px, intrinsic-width button.
 */
export function PackagePriceCta({ cta, price }: PackagePriceCtaProps) {
  const href = resolveLinkHref(cta)

  return (
    <div
      className="flex w-full flex-col items-start justify-center gap-1 md:flex-row md:items-center md:gap-8"
      data-name="Price container"
    >
      <p className="oczki-body-xl shrink-0 text-[18px] whitespace-nowrap text-[var(--oczki-primary-700)] md:text-[20px]">
        {price}
      </p>
      {href && cta.label ? (
        <OczkiButton className="w-full md:w-auto" href={href}>
          {cta.label}
        </OczkiButton>
      ) : null}
    </div>
  )
}
