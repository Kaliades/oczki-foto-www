import type { Payload } from 'payload'

import { galleryCtaDefaults } from '@/components/GalleryCta/constants'
import { GALLERY_SESSION_FILTERS, galleryHeroDefaults } from '@/components/GalleryHero/constants'
import { homeEaseDefaults } from '@/components/HomeEase/constants'
import { homeFaqDefaults } from '@/components/HomeFaq/constants'
import { GALLERY_PORTFOLIO_LOAD_MORE_LABEL } from '@/components/GalleryPortfolio/constants'

import { createUploadMedia } from './lib/uploadMedia'
import { runSeedCli } from './lib/seedCli'

export async function seedGalleryPage(payload: Payload): Promise<void> {
  const upload = createUploadMedia(payload, { prefix: 'gallery-page' })

  const d = galleryHeroDefaults
  const ease = homeEaseDefaults
  const faq = homeFaqDefaults
  const cta = galleryCtaDefaults

  const easePhotoId = await upload('/seed-assets/ease-tilted-photo.png', ease.tiltedPhoto.alt)

  await payload.updateGlobal({
    slug: 'galleryPage',
    data: {
      heroContent: {
        title: {
          lead: d.title.lead,
          emphasis: d.title.emphasis,
          trail: d.title.trail,
        },
        description: d.description,
        filters: GALLERY_SESSION_FILTERS.map((f) => ({
          category: f.id,
          label: f.label,
        })),
        defaultFilter: d.defaultFilterId,
      },
      portfolioSettings: {
        initialCount: 12,
        loadMoreBatchSize: 12,
        loadMoreLabel: GALLERY_PORTFOLIO_LOAD_MORE_LABEL,
      },
      easeSection: {
        heading: {
          start: ease.heading.start,
          emphasis: ease.heading.emphasis,
        },
        body: ease.body,
        photo: easePhotoId,
        photoAlt: ease.tiltedPhoto.alt,
      },
      faqSection: {
        heading: {
          emphasis: faq.heading.emphasis,
          start: faq.heading.start,
        },
        intro: faq.intro,
        items: faq.items.map((item) => ({
          id: item.id,
          question: item.question,
          answer: item.answer,
        })),
      },
      ctaSection: {
        heading: {
          start: cta.heading.start,
          emphasis: cta.heading.emphasis,
          end: cta.heading.end,
        },
        body: cta.body,
        button: {
          label: cta.cta.label ?? 'Porozmawiajmy',
          url: cta.cta.url ?? '/kontakt',
        },
      },
    },
    context: { disableRevalidate: true },
  })
}

runSeedCli(seedGalleryPage, 'seedGalleryPage')
