'use client'

import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
  OCZKI_NAVBAR_CAP_PADDING_CLASS,
  OCZKI_NAVBAR_FIGMA_NODES,
  OCZKI_NAVBAR_SHELL_PADDING_Y_CLASS,
} from './constants'
import { OczkiNavbarCta } from './OczkiNavbarCta'
import { OczkiNavbarMenuButton } from './OczkiNavbarMenuButton'
import { OczkiNavbarNav } from './OczkiNavbarNav'

export type OczkiNavbarVariant = 'overlay' | 'solid'

type OczkiNavbarProps = {
  theme?: string | null
  variant?: OczkiNavbarVariant
}

/**
 * Site navbar — Figma `Navbar` (nodes in `OCZKI_NAVBAR_FIGMA_NODES`).
 *
 * Hierarchy (outer → inner):
 * - `<header>` — z-index, overlay `absolute` vs solid `relative`, `data-figma-node`
 * - shell `<div>` — full-bleed bg + `OCZKI_NAVBAR_SHELL_PADDING_Y_CLASS` (py-2 / md:py-3)
 * - cap `<div>` — `max-w-[1366px]` + `OCZKI_NAVBAR_CAP_PADDING_CLASS` (px-9 / md:px-20 / lg:px-9)
 * - `Navbar container` — flex row, `justify-between`
 *     - `Logo` (`Link` → `Logo`)
 *     - `Navbar link` (`OczkiNavbarNav` → `ul` → `OczkiNavbarLink`, hidden `<md`)
 *     - `Action button container` (`OczkiNavbarCta` → `OczkiButton`, hidden `<md`)
 *     - `Menu button` (`OczkiNavbarMenuButton`, `md:hidden`)
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
        className={`w-full ${OCZKI_NAVBAR_SHELL_PADDING_Y_CLASS} ${
          isOverlay ? 'bg-transparent' : 'bg-[var(--oczki-primary-100)]'
        }`}
      >
        <div className={`mx-auto w-full max-w-[1366px] ${OCZKI_NAVBAR_CAP_PADDING_CLASS}`}>
          <div
            className="flex min-w-0 flex-1 items-center justify-between"
            data-name="Navbar container"
          >
            <Link
              aria-label="Oczki fotografia - strona główna"
              className="shrink-0"
              data-name="Logo"
              href="/"
            >
              <Logo loading="eager" priority="high" />
            </Link>

            <OczkiNavbarNav pathname={pathname} />

            <OczkiNavbarCta />

            <OczkiNavbarMenuButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export {
  OCZKI_NAV_ITEMS,
  OCZKI_NAVBAR_CAP_PADDING_CLASS,
  OCZKI_NAVBAR_FIGMA_NODES,
  OCZKI_NAVBAR_GUTTER_END_CLASS,
  OCZKI_NAVBAR_GUTTER_START_CLASS,
  OCZKI_NAVBAR_HORIZONTAL_INSET,
} from './constants'
