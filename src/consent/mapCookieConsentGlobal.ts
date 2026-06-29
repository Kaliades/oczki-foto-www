import type { CookieConsentCopyData, CookiePreferencesCopyData } from '@/components/CookieConsent/constants'
import {
  cookieConsentCopyDefaults,
  cookiePreferencesCopyDefaults,
} from '@/components/CookieConsent/constants'
import type { CookieConsent as CookieConsentDoc } from '@/payload-types'

export type ConsentRuntimeConfig = {
  bannerEnabled: boolean
  analyticsEnabled: boolean
  marketingEnabled: boolean
  policyVersion: number
  settingsLinkLabel: string
  copy: CookieConsentCopyData
  preferencesCopy: CookiePreferencesCopyData
}

function mapCategoryCopy(
  group: { title?: string | null; description?: string | null } | undefined,
  fallback: { title: string; description: string },
) {
  return {
    title: group?.title ?? fallback.title,
    description: group?.description ?? fallback.description,
  }
}

export function mapCookieConsentGlobal(doc: CookieConsentDoc | null): ConsentRuntimeConfig {
  const defaults = cookieConsentCopyDefaults
  const preferencesDefaults = cookiePreferencesCopyDefaults

  return {
    bannerEnabled: doc?.bannerEnabled ?? false,
    analyticsEnabled: doc?.analyticsEnabled ?? false,
    marketingEnabled: doc?.marketingEnabled ?? false,
    policyVersion: doc?.policyVersion ?? 1,
    settingsLinkLabel: doc?.settingsLinkLabel ?? 'Ustawienia cookies',
    copy: {
      title: doc?.title ?? defaults.title,
      descriptionBeforeLink: doc?.descriptionBeforeLink ?? defaults.descriptionBeforeLink,
      learnMoreLabel: doc?.learnMoreLabel ?? defaults.learnMoreLabel,
      learnMoreHref: doc?.learnMoreHref ?? defaults.learnMoreHref,
      acceptLabel: doc?.acceptLabel ?? defaults.acceptLabel,
      preferencesLabel: doc?.preferencesLabel ?? defaults.preferencesLabel,
      rejectLabel: doc?.rejectLabel ?? defaults.rejectLabel,
    },
    preferencesCopy: {
      title: doc?.preferencesTitle ?? preferencesDefaults.title,
      intro: doc?.preferencesIntro ?? preferencesDefaults.intro,
      saveLabel: doc?.saveLabel ?? preferencesDefaults.saveLabel,
      backLabel: doc?.backLabel ?? preferencesDefaults.backLabel,
      rejectAllLabel: doc?.rejectAllLabel ?? preferencesDefaults.rejectAllLabel,
      necessary: mapCategoryCopy(doc?.necessaryCategory, preferencesDefaults.necessary),
      analytics: mapCategoryCopy(doc?.analyticsCategory, preferencesDefaults.analytics),
      marketing: mapCategoryCopy(doc?.marketingCategory, preferencesDefaults.marketing),
    },
  }
}

export function getTrackingEnv() {
  return {
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || null,
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim() || null,
  }
}

export function isAnalyticsScriptAvailable(
  config: ConsentRuntimeConfig,
  gaMeasurementId: string | null,
): boolean {
  return config.analyticsEnabled && Boolean(gaMeasurementId)
}

export function isMarketingScriptAvailable(
  config: ConsentRuntimeConfig,
  metaPixelId: string | null,
): boolean {
  return config.marketingEnabled && Boolean(metaPixelId)
}
