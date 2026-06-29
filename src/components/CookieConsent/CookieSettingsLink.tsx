'use client'

import { useConsent } from '@/providers/Consent'

export function CookieSettingsLink() {
  const { config, reopenBanner } = useConsent()

  if (!config.bannerEnabled) {
    return null
  }

  return (
    <button
      className="oczki-body-m text-[var(--oczki-primary-700)] underline transition-opacity hover:opacity-70"
      onClick={reopenBanner}
      type="button"
    >
      {config.settingsLinkLabel}
    </button>
  )
}
