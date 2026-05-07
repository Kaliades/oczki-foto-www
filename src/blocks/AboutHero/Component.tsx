// TODO: dedicated mobile pass — current responsive layout stacks (portrait below text
// on tablet, portrait first on mobile) but font sizing and spacing may need a
// second pass against the Figma mobile frame (not yet inspected).

import Link from 'next/link'

import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type AboutHeroProps = {
  blockType: 'aboutHero'
  breadcrumbLabel?: string | null
  heading: string
  lead?: string | null
  primaryButton: {
    label: string
    url: string
    openInNewTab?: boolean | null
  }
  portrait: Media | string
  portraitAlt?: string | null
}

export const AboutHero: React.FC<AboutHeroProps> = ({
  breadcrumbLabel,
  heading,
  lead,
  primaryButton,
  portrait,
  portraitAlt,
}) => {
  const portraitResource = typeof portrait === 'object' && portrait ? portrait : null

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1366px] mx-auto px-8 flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-0 py-16 lg:py-0 lg:min-h-[570px]">
        {/* Left column — text content */}
        <div className="flex flex-col gap-12 lg:w-[547px] lg:shrink-0 order-2 lg:order-1">
          {/* Breadcrumb */}
          {breadcrumbLabel && (
            <nav aria-label="Okruszek nawigacyjny">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-black text-sm font-normal leading-tight hover:opacity-70 transition-opacity"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{breadcrumbLabel}</span>
              </Link>
            </nav>
          )}

          {/* Heading + lead */}
          <div className="flex flex-col gap-5">
            <h1 className="text-[32px] font-normal leading-[1.12] tracking-[-0.035em] text-black">
              {heading}
            </h1>
            {lead && (
              <p className="text-base leading-[1.58] text-black max-w-[486px]">{lead}</p>
            )}
          </div>

          {/* CTA button */}
          {primaryButton?.label && primaryButton.url && (
            <Link
              href={primaryButton.url}
              target={primaryButton.openInNewTab ? '_blank' : undefined}
              rel={primaryButton.openInNewTab ? 'noopener noreferrer' : undefined}
              className="self-start inline-flex items-center justify-center px-6 py-[10px] bg-black border border-black rounded-full text-white text-base leading-[1.5] hover:bg-black/85 transition-colors"
            >
              {primaryButton.label}
            </Link>
          )}
        </div>

        {/* Right column — portrait */}
        <div className="lg:ml-auto order-1 lg:order-2 w-full lg:w-[697px] lg:shrink-0">
          <div className="relative w-full aspect-[697/502] rounded-[12px] overflow-hidden bg-stone-100">
            {portraitResource ? (
              <ImageMedia
                resource={portraitResource}
                alt={portraitAlt || portraitResource.alt || ''}
                fill
                imgClassName="object-cover"
                priority
                size="(max-width: 1024px) 100vw, 697px"
              />
            ) : (
              <div className="absolute inset-0 bg-stone-200" aria-hidden />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
