'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import type { ConsentBannerView } from '@/providers/Consent/ConsentProvider'

type CookieConsentBannerProps = {
  forceOpen?: boolean
  view: ConsentBannerView
  consentPanel: ReactNode
  preferencesPanel: ReactNode
}

/**
 * Centred cookie consent overlay — Figma `cookies` on dimmed viewport.
 */
export function CookieConsentBanner({
  forceOpen = false,
  view,
  consentPanel,
  preferencesPanel,
}: CookieConsentBannerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleId = view === 'consent' ? 'cookie-consent-title' : 'cookie-preferences-title'

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (forceOpen) {
      if (!dialog.open) {
        dialog.showModal()
        document.body.style.overflow = 'hidden'
      }
    } else if (dialog.open) {
      dialog.close()
      document.body.style.overflow = ''
    }
  }, [forceOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      className="cookie-consent-dialog fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden border-0 bg-transparent p-0"
      onCancel={handleCancel}
    >
      <div className="flex min-h-full items-center justify-center p-4">
        {view === 'consent' ? consentPanel : preferencesPanel}
      </div>
    </dialog>
  )
}
