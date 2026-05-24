import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, type RequiredDataFromCollectionSlug } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { HomeFooterNewsletter } from '@/components/HomeFooterNewsletter/HomeFooterNewsletter'
import { homeFooterNewsletterDefaults } from '@/components/HomeFooterNewsletter/constants'
import { HomeInstagram } from '@/components/HomeInstagram/HomeInstagram'
import { homeInstagramDefaults } from '@/components/HomeInstagram/constants'
import { HomeAbout } from '@/components/HomeAbout/HomeAbout'
import { homeAboutDefaults } from '@/components/HomeAbout/constants'
import { HomeCta } from '@/components/HomeCta/HomeCta'
import { homeCtaDefaults } from '@/components/HomeCta/constants'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/' + decodedSlug
  let page: RequiredDataFromCollectionSlug<'pages'> | null

  page = await queryPageBySlug({
    slug: decodedSlug,
  })

  // Static fallback so the homepage renders before the database is seeded.
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const isHome = decodedSlug === 'home'

  return (
    <article className={isHome ? '' : 'pt-16 pb-24'}>
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} />
      {/* Section #8 — "Hej, jestem Asia" bio block. Built in isolation
          (same pattern as `HomeGallery`); Payload block deferred. */}
      {isHome ? <HomeAbout data={homeAboutDefaults} /> : null}
      {/* Section #9 — Instagram feed preview. Built in isolation until the
          Payload block wrapper lands (same pattern as OfferProcessSteps). */}
      {isHome ? <HomeInstagram data={homeInstagramDefaults} /> : null}
      {/* Section #10 — final booking CTA. Built in isolation; Payload block
          wrapper deferred. Rendered here only on the home route. */}
      {isHome ? <HomeCta data={homeCtaDefaults} /> : null}
      {/* Section #11 — Newsletter + footer. Built in isolation until the
          Payload block wrapper lands (same pattern as HomeInstagram). */}
      {isHome ? <HomeFooterNewsletter data={homeFooterNewsletterDefaults} /> : null}
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const page = await queryPageBySlug({
    slug: decodedSlug,
  })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
