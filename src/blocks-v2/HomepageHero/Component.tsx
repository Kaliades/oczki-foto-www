// HomepageHero — first section of the homepage. Includes overlay Navbar (per Figma 6730:17313).
// Desktop @1366 visual parity with Figma. Mobile is intentionally out of scope.
// Background photo is full-bleed; content is hardcoded; no props.

import Image from 'next/image'

const NAV_LINKS = [
  { label: 'Oferta', href: '#oferta', hasDropdown: true },
  { label: 'Galeria', href: '#galeria' },
  { label: 'O mnie', href: '#o-mnie' },
  { label: 'Kontakt', href: '#kontakt' },
]

// Tiny decorative scallop tile rendered ~25 times along the bottom of the hero.
// In Figma each tile is a separate image asset that all visually resolve to the
// same scalloped frame; we approximate it with a tinted rounded square.
function ScallopTile() {
  return (
    <span
      aria-hidden="true"
      className="block h-[54px] w-[68px] -mr-[12px] shrink-0 rounded-[6px] bg-[#f1eee8]/85 ring-1 ring-[#e7ded4]/70 shadow-[0_2px_6px_rgba(57,40,24,0.08)]"
    />
  )
}

function ArrowDown() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M3 6 L7 9 L11 6"
        stroke="#6b5947"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ArrowRight() {
  return (
    <svg
      width="11"
      height="8"
      viewBox="0 0 11 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M0.5 4 H9.5 M6.5 1 L9.5 4 L6.5 7"
        stroke="#392818"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// Primary button has slim triangular bevels on left/right edges (Figma "Subtract" shapes).
// We approximate with two skewed sliver rectangles flanking the rectangular label.
function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-[44px] items-stretch text-[14px] font-medium tracking-[-0.01em] text-[#392818] [font-family:'Instrument_Sans',sans-serif]"
    >
      <span
        aria-hidden="true"
        className="block h-full w-[18px] bg-[#cba783] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
      />
      <span className="flex h-full items-center justify-center bg-[#cba783] px-[4px] pb-[10px] pt-[11px] leading-[1.48]">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="block h-full w-[18px] bg-[#cba783] [clip-path:polygon(0_0,100%_0,0_100%)]"
      />
    </button>
  )
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-[44px] flex-col items-start justify-start pb-[10px] pt-[11px]"
    >
      <span className="flex items-start gap-[4px] pb-[4px]">
        <span className="text-[14px] leading-[1.48] tracking-[-0.01em] text-[#392818] [font-family:'Instrument_Sans',sans-serif]">
          {children}
        </span>
        <span className="pt-[5px]">
          <ArrowRight />
        </span>
      </span>
      <span aria-hidden="true" className="block h-px w-full bg-[#392818]" />
    </button>
  )
}

export default function HomepageHero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f6f5f2]">
      {/* Outer container fixes the desktop canvas at 1366px wide and 640px tall */}
      <div className="relative mx-auto h-[640px] w-full max-w-[1366px]">
        {/* Background photo — fills the entire hero area */}
        <div className="absolute inset-0">
          <Image
            src="/blocks-v2/homepagehero/background.png"
            alt=""
            fill
            priority
            sizes="(min-width: 1366px) 1366px, 100vw"
            className="object-cover object-center"
          />
          {/* Subtle left-to-right white wash to lift the centered text */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-l from-transparent to-white/[0.28]"
          />
        </div>

        {/* Foreground stack — Navbar on top, hero text in middle, CTAs near bottom */}
        <div className="relative z-10 flex h-full flex-col">
          {/* Navbar overlay (part of the Hero per Figma) */}
          <nav className="flex w-full items-center justify-between px-[36px] py-[12px]">
            {/* Logo: sygnet + logotyp */}
            <a
              href="/"
              className="flex h-[20px] w-[82px] items-center gap-[3px]"
              aria-label="Oczki Foto — strona główna"
            >
              <span className="relative block h-[22px] w-[16px] shrink-0">
                <Image
                  src="/blocks-v2/homepagehero/sygnet.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <span className="relative block h-[22px] w-[72px] shrink-0">
                <Image
                  src="/blocks-v2/homepagehero/logotyp.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </a>

            {/* Center nav links */}
            <ul className="flex items-center gap-[32px]">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex h-[44px] items-center justify-center gap-[4px] text-[14px] leading-[1.48] tracking-[-0.01em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]"
                  >
                    {link.label}
                    {link.hasDropdown && <ArrowDown />}
                  </a>
                </li>
              ))}
            </ul>

            {/* Action button: "Umów sesję" */}
            <PrimaryButton>Umów sesję</PrimaryButton>
          </nav>

          {/* Center hero block — heading + subtitle + buttons */}
          <div className="flex flex-1 flex-col items-center justify-between px-[396px] pb-[128px] pt-[64px]">
            <div className="flex w-full flex-col items-center gap-[12px] text-center">
              <h1
                className="w-[574px] text-[44px] leading-[1.02] tracking-[-0.02em] text-[#4f3a26] [font-family:'The_Seasons','IvyOra_Display',serif]"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                Zdjęcia, przy których możesz{' '}
                <em
                  className="not-italic [font-family:'The_Seasons','IvyOra_Display',serif]"
                  style={{ fontStyle: 'italic', letterSpacing: '-0.01em' }}
                >
                  odetchnąć
                </em>{' '}
                i być dokładnie{' '}
                <em
                  className="not-italic [font-family:'The_Seasons','IvyOra_Display',serif]"
                  style={{ fontStyle: 'italic', letterSpacing: '-0.01em' }}
                >
                  taka, jaka jesteś
                </em>
              </h1>

              <p className="w-[486px] text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]">
                Naturalna fotografia kobieca i ślubna w Krakowie, Przemyślu i okolicach.
                Tworzę bezpieczną przestrzeń, w której zamiast sztywnych póz, znajdziesz
                czułość, śmiech i swobodę.
              </p>
            </div>

            <div className="flex items-start gap-[20px]">
              <PrimaryButton>Poznaj mnie bliżej</PrimaryButton>
              <SecondaryButton>Zobacz moje kadry</SecondaryButton>
            </div>
          </div>
        </div>

        {/* Decorative scalloped thumbnail strip near the bottom of the hero.
            Approximated as 25 tinted tiles overlapping by 12px each. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[606px] z-20 flex w-[1412px] -translate-x-1/2 items-center"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <ScallopTile key={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
