import Image from 'next/image'

import type { FooterSocialLink } from './constants'
import { FooterSocialLinks } from './FooterSocialLinks'

type FooterBrandBlockProps = {
  socialLinks: readonly FooterSocialLink[]
}

/**
 * Centred logo + social row — Figma `7091:3661` (Logo Block).
 * Reused inside {@link FooterNav} on every breakpoint.
 */
export function FooterBrandBlock({ socialLinks }: FooterBrandBlockProps) {
  return (
    <div
      className="flex w-full flex-col items-center gap-8 lg:w-[395px] lg:shrink-0"
      data-name="Logo Block"
    >
      <div className="flex w-[132px] flex-col items-center gap-2.5" data-name="Logo">
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
      <FooterSocialLinks links={socialLinks} />
    </div>
  )
}
