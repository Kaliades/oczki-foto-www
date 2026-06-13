import type { FooterNavLink, FooterSocialLink } from './constants'
import { FooterBrandBlock } from './FooterBrandBlock'
import { FooterLinkColumn } from './FooterLinkColumn'

type FooterNavProps = {
  serviceLinks: readonly FooterNavLink[]
  pageLinks: readonly FooterNavLink[]
  socialLinks: readonly FooterSocialLink[]
}

/**
 * Footer navigation row — services, centred logo + socials, page links.
 * Figma node `7091:3650`.
 */
export function FooterNav({ serviceLinks, pageLinks, socialLinks }: FooterNavProps) {
  return (
    <div
      className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between"
      data-name="Footer Section"
    >
      <div className="hidden shrink-0 lg:block lg:w-[286px]">
        <FooterLinkColumn links={serviceLinks} />
      </div>

      <FooterBrandBlock socialLinks={socialLinks} />

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
