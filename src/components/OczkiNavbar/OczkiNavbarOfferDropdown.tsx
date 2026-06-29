'use client'

import Link from 'next/link'

import type { NavDropdownItem } from './types'

type OczkiNavbarOfferDropdownProps = {
  items: readonly NavDropdownItem[]
  pathname: string
  id: string
  onItemClick?: () => void
}

/**
 * Minimal hover panel for the Oferta nav item — Figma-aligned tokens, no extra chrome.
 */
export function OczkiNavbarOfferDropdown({
  items,
  pathname,
  id,
  onItemClick,
}: OczkiNavbarOfferDropdownProps) {
  return (
    <div className="min-w-[220px] border border-[var(--oczki-primary-300)] bg-[var(--oczki-primary-100)] py-1.5 shadow-[0_8px_24px_rgba(79,58,38,0.08)]">
      <ul className="flex flex-col" id={id} role="menu">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <li key={item.href} role="none">
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`block px-4 py-2.5 transition-colors oczki-body-m ${
                  isActive
                    ? 'bg-[var(--oczki-primary-200)] text-[var(--oczki-primary-800)] oczki-body-m-medium'
                    : 'text-[var(--oczki-primary-700)] hover:bg-[var(--oczki-primary-200)] hover:text-[var(--oczki-primary-800)]'
                }`}
                href={item.href}
                onClick={onItemClick}
                role="menuitem"
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
