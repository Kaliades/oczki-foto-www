'use client'

import { OCZKI_NAVBAR_NAV_GAP_CLASS } from './constants'
import { OczkiNavbarLink, mapNavItemToLinkProps } from './OczkiNavbarLink'
import type { NavItemProps } from './types'

type OczkiNavbarNavProps = {
  pathname: string
  navItems: readonly NavItemProps[]
}

/** Centred nav cluster — hidden below `md` (mobile uses menu button instead). */
export function OczkiNavbarNav({ pathname, navItems }: OczkiNavbarNavProps) {
  return (
    <nav
      aria-label="Główna nawigacja"
      className="hidden shrink-0 md:block"
      data-name="Navbar link"
    >
      <ul className={`flex items-center ${OCZKI_NAVBAR_NAV_GAP_CLASS}`}>
        {navItems.map((item) => {
          const linkProps = mapNavItemToLinkProps(item, pathname)

          return (
            <li key={item.href}>
              <OczkiNavbarLink {...linkProps} />
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
