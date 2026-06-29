import { ScallopedButton } from '@/components/ScallopedButton'

import { CookieConsentTextAction } from './CookieConsentTextAction'
import {
  COOKIE_CONSENT_ACTIONS_BG,
  COOKIE_CONSENT_ACTIONS_RADIUS,
  COOKIE_CONSENT_FIGMA_NODES,
} from './constants'
import type { CookiePreferencesCopyData } from './constants'

type CookiePreferencesActionsProps = {
  copy: CookiePreferencesCopyData
  onSave?: () => void
  onBack?: () => void
  onRejectAll?: () => void
}

/**
 * Preferences footer band — mirrors layer-1 `Buttons` layout.
 */
export function CookiePreferencesActions({
  copy,
  onSave,
  onBack,
  onRejectAll,
}: CookiePreferencesActionsProps) {
  return (
    <div
      className="flex w-full flex-col gap-1 px-5 pt-4 pb-5 md:flex-row md:items-center md:justify-between md:px-8 md:pt-5 md:pb-6"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopButtons}
      data-name="Preferences buttons"
      style={{
        backgroundColor: COOKIE_CONSENT_ACTIONS_BG,
        borderRadius: COOKIE_CONSENT_ACTIONS_RADIUS,
      }}
    >
      <ScallopedButton
        className="w-full md:w-auto"
        fullWidth
        labelClassName="leading-[21px] tracking-[-0.14px] md:flex-none"
        onClick={onSave}
        type="button"
      >
        {copy.saveLabel}
      </ScallopedButton>

      <div className="flex h-11 w-full shrink-0 items-center justify-between md:w-auto md:justify-start md:gap-4">
        <CookieConsentTextAction label={copy.backLabel} onClick={onBack} />
        <CookieConsentTextAction label={copy.rejectAllLabel} onClick={onRejectAll} />
      </div>
    </div>
  )
}
