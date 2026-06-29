import { CookieConsentActions } from './CookieConsentActions'
import { CookieConsentCopy } from './CookieConsentCopy'
import type { CookieConsentCopyData } from './constants'
import { COOKIE_CONSENT_FIGMA_NODES } from './constants'

type CookieConsentPanelProps = {
  copy: CookieConsentCopyData
  onAccept?: () => void
  onPreferences?: () => void
  onReject?: () => void
}

/**
 * Figma `cookies` panel — two flush stacked bands (no gap between sections).
 *
 * cookies (column, 328 / 608 / 673 px)
 * ├── Texts (`7112:11481`) — primary-100, radius bottom 24 px
 * └── Buttons (`7112:11487`) — #f5f1ec, radius top 24 px
 */
export function CookieConsentPanel({
  copy,
  onAccept,
  onPreferences,
  onReject,
}: CookieConsentPanelProps) {
  return (
    <div
      className="flex w-[328px] shrink-0 flex-col gap-0 [font-family:var(--font-oczki-body)] md:w-[608px] lg:w-[673px]"
      data-figma-node={COOKIE_CONSENT_FIGMA_NODES.mobilePanel}
      data-name="cookies"
    >
      <CookieConsentCopy copy={copy} />
      <CookieConsentActions
        copy={copy}
        onAccept={onAccept}
        onPreferences={onPreferences}
        onReject={onReject}
      />
    </div>
  )
}
