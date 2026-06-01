'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type ConditionalSiteFooterProps = {
  children: ReactNode
}

const ROUTES_WITH_DESIGNED_FOOTER = new Set(['/', '/home', '/galeria'])

/**
 * Hides the generic Payload footer on routes that ship their own designed
 * footer via {@link HomeFooterNewsletter}.
 */
export function ConditionalSiteFooter({ children }: ConditionalSiteFooterProps) {
  const pathname = usePathname()

  if (pathname && ROUTES_WITH_DESIGNED_FOOTER.has(pathname)) {
    return null
  }

  return children
}
