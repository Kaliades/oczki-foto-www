export const OCZKI_NAVBAR_FIGMA_NODES = {
  desktop: '7104:17640',
  tablet: '7104:17971',
  mobile: '7104:19172',
} as const

export type OczkiNavItem = {
  href: string
  label: string
  withDropdownIcon?: boolean
}

/** Static nav until Header global is wired through `OczkiNavbar`. */
export const OCZKI_NAV_ITEMS: readonly OczkiNavItem[] = [
  { href: '/oferta', label: 'Oferta', withDropdownIcon: true },
  { href: '/galeria', label: 'Galeria' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
] as const

export const OCZKI_NAVBAR_CTA = {
  href: '/kontakt',
  label: 'Umów sesję',
} as const
