'use client'

import { OczkiNavbar, type OczkiNavbarVariant } from '@/components/OczkiNavbar'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

function resolveNavbarVariant(pathname: string): OczkiNavbarVariant {
  if (pathname === '/' || pathname === '/home') {
    return 'overlay'
  }

  return 'solid'
}

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data: _data }) => {
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

  return <OczkiNavbar theme={theme} variant={variant} />
}
