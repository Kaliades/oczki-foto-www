import type { RequiredDataFromCollectionSlug } from 'payload'

import { homeAboutDefaults } from '@/components/HomeAbout/constants'
import { homeCtaDefaults } from '@/components/HomeCta/constants'
import { homeGalleryDefaults } from '@/components/HomeGallery/constants'
import { homeHeroDefaults } from '@/components/HomeHero/constants'
import { homeInstagramDefaults } from '@/components/HomeInstagram/constants'
import { homeIntroDefaults } from '@/components/HomeIntro/constants'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'
import { homeProcessStepsDefaults } from '@/components/HomeProcessSteps/constants'
import { homeTestimonialDefaults } from '@/components/HomeTestimonial/constants'

/**
 * Static fallback for the homepage rendered when no `pages` document with
 * slug `home` exists yet (fresh DB / before seeding).
 *
 * The layout uses the same Payload blocks an editor would build in the
 * admin. Block components gracefully fall back to the per-section
 * `*Defaults` constants when relational fields (media, offer items) are
 * not populated, so this static doc still renders the full design.
 *
 * Placeholder relational IDs (`PLACEHOLDER_MEDIA_ID` etc.) are returned
 * as plain numbers — the corresponding block component checks for an
 * actual Media object and falls back to the static `/figma/*` asset
 * paths shipped in `public/figma/`.
 */
const PLACEHOLDER_MEDIA_ID = 0

export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  title: 'Strona główna',
  hero: { type: 'none' },
  layout: [
    {
      blockType: 'homeHero',
      blockName: 'Hero — strona główna',
      title: homeHeroDefaults.title,
      description: homeHeroDefaults.description,
      background: PLACEHOLDER_MEDIA_ID,
      showScallop: homeHeroDefaults.showScallop ?? true,
      ctas: [
        {
          link: {
            type: homeHeroDefaults.primaryCta.type ?? 'custom',
            url: homeHeroDefaults.primaryCta.url ?? '/',
            label: homeHeroDefaults.primaryCta.label ?? '',
            newTab: homeHeroDefaults.primaryCta.newTab ?? false,
          },
        },
        {
          link: {
            type: homeHeroDefaults.secondaryCta.type ?? 'custom',
            url: homeHeroDefaults.secondaryCta.url ?? '/',
            label: homeHeroDefaults.secondaryCta.label ?? '',
            newTab: homeHeroDefaults.secondaryCta.newTab ?? false,
          },
        },
      ],
    },
    {
      blockType: 'introQuote',
      blockName: 'Intro — niefotogeniczność',
      heading: homeIntroDefaults.heading,
      introLeadIn: homeIntroDefaults.introLeadIn,
      quoteText: homeIntroDefaults.quoteText,
      body: homeIntroDefaults.body,
      collageImage: PLACEHOLDER_MEDIA_ID,
      collageImageAlt: homeIntroDefaults.collageImage.alt,
      handwrittenQuote: homeIntroDefaults.handwrittenQuote,
    },
    {
      blockType: 'offerShowcase',
      blockName: 'Oferta',
      heading: homeOfferDefaults.heading,
      subtitle: homeOfferDefaults.subtitle,
      items: [],
      inquiry: {
        title: homeOfferDefaults.inquiry.title,
        text: homeOfferDefaults.inquiry.text,
        cta: [
          {
            link: {
              type: homeOfferDefaults.inquiry.cta.type ?? 'custom',
              url: homeOfferDefaults.inquiry.cta.url ?? '/',
              label: homeOfferDefaults.inquiry.cta.label ?? '',
              newTab: homeOfferDefaults.inquiry.cta.newTab ?? false,
            },
          },
        ],
      },
      showFooterNotch: homeOfferDefaults.showFooterNotch ?? true,
    },
    {
      blockType: 'processSteps',
      blockName: 'Kroki — proces sesji',
      heading: homeProcessStepsDefaults.heading,
      intro: homeProcessStepsDefaults.intro,
      items: homeProcessStepsDefaults.items.map((item) => ({
        title: item.title,
        paragraphOne: item.paragraphs[0],
        paragraphTwo: item.paragraphs[1],
      })),
      showWaxStamp: homeProcessStepsDefaults.showWaxStamp ?? true,
    },
    {
      blockType: 'homeGallery',
      blockName: 'Galeria — chwile zatrzymane w kadrze',
      heading: homeGalleryDefaults.heading,
      description: homeGalleryDefaults.description,
      cta: {
        type: homeGalleryDefaults.cta.type ?? 'custom',
        url: homeGalleryDefaults.cta.url ?? '/galeria',
        label: homeGalleryDefaults.cta.label ?? 'Zobacz wszystkie zdjęcia',
        newTab: homeGalleryDefaults.cta.newTab ?? false,
      },
      items: homeGalleryDefaults.items.map((item) => ({
        image: PLACEHOLDER_MEDIA_ID,
        imageAlt: item.imageAlt,
        caption: item.caption
          ? { title: item.caption.title, subtitle: item.caption.subtitle }
          : undefined,
      })),
    },
    {
      blockType: 'testimonial',
      blockName: 'Opinie',
      heading: homeTestimonialDefaults.heading,
      items: homeTestimonialDefaults.items.map((item) => ({
        quote: item.quote,
        author: item.author,
        photo: PLACEHOLDER_MEDIA_ID,
        photoAlt: item.photoAlt,
      })),
      showPolaroid: homeTestimonialDefaults.showPolaroid ?? true,
    },
    {
      blockType: 'homeAbout',
      blockName: 'O mnie — Hej, jestem Asia',
      heading: {
        start: homeAboutDefaults.heading.start,
        emphasis: homeAboutDefaults.heading.emphasis,
        end: homeAboutDefaults.heading.end,
      },
      paragraphOne: homeAboutDefaults.paragraphs[0],
      paragraphTwo: homeAboutDefaults.paragraphs[1],
      portrait: PLACEHOLDER_MEDIA_ID,
      portraitAlt: homeAboutDefaults.portrait.alt,
      cta: {
        type: homeAboutDefaults.cta.type ?? 'custom',
        url: homeAboutDefaults.cta.url ?? '/o-mnie',
        label: homeAboutDefaults.cta.label ?? '',
        newTab: homeAboutDefaults.cta.newTab ?? false,
      },
    },
    {
      blockType: 'homeInstagram',
      blockName: 'Instagram',
      heading: {
        plain: homeInstagramDefaults.heading.plain,
        emphasis: homeInstagramDefaults.heading.emphasis,
      },
      profile: {
        avatar: PLACEHOLDER_MEDIA_ID,
        avatarAlt: homeInstagramDefaults.profile.avatarAlt,
        profileLink: {
          type: homeInstagramDefaults.profile.link.type ?? 'custom',
          url: homeInstagramDefaults.profile.link.url ?? '/',
          label: homeInstagramDefaults.profile.link.label ?? '',
          newTab: homeInstagramDefaults.profile.link.newTab ?? true,
        },
      },
      // Empty array → block component falls back to the figma post defaults.
      posts: [],
    },
    {
      blockType: 'homeCta',
      blockName: 'CTA końcowy — rezerwacja sesji',
      heading: {
        plain: homeCtaDefaults.heading.plain,
        emphasis: homeCtaDefaults.heading.emphasis,
      },
      body: homeCtaDefaults.body,
      cta: {
        type: homeCtaDefaults.cta.type ?? 'custom',
        url: homeCtaDefaults.cta.url ?? '/kontakt',
        label: homeCtaDefaults.cta.label ?? '',
        newTab: homeCtaDefaults.cta.newTab ?? false,
      },
    },
  ],
  meta: {
    description:
      'Naturalna fotografia kobieca i ślubna w Krakowie, Przemyślu i okolicach.',
    title: 'Oczki Fotografia — Strona główna',
  },
}
