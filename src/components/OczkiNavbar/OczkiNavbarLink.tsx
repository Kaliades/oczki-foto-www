'use client'

import Link from 'next/link'

import { OczkiNavbarActiveIndicator } from './OczkiNavbarActiveIndicator'
import { OczkiNavbarDropdownIcon } from './OczkiNavbarDropdownIcon'
import type { OczkiNavItem } from './constants'

type OczkiNavbarLinkProps = {
  href: string
  isActive: boolean
  label: string
  showActiveIndicator?: boolean
  withDropdownIcon?: boolean
}

export function OczkiNavbarLink({
  href,
  isActive,
  label,
  showActiveIndicator = false,
  withDropdownIcon = false,
}: OczkiNavbarLinkProps) {
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={`inline-flex h-11 items-center gap-1 transition-colors ${
        isActive
          ? 'oczki-body-m-medium text-[var(--oczki-primary-800)]'
          : 'oczki-body-m text-[var(--oczki-primary-700)] hover:text-[var(--oczki-primary-800)]'
      }`}
      data-name={withDropdownIcon ? 'Navbar link with icon' : 'Navbar link'}
      href={href}
    >
      {isActive && showActiveIndicator ? <OczkiNavbarActiveIndicator /> : null}
      <span>{label}</span>
      {withDropdownIcon ? <OczkiNavbarDropdownIcon /> : null}
    </Link>
  )
}

export function mapNavItemToLinkProps(item: OczkiNavItem, pathname: string): OczkiNavbarLinkProps {
  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)

  return {
    href: item.href,
    isActive,
    label: item.label,
    showActiveIndicator: isActive,
    withDropdownIcon: item.withDropdownIcon,
  }
}
