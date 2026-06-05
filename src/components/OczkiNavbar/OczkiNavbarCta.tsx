import { OczkiButton } from '@/components/OczkiButton'

import { OCZKI_NAVBAR_CTA } from './constants'

/**
 * Ticket CTA cluster — Figma `Action button container` (Subtract + button + Subtract).
 * Hidden below `md`; mobile uses the menu button instead.
 */
export function OczkiNavbarCta() {
  return (
    <div className="flex shrink-0 items-center" data-name="Action button container">
      <OczkiButton className="hidden md:inline-flex" href={OCZKI_NAVBAR_CTA.href}>
        {OCZKI_NAVBAR_CTA.label}
      </OczkiButton>
    </div>
  )
}
