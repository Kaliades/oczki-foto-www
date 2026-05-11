'use client'
import { OczkiButton } from '@/components/OczkiButton'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="absolute left-0 top-0 z-30 w-full [font-family:var(--font-oczki-body)]"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="mx-auto flex h-[60px] w-full max-w-[1366px] items-center justify-between px-4 md:h-[68px] md:px-20 lg:px-9">
        <Link aria-label="Oczki fotografia - strona główna" href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <HeaderNav data={data} />
        <OczkiButton className="hidden md:inline-flex" href="/kontakt">
          Umów sesję
        </OczkiButton>
        <button
          aria-label="Otwórz menu"
          className="flex size-11 items-center justify-center text-[var(--oczki-primary-900)] md:hidden"
          type="button"
        >
          <span className="relative block h-3 w-5">
            <span className="absolute left-0 top-0 h-px w-full bg-current" />
            <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
            <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
          </span>
        </button>
      </div>
    </header>
  )
}
