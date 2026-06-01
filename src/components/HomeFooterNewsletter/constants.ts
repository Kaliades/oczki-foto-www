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
 * Gallery (`/galeria`):
 *   - desktop 1366: 7102:11417
 *   - tablet  768:  7104:18257
 *   - mobile  360:  7104:19458
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
