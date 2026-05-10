import Image from 'next/image'

const steps = [
  {
    number: '1',
    title: 'Wspólna kawa na start (również online)',
    description:
      'Nie zaczynamy od zdjęć. Zaczynamy od rozmowy, by oswoić się z moją obecnością.',
  },
  {
    number: '2',
    title: 'Moje „suchary”',
    description:
      'Tak, mam zapas kiepskich żartów, które zawsze działają. Nic tak nie rozluźnia atmosferę jak wspólny śmiech.',
  },
  {
    number: '3',
    title: 'Naturalne prowadzenie',
    description:
      'Podpowiem Ci, co zrobić z dłońmi i jak stanąć, byś czuła się lekko, ale nigdy nie będę Cię łamać w nienaturalne pozy.',
  },
  {
    number: '4',
    title: 'Cierpliwość',
    description:
      'Jeśli potrzebujesz chwili na zebranie myśli czy poprawienie włosów – masz ją. Nigdy nie poganiam.',
  },
]

export default function OMnieSesjaJakSpotkanie() {
  return (
    <section className="w-full bg-[#ead3d3]">
      <div className="relative mx-auto h-[618px] w-full max-w-[1366px] overflow-hidden">
        {/* Decorative vertical pearl stripes background */}
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <div className="flex h-[643px] w-[1366px] items-center -translate-y-[5px]">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`h-full w-[43px] shrink-0 ${
                  i % 2 === 0 ? 'bg-[#ead3d3]' : 'bg-[#e7c5c5]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Decorative horizontal lines (rotated rounded rectangles) */}
        <div className="pointer-events-none absolute left-[-21px] top-[10px] flex w-[1387px] flex-col gap-[48px]">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-[24px]">
              <div className="h-[4px] w-[1376px] rounded-full bg-[rgba(219,160,160,0.36)]" />
              <div className="h-[4px] w-[1376px] rounded-full bg-[rgba(219,160,160,0.36)]" />
            </div>
          ))}
        </div>

        {/* Foreground content */}
        <div className="relative flex h-full flex-col items-center gap-[64px] px-[64px] pb-[112px] pt-[80px]">
          <div className="flex w-[530px] flex-col items-center gap-[16px] text-center">
            <h2
              className="font-['The_Seasons',serif] leading-[1.04] tracking-[-0.72px] text-[#392818]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              <span className="text-[36px]">Sesja jak </span>
              <span
                className="text-[36px] italic tracking-[-0.36px]"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                spotkanie z przyjaciółką
              </span>
            </h2>
            <p
              className="w-[442px] font-['Instrument_Sans',sans-serif] text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Prowadzę Cię, inspiruję do ruchu, łapię naturalne momenty
            </p>
          </div>

          <div className="relative flex h-[285px] w-full items-center justify-center gap-[8px] bg-[#f6f5f2] p-[20px]">
            {/* Top decorative ellipses row */}
            <div className="pointer-events-none absolute left-[-19px] top-[-28px] h-[64px] w-[1282px]">
              <Image
                src="/blocks-v2/omniesesjajakspotkanie/ellipses-row.svg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            {/* Bottom decorative ellipses row */}
            <div className="pointer-events-none absolute left-[-19px] top-[262px] h-[64px] w-[1282px]">
              <Image
                src="/blocks-v2/omniesesjajakspotkanie/ellipses-row.svg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>

            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`flex h-full ${
                  i === steps.length - 1 ? 'min-w-px flex-1' : 'w-[294px] shrink-0 border-r border-solid border-[#ead3d3]'
                } flex-col items-center justify-center gap-[28px] px-[16px] pb-[20px] pt-[16px] text-center`}
              >
                <p
                  className="w-full font-['Dancing_Script',cursive] text-[24px] leading-[0.98] text-[#dba0a0]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  {step.number}
                </p>
                <div className="flex h-[138px] w-full flex-col items-start gap-[6px] font-['Instrument_Sans',sans-serif] leading-[1.48]">
                  <p
                    className="w-full text-[20px] tracking-[-0.3px] text-[#4f3a26]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="w-full text-[16px] tracking-[-0.24px] text-[#6b5947]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            {/* Right side decorative ellipses column */}
            <div className="pointer-events-none absolute left-[1199px] top-[-28px] h-[354px] w-[64px]">
              <Image
                src="/blocks-v2/omniesesjajakspotkanie/ellipses-col.svg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
            {/* Left side decorative ellipses column */}
            <div className="pointer-events-none absolute left-[-19px] top-[-28px] h-[354px] w-[64px]">
              <Image
                src="/blocks-v2/omniesesjajakspotkanie/ellipses-col.svg"
                alt=""
                fill
                className="object-cover"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
