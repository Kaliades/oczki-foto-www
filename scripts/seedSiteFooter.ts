import type { Payload } from 'payload'

import { homeFooterNewsletterDefaults } from '@/components/HomeFooterNewsletter/constants'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'

import { createUploadMedia } from './lib/uploadMedia'
import { runSeedCli } from './lib/seedCli'

function seedAssetPath(figmaSrc: string): string {
  return figmaSrc.replace(/^\/figma\//, '/seed-assets/')
}

export async function seedSiteFooter(payload: Payload): Promise<void> {
  const upload = createUploadMedia(payload, { prefix: 'site-footer' })
  const d = homeFooterNewsletterDefaults
  const nl = d.newsletter

  const newsletterPhotoId = await upload('/seed-assets/newsletter-photo.png', nl.photoAlt)

  const galleryIds: { image: number; alt: string }[] = []
  for (const img of d.footer.galleryImages) {
    const id = await upload(seedAssetPath(img.src), img.alt)
    galleryIds.push({ image: id, alt: img.alt })
  }

  await payload.updateGlobal({
    slug: 'siteSettings',
    data: {
      email: 'kontakt@oczkifotografia.pl',
      phone: '+48 000 000 000',
      locationsLabel: 'Kraków · Przemyśl i okolice',
      inquiryDefaults: {
        label: homeOfferDefaults.inquiry.cta.label ?? 'Pogadajmy',
        url: homeOfferDefaults.inquiry.cta.url ?? '/kontakt',
      },
      newsletter: {
        heading: {
          plain: nl.heading.plain,
          emphasis: nl.heading.emphasis,
          plainEnd: nl.heading.plainEnd,
        },
        intro: nl.intro,
        submitLabel: nl.submitLabel,
        privacyLink: {
          type: 'custom',
          url: nl.privacyLink.url ?? '/polityka-prywatnosci',
          label: nl.privacyLink.label ?? 'politykę prywatności',
          newTab: nl.privacyLink.newTab ?? false,
        },
        photo: newsletterPhotoId,
        photoAlt: nl.photoAlt,
      },
      socials: d.footer.socialLinks.map((s) => ({
        platform: s.platform,
        label: s.label,
        url: s.href,
      })),
      copyright: '© {year} Oczki Fotografia',
      serviceLinks: d.footer.serviceLinks.map((item) => ({
        label: item.label,
        link: { type: 'custom' as const, url: item.link.url ?? '/', label: item.label },
      })),
      pageLinks: d.footer.pageLinks.map((item) => ({
        label: item.label,
        link: { type: 'custom' as const, url: item.link.url ?? '/', label: item.label },
      })),
      galleryImages: galleryIds,
    },
    context: { disableRevalidate: true },
  })
}

runSeedCli(seedSiteFooter, 'seedSiteFooter')
