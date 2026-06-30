import { getGlobalForRequest } from '@/utilities/getGlobals'
import {
  AboutFooterNewsletter,
} from '@/components/AboutFooterNewsletter'
import { ContactFooterNewsletter } from '@/components/ContactFooterNewsletter'
import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import { OfferServiceFooterNewsletter } from '@/components/OfferServiceFooterNewsletter'
import { PrivacyPolicyFooterNewsletter } from '@/components/PrivacyPolicyFooterNewsletter'
import {
  homeFooterNewsletterDefaults,
  GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES,
  type HomeFooterNewsletterData,
  type FooterNavLink,
  type FooterGalleryImage,
  type FooterSocialLink,
} from '@/components/HomeFooterNewsletter/constants'
import type { NewsletterSignupSource } from '@/newsletter/types'
import type { SiteSetting } from '@/payload-types'
import type { SectionLink } from '@/utilities/resolveLinkHref'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export type SiteFooterVariant = NewsletterSignupSource

/** Platforms the footer icon row can render (subset of SiteSettings.socials). */
const SUPPORTED_FOOTER_SOCIALS: ReadonlySet<string> = new Set<FooterSocialLink['platform']>([
  'instagram',
  'facebook',
  'pinterest',
  'weselezklasa',
])

/** Maps a Payload link group to the SectionLink shape used by components. */
function mapLink(
  payloadLink: {
    type?: ('reference' | 'custom') | null
    url?: string | null
    label?: string | null
    newTab?: boolean | null
    reference?: unknown
  } | undefined,
  fallback: SectionLink,
): SectionLink {
  if (!payloadLink) return fallback
  return {
    type: payloadLink.type ?? fallback.type,
    url: payloadLink.url ?? fallback.url,
    label: payloadLink.label ?? fallback.label,
    newTab: payloadLink.newTab ?? fallback.newTab,
    reference: (payloadLink.reference as SectionLink['reference']) ?? null,
  }
}

function mapSiteSettings(settings: SiteSetting): HomeFooterNewsletterData {
  const d = homeFooterNewsletterDefaults
  const nl = settings.newsletter

  const serviceLinks: readonly FooterNavLink[] =
    settings.serviceLinks && settings.serviceLinks.length > 0
      ? settings.serviceLinks.map((item) => ({
          label: item.label,
          link: mapLink(item.link, { type: 'custom', url: '#', label: item.label }),
        }))
      : d.footer.serviceLinks

  const pageLinks: readonly FooterNavLink[] =
    settings.pageLinks && settings.pageLinks.length > 0
      ? settings.pageLinks.map((item) => ({
          label: item.label,
          link: mapLink(item.link, { type: 'custom', url: '#', label: item.label }),
        }))
      : d.footer.pageLinks

  // Social links: only platforms the footer has an icon for are rendered;
  // SiteSettings.socials allows a wider set (tiktok, youtube, other) used
  // elsewhere, so unsupported ones are skipped rather than breaking the icon row.
  const mappedSocials: FooterSocialLink[] = (settings.socials ?? []).flatMap((s) =>
    SUPPORTED_FOOTER_SOCIALS.has(s.platform)
      ? [{ platform: s.platform as FooterSocialLink['platform'], href: s.url, label: s.label }]
      : [],
  )
  const socialLinks: readonly FooterSocialLink[] =
    mappedSocials.length > 0 ? mappedSocials : d.footer.socialLinks

  const galleryImages: readonly FooterGalleryImage[] =
    settings.galleryImages && settings.galleryImages.length > 0
      ? settings.galleryImages.flatMap((item) => {
          const src = resolvePopulatedMediaUrl(item.image)
          if (!src) return []
          return [{ src, alt: item.alt }]
        })
      : []

  return {
    newsletter: {
      heading: {
        plain: nl?.heading?.plain ?? d.newsletter.heading.plain,
        emphasis: nl?.heading?.emphasis ?? d.newsletter.heading.emphasis,
        plainEnd: nl?.heading?.plainEnd ?? d.newsletter.heading.plainEnd,
      },
      intro: nl?.intro ?? d.newsletter.intro,
      submitLabel: nl?.submitLabel ?? d.newsletter.submitLabel,
      privacyLink: mapLink(nl?.privacyLink, d.newsletter.privacyLink),
      photoSrc: resolvePopulatedMediaUrl(nl?.photo) ?? '',
      photoAlt: nl?.photoAlt ?? d.newsletter.photoAlt,
    },
    footer: {
      serviceLinks,
      pageLinks,
      socialLinks,
      galleryImages,
    },
  }
}

/**
 * Async server component that reads footer + newsletter content from
 * SiteSettings and renders the page-appropriate variant component.
 *
 * Drop-in replacement for the hardcoded `<XxxFooterNewsletter data={defaults} />`
 * calls used on every page.
 */
export async function SiteFooterNewsletter({ variant }: { variant: SiteFooterVariant }) {
  const settings = await getGlobalForRequest('siteSettings', 1)
  const data = settings ? mapSiteSettings(settings as SiteSetting) : homeFooterNewsletterDefaults

  switch (variant) {
    case 'about':
      return <AboutFooterNewsletter data={data} />
    case 'contact':
      return <ContactFooterNewsletter data={data} />
    case 'offer-service':
      return <OfferServiceFooterNewsletter data={data} />
    case 'privacy':
      return <PrivacyPolicyFooterNewsletter data={data} />
    case 'gallery':
      return (
        <HomeFooterNewsletter
          data={data}
          figmaNodes={GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES}
          headingId="gallery-footer-newsletter-heading"
          signupSource="gallery"
        />
      )
    case 'home':
    default:
      return <HomeFooterNewsletter data={data} signupSource="home" />
  }
}
