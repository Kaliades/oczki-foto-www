'use client'

import { OCZKI_NAV_ITEMS } from './constants'
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
    <nav aria-label="Główna nawigacja" className="hidden md:block">
      <ul className="flex items-center gap-4 lg:gap-8">
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
