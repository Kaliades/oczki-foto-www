import type { ConsentRuntimeConfig } from '@/consent/mapCookieConsentGlobal'
import type { ConsentChoices } from '@/consent/types'

import { CookiePreferencesActions } from './CookiePreferencesActions'
import { CookiePreferencesCopy } from './CookiePreferencesCopy'
import { COOKIE_CONSENT_FIGMA_NODES } from './constants'

type CookiePreferencesPanelProps = {
  config: ConsentRuntimeConfig
  draftChoices: ConsentChoices
  onDraftChoiceChange: (key: keyof ConsentChoices, value: boolean) => void
  onSave?: () => void
  onBack?: () => void
  onRejectAll?: () => void
}

/**
 * Layer-2 cookie preferences — same shell widths as `CookieConsentPanel`.
 */
export function CookiePreferencesPanel({
  config,
  draftChoices,
  onDraftChoiceChange,
  onSave,
  onBack,
  onRejectAll,
}: CookiePreferencesPanelProps) {
  return (
    <div
      className="flex w-[328px] shrink-0 flex-col gap-0 [font-family:var(--font-oczki-body)] md:w-[608px] lg:w-[673px]"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.mobilePanel}
      data-name="cookie-preferences"
    >
      <CookiePreferencesCopy
        config={config}
        draftChoices={draftChoices}
        onDraftChoiceChange={onDraftChoiceChange}
      />
      <CookiePreferencesActions
        copy={config.preferencesCopy}
        onBack={onBack}
        onRejectAll={onRejectAll}
        onSave={onSave}
      />
    </div>
  )
}
