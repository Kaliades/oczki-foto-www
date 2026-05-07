// TODO: dedicated mobile pass — current layout stacks naturally but text/buttons
// could use mobile-specific sizing per Figma mobile frame (not yet inspected).

import Link from 'next/link'

import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type HomepageHeroProps = {
  blockType: 'homepageHero'
  photo: Media | string
  heading: string
  subheading?: string | null
  primaryButton?: {
    label?: string | null
    url?: string | null
  } | null
  secondaryButton?: {
    label?: string | null
    url?: string | null
  } | null
}

export const HomepageHero: React.FC<HomepageHeroProps> = ({
  photo,
  heading,
  subheading,
  primaryButton,
  secondaryButton,
}) => {
  const photoResource = typeof photo === 'object' && photo ? photo : null

  return (
    <section className="relative w-full min-h-[480px] lg:min-h-[640px] flex items-end overflow-hidden">
      {photoResource ? (
        <ImageMedia
          resource={photoResource}
          fill
          priority
          imgClassName="object-cover -z-10"
          size="100vw"
        />
      ) : (
        <div className="absolute inset-0 bg-stone-300 -z-10" aria-hidden />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent -z-[1]" aria-hidden />

      <div className="relative z-10 w-full max-w-[1366px] mx-auto px-6 pb-12 lg:pb-20 text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif leading-tight max-w-3xl drop-shadow-md">
          {heading}
        </h1>
        {subheading && (
          <p className="mt-5 max-w-xl text-sm sm:text-base lg:text-lg opacity-95 drop-shadow">
            {subheading}
          </p>
        )}
        {(primaryButton?.label || secondaryButton?.label) && (
          <div className="mt-7 flex flex-wrap gap-3">
            {primaryButton?.label && primaryButton.url && (
              <Link
                href={primaryButton.url}
                className="inline-flex items-center px-6 py-3 bg-white text-stone-900 rounded-full text-sm font-medium hover:bg-white/90 transition"
              >
                {primaryButton.label}
              </Link>
            )}
            {secondaryButton?.label && secondaryButton.url && (
              <Link
                href={secondaryButton.url}
                className="inline-flex items-center px-6 py-3 border border-white/70 text-white rounded-full text-sm font-medium hover:bg-white/10 transition"
              >
                {secondaryButton.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
