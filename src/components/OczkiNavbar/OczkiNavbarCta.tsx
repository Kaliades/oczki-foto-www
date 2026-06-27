import { OczkiButton } from '@/components/OczkiButton'

import type { NavCtaProps } from './types'

type OczkiNavbarCtaProps = {
  cta: NavCtaProps
}

/**
 * Ticket CTA cluster — Figma `Action button container` (Subtract + button + Subtract).
 * Hidden below `md`; mobile uses the menu button instead.
 */
export function OczkiNavbarCta({ cta }: OczkiNavbarCtaProps) {
  return (
    <div className="flex shrink-0 items-center" data-name="Action button container">
      <OczkiButton className="hidden md:inline-flex" href={cta.href}>
        {cta.label}
      </OczkiButton>
    </div>
  )
}
