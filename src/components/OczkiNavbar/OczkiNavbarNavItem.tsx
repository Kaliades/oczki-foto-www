'use client'

import { useEffect, useState } from 'react'

import { OczkiNavbarLink, mapNavItemToLinkProps } from './OczkiNavbarLink'
import { OczkiNavbarOfferDropdown } from './OczkiNavbarOfferDropdown'
import type { NavItemProps } from './types'

type OczkiNavbarNavItemProps = {
  item: NavItemProps
  pathname: string
}

/**
 * Desktop nav entry — plain link, or Oferta with a hover/focus dropdown.
 */
export function OczkiNavbarNavItem({ item, pathname }: OczkiNavbarNavItemProps) {
  const linkProps = mapNavItemToLinkProps(item, pathname)
  const dropdownItems = item.dropdownItems
  const hasDropdown = Boolean(item.withDropdownIcon && dropdownItems && dropdownItems.length > 0)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  if (!hasDropdown || !dropdownItems) {
    return <OczkiNavbarLink {...linkProps} />
  }

  const menuId = `navbar-offer-menu-${item.href.replace(/\//g, '-')}`

  const closeMenu = () => setOpen(false)

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      closeMenu()
    }
  }

  return (
    <div
      className="relative"
      onBlur={handleBlur}
      onFocus={() => setOpen(true)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={closeMenu}
    >
      <OczkiNavbarLink
        {...linkProps}
        ariaControls={menuId}
        ariaExpanded={open}
        ariaHasPopup="menu"
      />
      <div
        aria-labelledby={menuId}
        className={`absolute left-1/2 top-full z-50 -translate-x-1/2 transition-[opacity,visibility] duration-200 before:absolute before:-top-2 before:left-0 before:right-0 before:h-2 before:content-[''] ${
          open
            ? 'pointer-events-auto visible opacity-100'
            : 'pointer-events-none invisible opacity-0'
        }`}
      >
        <OczkiNavbarOfferDropdown
          id={menuId}
          items={dropdownItems}
          onItemClick={closeMenu}
          pathname={pathname}
        />
      </div>
    </div>
  )
}
