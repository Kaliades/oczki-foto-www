import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

type OfferInquiryProps = {
  title: string
  text: string
  cta: SectionLink
}

export function OfferInquiry({ title, text, cta }: OfferInquiryProps) {
  const href = resolveLinkHref(cta)

  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 text-center md:gap-8">
      <div className="flex w-full flex-col gap-1.5 md:w-[535px] md:gap-2">
        <p className="oczki-body-xl text-[var(--oczki-primary-900)]">{title}</p>
        <p className="oczki-body-l text-[var(--oczki-primary-800)]">{text}</p>
      </div>
      {href && cta.label ? (
        <OczkiButton className="w-full md:w-[118px]" href={href}>
          {cta.label}
        </OczkiButton>
      ) : null}
    </div>
  )
}
