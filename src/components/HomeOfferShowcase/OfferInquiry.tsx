import { OczkiButton } from '@/components/OczkiButton'

import { homeOfferCopy } from './constants'

export function OfferInquiry() {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-6 text-center md:gap-8">
      <div className="flex w-full flex-col gap-1.5 md:w-[535px] md:gap-2">
        <p className="oczki-body-xl text-[var(--oczki-primary-900)]">{homeOfferCopy.inquiryTitle}</p>
        <p className="oczki-body-l text-[var(--oczki-primary-800)]">{homeOfferCopy.inquiryText}</p>
      </div>
      <OczkiButton className="w-full md:w-[118px]" href="/kontakt">
        {homeOfferCopy.inquiryCta}
      </OczkiButton>
    </div>
  )
}
