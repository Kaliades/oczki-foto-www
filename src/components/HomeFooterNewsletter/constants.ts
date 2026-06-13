import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Figma source nodes for the combined "Footer+Newsletter" section.
 * Same component instance on homepage and gallery — artboard placement differs.
 *
 * Homepage:
 *   - desktop 1366: 7102:11553
 *   - tablet  768:  7105:11932
 *   - mobile  360:  7105:14227
 *
 * Gallery listing (`/galeria`):
 *   - desktop 1366: 7102:11417
 *   - tablet  768:  7104:18257
 *   - mobile  360:  7104:19458
 *
 * Case study (`/galeria/[slug]`):
 *   - desktop 1366: 7102:11281
 *   - tablet  768:  7102:13177
 *   - mobile  360:  7102:17058
 *
 * Offer service (`/oferta/[slug]`):
 *   - desktop 1366: 7100:6792
 *   - tablet  768:  7100:8624
 *   - mobile  360:  7102:10290
 *
 * About (`/o-mnie`):
 *   - desktop 1366: 7091:5203
 *   - tablet  768:  7092:4749
 *   - mobile  360:  7093:6134
 *
 * Contact (`/kontakt`):
 *   - desktop 1366: 7091:4030
 *   - tablet  768:  7091:4166
 *   - mobile  360:  7091:4302
 */
export const HOME_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7102:11553',
  tabletFrame: '7105:11932',
  mobileFrame: '7105:14227',
} as const

export const GALLERY_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7102:11417',
  tabletFrame: '7104:18257',
  mobileFrame: '7104:19458',
} as const

export const CASE_STUDY_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7102:11281',
  tabletFrame: '7102:13177',
  mobileFrame: '7102:17058',
} as const

export const OFFER_SERVICE_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7100:6792',
  tabletFrame: '7100:8624',
  mobileFrame: '7102:10290',
} as const

export const ABOUT_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7091:5203',
  tabletFrame: '7092:4749',
  mobileFrame: '7093:6134',
} as const

export const CONTACT_FOOTER_NEWSLETTER_FIGMA_NODES = {
  desktopFrame: '7091:4030',
  tabletFrame: '7091:4166',
  mobileFrame: '7091:4302',
} as const

/** Section shell metrics from Figma `get_metadata` (7091:3620 / 3649 / 3634). */
export const FOOTER_NEWSLETTER_SHELL = {
  contentOverlapBottom: 32,
  newsletter: {
    photoWidthDesktop: 660,
    formColumnWidthDesktop: 706,
    formContentMaxWidth: 450,
    formColumnPaddingTop: 80,
    formColumnPaddingBottom: 128,
    formColumnPaddingX: { mobile: 24, tablet: 80, desktop: 128 },
    formColumnGap: 32,
    headerGap: 16,
    formGap: 32,
    inputGroupGap: 12,
  },
  footer: {
    stopkaPaddingX: 24,
    stopkaPaddingTop: 48,
    stopkaPaddingBottom: 16,
    stopkaSectionGap: 80,
    scallopOverlapUp: 40,
    stopkaContentPaddingTop: 88,
    navLinkMinHeight: 44,
    logoBlockWidth: 395,
    logoBlockGap: 32,
    logoMarkGap: 10,
    linkColumnWidth: 286,
    galleryGap: 10,
    galleryTileHeight: { mobile: 140, tablet: 180, desktop: 262 },
    galleryTileWidth: { default: 211, fifth: 212 },
  },
} as const

export type FooterNewsletterFigmaNodes = {
  readonly desktopFrame: string
  readonly tabletFrame: string
  readonly mobileFrame: string
}

export type FooterNavLink = {
  label: string
  link: SectionLink
}

export type FooterGalleryImage = {
  src: string
  alt: string
}

export type FooterSocialLink = {
  platform: 'instagram' | 'facebook' | 'pinterest' | 'weselezklasa'
  href: string
  label: string
}

export type HomeFooterNewsletterData = {
  newsletter: {
    heading: {
      plain: string
      emphasis: string
      plainEnd: string
    }
    intro: string
    submitLabel: string
    privacyLink: SectionLink
    photoSrc: string
    photoAlt: string
  }
  footer: {
    serviceLinks: readonly FooterNavLink[]
    pageLinks: readonly FooterNavLink[]
    socialLinks: readonly FooterSocialLink[]
    galleryImages: readonly FooterGalleryImage[]
  }
}

export const homeFooterNewsletterDefaults: HomeFooterNewsletterData = {
  newsletter: {
    heading: {
      plain: 'Małe wskazówki, wielka ',
      emphasis: 'pewność siebie',
      plainEnd: ' przed aparatem',
    },
    intro:
      'Nie musisz zapisywać się na sesję, żeby poczuć różnicę. W moim newsletterze dzielę się krótkimi poradami i inspiracjami, które pomagają.',
    submitLabel: 'Dołącz do newslettera',
    privacyLink: {
      type: 'custom',
      url: '/polityka-prywatnosci',
      label: 'politykę prywatności',
      newTab: false,
    },
    photoSrc: '/figma/newsletter-photo.png',
    photoAlt: 'Kobieta siedząca na białej kanapie z filiżanką w dłoni',
  },
  footer: {
    serviceLinks: [
      { label: 'Sesje kobiece', link: { type: 'custom', url: '/oferta/sesje-kobiece', label: 'Sesje kobiece' } },
      { label: 'Reportaże ślubne', link: { type: 'custom', url: '/oferta/reportaze-slubne', label: 'Reportaże ślubne' } },
      { label: 'Sesje wizerunkowe', link: { type: 'custom', url: '/oferta/sesje-wizerunkowe', label: 'Sesje wizerunkowe' } },
      { label: 'Sesje rodzinne', link: { type: 'custom', url: '/oferta/sesje-rodzinne', label: 'Sesje rodzinne' } },
    ],
    pageLinks: [
      { label: 'Galeria', link: { type: 'custom', url: '/galeria', label: 'Galeria' } },
      { label: 'Kontakt', link: { type: 'custom', url: '/kontakt', label: 'Kontakt' } },
      { label: 'O mnie', link: { type: 'custom', url: '/o-mnie', label: 'O mnie' } },
    ],
    socialLinks: [
      {
        platform: 'instagram',
        href: 'https://www.instagram.com/oczki_fotografia/',
        label: 'Instagram',
      },
      {
        platform: 'facebook',
        href: 'https://www.facebook.com/oczki.fotografia/',
        label: 'Facebook',
      },
      {
        platform: 'pinterest',
        href: 'https://pl.pinterest.com/oczki_fotografia/',
        label: 'Pinterest',
      },
      {
        platform: 'weselezklasa',
        href: 'https://weselezklasa.pl/',
        label: 'Wesele z klasą',
      },
    ],
    galleryImages: [
      { src: '/figma/footer-gallery-1.png', alt: 'Para w plenerze — reportaż ślubny' },
      { src: '/figma/footer-gallery-2.png', alt: 'Twierdza w słońcu — plener ślubny' },
      { src: '/figma/footer-gallery-3.png', alt: 'Pan młody niesie panią młodą' },
      { src: '/figma/footer-gallery-4.png', alt: 'Portret kobiety w kwiatach' },
      { src: '/figma/footer-gallery-5.png', alt: 'Para w plenerze — sesja ślubna' },
      { src: '/figma/footer-gallery-6.png', alt: 'Portret kobiety w kwiatach — sesja kobieca' },
    ],
  },
}
