import Image from 'next/image'

const ASSET_BASE = '/blocks-v2/homepagewybierzhistorie'

const imgBeigeTexture = `${ASSET_BASE}/beige-background-texture.jpg`
const imgProduct1 = `${ASSET_BASE}/product-1-kobieca.png`
const imgProduct2 = `${ASSET_BASE}/product-2-slubny.png`
const imgProduct3 = `${ASSET_BASE}/product-3-wizerunkowa.png`
const imgProduct4 = `${ASSET_BASE}/product-4-rodzinna.png`
const imgProduct5 = `${ASSET_BASE}/product-5-milosna.png`
const imgArrowLeft = `${ASSET_BASE}/nav-arrow-left.svg`
const imgArrowRight = `${ASSET_BASE}/nav-arrow-right.svg`
const imgButtonCapLeft = `${ASSET_BASE}/button-cap-left.svg`
const imgButtonCapRight = `${ASSET_BASE}/button-cap-right.svg`
const imgFooterWave = `${ASSET_BASE}/footer-wave.svg`

const fontFeatureBody =
  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1"

export default function HomepageWybierzHistorie() {
  return (
    <section className="w-full">
      <div className="max-w-[1366px] mx-auto">
        <div className="content-stretch flex flex-col items-start relative w-full">
          {/* Main pink panel */}
          <div className="bg-[#ead3d3] content-stretch flex flex-col gap-[64px] items-center pb-[32px] pt-[64px] px-[32px] relative shrink-0 w-[1366px]">
            {/* Beige texture overlay */}
            <div className="-translate-x-1/2 absolute h-[1029px] left-1/2 mix-blend-color-burn top-0 w-[1366px] pointer-events-none">
              <Image
                src={imgBeigeTexture}
                alt=""
                fill
                sizes="1366px"
                className="object-cover pointer-events-none"
                priority={false}
              />
            </div>

            {/* Header + product list */}
            <div className="content-stretch flex flex-col gap-[36px] items-start justify-center relative shrink-0 w-full">
              {/* Header */}
              <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[560px]">
                  <p
                    className="font-['The_Seasons',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[#4f3a26] text-center tracking-[-0.72px] w-full"
                    style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
                  >
                    <span className="leading-[1.04] text-[36px]">Wybierz </span>
                    <span
                      className="italic leading-[1.04] text-[36px] tracking-[-0.36px]"
                      style={{
                        fontFamily: "'The Seasons', sans-serif",
                        fontStyle: 'italic',
                        fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      historię
                    </span>
                    <span className="leading-[1.04] text-[36px]">
                      , którą chcesz teraz opowiedzieć
                    </span>
                  </p>
                  <div className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full">
                    <p
                      className="font-['Instrument_Sans',sans-serif] font-normal leading-[1.48] relative shrink-0 text-[#392818] text-[16px] text-center tracking-[-0.24px] w-[535px]"
                      style={{
                        fontVariationSettings: "'wdth' 100",
                        fontFeatureSettings: fontFeatureBody,
                      }}
                    >
                      Każda forma współpracy ma inny rytm, ale wszystkie łączy
                      jedno: spokój, uważność i zdjęcia, które powstają wtedy,
                      gdy można być sobą.
                    </p>
                  </div>
                </div>
              </div>

              {/* Product list */}
              <div className="content-start flex flex-wrap gap-[48px_16px] items-start relative shrink-0 w-[1616px]">
                {/* Product 1 — Sesja kobieca */}
                <div className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[310px]">
                  <div className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[298px]">
                    <div className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[298px] overflow-hidden">
                      <Image
                        src={imgProduct1}
                        alt="Sesja kobieca"
                        fill
                        sizes="298px"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[298px]">
                      <p
                        className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[258px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Sesja kobieca
                      </p>
                      <p
                        className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[258px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        To czas, w którym możesz zwolnić i skupić się na sobie.
                        Prowadzę Cię spokojnie przez cały proces — tak, żebyś
                        mogła poczuć się swobodnie.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product 2 — Reportaż ślubny */}
                <div className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[311px]">
                  <div className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[299px]">
                    <div className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[299px] overflow-hidden">
                      <Image
                        src={imgProduct2}
                        alt="Reportaż ślubny"
                        fill
                        sizes="299px"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[299px]">
                      <p
                        className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[259px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Reportaż ślubny
                      </p>
                      <p
                        className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[259px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Jestem obok, ale nie na pierwszym planie. Łapię
                        spojrzenia, gesty i momenty, które często umykają w
                        dniu ślubu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product 3 — Sesja wizerunkowa */}
                <div className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[310px]">
                  <div className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[298px]">
                    <div className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[298px] overflow-hidden">
                      <Image
                        src={imgProduct3}
                        alt="Sesja wizerunkowa"
                        fill
                        sizes="298px"
                        className="object-cover pointer-events-none"
                        style={{ objectPosition: 'left top' }}
                      />
                    </div>
                    <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[298px]">
                      <p
                        className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[258px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Sesja wizerunkowa
                      </p>
                      <p
                        className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[258px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Dla kobiet i marek osobistych, które chcą zdjęć
                        spójnych z tym, kim są. Pomagam stworzyć wizerunek,
                        który jest naturalny, profesjonalny i prawdziwy
                        jednocześnie.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product 4 — Sesja rodzinna */}
                <div className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[311px]">
                  <div className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[299px]">
                    <div className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[299px] overflow-hidden">
                      <Image
                        src={imgProduct4}
                        alt="Sesja rodzinna"
                        fill
                        sizes="299px"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[299px]">
                      <p
                        className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[259px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Sesja rodzinna
                      </p>
                      <p
                        className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[259px]"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Bez ustawiania i sztucznego uśmiechu. Z ruchem,
                        bliskością i przestrzenią na bycie razem. To pamiątka z
                        codzienności, do której chce się wracać.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Product 5 — Sesja miłosna (flex grow) */}
                <div className="border border-[#dba0a0] border-solid content-stretch flex flex-[1_0_0] items-center min-w-px p-[6px] relative rounded-tl-[999px] rounded-tr-[999px]">
                  <div className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative rounded-tl-[999px] rounded-tr-[999px]">
                    <div className="aspect-[316/316] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-full overflow-hidden">
                      <Image
                        src={imgProduct5}
                        alt="Sesja miłosna"
                        fill
                        sizes="316px"
                        className="object-cover pointer-events-none"
                      />
                    </div>
                    <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-full">
                      <p
                        className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-full"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Sesja miłosna
                      </p>
                      <p
                        className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-full"
                        style={{
                          fontVariationSettings: "'wdth' 100",
                          fontFeatureSettings: fontFeatureBody,
                        }}
                      >
                        Dla kobiet i marek osobistych, które chcą zdjęć
                        spójnych z tym, kim są. Pomagam stworzyć wizerunek,
                        który jest naturalny, profesjonalny i prawdziwy
                        jednocześnie.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation arrows overlay */}
                <div className="absolute bg-[rgba(219,160,160,0.48)] content-stretch flex gap-[8px] items-center justify-center left-[567px] rounded-[999px] size-[64px] top-[29px]">
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="-scale-y-100 flex-none">
                      <div className="relative size-[16px]">
                        <Image
                          src={imgArrowLeft}
                          alt=""
                          fill
                          sizes="16px"
                          className="block"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center relative shrink-0">
                    <div className="flex-none rotate-180">
                      <div className="relative size-[16px]">
                        <Image
                          src={imgArrowRight}
                          alt=""
                          fill
                          sizes="16px"
                          className="block"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry section */}
            <div className="content-stretch flex flex-col gap-[32px] items-center justify-center relative shrink-0 w-full">
              <div className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] relative shrink-0 text-center">
                <p
                  className="relative shrink-0 text-[#392818] text-[20px] tracking-[-0.3px] w-[535px]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings: fontFeatureBody,
                  }}
                >
                  Twojej historii nie ma w mojej ofercie?
                </p>
                <p
                  className="relative shrink-0 text-[#4f3a26] text-[16px] tracking-[-0.24px] w-[535px]"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings: fontFeatureBody,
                  }}
                >
                  Czasem najlepsze zdjęcia powstają poza gotowymi schematami.
                  Jeśli masz pomysł na sesję, który nie mieści się w żadnej
                  kategorii — albo po prostu czujesz, że chcesz czegoś innego —
                  napisz do mnie.
                </p>
              </div>
              <div className="content-stretch flex items-center relative shrink-0">
                <div className="h-[44px] relative shrink-0 w-[18px]">
                  <Image
                    src={imgButtonCapLeft}
                    alt=""
                    fill
                    sizes="18px"
                    className="block"
                  />
                </div>
                <div className="bg-[#cba783] content-stretch flex h-[44px] items-start justify-center pb-[10px] pt-[11px] px-[4px] relative shrink-0">
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-medium leading-[1.48] relative shrink-0 text-[#392818] text-[14px] text-center tracking-[-0.14px] whitespace-nowrap"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings: fontFeatureBody,
                    }}
                  >
                    Pogadajmy
                  </p>
                </div>
                <div className="h-[44px] relative shrink-0 w-[18px]">
                  <Image
                    src={imgButtonCapRight}
                    alt=""
                    fill
                    sizes="18px"
                    className="block"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer wave */}
          <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full">
            <div className="aspect-[1366/85] relative shrink-0 w-full">
              <Image
                src={imgFooterWave}
                alt=""
                fill
                sizes="1366px"
                className="block"
              />
            </div>
            <div className="-translate-x-1/2 absolute h-[85px] left-1/2 mix-blend-color-burn top-0 w-[1366px] pointer-events-none">
              <Image
                src={imgBeigeTexture}
                alt=""
                fill
                sizes="1366px"
                className="object-cover pointer-events-none"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
