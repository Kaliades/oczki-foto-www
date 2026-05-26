'use client'

import { OczkiButton } from '@/components/OczkiButton'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { OCZKI_NAVBAR_CTA, OCZKI_NAVBAR_FIGMA_NODES } from './constants'
import { OczkiNavbarMenuButton } from './OczkiNavbarMenuButton'
import { OczkiNavbarNav } from './OczkiNavbarNav'

export type OczkiNavbarVariant = 'overlay' | 'solid'

type OczkiNavbarProps = {
  theme?: string | null
  variant?: OczkiNavbarVariant
}

/**
 * Site navbar — Figma component `Navbar` (nodes in `OCZKI_NAVBAR_FIGMA_NODES`).
 *
 * Hierarchy:
 * - `<header>` — positioning + theme hook surface
 * - outer shell — full-bleed background (`solid`) or transparent (`overlay`)
 * - inner cap — `max-w-[1366px]` + horizontal padding per breakpoint
 * - row — logo | nav | CTA / menu button
 */
export function OczkiNavbar({ theme = null, variant = 'solid' }: OczkiNavbarProps) {
  const pathname = usePathname()
  const isOverlay = variant === 'overlay'

  return (
    <header
      className={`z-30 w-full [font-family:var(--font-oczki-body)] ${
        isOverlay ? 'absolute left-0 top-0' : 'relative'
      }`}
      data-figma-node={OCZKI_NAVBAR_FIGMA_NODES.desktop}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div
        className={`w-full py-2 md:py-3 ${
          isOverlay ? 'bg-transparent' : 'bg-[var(--oczki-primary-100)]'
        }`}
      >
        <div className="mx-auto w-full max-w-[1366px] px-9 md:px-20 lg:px-9">
          <div className="flex items-center justify-between">
            <Link aria-label="Oczki fotografia - strona główna" href="/">
              <Logo loading="eager" priority="high" />
            </Link>

            <OczkiNavbarNav pathname={pathname} />

            <OczkiButton className="hidden md:inline-flex" href={OCZKI_NAVBAR_CTA.href}>
              {OCZKI_NAVBAR_CTA.label}
            </OczkiButton>

            <OczkiNavbarMenuButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export { OCZKI_NAV_ITEMS, OCZKI_NAVBAR_FIGMA_NODES } from './constants'
