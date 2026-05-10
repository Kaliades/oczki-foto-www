// HomepageOMnieTeaser — Figma frame "Proces" (6724:13354) renamed at integration time.
// Content: "Hej, jestem Asia" teaser callout — heading + body + CTA + portrait.
// Desktop @1366 visual parity. Mobile out of scope.

import Image from 'next/image'

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

// Small decorative floral/sprig glyph rendered above the heading.
// Two mirrored copies sit side by side per Figma.
function SprigGlyph({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="49"
      height="25"
      viewBox="0 0 49 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={flip ? '-scale-x-100' : ''}
    >
      <path
        d="M2 12 C 10 8, 18 6, 24 12 C 30 18, 38 16, 46 12"
        stroke="#cba783"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="8" cy="9" r="1.4" fill="#cba783" />
      <circle cx="16" cy="7" r="1.4" fill="#cba783" />
      <circle cx="24" cy="12" r="1.6" fill="#cba783" />
      <circle cx="32" cy="14" r="1.4" fill="#cba783" />
      <circle cx="40" cy="13" r="1.4" fill="#cba783" />
    </svg>
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

export default function HomepageOMnieTeaser() {
  return (
    <section className="w-full bg-[#f1eee8]">
      {/* Outer canvas pinned to the desktop 1366 width with 96px padding around the inner card */}
      <div className="relative mx-auto flex w-full max-w-[1366px] items-center justify-center px-[96px] py-[96px]">
        {/* Inner two-column card — white background, photo on the right, text on the left */}
        <div className="relative flex h-[538px] w-full items-stretch bg-white p-[8px]">
          {/* LEFT COLUMN — heading + body + CTA, vertically centered */}
          <div className="flex flex-1 flex-col items-center justify-center gap-[32px] px-[80px] pb-[32px] pt-[48px]">
            {/* Twin sprig glyphs above the heading */}
            <div className="flex w-[493px] items-center justify-center gap-[24px]">
              <SprigGlyph />
              <SprigGlyph flip />
            </div>

            <div className="flex w-[493px] flex-col items-center gap-[16px] text-center">
              <h2
                className="w-full text-[32px] leading-[1.04] tracking-[-0.01em] text-[#4f3a26] [font-family:'The_Seasons','IvyOra_Display',serif]"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                Hej, jestem{' '}
                <em
                  className="not-italic [font-family:'The_Seasons','IvyOra_Display',serif]"
                  style={{ fontStyle: 'italic' }}
                >
                  Asia
                </em>
                ! Fotografka z uśmiechem (i zapasem sucharów) w kieszeni
              </h2>

              <div className="flex w-full flex-col items-center gap-[6px] px-[28px] text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]">
                <p className="w-full">
                  Fotografia to dla mnie sposób patrzenia na świat. Szukam emocji, światła
                  i momentów pomiędzy — tych, które czuje się bardziej, niż da się je
                  zaplanować.
                </p>
                <p className="w-full">
                  Fotografuję od lat, ale najważniejsze jest dla mnie nie to jak, tylko
                  kogo mam przed obiektywem. Dlatego moje sesje są spokojne, naturalne
                  i prowadzone tak, żebyś nie musiała nic udawać ani „umieć”. Jeśli
                  szukasz naturalnych zdjęć, w których widać prawdziwe emocje — jesteś
                  w dobrym miejscu.
                </p>
              </div>
            </div>

            <SecondaryButton>Poznaj mnie bliżej</SecondaryButton>
          </div>

          {/* RIGHT COLUMN — portrait photo, fills the right half of the card */}
          <div className="relative flex-1 overflow-hidden">
            <Image
              src="/blocks-v2/homepageomnieteaser/portrait.png"
              alt="Portret fotografki Asi z aparatem"
              fill
              sizes="(min-width: 1366px) 580px, 50vw"
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
