import type { ConsentChoices, StoredConsent } from './types'
import { CONSENT_STORAGE_KEY } from './types'

function createConsentId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `consent-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') return null

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as StoredConsent
    if (
      typeof parsed.consentId !== 'string' ||
      typeof parsed.policyVersion !== 'number' ||
      typeof parsed.timestamp !== 'string' ||
      typeof parsed.choices?.analytics !== 'boolean' ||
      typeof parsed.choices?.marketing !== 'boolean'
    ) {
      return null
    }

    return parsed
  } catch {
    return null
  }
}

export function writeStoredConsent(
  choices: ConsentChoices,
  policyVersion: number,
  existingConsentId?: string,
): StoredConsent {
  const record: StoredConsent = {
    consentId: existingConsentId ?? createConsentId(),
    policyVersion,
    choices,
    timestamp: new Date().toISOString(),
  }

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
  return record
}

export function clearStoredConsent(): void {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(CONSENT_STORAGE_KEY)
}

export function hasGpcSignal(): boolean {
  if (typeof navigator === 'undefined') return false
  const navigatorWithGpc = navigator as Navigator & { globalPrivacyControl?: boolean }
  return navigatorWithGpc.globalPrivacyControl === true
}
