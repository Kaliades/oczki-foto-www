'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { OczkiButton } from '@/components/OczkiButton'

import type { NavCtaProps, NavItemProps } from './types'

type OczkiNavbarMobileMenuProps = {
  isOpen: boolean
  navItems: readonly NavItemProps[]
  cta: NavCtaProps
  onClose: () => void
}

/**
 * Mobile / tablet navigation — classic drawer that slides in from the right.
 *
 * Uses a `<dialog>` element for native focus trap and keyboard handling
 * (Escape closes by default). The panel is a fixed-width drawer (not
 * full-screen); the rest of the viewport is dimmed by the dialog `::backdrop`,
 * and clicking the dim area closes the menu.
 *
 * Accessibility:
 * - `role="dialog"` + `aria-modal="true"` (implicit on `<dialog>`)
 * - Focus moves into the dialog on open; returns to the trigger on close.
 * - Scroll lock on `<body>` while open.
 */
export function OczkiNavbarMobileMenu({
  isOpen,
  navItems,
  cta,
  onClose,
}: OczkiNavbarMobileMenuProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
        document.body.style.overflow = 'hidden'
      }
    } else {
      if (dialog.open) {
        dialog.close()
        document.body.style.overflow = ''
      }
    }
  }, [isOpen])

  // Close on navigation (pathname change).
  useEffect(() => {
    if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const handleCancel = (e: React.SyntheticEvent<HTMLDialogElement>) => {
    e.preventDefault()
    onClose()
  }

  // Clicking the dimmed backdrop (target is the dialog element itself) closes.
  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Menu nawigacyjne"
      className="mobile-menu-dialog fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-[min(86vw,360px)] max-w-none overflow-hidden border-0 bg-[var(--oczki-primary-100)] p-0 text-[var(--oczki-primary-900)] [font-family:var(--font-oczki-body)]"
      onCancel={handleCancel}
      onClick={handleClick}
    >
      <div className="flex h-full flex-col">
        {/* Top row — close button */}
        <div className="flex items-center justify-end px-7 py-3">
          <button
            aria-label="Zamknij menu"
            className="flex size-11 shrink-0 items-center justify-center text-[var(--oczki-primary-900)] transition-colors hover:text-[var(--oczki-primary-700)]"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true" className="relative block size-5">
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 rotate-45 bg-current" />
              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 -rotate-45 bg-current" />
            </span>
          </button>
        </div>

        {/* Nav links */}
        <nav aria-label="Nawigacja główna" className="flex-1 overflow-y-auto px-7">
          <ul className="flex flex-col">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`)
              const hasDropdown =
                item.withDropdownIcon && item.dropdownItems && item.dropdownItems.length > 0

              return (
                <li key={item.href}>
                  <Link
                    aria-current={isActive ? 'page' : undefined}
                    className={`flex min-h-14 items-center border-b border-[var(--oczki-primary-300)] oczki-body-xl transition-colors ${
                      isActive
                        ? 'text-[var(--oczki-primary-800)]'
                        : 'text-[var(--oczki-primary-700)] hover:text-[var(--oczki-primary-800)]'
                    }`}
                    href={item.href}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                  {hasDropdown && item.dropdownItems ? (
                    <ul className="border-b border-[var(--oczki-primary-300)] pb-2 pl-4">
                      {item.dropdownItems.map((subItem) => {
                        const isSubActive =
                          pathname === subItem.href || pathname.startsWith(`${subItem.href}/`)

                        return (
                          <li key={subItem.href}>
                            <Link
                              aria-current={isSubActive ? 'page' : undefined}
                              className={`flex min-h-11 items-center oczki-body-m transition-colors ${
                                isSubActive
                                  ? 'text-[var(--oczki-primary-800)] oczki-body-m-medium'
                                  : 'text-[var(--oczki-primary-700)] hover:text-[var(--oczki-primary-800)]'
                              }`}
                              href={subItem.href}
                              onClick={onClose}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  ) : null}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* CTA button */}
        <div className="px-7 pb-9 pt-6">
          <OczkiButton className="w-full" href={cta.href} onClick={onClose}>
            {cta.label}
          </OczkiButton>
        </div>
      </div>
    </dialog>
  )
}
