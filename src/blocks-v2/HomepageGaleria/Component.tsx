import Image from 'next/image'
import Link from 'next/link'

export default function HomepageGaleria() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex flex-col items-center gap-[36px] px-[32px] pt-[80px] pb-[96px]">
        {/* Header row: heading + CTA link */}
        <div className="flex w-full items-end justify-between">
          <div className="flex w-[554px] flex-col items-start justify-center gap-[10px]">
            <h2
              className="font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.72px] text-[#4f3a26]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Chwile zatrzymane w{' '}
              <span
                className="italic tracking-[-0.36px]"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                kadrze
              </span>
            </h2>
            <p className="font-['Inter',sans-serif] text-[16px] leading-[1.7] text-[#6b5947]">
              Zajrzyj do mojego portfolio i zobacz, jak wyglądają moje sesje.
            </p>
          </div>

          <Link
            href="/galeria"
            className="group flex h-[44px] items-start justify-center pt-[11px] pb-[10px]"
          >
            <span className="flex flex-col items-start">
              <span className="flex items-start gap-[4px] pb-[4px]">
                <span
                  className="font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] text-[#392818] whitespace-nowrap"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Zobacz wszystkie zdjęcia
                </span>
                <span className="flex w-[14px] flex-col items-start pt-[5px]">
                  <Image
                    src="/blocks-v2/homepagegaleria/arrow-right.svg"
                    alt=""
                    width={10}
                    height={8}
                    className="block"
                  />
                </span>
              </span>
              <span className="block h-px w-full bg-[#392818]" />
            </span>
          </Link>
        </div>

        {/* Gallery container */}
        <div className="flex w-full flex-col items-start gap-[36px]">
          {/* Gallery row */}
          <div className="relative flex w-full flex-wrap items-start gap-[16px]">
            {/* Small image 1 */}
            <div className="flex shrink-0 items-center pt-[108px]">
              <div className="relative h-[262px] w-[211px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepagegaleria/small1.png"
                  alt="Sesja zdjęciowa — kadr 1"
                  fill
                  sizes="211px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Small image 2 */}
            <div className="flex shrink-0 items-center pt-[108px]">
              <div className="relative h-[262px] w-[211px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepagegaleria/small2.png"
                  alt="Sesja zdjęciowa — kadr 2"
                  fill
                  sizes="211px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Large image with caption */}
            <div className="flex shrink-0 flex-col items-start justify-center gap-[12px]">
              <div className="relative h-[486px] w-[393px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepagegaleria/large.png"
                  alt="Wesele Gosi i Leszka w hotelu Monte Carlo na Śląsku"
                  fill
                  sizes="393px"
                  className="object-cover"
                />
              </div>
              <div className="flex w-full flex-col items-start font-['Instrument_Sans',sans-serif] leading-[1.48] whitespace-nowrap">
                <p
                  className="text-[20px] tracking-[-0.3px] text-[#4f3a26]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Gosia i Leszek
                </p>
                <p
                  className="text-[16px] tracking-[-0.24px] text-[#6b5947]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Wesele w hotelu Monte Carlo na Śląsku
                </p>
              </div>
            </div>

            {/* Small image 3 */}
            <div className="flex shrink-0 items-center pt-[108px]">
              <div className="relative h-[262px] w-[211px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepagegaleria/small3.png"
                  alt="Sesja zdjęciowa — kadr 3"
                  fill
                  sizes="211px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Small image 4 */}
            <div className="flex shrink-0 items-center pt-[108px]">
              <div className="relative h-[262px] w-[211px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepagegaleria/small4.png"
                  alt="Sesja zdjęciowa — kadr 4"
                  fill
                  sizes="211px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Carousel controls overlay */}
            <div
              className="absolute flex size-[64px] items-center justify-center gap-[8px] rounded-full bg-[rgba(219,160,160,0.48)]"
              style={{ left: '831px', top: '229.4px' }}
              aria-hidden="true"
            >
              <Image
                src="/blocks-v2/homepagegaleria/carousel-prev.svg"
                alt=""
                width={16}
                height={16}
                className="block"
              />
              <Image
                src="/blocks-v2/homepagegaleria/carousel-next.svg"
                alt=""
                width={16}
                height={16}
                className="block"
              />
            </div>
          </div>

          {/* Divider with progress fill */}
          <div className="relative flex h-[4px] w-full items-start bg-[#f1eee8]">
            <div className="h-[4px] w-[241px] bg-[#6b7a5e]" />
          </div>
        </div>
      </div>
    </section>
  )
}
