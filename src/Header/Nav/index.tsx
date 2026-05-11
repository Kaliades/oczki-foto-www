'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'

const navItems = [
  { href: '/oferta', label: 'Oferta', withIcon: true },
  { href: '/galeria', label: 'Galeria' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/kontakt', label: 'Kontakt' },
]

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-3.5 shrink-0"
      fill="none"
      viewBox="0 0 14 14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

export const HeaderNav: React.FC<{ data: HeaderType }> = () => {
  return (
    <nav aria-label="Główna nawigacja" className="hidden items-center gap-4 md:flex lg:gap-8">
      {navItems.map((item, i) => {
        return (
          <Link
            className="oczki-body-m inline-flex h-11 items-center gap-1 text-[var(--oczki-primary-700)] transition-colors hover:text-[var(--oczki-primary-900)]"
            href={item.href}
            key={`${item.label}-${i}`}
          >
            {item.label}
            {'withIcon' in item && item.withIcon ? <ArrowDownIcon /> : null}
          </Link>
        )
      })}
    </nav>
  )
}
