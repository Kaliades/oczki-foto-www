import { ScallopedButton } from '@/components/ScallopedButton'

import { CookieConsentTextAction } from './CookieConsentTextAction'
import type { CookieConsentCopyData } from './constants'
import {
  COOKIE_CONSENT_ACTIONS_BG,
  COOKIE_CONSENT_ACTIONS_RADIUS,
  COOKIE_CONSENT_FIGMA_NODES,
} from './constants'

type CookieConsentActionsProps = {
  copy: CookieConsentCopyData
  onAccept?: () => void
  onPreferences?: () => void
  onReject?: () => void
}

/**
 * Figma `Buttons` (`7112:11487`) — separate bottom band, top corners rounded 24 px.
 *
 * Mobile (`7118:9223`): column, gap 4; secondary row space-between across 288 px.
 * Tablet/desktop: row, space-between; secondary group gap 16.
 */
export function CookieConsentActions({
  copy,
  onAccept,
  onPreferences,
  onReject,
}: CookieConsentActionsProps) {
  const acceptProps = {
    'data-figma-node': COOKIE_CONSENT_FIGMA_NODES.acceptButton,
    onClick: onAccept,
    type: 'button' as const,
    children: copy.acceptLabel,
  }

  return (
    <div
      className="flex w-full flex-col gap-1 px-5 pt-4 pb-5 md:flex-row md:items-center md:justify-between md:px-8 md:pt-5 md:pb-6"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.desktopButtons}
      data-name="Buttons"
      style={{
        backgroundColor: COOKIE_CONSENT_ACTIONS_BG,
        borderRadius: COOKIE_CONSENT_ACTIONS_RADIUS,
      }}
    >
      <ScallopedButton
        className="w-full md:w-auto"
        fullWidth
        {...acceptProps}
        labelClassName="leading-[21px] tracking-[-0.14px] md:flex-none"
      />

      <div
        className="flex h-11 w-full shrink-0 items-center justify-between md:w-auto md:justify-start md:gap-4"
        data-name="Secondary-buttons"
      >
        <CookieConsentTextAction label={copy.preferencesLabel} onClick={onPreferences} />
        <CookieConsentTextAction label={copy.rejectLabel} onClick={onReject} />
      </div>
    </div>
  )
}
