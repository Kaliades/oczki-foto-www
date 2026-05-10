// GaleriaHero — hero section of the Galeria page.
// Desktop @1366 visual parity with Figma (frame 6912:13147, "Herosection", 1366x354).
// Background is the warm cream primary/100 wash; two decorative botanical sprigs flank
// a centered heading + subheading + 5 session-type pills. No props, no client JS.

import Image from 'next/image'

const SESSION_PILLS = [
  { label: 'Sesja kobieca', active: true },
  { label: 'Sesja wizerunkowa', active: false },
  { label: 'Reportaż ślubny', active: false },
  { label: 'Sesja narzeczeńska', active: false },
  { label: 'Sesja rodzinna', active: false },
]

function Pill({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="relative flex h-[44px] flex-col items-start justify-center">
      <div
        className={[
          'relative flex items-center justify-center gap-[8px] pb-[6px]',
          active ? 'bg-[#e5d0bb]' : 'bg-[#f1eee8]',
        ].join(' ')}
      >
        <div className="flex items-center justify-center border-b-2 border-solid border-[#f6f5f2] px-[12px] pb-[4px] pt-[6px]">
          <p
            className={[
              'whitespace-nowrap text-[14px] leading-[1.48] tracking-[-0.01em]',
              active
                ? 'font-medium text-[#4f3a26]'
                : 'font-normal text-[#6b5947]',
              "[font-family:'Instrument_Sans',sans-serif]",
            ].join(' ')}
          >
            {label}
          </p>
        </div>
        {/* tiny dot stitched into the bottom border */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-[-4px] block size-[8px] -translate-x-1/2"
        >
          <Image
            src="/blocks-v2/galeriahero/ellipse.svg"
            alt=""
            fill
            className="object-contain"
          />
        </span>
      </div>
    </div>
  )
}

export default function GaleriaHero() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="relative mx-auto h-[354px] w-full max-w-[1366px] overflow-hidden">
        {/* Left decorative botanical sprig — composed of layered SVG fragments per Figma.
            Positioned to bleed slightly off the left edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[-71px] top-[73px] h-[394px] w-[323px]"
        >
          <div className="absolute inset-0 rotate-[32.94deg]">
            <span className="absolute left-1/2 top-1/2 block h-[380px] w-[138px] -translate-x-1/2 -translate-y-1/2">
              <Image
                src="/blocks-v2/galeriahero/group-l-1.svg"
                alt=""
                fill
                className="object-contain"
              />
              <Image
                src="/blocks-v2/galeriahero/group-l-6.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
          </div>
        </div>

        {/* Right decorative botanical sprig — single curved leaf stem.
            Positioned to bleed slightly off the right edge. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-[-89px] top-[-37px] h-[401px] w-[200px]"
        >
          <div className="absolute inset-0 -scale-x-100 rotate-[-28.85deg]">
            <Image
              src="/blocks-v2/galeriahero/vector-right.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
          <div className="absolute right-[40px] top-[60px] h-[120px] w-[80px] -scale-x-100 rotate-[-28.85deg]">
            <Image
              src="/blocks-v2/galeriahero/group-r-1.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Foreground: heading + subheading + pills, centered */}
        <div className="relative flex h-full flex-col items-center gap-[48px] px-[239px] pb-[36px] pt-[60px]">
          <div className="flex w-[547px] flex-col items-start gap-[20px]">
            <h1
              className="w-full text-center text-[36px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26] [font-family:'The_Seasons','IvyOra_Display',serif]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              {'Naturalna '}
              <em
                className="not-italic [font-family:'The_Seasons','IvyOra_Display',serif]"
                style={{
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                  fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                fotografia kobieca i ślubna
              </em>
              {' – portfolio z Krakowa i okolic'}
            </h1>

            <div className="flex w-full flex-col items-center">
              <p
                className="w-full text-center text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                W moich kadrach szukam autentyczności, która broni się sama. Zobacz
                wybrane realizacje, które powstały z połączenia mojej wrażliwości i
                Waszego zaufania.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-[6px] gap-y-0">
            {SESSION_PILLS.map((pill) => (
              <Pill key={pill.label} label={pill.label} active={pill.active} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
