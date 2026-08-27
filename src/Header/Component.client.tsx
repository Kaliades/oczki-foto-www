'use client'

import { OczkiNavbar, type OczkiNavbarVariant } from '@/components/OczkiNavbar'
import type { NavCtaProps, NavDropdownItem, NavItemProps } from '@/components/OczkiNavbar/types'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

function resolveNavbarVariant(pathname: string): OczkiNavbarVariant {
  if (pathname === '/') {
    return 'overlay'
  }

  return 'solid'
}

function mapHeaderData(data: Header): { navItems: readonly NavItemProps[]; cta: NavCtaProps } {
  const navItems: NavItemProps[] = (data.navItems ?? []).flatMap((item) => {
    const url = item.link?.url
    const label = item.link?.label
    if (!url || !label) return []
    return [{ href: url, label, withDropdownIcon: item.withDropdownIcon ?? false }]
  })

  return {
    navItems,
    cta: {
      href: data.ctaUrl ?? '/kontakt',
      label: data.ctaLabel ?? 'Umów sesję',
    },
  }
}

interface HeaderClientProps {
  data: Header
  offerNavItems: readonly NavDropdownItem[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, offerNavItems }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const variant = resolveNavbarVariant(pathname)

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  const { navItems: rawNavItems, cta } = mapHeaderData(data)

  return (
    <OczkiNavbar
      cta={cta}
      navItems={rawNavItems}
      offerNavItems={offerNavItems}
      theme={theme}
      variant={variant}
    />
  )
}
