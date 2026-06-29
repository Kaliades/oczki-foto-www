export type NavDropdownItem = {
  href: string
  label: string
}

export type NavItemProps = {
  href: string
  label: string
  withDropdownIcon?: boolean
  dropdownItems?: readonly NavDropdownItem[]
}

export type NavCtaProps = {
  href: string
  label: string
}
