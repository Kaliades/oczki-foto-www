'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

type ConditionalSiteFooterProps = {
  children: ReactNode
}

function routeHasDesignedFooter(pathname: string): boolean {
  return (
    pathname === '/' ||
    pathname === '/home' ||
    pathname === '/kontakt' ||
    pathname === '/o-mnie' ||
    pathname.startsWith('/galeria') ||
    pathname.startsWith('/oferta')
  )
}

/**
 * Hides the generic Payload footer on routes that ship their own designed
 * footer via {@link HomeFooterNewsletter}.
 */
export function ConditionalSiteFooter({ children }: ConditionalSiteFooterProps) {
  const pathname = usePathname()

  if (pathname && routeHasDesignedFooter(pathname)) {
    return null
  }

  return children
}
