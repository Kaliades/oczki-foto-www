/**
 * Solid navbar on the O mnie page — active link `7092:4184` visible on desktop only.
 * Overlay home variant uses component instances `7100:7759` / `7100:7809` / `7102:9480`.
 */
export const OCZKI_NAVBAR_FIGMA_NODES = {
  desktop: '7091:5157',
  tablet: '7092:4197',
  mobile: '7093:5558',
} as const

/**
 * Horizontal padding on the 1366 cap — shared rhythm for sections that align
 * ornaments or content with the logo / CTA columns (e.g. GalleryHero decor).
 */
export const OCZKI_NAVBAR_CAP_PADDING_CLASS = 'px-9 md:px-20 lg:px-9' as const

export const OCZKI_NAVBAR_GUTTER_START_CLASS = 'left-9 md:left-20 lg:left-9' as const
export const OCZKI_NAVBAR_GUTTER_END_CLASS = 'right-9 md:right-20 lg:right-9' as const

/** Figma metadata: mobile 8+44+8=60, tablet/desktop 12+44+12=68. */
export const OCZKI_NAVBAR_SHELL_PADDING_Y_CLASS = 'py-2 md:py-3' as const

/** Figma `Navbar link` cluster gap: 16 px tablet, 32 px desktop. */
export const OCZKI_NAVBAR_NAV_GAP_CLASS = 'gap-4 lg:gap-8' as const

export const OCZKI_NAVBAR_HORIZONTAL_INSET = {
  mobile: 36,
  tablet: 80,
  desktop: 36,
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
