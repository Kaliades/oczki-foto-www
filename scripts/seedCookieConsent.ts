import type { Payload } from 'payload'

import {
  cookieConsentCopyDefaults,
  cookiePreferencesCopyDefaults,
} from '@/components/CookieConsent/constants'

import { runSeedCli } from './lib/seedCli'

export async function seedCookieConsent(payload: Payload): Promise<void> {
  const banner = cookieConsentCopyDefaults
  const prefs = cookiePreferencesCopyDefaults

  await payload.updateGlobal({
    slug: 'cookieConsent',
    data: {
      bannerEnabled: false,
      analyticsEnabled: false,
      marketingEnabled: false,
      policyVersion: 1,
      title: banner.title,
      descriptionBeforeLink: banner.descriptionBeforeLink,
      learnMoreLabel: banner.learnMoreLabel,
      learnMoreHref: banner.learnMoreHref,
      acceptLabel: banner.acceptLabel,
      preferencesLabel: banner.preferencesLabel,
      rejectLabel: banner.rejectLabel,
      preferencesTitle: prefs.title,
      preferencesIntro: prefs.intro,
      saveLabel: prefs.saveLabel,
      backLabel: prefs.backLabel,
      rejectAllLabel: prefs.rejectAllLabel,
      necessaryCategory: {
        title: prefs.necessary.title,
        description: prefs.necessary.description,
      },
      analyticsCategory: {
        title: prefs.analytics.title,
        description: prefs.analytics.description,
      },
      marketingCategory: {
        title: prefs.marketing.title,
        description: prefs.marketing.description,
      },
      settingsLinkLabel: 'Ustawienia cookies',
      privacyLink: {
        type: 'custom',
        url: '/polityka-prywatnosci#privacy-cookies',
        label: 'Polityka prywatności',
        newTab: false,
      },
    },
    context: { disableRevalidate: true },
  })
}

runSeedCli(seedCookieConsent, 'seedCookieConsent')
