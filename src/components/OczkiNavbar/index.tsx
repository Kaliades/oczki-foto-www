'use client'

import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  OCZKI_NAV_ITEMS,
  OCZKI_NAVBAR_CAP_PADDING_CLASS,
  OCZKI_NAVBAR_CTA,
  OCZKI_NAVBAR_FIGMA_NODES,
  OCZKI_NAVBAR_SHELL_PADDING_Y_CLASS,
} from './constants'
import { OczkiNavbarCta } from './OczkiNavbarCta'
import { OczkiNavbarMenuButton } from './OczkiNavbarMenuButton'
import { OczkiNavbarMobileMenu } from './OczkiNavbarMobileMenu'
import { OczkiNavbarNav } from './OczkiNavbarNav'
import type { NavCtaProps, NavDropdownItem, NavItemProps } from './types'
import { enrichNavItemsWithOfferDropdown } from '@/utilities/enrichNavItemsWithOfferDropdown'

export type OczkiNavbarVariant = 'overlay' | 'solid'

type OczkiNavbarProps = {
  theme?: string | null
  variant?: OczkiNavbarVariant
  /** Nav items from CMS — falls back to `OCZKI_NAV_ITEMS` if not provided. */
  navItems?: readonly NavItemProps[]
  /** Offer sub-links for the Oferta dropdown — from CMS `offerItems`. */
  offerNavItems?: readonly NavDropdownItem[]
  /** CTA button data from CMS — falls back to `OCZKI_NAVBAR_CTA` if not provided. */
  cta?: NavCtaProps
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
 * - `OczkiNavbarMobileMenu` — full-screen dialog overlay (`md:hidden`)
 */
export function OczkiNavbar({
  theme = null,
  variant = 'solid',
  navItems: navItemsFromCms,
  offerNavItems = [],
  cta: ctaFromCms,
}: OczkiNavbarProps) {
  const pathname = usePathname()
  const isOverlay = variant === 'overlay'
  const [menuOpen, setMenuOpen] = useState(false)

  // `??` would keep an empty array (it only falls back on null/undefined), so
  // guard on length to ensure the nav never renders empty if the CMS global is
  // unpopulated.
  const baseNavItems: readonly NavItemProps[] =
    navItemsFromCms && navItemsFromCms.length > 0 ? navItemsFromCms : OCZKI_NAV_ITEMS
  const navItems = enrichNavItemsWithOfferDropdown(baseNavItems, offerNavItems)
  const cta: NavCtaProps = ctaFromCms ?? OCZKI_NAVBAR_CTA

  return (
    <>
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

              <OczkiNavbarNav navItems={navItems} pathname={pathname} />

              <OczkiNavbarCta cta={cta} />

              <OczkiNavbarMenuButton
                isOpen={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu rendered outside the header so it covers the full viewport */}
      <OczkiNavbarMobileMenu
        cta={cta}
        isOpen={menuOpen}
        navItems={navItems}
        onClose={() => setMenuOpen(false)}
      />
    </>
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
