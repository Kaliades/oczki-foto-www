import Image from 'next/image'
import Link from 'next/link'

import { resolveLinkHref } from '@/utilities/resolveLinkHref'
import type { FooterNavLink, FooterSocialLink } from './constants'

const SOCIAL_ICON_SRC: Record<FooterSocialLink['platform'], string> = {
  instagram: '/figma/social-instagram.svg',
  facebook: '/figma/social-facebook.svg',
  pinterest: '/figma/social-pinterest.svg',
  weselezklasa: '/figma/social-weselezklasa.svg',
}

type FooterNavProps = {
  serviceLinks: readonly FooterNavLink[]
  pageLinks: readonly FooterNavLink[]
  socialLinks: readonly FooterSocialLink[]
}

function FooterLinkColumn({
  align = 'left',
  links,
}: {
  align?: 'left' | 'right'
  links: readonly FooterNavLink[]
}) {
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

/**
 * Footer navigation row — services, centred logo + socials, page links.
 * Figma node `7091:3650`.
 */
export function FooterNav({ serviceLinks, pageLinks, socialLinks }: FooterNavProps) {
  return (
    <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between">
      <div className="hidden shrink-0 lg:block lg:w-[286px]">
        <FooterLinkColumn links={serviceLinks} />
      </div>

      <div className="flex w-full flex-col items-center gap-8 lg:w-[395px] lg:shrink-0">
        <div className="flex w-[132px] flex-col items-center gap-2.5">
          <Image
            alt=""
            aria-hidden="true"
            className="h-12 w-[33px]"
            height={48}
            src="/figma/oczki-sygnet.svg"
            width={33}
          />
          <Image
            alt="Oczki fotografia"
            className="h-[31px] w-[105px]"
            height={31}
            src="/figma/oczki-logotyp.svg"
            width={105}
          />
        </div>

        <div className="flex items-center">
          {socialLinks.map((social) => (
            <Link
              aria-label={social.label}
              className="flex items-center p-2.5 text-[var(--oczki-primary-700)] transition-opacity hover:opacity-70"
              href={social.href}
              key={social.platform}
              rel="noopener noreferrer"
              target="_blank"
            >
              <Image
                alt=""
                aria-hidden="true"
                className="size-6"
                height={24}
                src={SOCIAL_ICON_SRC[social.platform]}
                width={24}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex w-full gap-8 lg:hidden">
        <FooterLinkColumn links={serviceLinks} />
        <FooterLinkColumn align="right" links={pageLinks} />
      </div>

      <div className="hidden shrink-0 lg:block lg:w-[286px]">
        <FooterLinkColumn align="right" links={pageLinks} />
      </div>
    </div>
  )
}
