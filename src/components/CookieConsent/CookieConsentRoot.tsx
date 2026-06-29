'use client'

import { CookieConsentBanner } from './CookieConsentBanner'
import { CookieConsentPanel } from './CookieConsentPanel'
import { CookiePreferencesPanel } from './CookiePreferencesPanel'
import { useConsent } from '@/providers/Consent'

export function CookieConsentRoot() {
  const {
    config,
    bannerView,
    draftChoices,
    isBannerOpen,
    acceptAll,
    rejectAll,
    openPreferences,
    goBackToConsent,
    savePreferences,
    setDraftChoice,
  } = useConsent()

  if (!config.bannerEnabled) {
    return null
  }

  return (
    <CookieConsentBanner
      consentPanel={
        <CookieConsentPanel
          copy={config.copy}
          onAccept={acceptAll}
          onPreferences={openPreferences}
          onReject={rejectAll}
        />
      }
      forceOpen={isBannerOpen}
      preferencesPanel={
        <CookiePreferencesPanel
          config={config}
          draftChoices={draftChoices}
          onBack={goBackToConsent}
          onDraftChoiceChange={setDraftChoice}
          onRejectAll={rejectAll}
          onSave={savePreferences}
        />
      }
      view={bannerView}
    />
  )
}
