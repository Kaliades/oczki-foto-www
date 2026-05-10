import Image from 'next/image'

export default function OMnieNavbar() {
  return (
    <nav className="w-full">
      <div className="flex w-[1366px] items-center justify-center bg-[#f6f5f2] px-9 py-3">
        <div className="flex flex-1 items-center justify-between">
          {/* Logo */}
          <div className="flex h-5 w-[82px] items-center gap-[3px]">
            <div className="relative h-[21.954px] w-[15.231px] shrink-0">
              <Image
                src="/blocks-v2/omnienavbar/sygnet.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="relative h-[21.154px] w-[71.89px] shrink-0">
              <Image
                src="/blocks-v2/omnienavbar/logotyp.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Navbar links */}
          <div className="flex items-center gap-8">
            {/* Oferta with chevron */}
            <div className="flex h-11 items-center justify-center gap-1">
              <p
                className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[14px] font-normal leading-[1.48] tracking-[-0.14px] text-[#6b5947]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Oferta
              </p>
              <div className="relative size-[14px] overflow-hidden">
                <div className="absolute bottom-[37.5%] left-1/4 right-1/4 top-[37.5%]">
                  <div className="absolute inset-[-20.2%_-10.1%_-8.37%_-10.1%]">
                    <Image
                      src="/blocks-v2/omnienavbar/elements.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Galeria */}
            <div className="flex h-11 items-center justify-center gap-1">
              <p
                className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[14px] font-normal leading-[1.48] tracking-[-0.14px] text-[#6b5947]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Galeria
              </p>
            </div>

            {/* O mnie (active, with marker) */}
            <div className="flex h-11 items-center justify-center gap-1">
              <div className="relative flex h-1 w-[6px] shrink-0 items-center justify-center">
                <div className="rotate-90">
                  <div className="relative h-[6px] w-1">
                    <Image
                      src="/blocks-v2/omnienavbar/vector.svg"
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <p
                className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[14px] font-medium leading-[1.48] tracking-[-0.14px] text-[#4f3a26]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                O mnie
              </p>
            </div>

            {/* Kontakt */}
            <div className="flex h-11 items-center justify-center gap-1">
              <p
                className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[14px] font-normal leading-[1.48] tracking-[-0.14px] text-[#6b5947]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Kontakt
              </p>
            </div>
          </div>

          {/* Action button */}
          <div className="flex items-center">
            <div className="relative h-11 w-[18px] shrink-0">
              <Image
                src="/blocks-v2/omnienavbar/subtract-left.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div className="flex h-11 shrink-0 items-start justify-center bg-[#cba783] px-1 pb-[10px] pt-[11px]">
              <p
                className="whitespace-nowrap text-center font-['Instrument_Sans',sans-serif] text-[14px] font-medium leading-[1.48] tracking-[-0.14px] text-[#392818]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Umów sesję
              </p>
            </div>
            <div className="relative h-11 w-[18px] shrink-0">
              <Image
                src="/blocks-v2/omnienavbar/subtract-right.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
