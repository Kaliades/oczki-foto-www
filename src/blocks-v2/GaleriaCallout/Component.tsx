import Image from 'next/image'

export default function GaleriaCallout() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="relative mx-auto h-[606px] w-full max-w-[1366px] px-[96px] pb-[128px] pt-[83px]">
        {/* Decorative frame with corner ellipses */}
        <div className="pointer-events-none absolute left-[96px] top-[82px] h-[398px] w-[1174px]">
          <Image
            src="/blocks-v2/galeriacallout/decorative-frame.svg"
            alt=""
            fill
            className="object-contain"
            sizes="1174px"
          />
        </div>

        {/* Text + CTA */}
        <div className="relative flex h-full flex-col items-center justify-center gap-[36px] px-[336px] py-[48px]">
          <div className="flex w-full flex-col items-start gap-[16px]">
            <p
              className="w-full text-center text-[36px] leading-[1.04] tracking-[-0.72px] text-[#4f3a26]"
              style={{
                fontFamily: '"The Seasons", serif',
                fontFeatureSettings: "'lnum' 1, 'pnum' 1",
              }}
            >
              <span>Twoja autentyczność to </span>
              <span
                className="tracking-[-0.36px]"
                style={{
                  fontFamily: '"The Seasons", serif',
                  fontStyle: 'italic',
                  fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Twoja siła
              </span>
              <span>. Chcesz, bym pomogła Ci ją uchwycić?</span>
            </p>
            <div className="flex w-full flex-col items-center">
              <p
                className="w-[490px] text-center text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]"
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 400,
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Jeśli oglądając te zdjęcia, poczułaś, że bliskie jest Ci takie spojrzenie na kobiecość i miłość – napisz do mnie. Nie musisz wiedzieć, jak pozować, ani mieć gotowego planu na sesję.
              </p>
            </div>
          </div>

          {/* Button with decorative end caps */}
          <a href="#kontakt" className="flex h-[44px] items-center">
            <span className="relative h-[44px] w-[18px] shrink-0">
              <Image
                src="/blocks-v2/galeriacallout/button-left.svg"
                alt=""
                fill
                sizes="18px"
              />
            </span>
            <span className="flex h-[44px] items-start justify-center bg-[#cba783] px-[4px] pb-[10px] pt-[11px]">
              <span
                className="whitespace-nowrap text-center text-[14px] leading-[1.48] tracking-[-0.14px] text-[#392818]"
                style={{
                  fontFamily: '"Instrument Sans", sans-serif',
                  fontWeight: 500,
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Porozmawiajmy
              </span>
            </span>
            <span className="relative h-[44px] w-[18px] shrink-0">
              <Image
                src="/blocks-v2/galeriacallout/button-right.svg"
                alt=""
                fill
                sizes="18px"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}
