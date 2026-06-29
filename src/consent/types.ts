export type ConsentChoices = {
  analytics: boolean
  marketing: boolean
}

export type StoredConsent = {
  consentId: string
  policyVersion: number
  choices: ConsentChoices
  timestamp: string
}

export const CONSENT_STORAGE_KEY = 'oczki-cookie-consent' as const

export type ConsentChoiceSource = 'banner-accept-all' | 'banner-reject-all' | 'banner-preferences' | 'gpc'
