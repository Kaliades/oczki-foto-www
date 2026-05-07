// TODO: Mobile breakpoint — single-column layout (text first, polaroid below).
// Decorative botanical leaves hidden on mobile (hidden md:block).
// This pass implements desktop-first layout matching Figma node 6794:1945.

import React from 'react'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { RichText as ConvertRichText } from '@payloadcms/richtext-lexical/react'
import type { Media } from '@/payload-types'
import { ImageMedia } from '@/components/Media/ImageMedia'

type HomepageIntroProps = {
  blockType: 'homepageIntro'
  heading: string
  pullQuote?: string | null
  body: DefaultTypedEditorState
  photo: Media | string
  photoQuote?: string | null
  photoAlt?: string | null
}

// Decorative quotation mark SVG (top-right corner of pull-quote block)
function QuoteMark() {
  return (
    <svg
      width="14"
      height="12"
      viewBox="0 0 14 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute -top-1.5 right-0 shrink-0"
    >
      <path
        d="M0 12V7.2C0 5.28 0.48 3.6 1.44 2.16C2.4 0.72 3.84 0 5.76 0V2.16C4.8 2.4 4.08 2.88 3.6 3.6C3.12 4.32 2.88 5.04 2.88 5.76H5.76V12H0ZM8.16 12V7.2C8.16 5.28 8.64 3.6 9.6 2.16C10.56 0.72 12 0 13.92 0V2.16C12.96 2.4 12.24 2.88 11.76 3.6C11.28 4.32 11.04 5.04 11.04 5.76H13.92V12H8.16Z"
        fill="#6b5947"
        fillOpacity="0.5"
      />
    </svg>
  )
}

// Decorative polaroid bottom portion (white paper tail with perforated edge)
function PolaroidBottom() {
  return (
    <svg
      viewBox="0 0 292 208"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full h-auto"
    >
      <rect width="292" height="208" fill="#f1eee8" />
      {/* Perforated / torn edge decoration */}
      <path
        d="M0 0 Q7 8 14 0 Q21 8 28 0 Q35 8 42 0 Q49 8 56 0 Q63 8 70 0 Q77 8 84 0 Q91 8 98 0 Q105 8 112 0 Q119 8 126 0 Q133 8 140 0 Q147 8 154 0 Q161 8 168 0 Q175 8 182 0 Q189 8 196 0 Q203 8 210 0 Q217 8 224 0 Q231 8 238 0 Q245 8 252 0 Q259 8 266 0 Q273 8 280 0 Q287 8 292 0V208H0V0Z"
        fill="#f1eee8"
      />
    </svg>
  )
}

// Decorative botanical leaf SVG (left side of polaroid cluster)
function LeafLeft() {
  return (
    <svg
      width="80"
      height="120"
      viewBox="0 0 80 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute -left-10 top-8 opacity-60"
    >
      <path
        d="M40 120 C20 90 0 60 10 30 C20 0 50 5 60 30 C70 55 60 90 40 120Z"
        fill="#c5bfb4"
        fillOpacity="0.5"
      />
      <path
        d="M40 120 L40 30"
        stroke="#a09385"
        strokeWidth="1"
        strokeOpacity="0.4"
      />
    </svg>
  )
}

// Decorative botanical leaf SVG (right side of polaroid cluster)
function LeafRight() {
  return (
    <svg
      width="60"
      height="90"
      viewBox="0 0 60 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="absolute -right-6 bottom-10 opacity-50"
    >
      <path
        d="M30 90 C10 65 0 40 8 18 C16 0 40 4 46 22 C52 40 45 65 30 90Z"
        fill="#c5bfb4"
        fillOpacity="0.4"
      />
      <path
        d="M30 90 L30 18"
        stroke="#a09385"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
    </svg>
  )
}

export const HomepageIntro: React.FC<HomepageIntroProps> = ({
  heading,
  pullQuote,
  body,
  photo,
  photoQuote,
  photoAlt,
}) => {
  const photoResource = typeof photo === 'object' ? photo : null
  const resolvedAlt = photoAlt || (photoResource?.alt ?? '')

  return (
    <section
      className="w-full"
      style={{ backgroundColor: '#f6f5f2' }}
      aria-label={heading}
    >
      {/* Inner container — matches Figma max-width ~1366px with 112px horizontal padding */}
      <div className="mx-auto w-full max-w-[1366px] px-7 py-20 md:px-[112px] md:py-[80px] flex flex-col md:flex-row md:items-center md:justify-between gap-16 md:gap-0">

        {/* LEFT — Text block */}
        <div className="flex flex-col gap-5 md:w-[514px] shrink-0">

          {/* Heading: "The Seasons" serif font, last two words in italic */}
          <h2
            className="text-[36px] leading-[1.04] tracking-[-0.02em] font-normal"
            style={{
              fontFamily: '"The Seasons", serif',
              color: '#4f3a26',
              fontFeatureSettings: "'lnum' 1, 'pnum' 1",
            }}
          >
            {/* Split heading: render last word-group in italic if heading matches expected pattern */}
            <HeadingWithItalicSuffix heading={heading} />
          </h2>

          {/* Body text block */}
          <div className="flex flex-col gap-[10px]">

            {/* Lead sentence before pull-quote */}
            <p
              className="text-base leading-[1.48] tracking-[-0.015em] font-normal w-full md:w-[442px]"
              style={{
                fontFamily: '"Instrument Sans", sans-serif',
                color: '#6b5947',
              }}
            >
              Większość moich klientek zaczyna naszą rozmowę od słów:
            </p>

            {/* Pull-quote block */}
            {pullQuote && (
              <div
                className="relative flex items-center gap-[10px] px-3 py-2"
                style={{ backgroundColor: '#f1eee8' }}
              >
                <p
                  className="text-base leading-[1.48] tracking-[-0.015em] font-normal w-full md:w-[442px] italic"
                  style={{
                    fontFamily: '"Instrument Sans", sans-serif',
                    color: '#6b5947',
                  }}
                >
                  {pullQuote}
                </p>
                <QuoteMark />
              </div>
            )}

            {/* Rich text body */}
            <ConvertRichText
              data={body}
              className="text-base leading-[1.48] tracking-[-0.015em] font-normal w-full md:w-[442px] [&_p]:mb-0 [&_p]:text-base [&_p]:leading-[1.48] [&_p]:tracking-[-0.015em] [&_p]:[color:#6b5947] [&_p]:[font-family:'Instrument_Sans',sans-serif]"
            />
          </div>
        </div>

        {/* RIGHT — Polaroid photo + handwritten quote */}
        <div className="relative flex justify-center md:justify-end md:w-[533px] shrink-0">

          {/* Decorative botanical leaves — hidden on mobile */}
          <div className="hidden md:block">
            <LeafLeft />
            <LeafRight />
          </div>

          {/* Polaroid cluster wrapper */}
          <div className="relative inline-block" style={{ width: '341px', height: '428px' }}>

            {/* Polaroid photo card — tilted slightly counter-clockwise */}
            <div
              className="absolute"
              style={{
                top: '0px',
                right: '0px',
                transform: 'rotate(-7.48deg)',
                transformOrigin: 'center',
              }}
            >
              {/* Polaroid frame */}
              <div
                className="flex flex-col"
                style={{
                  backgroundColor: '#f1eee8',
                  border: '0.66px solid #e7ded4',
                  padding: '6.57px',
                  width: '271px',
                }}
              >
                {/* Photo area */}
                <div className="relative overflow-hidden" style={{ width: '258px', height: '319px' }}>
                  {photoResource ? (
                    <ImageMedia
                      resource={photoResource}
                      alt={resolvedAlt}
                      fill
                      imgClassName="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-200" aria-hidden="true" />
                  )}
                </div>

                {/* Polaroid white bottom strip */}
                <div style={{ height: '52px', backgroundColor: '#f1eee8' }} />
              </div>
            </div>

            {/* Handwritten quote card — tilted clockwise, overlapping photo bottom-left */}
            {photoQuote && (
              <div
                className="absolute"
                style={{
                  left: '0px',
                  bottom: '0px',
                  transform: 'rotate(14.06deg)',
                  transformOrigin: 'center',
                  zIndex: 10,
                }}
              >
                {/* Quote card background (scalloped/torn paper look via border-radius) */}
                <div
                  className="flex items-end justify-center pb-4"
                  style={{
                    width: '212px',
                    height: '186px',
                    backgroundColor: '#f8f6f2',
                    borderRadius: '2px 2px 8px 8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  }}
                >
                  <p
                    className="text-center text-[24px] leading-[0.98] w-[179px]"
                    style={{
                      fontFamily: '"Dancing Script", cursive',
                      color: '#6b7a5e',
                      fontWeight: 400,
                    }}
                  >
                    {photoQuote}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  )
}

/**
 * Renders the heading with the last 2 words in italic (The Seasons Italic).
 * Matches Figma design: "Twoja niefotogeniczność to mit, który" (regular)
 * + "wspólnie obalimy" (italic).
 *
 * If the heading doesn't contain " " (single word), renders it all as regular.
 * Splits at the last space before the final word group (approx. last 2 words).
 */
function HeadingWithItalicSuffix({ heading }: { heading: string }) {
  const words = heading.trim().split(' ')

  if (words.length <= 2) {
    return <>{heading}</>
  }

  // Last 2 words go italic
  const regularPart = words.slice(0, words.length - 2).join(' ')
  const italicPart = words.slice(words.length - 2).join(' ')

  return (
    <>
      {regularPart}{' '}
      <span
        style={{
          fontFamily: '"The Seasons", serif',
          fontStyle: 'italic',
          letterSpacing: '-0.01em',
          fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
        }}
      >
        {italicPart}
      </span>
    </>
  )
}
