'use client'

import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  use,
} from 'react'

import { buildConsentModeUpdateScript } from '@/consent/consentMode'
import type { ConsentRuntimeConfig } from '@/consent/mapCookieConsentGlobal'
import {
  hasGpcSignal,
  readStoredConsent,
  writeStoredConsent,
} from '@/consent/storage'
import type { ConsentChoiceSource, ConsentChoices, StoredConsent } from '@/consent/types'

export type ConsentBannerView = 'consent' | 'preferences'

type ConsentContextValue = {
  config: ConsentRuntimeConfig
  choices: ConsentChoices | null
  draftChoices: ConsentChoices
  bannerView: ConsentBannerView
  isBannerOpen: boolean
  acceptAll: () => void
  rejectAll: () => void
  openPreferences: () => void
  reopenBanner: () => void
  goBackToConsent: () => void
  savePreferences: () => void
  setDraftChoice: (key: keyof ConsentChoices, value: boolean) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

type ConsentProviderProps = {
  config: ConsentRuntimeConfig
  children: React.ReactNode
}

function rejectChoices(): ConsentChoices {
  return { analytics: false, marketing: false }
}

function acceptAllChoices(config: ConsentRuntimeConfig): ConsentChoices {
  return {
    analytics: config.analyticsEnabled,
    marketing: config.marketingEnabled,
  }
}

function resolveDraftChoices(choices: ConsentChoices | null): ConsentChoices {
  return choices ? { ...choices } : rejectChoices()
}

async function logConsent(
  record: StoredConsent,
  source: ConsentChoiceSource,
  config: ConsentRuntimeConfig,
): Promise<void> {
  try {
    await fetch('/api/consent-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentId: record.consentId,
        policyVersion: record.policyVersion,
        choices: record.choices,
        timestamp: record.timestamp,
        source,
        bannerEnabled: config.bannerEnabled,
        analyticsCategoryEnabled: config.analyticsEnabled,
        marketingCategoryEnabled: config.marketingEnabled,
      }),
      keepalive: true,
    })
  } catch {
    // Logging must not block consent UX.
  }
}

function applyConsentModeUpdate(choices: ConsentChoices): void {
  const script = document.createElement('script')
  script.text = buildConsentModeUpdateScript(choices)
  document.head.appendChild(script)
  script.remove()
}

export function ConsentProvider({ config, children }: ConsentProviderProps) {
  const [choices, setChoices] = useState<ConsentChoices | null>(null)
  const [draftChoices, setDraftChoices] = useState<ConsentChoices>(rejectChoices)
  const [bannerView, setBannerView] = useState<ConsentBannerView>('consent')
  const [isBannerOpen, setIsBannerOpen] = useState(false)

  const persistChoices = useCallback(
    (nextChoices: ConsentChoices, source: ConsentChoiceSource) => {
      const existing = readStoredConsent()
      const record = writeStoredConsent(nextChoices, config.policyVersion, existing?.consentId)

      applyConsentModeUpdate(nextChoices)
      setChoices(nextChoices)
      setDraftChoices({ ...nextChoices })
      setIsBannerOpen(false)
      setBannerView('consent')
      void logConsent(record, source, config)
    },
    [config],
  )

  const acceptAll = useCallback(() => {
    persistChoices(acceptAllChoices(config), 'banner-accept-all')
  }, [config, persistChoices])

  const rejectAll = useCallback(() => {
    persistChoices(rejectChoices(), 'banner-reject-all')
  }, [persistChoices])

  const openPreferences = useCallback(() => {
    setDraftChoices(resolveDraftChoices(choices))
    setBannerView('preferences')
    setIsBannerOpen(true)
  }, [choices])

  const reopenBanner = useCallback(() => {
    const stored = readStoredConsent()
    const currentChoices =
      choices ??
      (stored?.policyVersion === config.policyVersion ? stored.choices : null)

    setDraftChoices(resolveDraftChoices(currentChoices))
    setBannerView('preferences')
    setIsBannerOpen(true)
  }, [choices, config.policyVersion])

  const goBackToConsent = useCallback(() => {
    if (choices) {
      setIsBannerOpen(false)
      setBannerView('consent')
      return
    }

    setBannerView('consent')
  }, [choices])

  const savePreferences = useCallback(() => {
    persistChoices(draftChoices, 'banner-preferences')
  }, [draftChoices, persistChoices])

  const setDraftChoice = useCallback((key: keyof ConsentChoices, value: boolean) => {
    setDraftChoices((current) => ({ ...current, [key]: value }))
  }, [])

  useEffect(() => {
    if (!config.bannerEnabled) {
      setChoices(null)
      setIsBannerOpen(false)
      setBannerView('consent')
      return
    }

    const stored = readStoredConsent()
    const isCurrentVersion = stored?.policyVersion === config.policyVersion

    if (stored && isCurrentVersion) {
      setChoices(stored.choices)
      setDraftChoices({ ...stored.choices })
      applyConsentModeUpdate(stored.choices)
      setIsBannerOpen(false)
      setBannerView('consent')
      return
    }

    if (hasGpcSignal()) {
      const record = writeStoredConsent(rejectChoices(), config.policyVersion, stored?.consentId)
      applyConsentModeUpdate(record.choices)
      setChoices(record.choices)
      setDraftChoices({ ...record.choices })
      setIsBannerOpen(false)
      setBannerView('consent')
      void logConsent(record, 'gpc', config)
      return
    }

    setChoices(null)
    setDraftChoices(rejectChoices())
    setBannerView('consent')
    setIsBannerOpen(true)
  }, [config.bannerEnabled, config.policyVersion])

  const value = useMemo<ConsentContextValue>(
    () => ({
      config,
      choices,
      draftChoices,
      bannerView,
      isBannerOpen,
      acceptAll,
      rejectAll,
      openPreferences,
      reopenBanner,
      goBackToConsent,
      savePreferences,
      setDraftChoice,
    }),
    [
      acceptAll,
      bannerView,
      choices,
      config,
      draftChoices,
      goBackToConsent,
      isBannerOpen,
      openPreferences,
      rejectAll,
      reopenBanner,
      savePreferences,
      setDraftChoice,
    ],
  )

  return <ConsentContext value={value}>{children}</ConsentContext>
}

export function useConsent(): ConsentContextValue {
  const context = use(ConsentContext)
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider')
  }
  return context
}
