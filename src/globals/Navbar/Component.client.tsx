'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import type { Navbar } from '@/payload-types'

type NavItem = NonNullable<Navbar['navItems']>[number]
type Cta = NonNullable<Navbar['cta']>

interface NavbarMobileProps {
  navItems: NavItem[]
  cta: Cta
  logoLabel: string
}

export const NavbarMobile: React.FC<NavbarMobileProps> = ({ navItems, cta, logoLabel }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Hamburger button — visible only on mobile */}
      <button
        aria-controls="navbar-mobile-drawer"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Zamknij menu' : 'Otwórz menu'}
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
      >
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`}
        />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        id="navbar-mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-white shadow-xl flex flex-col pt-6 pb-8 px-6 transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Menu mobilne"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-base font-semibold tracking-tight">{logoLabel}</span>
          <button
            aria-label="Zamknij menu"
            className="flex items-center justify-center w-9 h-9 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            onClick={() => setIsOpen(false)}
            type="button"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Nawigacja mobilna">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="block py-3 text-base font-medium text-black hover:text-black/60 transition-colors border-b border-black/5"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        {cta?.label && cta?.href && (
          <div className="mt-auto pt-8">
            <Link
              href={cta.href}
              target={cta.openInNewTab ? '_blank' : undefined}
              rel={cta.openInNewTab ? 'noopener noreferrer' : undefined}
              className="block w-full text-center rounded-full bg-black text-white py-3 px-6 text-sm font-medium hover:bg-black/80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {cta.label}
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
