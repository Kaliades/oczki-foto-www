import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { cache } from 'react'
import Link from 'next/link'
import React from 'react'

import { ImageMedia } from '@/components/Media/ImageMedia'
import type { Media } from '@/payload-types'

import { NavbarMobile } from './Component.client'

const queryNavbar = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'navbar',
    draft,
    overrideAccess: draft,
    depth: 1,
  })
})

export const Navbar: React.FC = async () => {
  const navbar = await queryNavbar()

  const { logo, logoLabel, navItems, cta } = navbar

  const resolvedLogo = logo && typeof logo === 'object' ? (logo as Media) : null

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-black/5">
      <div className="mx-auto max-w-[1366px] px-8 py-4 flex items-center justify-between">
        {/* Logo / wordmark */}
        <Link href="/" aria-label={logoLabel ?? 'Strona główna'} className="flex items-center">
          {resolvedLogo ? (
            <ImageMedia
              resource={resolvedLogo}
              imgClassName="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <span className="text-base font-semibold tracking-tight">
              {logoLabel ?? 'Oczki fotografia'}
            </span>
          )}
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav aria-label="Nawigacja główna" className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {(navItems ?? []).map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  target={item.openInNewTab ? '_blank' : undefined}
                  rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-sm font-medium text-black hover:text-black/60 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          {cta?.label && cta?.href && (
            <Link
              href={cta.href}
              target={cta.openInNewTab ? '_blank' : undefined}
              rel={cta.openInNewTab ? 'noopener noreferrer' : undefined}
              className="rounded-full bg-black text-white text-sm font-medium px-6 py-2.5 hover:bg-black/80 transition-colors"
            >
              {cta.label}
            </Link>
          )}
        </nav>

        {/* Mobile hamburger + drawer */}
        <NavbarMobile
          navItems={navItems ?? []}
          cta={cta ?? { label: '', href: '', openInNewTab: false }}
          logoLabel={logoLabel ?? 'Oczki fotografia'}
        />
      </div>
    </header>
  )
}
