import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import { cache } from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'

const queryHomepage = cache(async () => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  return payload.findGlobal({
    slug: 'homepage',
    draft,
    overrideAccess: draft,
    depth: 2,
  })
})

export default async function HomePage() {
  const homepage = await queryHomepage()

  const heroImageUrl =
    typeof homepage.heroImage === 'object' && homepage.heroImage?.url
      ? homepage.heroImage.url
      : null
  const heroImageAlt =
    typeof homepage.heroImage === 'object' ? (homepage.heroImage?.alt ?? '') : ''

  return (
    <>
      <section className="relative w-full min-h-[640px] flex items-end overflow-hidden">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={heroImageAlt}
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover -z-10"
          />
        ) : (
          <div className="absolute inset-0 bg-secondary -z-10" aria-hidden />
        )}

        <div className="relative z-10 w-full max-w-[1366px] mx-auto px-6 pb-16 lg:pb-24 text-white">
          <h1 className="text-4xl lg:text-6xl font-serif leading-tight max-w-3xl">
            {homepage.heroHeading}
          </h1>
          {homepage.heroSubheading && (
            <p className="mt-6 max-w-xl text-base lg:text-lg opacity-90">
              {homepage.heroSubheading}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href={homepage.heroPrimaryButtonUrl || '/'}
              className="inline-flex items-center px-6 py-3 bg-white text-foreground rounded-full text-sm font-medium hover:bg-white/90 transition"
            >
              {homepage.heroPrimaryButtonLabel}
            </Link>
            {homepage.heroSecondaryButtonLabel && homepage.heroSecondaryButtonUrl && (
              <Link
                href={homepage.heroSecondaryButtonUrl}
                className="inline-flex items-center px-6 py-3 border border-white/60 text-white rounded-full text-sm font-medium hover:bg-white/10 transition"
              >
                {homepage.heroSecondaryButtonLabel}
              </Link>
            )}
          </div>
        </div>
      </section>

      <RenderBlocks blocks={homepage.layout ?? []} />
    </>
  )
}
