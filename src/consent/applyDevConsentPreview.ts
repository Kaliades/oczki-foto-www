import type { ConsentRuntimeConfig } from './mapCookieConsentGlobal'

const DEV_PREVIEW_ENV = 'COOKIE_CONSENT_DEV_PREVIEW'
const DEV_PREVIEW_CATEGORIES_ENV = 'COOKIE_CONSENT_DEV_PREVIEW_CATEGORIES'

function isDevPreviewEnabled(): boolean {
  return (
    process.env.NODE_ENV === 'development' &&
    process.env[DEV_PREVIEW_ENV]?.trim().toLowerCase() === 'true'
  )
}

function isDevPreviewCategoriesEnabled(): boolean {
  return process.env[DEV_PREVIEW_CATEGORIES_ENV]?.trim().toLowerCase() === 'true'
}

/**
 * Local dev override — force the consent UI without publishing CMS flags.
 * Ignored outside `NODE_ENV=development`.
 */
export function applyDevConsentPreview(config: ConsentRuntimeConfig): ConsentRuntimeConfig {
  if (!isDevPreviewEnabled()) {
    return config
  }

  const withCategories = isDevPreviewCategoriesEnabled()

  return {
    ...config,
    bannerEnabled: true,
    analyticsEnabled: config.analyticsEnabled || withCategories,
    marketingEnabled: config.marketingEnabled || withCategories,
  }
}
