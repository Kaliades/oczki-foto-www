/** Google Consent Mode v2 — default denied before any third-party script loads. */
export const consentModeInitScript = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
`.trim()

export function buildConsentModeUpdateScript(choices: {
  analytics: boolean
  marketing: boolean
}): string {
  const analyticsStorage = choices.analytics ? 'granted' : 'denied'
  const marketingStorage = choices.marketing ? 'granted' : 'denied'

  return `
gtag('consent', 'update', {
  analytics_storage: '${analyticsStorage}',
  ad_storage: '${marketingStorage}',
  ad_user_data: '${marketingStorage}',
  ad_personalization: '${marketingStorage}'
});
`.trim()
}
