import Image from 'next/image'

export default function HomepageOpinie() {
  return (
    <section className="w-full bg-[#6b7a5e]">
      <div className="relative mx-auto h-[550px] w-full max-w-[1366px] overflow-hidden">
        {/* Vertical stripes background (alternating #6b7a5e / #596a4b, 43px each) */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 flex h-[586px] -translate-x-1/2 items-center"
          aria-hidden="true"
        >
          {Array.from({ length: 32 }).map((_, i) => (
            <div
              key={i}
              className="h-full w-[43px] shrink-0"
              style={{ backgroundColor: i % 2 === 0 ? '#6b7a5e' : '#596a4b' }}
            />
          ))}
        </div>

        {/* Polaroid image cluster on the right */}
        <div className="pointer-events-none absolute left-[1013.45px] top-[-49.02px] h-[482.095px] w-[396.285px]">
          {/* Back polaroid (Gemini-generated portrait) */}
          <div className="absolute left-0 top-[6.44px] flex h-[470.662px] w-[389.183px] items-center justify-center">
            <div className="rotate-[-16.45deg]">
              <div className="relative h-[406.365px] w-[285.825px] overflow-hidden bg-white shadow-[0.757px_3.029px_4.392px_0px_rgba(53,39,25,0.16),4.544px_8.33px_10.072px_0px_rgba(53,39,25,0.08)]">
                <Image
                  src="/blocks-v2/homepageopinie/gemini.png"
                  alt=""
                  fill
                  sizes="286px"
                  className="object-cover"
                  style={{
                    objectPosition: 'center',
                    transform: 'scale(1.278) translate(-13.74%, -23.15%)',
                    transformOrigin: 'top left',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Front polaroid (small portrait) */}
          <div className="absolute left-[14.61px] top-[19.22px] flex h-[378.569px] w-[337.212px] items-center justify-center">
            <div className="rotate-[-16.45deg]">
              <div className="relative h-[318.7px] w-[257.517px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepageopinie/image.png"
                  alt=""
                  fill
                  sizes="258px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Decorative sticker (rotated 95.14deg) */}
          <div className="absolute left-[205.16px] top-[8.31px] flex h-[119.71px] w-[102.628px] items-center justify-center">
            <div className="rotate-[95.14deg]">
              <Image
                src="/blocks-v2/homepageopinie/sticker.png"
                alt=""
                width={112}
                height={93}
                className="block h-[92.981px] w-[111.828px] object-bottom"
              />
            </div>
          </div>
        </div>

        {/* Text content + pagination, centered */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-[64px] px-[400px] pt-[80px] pb-[72px]">
          <div className="flex w-full flex-col items-center gap-[48px]">
            <h2
              className="w-full text-center font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.72px] text-[#f6f5f2]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Wasze słowa to moje{' '}
              <span
                className="italic tracking-[-0.36px]"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                paliwo do działania
              </span>
            </h2>

            <div className="flex w-full flex-col items-center gap-[32px]">
              <p
                className="w-full text-center font-['Instrument_Sans',sans-serif] text-[16px] leading-[1.48] tracking-[-0.24px] text-[#f6f5f2]"
                style={{
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                „Z ogromną przyjemnością mogę polecić sesję z Asią - osobą pełną energii, która
                sprawia, że sesja zdjęciowa staje się wspaniałym przeżyciem, pełnym energii,
                zabawy i uśmiechu. Efekty naszej współpracy przerosły nasze najśmielsze
                oczekiwania! Gorąco polecam!”
              </p>

              <div className="flex items-center justify-center gap-[12px]">
                <Image
                  src="/blocks-v2/homepageopinie/divider.svg"
                  alt=""
                  width={24}
                  height={1}
                  className="h-px w-[24px]"
                />
                <p
                  className="font-['Dancing_Script',cursive] text-[24px] leading-[0.98] text-[#e5d0bb]"
                  style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                >
                  Justyna Kazimierz
                </p>
              </div>
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex items-center gap-[12px]">
            <button
              type="button"
              aria-label="Poprzednia opinia"
              className="flex size-[44px] items-center justify-center"
            >
              <Image
                src="/blocks-v2/homepageopinie/arrow-left.svg"
                alt=""
                width={21}
                height={20}
                className="h-[20px] w-[20.572px] -scale-y-100"
              />
            </button>

            <span className="h-[8px] w-[32px] bg-[#ead3d3]" aria-hidden="true" />
            <span className="size-[8px] bg-[#96a38b]" aria-hidden="true" />
            <span className="size-[8px] bg-[#96a38b]" aria-hidden="true" />
            <span className="size-[8px] bg-[#96a38b]" aria-hidden="true" />
            <span className="size-[8px] bg-[#96a38b]" aria-hidden="true" />
            <span className="size-[8px] bg-[#96a38b]" aria-hidden="true" />

            <button
              type="button"
              aria-label="Następna opinia"
              className="flex size-[44px] items-center justify-center"
            >
              <Image
                src="/blocks-v2/homepageopinie/arrow-right.svg"
                alt=""
                width={21}
                height={20}
                className="h-[20px] w-[20.572px] rotate-180"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
