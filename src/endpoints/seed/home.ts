import type { RequiredDataFromCollectionSlug } from 'payload'
import type { Media } from '@/payload-types'

import { homeHeroDefaults } from '@/components/HomeHero/constants'
import { homeIntroDefaults } from '@/components/HomeIntro/constants'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'

type HomeArgs = {
  heroImage: Media
  metaImage: Media
}

/**
 * Seeded homepage for the Oczki Fotografia site.
 *
 * The full `/next/seed` route does not yet upload the Figma-sourced
 * assets, so this seed uses generic placeholders (`heroImage`,
 * `metaImage` provided by `src/endpoints/seed/index.ts`) for image
 * fields and leaves the offer relationship empty. The block components
 * gracefully fall back to the `/figma/*` static assets bundled with the
 * site whenever a relational field is missing, so the home page still
 * looks correct against the Figma design after seeding.
 *
 * Editors should replace the placeholders in the admin once real media
 * is uploaded.
 */
export const home: (args: HomeArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  heroImage,
  metaImage,
}) => {
  return {
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
        background: heroImage.id,
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
        collageImage: metaImage.id,
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
    ],
    meta: {
      description:
        'Naturalna fotografia kobieca i ślubna w Krakowie, Przemyślu i okolicach.',
      image: heroImage.id,
      title: 'Oczki Fotografia — Strona główna',
    },
  }
}
