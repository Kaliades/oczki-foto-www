'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type ConditionalSiteFooterProps = {
  children: ReactNode
}

/**
 * Hides the generic Payload footer on routes that ship their own designed
 * footer (currently the homepage via `HomeFooterNewsletter`).
 */
export function ConditionalSiteFooter({ children }: ConditionalSiteFooterProps) {
  const pathname = usePathname()

  if (pathname === '/' || pathname === '/home') {
    return null
  }

  return children
}
