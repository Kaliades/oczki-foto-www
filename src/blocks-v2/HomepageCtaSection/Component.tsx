import Image from 'next/image'

export default function HomepageCtaSection() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="relative mx-auto h-[594px] w-full max-w-[1366px] px-[48px] pb-[128px] pt-[96px]">
        {/* Outer decorative frame */}
        <div className="pointer-events-none absolute left-[96px] top-[81.6px] h-[398px] w-[1174.166px]">
          <Image
            src="/blocks-v2/homepagectasection/union-outer.svg"
            alt=""
            fill
            className="object-contain"
            sizes="1175px"
          />
        </div>

        {/* Inner decorative frame */}
        <div className="pointer-events-none absolute left-[117px] top-[97.6px] h-[366px] w-[1133px]">
          <Image
            src="/blocks-v2/homepagectasection/union-inner.svg"
            alt=""
            fill
            className="object-contain"
            sizes="1133px"
          />
        </div>

        {/* Left ornament cluster */}
        <div className="pointer-events-none absolute left-[116px] top-[122.6px] flex flex-col items-center gap-[32px]">
          <div className="size-[12px] -rotate-90">
            <Image
              src="/blocks-v2/homepagectasection/ornament-star.svg"
              alt=""
              width={12}
              height={12}
            />
          </div>
          <div className="h-[36px] w-[80px] flex items-center justify-center">
            <div className="-scale-y-100 rotate-90">
              <Image
                src="/blocks-v2/homepagectasection/ornament-vine.svg"
                alt=""
                width={36}
                height={80}
              />
            </div>
          </div>
          <div className="size-[12px] -rotate-90">
            <Image
              src="/blocks-v2/homepagectasection/ornament-star.svg"
              alt=""
              width={12}
              height={12}
            />
          </div>
        </div>

        {/* Right ornament cluster */}
        <div className="pointer-events-none absolute left-[1170px] top-[122.6px] flex flex-col items-center gap-[32px]">
          <div className="size-[12px] -rotate-90">
            <Image
              src="/blocks-v2/homepagectasection/ornament-star.svg"
              alt=""
              width={12}
              height={12}
            />
          </div>
          <div className="h-[36px] w-[80px] flex items-center justify-center">
            <div className="-scale-y-100 rotate-90">
              <Image
                src="/blocks-v2/homepagectasection/ornament-vine.svg"
                alt=""
                width={36}
                height={80}
              />
            </div>
          </div>
          <div className="size-[12px] -rotate-90">
            <Image
              src="/blocks-v2/homepagectasection/ornament-star.svg"
              alt=""
              width={12}
              height={12}
            />
          </div>
        </div>

        {/* Text + CTA */}
        <div className="relative flex h-full flex-col items-center justify-center gap-[36px] px-[336px] py-[64px]">
          <div className="flex w-full flex-col items-start gap-[16px]">
            <p
              className="w-full text-center text-[36px] leading-[1.04] tracking-[-0.72px] text-[#4f3a26]"
              style={{
                fontFamily: '"The Seasons", serif',
                fontFeatureSettings: "'lnum' 1, 'pnum' 1",
              }}
            >
              <span>Czy to jest ten moment, w którym robimy </span>
              <span
                className="tracking-[-0.36px]"
                style={{
                  fontFamily: '"The Seasons", serif',
                  fontStyle: 'italic',
                  fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                coś pięknego
              </span>
              <span>?</span>
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
                Nie musisz mieć doświadczenia przed aparatem ani wiedzieć dokładnie, czego oczekujesz. Moim zadaniem jest sprawić, żeby Twoja sesja była spokojna, naturalna i pełna prawdziwych emocji.
              </p>
            </div>
          </div>

          {/* Button with decorative end caps */}
          <a href="#kontakt" className="flex h-[44px] items-center">
            <span className="relative h-[44px] w-[18px] shrink-0">
              <Image
                src="/blocks-v2/homepagectasection/button-cap-left.svg"
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
                Umów sesję zdjęciową
              </span>
            </span>
            <span className="relative h-[44px] w-[18px] shrink-0">
              <Image
                src="/blocks-v2/homepagectasection/button-cap-right.svg"
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
