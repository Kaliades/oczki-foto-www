import type { NavDropdownItem, NavItemProps } from '@/components/OczkiNavbar/types'

const OFFER_NAV_HREF = '/oferta'

function normalizeHref(href: string): string {
  if (href.length > 1 && href.endsWith('/')) return href.slice(0, -1)
  return href
}

/**
 * Attaches CMS offer links to nav items flagged with a dropdown icon on /oferta.
 */
export function enrichNavItemsWithOfferDropdown(
  navItems: readonly NavItemProps[],
  offerNavItems: readonly NavDropdownItem[],
): NavItemProps[] {
  if (offerNavItems.length === 0) return [...navItems]

  return navItems.map((item) => {
    if (!item.withDropdownIcon || normalizeHref(item.href) !== OFFER_NAV_HREF) {
      return item
    }

    return { ...item, dropdownItems: offerNavItems }
  })
}
