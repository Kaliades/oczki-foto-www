import type { Payload } from 'payload'

import { homeAboutDefaults } from '@/components/HomeAbout/constants'
import { homeCtaDefaults } from '@/components/HomeCta/constants'
import { homeGalleryDefaults } from '@/components/HomeGallery/constants'
import { homeHeroDefaults } from '@/components/HomeHero/constants'
import { homeInstagramDefaults } from '@/components/HomeInstagram/constants'
import { homeIntroDefaults } from '@/components/HomeIntro/constants'
import { homeOfferDefaults } from '@/components/HomeOfferShowcase/constants'
import { homeProcessStepsDefaults } from '@/components/HomeProcessSteps/constants'
import { homeTestimonialDefaults } from '@/components/HomeTestimonial/constants'

import { createUploadMedia } from './lib/uploadMedia'
import { runSeedCli } from './lib/seedCli'

/**
 * Seeds an editable `home` Pages document so the homepage can be managed in
 * the admin (instead of falling back to the static `homeStatic` layout).
 *
 * Idempotent: an existing `home` page is deleted first, then recreated.
 */
function seedAssetPath(figmaSrc: string): string {
  return figmaSrc.replace(/^\/figma\//, '/seed-assets/')
}

export async function seedHomePage(payload: Payload): Promise<void> {
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 10,
    pagination: false,
  })

  for (const doc of existing.docs) {
    await payload.delete({
      collection: 'pages',
      id: doc.id,
      context: { disableRevalidate: true },
    })
    console.log(`Removed existing home page #${doc.id}`)
  }

  const upload = createUploadMedia(payload, { prefix: 'home' })

  console.log('Uploading homepage media…')
  const heroBgId = await upload(
    seedAssetPath(homeHeroDefaults.background.src),
    'Tło sekcji hero strony głównej',
  )
  const collageId = await upload(
    seedAssetPath(homeIntroDefaults.collageImage.src),
    homeIntroDefaults.collageImage.alt,
  )
  const galleryIds: number[] = []
  for (const item of homeGalleryDefaults.items) {
    galleryIds.push(await upload(seedAssetPath(item.imageSrc), item.imageAlt))
  }
  const testimonialPhotoIds: number[] = []
  for (const item of homeTestimonialDefaults.items) {
    testimonialPhotoIds.push(await upload(seedAssetPath(item.photoSrc), item.photoAlt))
  }
  const portraitId = await upload(
    seedAssetPath(homeAboutDefaults.portrait.src),
    homeAboutDefaults.portrait.alt,
  )
  const avatarId = await upload(
    seedAssetPath(homeInstagramDefaults.profile.avatarSrc),
    homeInstagramDefaults.profile.avatarAlt,
  )
  const instagramPostIds: number[] = []
  for (const post of homeInstagramDefaults.posts) {
    instagramPostIds.push(await upload(seedAssetPath(post.imageSrc), post.imageAlt))
  }
  console.log('✓ Homepage media uploaded')

  // Offer cards reference existing OfferItems (required relationship).
  const offers = await payload.find({
    collection: 'offerItems',
    limit: 100,
    pagination: false,
    sort: 'createdAt',
  })
  const offerItemIds = offers.docs.map((doc) => doc.id)
  if (offerItemIds.length === 0) {
    console.warn('No OfferItems found — run the offer seed first. Aborting.')
    process.exit(1)
  }
  console.log(`✓ Linking ${offerItemIds.length} offer items`)

  const ctaLink = (cta: { type?: string | null; url?: string | null; label?: string | null; newTab?: boolean | null }) => ({
    type: (cta.type as 'reference' | 'custom') ?? 'custom',
    url: cta.url ?? '/',
    label: cta.label ?? '',
    newTab: cta.newTab ?? false,
  })

  console.log('Creating home page…')
  await payload.create({
    collection: 'pages',
    data: {
      slug: 'home',
      _status: 'published',
      title: 'Strona główna',
      layout: [
        {
          blockType: 'homeHero',
          blockName: 'Hero — strona główna',
          title: homeHeroDefaults.title,
          description: homeHeroDefaults.description,
          background: heroBgId,
          showScallop: homeHeroDefaults.showScallop ?? true,
          ctas: [
            { link: ctaLink(homeHeroDefaults.primaryCta) },
            { link: ctaLink(homeHeroDefaults.secondaryCta) },
          ],
        },
        {
          blockType: 'introQuote',
          blockName: 'Intro — niefotogeniczność',
          heading: homeIntroDefaults.heading,
          introLeadIn: homeIntroDefaults.introLeadIn,
          quoteText: homeIntroDefaults.quoteText,
          body: homeIntroDefaults.body,
          collageImage: collageId,
          collageImageAlt: homeIntroDefaults.collageImage.alt,
          handwrittenQuote: homeIntroDefaults.handwrittenQuote,
        },
        {
          blockType: 'offerShowcase',
          blockName: 'Oferta',
          heading: homeOfferDefaults.heading,
          subtitle: homeOfferDefaults.subtitle,
          items: offerItemIds,
          inquiry: {
            title: homeOfferDefaults.inquiry.title,
            text: homeOfferDefaults.inquiry.text,
            cta: [{ link: ctaLink(homeOfferDefaults.inquiry.cta) }],
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
          cta: ctaLink(homeGalleryDefaults.cta),
          items: homeGalleryDefaults.items.map((item, i) => ({
            image: galleryIds[i],
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
          items: homeTestimonialDefaults.items.map((item, i) => ({
            quote: item.quote,
            author: item.author,
            photo: testimonialPhotoIds[i],
            photoAlt: item.photoAlt,
          })),
          showPolaroid: homeTestimonialDefaults.showPolaroid ?? true,
        },
        {
          blockType: 'homeAbout',
          blockName: 'O mnie — Hej, jestem Asia',
          heading: homeAboutDefaults.heading,
          paragraphOne: homeAboutDefaults.paragraphs[0],
          paragraphTwo: homeAboutDefaults.paragraphs[1],
          portrait: portraitId,
          portraitAlt: homeAboutDefaults.portrait.alt,
          cta: ctaLink(homeAboutDefaults.cta),
        },
        {
          blockType: 'homeInstagram',
          blockName: 'Instagram',
          heading: homeInstagramDefaults.heading,
          profile: {
            avatar: avatarId,
            avatarAlt: homeInstagramDefaults.profile.avatarAlt,
            profileLink: ctaLink(homeInstagramDefaults.profile.link),
          },
          posts: homeInstagramDefaults.posts.map((post, i) => ({
            image: instagramPostIds[i],
            imageAlt: post.imageAlt,
            href: post.href,
            cropClassName: post.cropClassName,
          })),
        },
        {
          blockType: 'homeCta',
          blockName: 'CTA końcowy — rezerwacja sesji',
          heading: homeCtaDefaults.heading,
          body: homeCtaDefaults.body,
          cta: ctaLink(homeCtaDefaults.cta),
        },
      ],
      meta: {
        title: 'Oczki Fotografia — naturalna fotografia kobieca i ślubna',
        description:
          'Naturalna fotografia kobieca i ślubna w Krakowie, Przemyślu i okolicach.',
      },
    },
    context: { disableRevalidate: true },
  })

  console.log('✓ Home page created (slug: home, status: published)')
}

runSeedCli(seedHomePage, 'seedHomePage')
