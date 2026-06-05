'use client'

import { OCZKI_NAV_ITEMS, OCZKI_NAVBAR_NAV_GAP_CLASS } from './constants'
import { OczkiNavbarLink, mapNavItemToLinkProps } from './OczkiNavbarLink'

type OczkiNavbarNavProps = {
  pathname: string
}

/**
 * Centred nav cluster — hidden below `md` (mobile uses menu button instead).
 * Figma gaps: 16px tablet (`md`), 32px desktop (`lg`).
 */
export function OczkiNavbarNav({ pathname }: OczkiNavbarNavProps) {
  return (
    <nav
      aria-label="Główna nawigacja"
      className="hidden shrink-0 md:block"
      data-name="Navbar link"
    >
      <ul className={`flex items-center ${OCZKI_NAVBAR_NAV_GAP_CLASS}`}>
        {OCZKI_NAV_ITEMS.map((item) => {
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
