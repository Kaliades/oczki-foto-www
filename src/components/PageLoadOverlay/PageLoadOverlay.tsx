'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/utilities/ui'

/**
 * First-paint cream overlay with a simple spinner so navigations / cold loads
 * never flash a blank white document. Hides after `window` load (or a safety cap).
 */
export function PageLoadOverlay() {
  const [visible, setVisible] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout> | undefined
    let safetyTimer: ReturnType<typeof setTimeout> | undefined

    const hide = () => {
      setExiting(true)
      exitTimer = setTimeout(() => setVisible(false), 280)
    }

    if (document.readyState === 'complete') {
      // Let first paint settle, then fade out.
      exitTimer = setTimeout(hide, 120)
    } else {
      const onLoad = () => hide()
      window.addEventListener('load', onLoad, { once: true })
      safetyTimer = setTimeout(hide, 3500)
      return () => {
        window.removeEventListener('load', onLoad)
        if (exitTimer) clearTimeout(exitTimer)
        if (safetyTimer) clearTimeout(safetyTimer)
      }
    }

    return () => {
      if (exitTimer) clearTimeout(exitTimer)
      if (safetyTimer) clearTimeout(safetyTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'pointer-events-none fixed inset-0 z-[9998] flex items-center justify-center bg-[var(--oczki-primary-100)] transition-opacity duration-300 ease-out',
        exiting ? 'opacity-0' : 'opacity-100',
      )}
      role="status"
    >
      <span className="sr-only">Ładowanie strony</span>
      <span
        aria-hidden
        className="size-9 animate-spin rounded-full border-2 border-[var(--oczki-primary-300)] border-t-[var(--oczki-primary-700)]"
      />
    </div>
  )
}
