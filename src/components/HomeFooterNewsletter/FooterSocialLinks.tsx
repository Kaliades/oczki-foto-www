import Image from 'next/image'
import Link from 'next/link'

import type { FooterSocialLink } from './constants'

const SOCIAL_ICON_SRC: Record<FooterSocialLink['platform'], string> = {
  instagram: '/figma/social-instagram.svg',
  facebook: '/figma/social-facebook.svg',
  pinterest: '/figma/social-pinterest.svg',
  weselezklasa: '/figma/social-weselezklasa.svg',
}

type FooterSocialLinksProps = {
  links: readonly FooterSocialLink[]
}

/** Social icon row — Figma `7091:3681`. Each icon sits in a 44×44 tap target. */
export function FooterSocialLinks({ links }: FooterSocialLinksProps) {
  return (
    <div className="flex items-center" data-name="Social Media Icons">
      {links.map((social) => (
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
  )
}
