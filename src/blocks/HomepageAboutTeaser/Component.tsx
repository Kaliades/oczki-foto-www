// TODO: Mobile breakpoints — on small screens stack card content above photo,
// hide or scale down botanical SVG decorations, reduce heading size.
// Requires a second pass with mobile Figma frame.

import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

type HomepageAboutTeaserProps = {
  blockType: 'homepageAboutTeaser'
  heading: string
  body: SerializedEditorState
  linkLabel?: string | null
  linkUrl?: string | null
  photo: Media | string
  photoAlt?: string | null
}

// ────────────────────────────────────────────────────────────────────────────
// Decorative botanical cluster — dandelion / leafy illustration
// Traced from Figma OBJECTS node 6857:1632 (top-right, rotated -23.75deg)
// ────────────────────────────────────────────────────────────────────────────
function BotanicalRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="280"
      viewBox="0 0 260 280"
      width="260"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <line stroke="#c8bfb0" strokeWidth="1" x1="130" x2="130" y1="280" y2="60" />
      {/* Dandelion seed head — fine radiating lines */}
      <g opacity="0.7" stroke="#c8bfb0" strokeWidth="0.8">
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const r = 52
          return (
            <line
              key={i}
              x1="130"
              x2={130 + Math.cos(angle) * r}
              y1="58"
              y2={58 + Math.sin(angle) * r}
            />
          )
        })}
        {/* Seed circles at ends of radiating lines */}
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          const r = 52
          return (
            <circle
              key={i}
              cx={130 + Math.cos(angle) * r}
              cy={58 + Math.sin(angle) * r}
              r="2.5"
            />
          )
        })}
      </g>
      {/* Leaf sprigs along stem */}
      <path
        d="M130 130 Q105 115 98 128 Q108 120 130 125"
        fill="#c8bfb0"
        fillOpacity="0.6"
        stroke="none"
      />
      <path
        d="M130 155 Q155 140 162 153 Q152 145 130 150"
        fill="#c8bfb0"
        fillOpacity="0.6"
        stroke="none"
      />
      <path
        d="M130 180 Q102 164 95 178 Q106 170 130 175"
        fill="#c8bfb0"
        fillOpacity="0.6"
        stroke="none"
      />
      <path
        d="M130 205 Q158 190 165 203 Q154 196 130 200"
        fill="#c8bfb0"
        fillOpacity="0.6"
        stroke="none"
      />
      {/* Small second stem branching */}
      <line stroke="#c8bfb0" strokeWidth="0.8" x1="130" x2="78" y1="100" y2="60" />
      <g opacity="0.5" stroke="#c8bfb0" strokeWidth="0.7">
        {[...Array(14)].map((_, i) => {
          const angle = (i / 14) * Math.PI * 2
          const r = 36
          return (
            <line
              key={i}
              x1="78"
              x2={78 + Math.cos(angle) * r}
              y1="58"
              y2={58 + Math.sin(angle) * r}
            />
          )
        })}
        {[...Array(14)].map((_, i) => {
          const angle = (i / 14) * Math.PI * 2
          const r = 36
          return (
            <circle
              key={i}
              cx={78 + Math.cos(angle) * r}
              cy={58 + Math.sin(angle) * r}
              r="2"
            />
          )
        })}
      </g>
    </svg>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Decorative botanical cluster — bottom-left (mirrored / second instance)
// Traced from Figma OBJECTS node 6857:1787 (lower-left, rotated -156.25deg, scaleY -1)
// ────────────────────────────────────────────────────────────────────────────
function BotanicalLeft({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="240"
      viewBox="0 0 220 240"
      width="220"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main stem */}
      <line stroke="#c8bfb0" strokeWidth="1" x1="90" x2="90" y1="0" y2="200" />
      {/* Dandelion seed head */}
      <g opacity="0.65" stroke="#c8bfb0" strokeWidth="0.8">
        {[...Array(18)].map((_, i) => {
          const angle = (i / 18) * Math.PI * 2
          const r = 44
          return (
            <line
              key={i}
              x1="90"
              x2={90 + Math.cos(angle) * r}
              y1="202"
              y2={202 + Math.sin(angle) * r}
            />
          )
        })}
        {[...Array(18)].map((_, i) => {
          const angle = (i / 18) * Math.PI * 2
          const r = 44
          return (
            <circle
              key={i}
              cx={90 + Math.cos(angle) * r}
              cy={202 + Math.sin(angle) * r}
              r="2.2"
            />
          )
        })}
      </g>
      {/* Leaf sprigs along stem */}
      <path
        d="M90 80 Q62 65 56 78 Q67 70 90 75"
        fill="#c8bfb0"
        fillOpacity="0.55"
        stroke="none"
      />
      <path
        d="M90 110 Q118 95 124 108 Q113 100 90 105"
        fill="#c8bfb0"
        fillOpacity="0.55"
        stroke="none"
      />
      <path
        d="M90 140 Q64 126 58 138 Q68 130 90 135"
        fill="#c8bfb0"
        fillOpacity="0.55"
        stroke="none"
      />
      <path
        d="M90 168 Q116 154 122 167 Q111 160 90 163"
        fill="#c8bfb0"
        fillOpacity="0.55"
        stroke="none"
      />
      {/* Small branch */}
      <line stroke="#c8bfb0" strokeWidth="0.8" x1="90" x2="140" y1="55" y2="22" />
      <g opacity="0.45" stroke="#c8bfb0" strokeWidth="0.7">
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const r = 30
          return (
            <line
              key={i}
              x1="140"
              x2={140 + Math.cos(angle) * r}
              y1="20"
              y2={20 + Math.sin(angle) * r}
            />
          )
        })}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const r = 30
          return (
            <circle
              key={i}
              cx={140 + Math.cos(angle) * r}
              cy={20 + Math.sin(angle) * r}
              r="1.8"
            />
          )
        })}
      </g>
    </svg>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Small floral divider — pair of leaf arrows (Figma vectors 6759:4323 / 6759:4326)
// ────────────────────────────────────────────────────────────────────────────
function FloralDivider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-6">
      {/* Left petal cluster — rotated leaf/arrow */}
      <svg fill="none" height="20" viewBox="0 0 36 20" width="36" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M36 10 Q24 0 12 4 Q0 8 0 10 Q0 12 12 16 Q24 20 36 10Z"
          fill="#c8b8a8"
          fillOpacity="0.7"
        />
        <path
          d="M36 10 Q28 6 20 8 Q14 9 10 10"
          stroke="#9e8070"
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
      </svg>
      {/* Right petal cluster — mirrored */}
      <svg
        fill="none"
        height="20"
        style={{ transform: 'scaleX(-1)' }}
        viewBox="0 0 36 20"
        width="36"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M36 10 Q24 0 12 4 Q0 8 0 10 Q0 12 12 16 Q24 20 36 10Z"
          fill="#c8b8a8"
          fillOpacity="0.7"
        />
        <path
          d="M36 10 Q28 6 20 8 Q14 9 10 10"
          stroke="#9e8070"
          strokeOpacity="0.5"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Render Lexical rich-text body (paragraphs only — no headings per spec)
// ────────────────────────────────────────────────────────────────────────────
function renderLexicalParagraphs(state: SerializedEditorState): React.ReactNode {
  if (!state?.root?.children) return null
  return state.root.children.map((node: Record<string, unknown>, idx: number) => {
    if (node.type !== 'paragraph') return null
    const children = node.children as Array<Record<string, unknown>>
    return (
      <p
        className="w-full text-center font-sans text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947]"
        key={idx}
      >
        {children.map((child: Record<string, unknown>, childIdx: number) => {
          const text = child.text as string | undefined
          const format = (child.format as number) ?? 0
          // Payload Lexical format: 1 = bold, 2 = italic, 4 = underline
          const isBold = Boolean(format & 1)
          const isItalic = Boolean(format & 2)
          let content: React.ReactNode = text
          if (isBold) content = <strong key={childIdx}>{content}</strong>
          if (isItalic) content = <em key={childIdx}>{content}</em>
          return content
        })}
      </p>
    )
  })
}

export const HomepageAboutTeaser: React.FC<HomepageAboutTeaserProps> = ({
  heading,
  body,
  linkLabel,
  linkUrl,
  photo,
  photoAlt,
}) => {
  const photoSrc = typeof photo === 'string' ? photo : (photo?.url ?? '')
  const photoWidth = typeof photo === 'object' ? (photo?.width ?? 505) : 505
  const photoHeight = typeof photo === 'object' ? (photo?.height ?? 522) : 522
  const altText = photoAlt ?? (typeof photo === 'object' ? (photo?.alt ?? '') : '')

  return (
    <section className="relative w-full bg-[#f1eee8] py-24">
      {/* ── Botanical decorations (outside card, absolute to section) ── */}
      {/* Top-right cluster — spills from card top-right corner outward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden -translate-y-4 translate-x-4 rotate-[-24deg] lg:block"
      >
        <BotanicalRight />
      </div>
      {/* Bottom-left cluster — spills from card bottom-left corner outward */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 hidden translate-x-[-12px] translate-y-4 rotate-[-156deg] scale-y-[-1] lg:block"
      >
        <BotanicalLeft />
      </div>

      {/* ── White card container (full-bleed inside the padded section) ── */}
      <div className="relative mx-auto max-w-[1174px]">
        <div className="flex min-h-[538px] items-stretch overflow-hidden bg-white">
          {/* ── Left column: content ── */}
          <div className="relative flex flex-1 flex-col items-center justify-center gap-8 px-[80px] pb-8 pt-12">
            {/* Small botanical leaf-cluster inside card top (absolute decoration) */}
            {/* Second botanical group inside card bottom-left — Figma OBJECTS 6857:1787 */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-4 left-[-20px] hidden lg:block"
              style={{ transform: 'rotate(-156deg) scaleY(-1)', opacity: 0.65 }}
            >
              <BotanicalLeft className="h-[200px] w-[180px]" />
            </div>

            {/* Floral divider accent at top of content */}
            <FloralDivider />

            {/* Heading + body text */}
            <div className="flex w-full max-w-[493px] flex-col gap-4">
              {/* Heading — serif, with "Asia" in italic */}
              <h2 className="w-full text-center font-['The_Seasons'] text-[32px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26]">
                {renderHeadingWithItalicName(heading)}
              </h2>

              {/* Body paragraphs — richText (Lexical) */}
              <div className="flex flex-col gap-[6px]">
                {renderLexicalParagraphs(body)}
              </div>
            </div>

            {/* "Poznaj mnie bliżej →" underline link */}
            {linkLabel && linkUrl && (
              <Link
                className="font-sans text-[14px] leading-[1.48] tracking-[-0.01em] text-[#392818] underline underline-offset-4 transition-opacity hover:opacity-70"
                href={linkUrl}
              >
                {linkLabel}
              </Link>
            )}
          </div>

          {/* ── Right column: portrait photo ── */}
          <div className="relative hidden aspect-[505/522] min-w-[505px] overflow-hidden lg:block">
            {photoSrc && (
              <Image
                alt={altText}
                className="object-cover object-center"
                fill
                sizes="505px"
                src={photoSrc}
              />
            )}
          </div>
        </div>

        {/* Mobile photo — shown below card content on small screens */}
        <div className="relative block h-[300px] w-full overflow-hidden lg:hidden">
          {photoSrc && (
            <Image
              alt={altText}
              className="object-cover object-top"
              fill
              sizes="100vw"
              src={photoSrc}
            />
          )}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Render the heading with "Asia" in The Seasons Italic style.
// The word "Asia" appears between "jestem " and "!" — we detect and wrap it.
// ────────────────────────────────────────────────────────────────────────────
function renderHeadingWithItalicName(heading: string): React.ReactNode {
  const ITALIC_NAME = 'Asia'
  const idx = heading.indexOf(ITALIC_NAME)
  if (idx === -1) return heading
  const before = heading.slice(0, idx)
  const after = heading.slice(idx + ITALIC_NAME.length)
  return (
    <>
      {before}
      <span className="italic">{ITALIC_NAME}</span>
      {after}
    </>
  )
}
