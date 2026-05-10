import Image from 'next/image'

type Step = {
  title: string
  paragraphs: string[]
  rotateGreen: string
  rotateCard: string
  marginTop: string
}

const steps: Step[] = [
  {
    title: 'Zaczynamy od relacji, nie od aparatu',
    paragraphs: [
      'Zanim pojawi się pierwsze zdjęcie, pojawia się rozmowa. Sprawdzamy, jak się czujesz, czego potrzebujesz i w jakim jesteś miejscu.',
      'Nie musisz od razu być otwarta ani pewna siebie. Dajemy sobie chwilę — a kiedy napięcie puszcza, zdjęcia zaczynają dziać się naturalnie.',
    ],
    rotateGreen: 'rotate-[7.99deg]',
    rotateCard: '-rotate-[2.3deg]',
    marginTop: 'mt-7',
  },
  {
    title: 'Spokój jest ważniejszy niż perfekcja',
    paragraphs: [
      'Dbam o atmosferę, w której nie musisz nic udowadniać. Możesz się zatrzymać, możesz się pomylić, możesz być cicho.',
      'Kiedy napięcie znika, pojawia się prawdziwa emocja. A ona zawsze wygląda dobrze na zdjęciach.',
    ],
    rotateGreen: '-rotate-[2.32deg]',
    rotateCard: 'rotate-[4.39deg]',
    marginTop: 'mt-8',
  },
  {
    title: 'Prowadzę ale nie kontroluję',
    paragraphs: [
      'Jeśli nie wiesz, co zrobić — jestem obok. Jeśli potrzebujesz chwili — dajemy sobie czas. Jeśli coś Cię niepokoi — rozmawiamy.',
      'Sesja nie polega na tym, że „musisz dać z siebie wszystko”. To ja biorę odpowiedzialność za atmosferę, tempo i komfort.',
    ],
    rotateGreen: 'rotate-[3.66deg]',
    rotateCard: '-rotate-[5.56deg]',
    marginTop: 'mt-4',
  },
]

export default function HomepageKroki() {
  return (
    <section className="w-full bg-white">
      <div className="relative mx-auto flex min-h-[693px] w-full max-w-[1366px] flex-col items-start justify-center gap-8 px-8 py-24">
        {/* Wax stamp — decorative, absolutely positioned over the section */}
        <div className="pointer-events-none absolute left-[calc(41.67%+32.83px)] top-[-91px] h-[180px] w-[180px] rotate-90">
          <Image
            src="/blocks-v2/homepagekroki/wax-stamp.png"
            alt=""
            width={180}
            height={180}
            className="h-full w-full object-cover drop-shadow-[6px_11px_6.65px_rgba(53,39,25,0.12)]"
          />
        </div>

        {/* Title + intro */}
        <div className="flex h-[168px] w-[535px] flex-col items-start gap-4">
          <p
            className="w-full text-[36px] leading-[1.04] tracking-[-0.36px] text-[#4f3a26]"
            style={{ fontFamily: '"The Seasons", serif' }}
          >
            <span className="italic">Ruch </span>
            <span>zamiast sztywności, </span>
            <span className="italic">uśmiech </span>
            <span>zamiast poleceń</span>
          </p>
          <div
            className="flex w-full flex-col gap-1.5 text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]"
            style={{ fontFamily: '"Instrument Sans", sans-serif' }}
          >
            <p>
              Najlepsze kadry nie powstają wtedy, gdy ktoś „dobrze pozuje”. Powstają wtedy, gdy
              pojawia się spokój, zaufanie i odrobina luzu.
            </p>
            <p>Właśnie na tym opiera się mój sposób pracy.</p>
          </div>
        </div>

        {/* Steps row */}
        <div className="flex h-[301px] w-[1302px] items-start gap-3">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex-1">
              {/* Green striped card behind */}
              <div
                className={`absolute left-0 top-0 h-[260px] w-[98%] overflow-hidden bg-[#96a38b] px-8 pb-8 pt-7 shadow-[1px_4px_5.8px_0px_rgba(53,39,25,0.2),6px_11px_13.3px_0px_rgba(53,39,25,0.12)] ${step.rotateGreen}`}
              >
                <div className="absolute -top-[86px] left-1/2 flex h-[559px] -translate-x-1/2 items-center">
                  {Array.from({ length: 32 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-full w-[43px] ${i % 2 === 0 ? 'bg-[#6b7a5e]' : 'bg-[#596a4b]'}`}
                    />
                  ))}
                </div>
              </div>

              {/* Cream card on top */}
              <div
                className={`relative ${step.marginTop} flex flex-col items-end justify-center gap-3.5 bg-[#f1eee8] p-5 drop-shadow-[1px_4px_2.9px_rgba(53,39,25,0.16)] ${step.rotateCard}`}
              >
                <div
                  className="flex w-[368px] flex-col items-start gap-2 leading-[1.48]"
                  style={{ fontFamily: '"Instrument Sans", sans-serif' }}
                >
                  <p className="w-full text-[20px] tracking-[-0.3px] text-[#4f3a26]">
                    {step.title}
                  </p>
                  <div className="flex w-full flex-col gap-1 text-[14px] tracking-[-0.14px] text-[#6b5947]">
                    {step.paragraphs.map((p, pi) => (
                      <p key={pi} className="w-full">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
                {/* Decorative arrow placeholder (rotated) */}
                <div className="flex h-[35px] w-[64px] items-center justify-center">
                  <svg
                    viewBox="0 0 36 64"
                    className="h-[64px] w-[35px] -rotate-90"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 32 H30 M22 22 L32 32 L22 42"
                      stroke="#4f3a26"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
