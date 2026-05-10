import Image from 'next/image'

const photos = [
  '/blocks-v2/galeriagrid/image-1.png',
  '/blocks-v2/galeriagrid/image-2.png',
  '/blocks-v2/galeriagrid/image-3.png',
  '/blocks-v2/galeriagrid/image-4.png',
  '/blocks-v2/galeriagrid/image-5.png',
  '/blocks-v2/galeriagrid/image-6.png',
  '/blocks-v2/galeriagrid/image-7.png',
  '/blocks-v2/galeriagrid/image-8.png',
  '/blocks-v2/galeriagrid/image-9.png',
  '/blocks-v2/galeriagrid/image-10.png',
  '/blocks-v2/galeriagrid/image-11.png',
  '/blocks-v2/galeriagrid/image-12.png',
]

export default function GaleriaGrid() {
  return (
    <section className="w-full">
      <div className="max-w-[1366px] mx-auto flex flex-col items-center px-[32px] pt-[32px] pb-[80px]">
        <div className="flex w-full flex-col items-center justify-center gap-[32px]">
          {/* Image grid: 4 columns x 3 rows, 318x395 each, 10px gap */}
          <div className="flex w-full flex-wrap content-center items-center gap-[10px]">
            {photos.map((src, i) => (
              <div
                key={src}
                className="relative h-[395px] w-[318px] shrink-0 overflow-hidden bg-stone-200"
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="318px"
                  className="object-cover"
                  priority={i < 4}
                />
              </div>
            ))}
          </div>

          {/* More Photos button with top border */}
          <div className="flex w-full flex-col items-center justify-center border-t border-solid border-[#e7ded4] pt-[12px]">
            <button
              type="button"
              className="flex h-[44px] items-start justify-center pt-[11px] pb-[10px]"
            >
              <span className="flex flex-col items-start">
                <span className="flex items-start gap-[4px] pb-[4px]">
                  <span
                    className="whitespace-nowrap font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] text-[#392818]"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Zobacz więcej zdjęć
                  </span>
                  <span className="flex w-[14px] flex-col items-start pt-[5px]">
                    <Image
                      src="/blocks-v2/galeriagrid/chevron-down.svg"
                      alt=""
                      width={10}
                      height={8}
                      className="block"
                    />
                  </span>
                </span>
                <span className="block h-px w-full bg-[#392818]" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
