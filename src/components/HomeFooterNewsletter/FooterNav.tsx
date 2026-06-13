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
      className="flex w-full flex-col items-center gap-8 min-[1366px]:flex-row min-[1366px]:items-center min-[1366px]:justify-between"
      data-name="Footer Section"
    >
      <div className="hidden shrink-0 min-[1366px]:block min-[1366px]:w-[286px]">
        <FooterLinkColumn links={serviceLinks} />
      </div>

      <FooterBrandBlock socialLinks={socialLinks} />

      <div className="flex w-full gap-8 min-[1366px]:hidden">
        <FooterLinkColumn links={serviceLinks} />
        <FooterLinkColumn align="right" links={pageLinks} />
      </div>

      <div className="hidden shrink-0 min-[1366px]:block min-[1366px]:w-[286px]">
        <FooterLinkColumn align="right" links={pageLinks} />
      </div>
    </div>
  )
}
