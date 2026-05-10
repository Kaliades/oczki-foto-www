/**
 * ProcessV2 — "Proces" page intro section
 *
 * Two-column layout: left = headline + body copy + link; right = photographer photo.
 * Warm cream background, serif/italic heading, botanical decorative flourish.
 * Hand-authored from Figma screenshot (node 6724:13354), no Payload integration.
 */

export default function ProcessV2() {
  return (
    <section
      className="relative overflow-hidden bg-[#F2EDE7] py-20 lg:py-28"
      aria-label="O fotografce"
    >
      {/* Botanical decorative elements — pure CSS circles/SVG blobs */}
      <BotanicalLeft />
      <BotanicalRight />

      <div className="relative mx-auto max-w-screen-xl px-6 lg:px-16">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch lg:gap-0">
          {/* ── Left column ── */}
          <div className="flex w-full flex-col items-center justify-center gap-8 lg:w-[55%] lg:items-start lg:pr-16">
            {/* Sprig divider */}
            <SprigDivider />

            {/* Heading — serif with italic "Asia" */}
            <h2 className="max-w-lg text-center text-[2rem] font-light leading-[1.2] tracking-tight text-stone-800 lg:text-left lg:text-[2.5rem]">
              Hej, jestem{' '}
              <span className="font-['Playfair_Display',Georgia,serif] italic">Asia</span>
              ! Fotografka z&nbsp;uśmiechem{' '}
              <span className="whitespace-nowrap">(i zapasem sucharów)</span>{' '}
              w&nbsp;kieszeni
            </h2>

            {/* Body paragraphs */}
            <div className="flex max-w-lg flex-col gap-5 text-center text-[0.9375rem] leading-relaxed text-stone-600 lg:text-left lg:text-base">
              <p>
                Fotografia to dla mnie sposób patrzenia na świat. Szukam emocji, światła i momentów
                pomiędzy — tych, które czuje się bardziej, niż da się je zaplanować.
              </p>
              <p>
                Fotografuję od lat, ale najważniejsze jest dla mnie nie to jak, tylko kogo mam przed
                obiektywem. Dlatego moje sesje są spokojne, naturalne i prowadzone tak, żebyś nie
                musiała nic udawać ani „umieć". Jeśli szukasz naturalnych zdjęć, w których widać
                prawdziwe emocje — jesteś w dobrym miejscu.
              </p>
            </div>

            {/* CTA link */}
            <a
              href="#o-mnie"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 underline-offset-4 transition-colors hover:text-stone-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-700"
            >
              Poznaj mnie bliżej
              <ArrowRight />
            </a>
          </div>

          {/* ── Right column — photographer photo ── */}
          <div className="w-full lg:w-[45%]">
            <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-2xl lg:mx-0 lg:max-w-none">
              {/* Placeholder — replace src with actual asset path */}
              <img
                src="/images/asia-photographer.jpg"
                alt="Asia — fotografka trzymająca aparat, uśmiechnięta"
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Sub-components ── */

function SprigDivider() {
  return (
    <div aria-hidden="true" className="flex items-center gap-3 text-rose-300">
      {/* Left sprig */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        className="text-rose-400"
        aria-hidden="true"
      >
        <g opacity="0.85">
          <path
            d="M20 24 C14 18 6 16 2 10 C8 14 14 12 20 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="10" cy="8" rx="4" ry="2.5" fill="currentColor" opacity="0.4" transform="rotate(-30 10 8)" />
          <ellipse cx="15" cy="5" rx="3.5" ry="2" fill="currentColor" opacity="0.5" transform="rotate(-15 15 5)" />
          <ellipse cx="7" cy="14" rx="3" ry="2" fill="currentColor" opacity="0.35" transform="rotate(-45 7 14)" />
          <circle cx="20" cy="6" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="2" cy="10" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      </svg>
      {/* Right sprig — mirrored */}
      <svg
        width="40"
        height="28"
        viewBox="0 0 40 28"
        fill="none"
        className="text-rose-400 scale-x-[-1]"
        aria-hidden="true"
      >
        <g opacity="0.85">
          <path
            d="M20 24 C14 18 6 16 2 10 C8 14 14 12 20 6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="10" cy="8" rx="4" ry="2.5" fill="currentColor" opacity="0.4" transform="rotate(-30 10 8)" />
          <ellipse cx="15" cy="5" rx="3.5" ry="2" fill="currentColor" opacity="0.5" transform="rotate(-15 15 5)" />
          <ellipse cx="7" cy="14" rx="3" ry="2" fill="currentColor" opacity="0.35" transform="rotate(-45 7 14)" />
          <circle cx="20" cy="6" r="2" fill="currentColor" opacity="0.5" />
          <circle cx="2" cy="10" r="1.5" fill="currentColor" opacity="0.4" />
        </g>
      </svg>
    </div>
  )
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Botanical dandelion-like blobs — left side, behind content */
function BotanicalLeft() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-8 bottom-0 top-0 flex w-40 flex-col justify-center opacity-25 lg:w-52"
    >
      {/* Top dandelion */}
      <svg viewBox="0 0 120 220" fill="none" className="text-stone-400">
        {/* Stem */}
        <path d="M60 220 C58 180 55 140 60 80" stroke="currentColor" strokeWidth="2" fill="none" />
        {/* Radiating seeds */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180
          const r = 38
          const x2 = 60 + r * Math.cos(angle)
          const y2 = 80 + r * Math.sin(angle)
          return (
            <g key={i}>
              <line x1="60" y1="80" x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
              <circle cx={x2} cy={y2} r="3" fill="currentColor" opacity="0.6" />
            </g>
          )
        })}
        <circle cx="60" cy="80" r="4" fill="currentColor" />
      </svg>

      {/* Lower leaves */}
      <svg viewBox="0 0 100 160" fill="none" className="mt-4 text-stone-400">
        <path d="M50 160 C48 120 44 80 50 30" stroke="currentColor" strokeWidth="2" fill="none" />
        <path
          d="M50 100 C30 80 10 75 2 55 C20 65 38 62 50 50"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M50 100 C70 80 90 75 98 55 C80 65 62 62 50 50"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
      </svg>
    </div>
  )
}

/** Botanical dandelion-like blobs — right side, behind content */
function BotanicalRight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-6 bottom-0 top-0 flex w-36 flex-col items-end justify-center opacity-20 lg:w-48"
    >
      <svg viewBox="0 0 120 200" fill="none" className="w-full text-stone-400">
        <path d="M60 200 C62 165 64 130 60 70" stroke="currentColor" strokeWidth="2" fill="none" />
        {Array.from({ length: 10 }).map((_, i) => {
          const angle = (i * 36 * Math.PI) / 180
          const r = 34
          const x2 = 60 + r * Math.cos(angle)
          const y2 = 70 + r * Math.sin(angle)
          return (
            <g key={i}>
              <line x1="60" y1="70" x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
              <circle cx={x2} cy={y2} r="2.5" fill="currentColor" opacity="0.55" />
            </g>
          )
        })}
        <circle cx="60" cy="70" r="3.5" fill="currentColor" />
      </svg>

      <svg viewBox="0 0 80 120" fill="none" className="mt-6 w-3/4 text-stone-400">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180
          const r = 26
          const x2 = 40 + r * Math.cos(angle)
          const y2 = 40 + r * Math.sin(angle)
          return (
            <g key={i}>
              <line x1="40" y1="40" x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
              <circle cx={x2} cy={y2} r="2" fill="currentColor" opacity="0.5" />
            </g>
          )
        })}
        <circle cx="40" cy="40" r="3" fill="currentColor" />
        <path d="M40 66 C42 90 40 110 40 120" stroke="currentColor" strokeWidth="2" fill="none" />
      </svg>
    </div>
  )
}
