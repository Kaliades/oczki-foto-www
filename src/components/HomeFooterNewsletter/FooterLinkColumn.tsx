import Link from 'next/link'

import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import type { FooterNavLink } from './constants'

type FooterLinkColumnProps = {
  align?: 'left' | 'right'
  links: readonly FooterNavLink[]
}

/** Vertical nav list — Figma `7091:3652` / `7091:3705`. */
export function FooterLinkColumn({ align = 'left', links }: FooterLinkColumnProps) {
  return (
    <ul className="flex w-full flex-col items-start lg:w-[286px]">
      {links.map((item) => {
        const href = resolveLinkHref(item.link)
        if (!href) return null

        return (
          <li className="w-full" key={item.label}>
            <Link
              className={`flex min-h-11 w-full items-center py-1 oczki-body-m text-[var(--oczki-primary-700)] transition-colors hover:text-[var(--oczki-primary-800)] ${
                align === 'right' ? 'justify-end text-right' : 'justify-start'
              }`}
              href={href}
              target={item.link.newTab ? '_blank' : undefined}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
