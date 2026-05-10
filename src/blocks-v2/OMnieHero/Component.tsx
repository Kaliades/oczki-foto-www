// OMniePageHeader — page header (hero) of the "O mnie" page.
// Desktop @1366 visual parity with Figma frame 6974:19430 ("Page", 1366x612):
// • top Header strip (primary/200) with Breadcrumbs (Strona główna › O mnie), height 52px
// • Content Section (primary/200, 560px) with two featured photos, decorative icon &
//   botanical "OBJECTS" cluster framing a centered Main Content (heading + description + CTA)
// No props, no client JS — pure server component.

import Image from 'next/image'

export default function OMnieHero() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start">
        {/* Header strip with Breadcrumbs */}
        <div className="flex w-full flex-col items-start justify-center bg-[#f1eee8] px-[32px] py-[4px]">
          <nav
            aria-label="Breadcrumb"
            className="flex h-[44px] items-center gap-[4px]"
          >
            <span
              className="whitespace-nowrap text-[12px] font-medium leading-[1.48] tracking-[-0.01em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Strona główna
            </span>
            <span
              aria-hidden="true"
              className="relative block size-[12px] shrink-0"
            >
              <Image
                src="/blocks-v2/omniehero/chevron.svg"
                alt=""
                fill
                className="object-contain"
              />
            </span>
            <span
              className="whitespace-nowrap text-[12px] font-normal leading-[1.48] tracking-[-0.01em] text-[#8e7a65] [font-family:'Instrument_Sans',sans-serif]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              O mnie
            </span>
          </nav>
        </div>

        {/* Content Section */}
        <div className="relative flex h-[560px] w-full items-center justify-center gap-[58px] bg-[#f1eee8] px-[80px] pb-[48px]">
          {/* Featured Image Right — tall portrait, anchored top-left of section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 h-[478px] w-[364px]"
          >
            <Image
              src="/blocks-v2/omniehero/featured-right.png"
              alt=""
              fill
              sizes="364px"
              className="object-cover"
              priority
            />
          </div>

          {/* Decorative botanical icon overlapping the right edge of the left photo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[339px] top-[348px] size-[96px]"
          >
            <div className="absolute inset-[-3.11%_-26.08%_-32.84%_-9.86%]">
              <Image
                src="/blocks-v2/omniehero/decorative-icon.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Featured Image Left — wider landscape, anchored bottom-right area */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[955px] top-[309px] h-[251px] w-[411px]"
          >
            <Image
              src="/blocks-v2/omniehero/featured-left.png"
              alt=""
              fill
              sizes="411px"
              className="object-cover"
              priority
            />
          </div>

          {/* OBJECTS — botanical cluster top-right of section */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[1116px] top-[124px] h-[328px] w-[227px] overflow-hidden"
          >
            <Image
              src="/blocks-v2/omniehero/objects-cluster.svg"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          {/* Main Content — centered heading + description + CTA */}
          <div className="relative z-10 flex w-[496px] flex-col items-center gap-[36px]">
            <div className="flex w-full flex-col items-start gap-[16px]">
              <h1
                className="w-full text-center text-[36px] leading-[1.04] tracking-[-0.02em] text-[#4f3a26] [font-family:'The_Seasons','IvyOra_Display',serif]"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                {'Fotografka z Krakowa, przy której możesz '}
                <em
                  className="not-italic [font-family:'The_Seasons','IvyOra_Display',serif]"
                  style={{
                    fontStyle: 'italic',
                    letterSpacing: '-0.01em',
                    fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  być sobą
                </em>
              </h1>

              <p
                className="w-full text-center text-[16px] leading-[1.48] tracking-[-0.015em] text-[#6b5947] [font-family:'Instrument_Sans',sans-serif]"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Wierzę, że najpiękniejsze rzeczy dzieją się „pomiędzy” – w nieśmiałym
                uśmiechu i czułym geście. Jako fotografka z Krakowa nie oferuję Ci
                tylko zdjęć, ale przestrzeń, w której możesz odetchnąć i poczuć się
                w pełni sobą.
              </p>
            </div>

            {/* CTA Button — slanted caps + filled label, per Figma */}
            <a
              href="#kontakt"
              className="flex items-center"
            >
              <span
                aria-hidden="true"
                className="relative block h-[44px] w-[18px] shrink-0"
              >
                <Image
                  src="/blocks-v2/omniehero/button-left-cap.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
              <span className="flex h-[44px] items-start justify-center bg-[#cba783] px-[4px] pb-[10px] pt-[11px]">
                <span
                  className="whitespace-nowrap text-center text-[14px] font-medium leading-[1.48] tracking-[-0.01em] text-[#392818] [font-family:'Instrument_Sans',sans-serif]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Umów sesję
                </span>
              </span>
              <span
                aria-hidden="true"
                className="relative block h-[44px] w-[18px] shrink-0"
              >
                <Image
                  src="/blocks-v2/omniehero/button-right-cap.svg"
                  alt=""
                  fill
                  className="object-contain"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
