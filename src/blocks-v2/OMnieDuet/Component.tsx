import Image from 'next/image'

export default function OMnieDuet() {
  return (
    <section className="w-full">
      <div className="max-w-[1366px] mx-auto flex items-stretch">
        {/* Left: image container */}
        <div className="w-[683px] shrink-0 self-stretch bg-[#f1eee8] flex flex-col p-[64px]">
          <div className="relative flex-1 w-full bg-[#f6f5f2]">
            <Image
              src="/blocks-v2/omnieduet/image-1.png"
              alt=""
              fill
              sizes="555px"
              className="object-cover"
            />
            <Image
              src="/blocks-v2/omnieduet/image-2.png"
              alt=""
              fill
              sizes="555px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Right: content container */}
        <div className="flex-1 min-w-0 bg-[#f6f5f2] flex flex-col gap-[48px] items-start pt-[80px] pb-[96px] px-[80px]">
          {/* Section: title + intro paragraph */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <h2
              className="font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.36px] text-[#4f3a26] w-full"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              <span
                className="italic"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                Podwójne spojrzenie
              </span>
              <span> na Waszą historię</span>
            </h2>
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-full"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Choć na sesjach kobiecych spotykamy się sam na sam, podczas reportaży ślubnych
              działam w duecie z Łukaszem. Dlaczego? Bo wierzymy, że Wasz dzień zasługuje na to,
              by widzieć go z dwóch perspektyw jednocześnie. Tam, gdzie ja szukam czułego gestu
              i łzy wzruszenia, Łukasz wyłapuje szeroki kadr i szaleństwo na parkiecie.
            </p>
          </div>

          {/* Section: subheading + 3 bordered cards */}
          <div className="flex flex-col gap-[16px] items-start w-full">
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-[20px] leading-[1.48] tracking-[-0.3px] text-[#4f3a26] w-full"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Poznajcie Łukasza (Oczko) – Drugi fotograf ślubny
            </p>
            <div className="flex flex-col gap-[8px] items-end w-full">
              {/* Card 1 */}
              <div className="border border-solid border-[#e5d0bb] flex flex-col p-[16px] w-full">
                <div className="flex flex-col gap-[6px] w-full">
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Geny i pasja
                  </p>
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Optymizm to jego drugie imię, a fotografia? Ma ją w genach. Jego dziadek
                    wywoływał zdjęcia w łazience, a on sam pierwszy aparat kupił za
                    oszczędności już w gimnazjum.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="border border-solid border-[#e5d0bb] flex flex-col p-[16px] w-full">
                <div className="flex flex-col gap-[6px] w-full">
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Nasza historia
                  </p>
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Na studiach przypomniałam mu o tej pasji, pożyczając moją lustrzankę. Po
                    dwóch latach kupił własną, a 3 lata później... zostałam jego żoną. Dziś
                    fotografujemy w duecie by dać Wam najpiękniejszą pamiątkę
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="border border-solid border-[#e5d0bb] flex flex-col p-[16px] w-full">
                <div className="flex flex-col gap-[6px] w-full">
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Poza klatką
                  </p>
                  <p
                    className="font-['Instrument_Sans',sans-serif] font-normal text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Gadżeciarz i fan ultramaratonów. Jeśli nie ma go w krakowskim studiu,
                    prawdopodobnie zaszył się w Bieszczadach albo biega w górach. Interesuje
                    się finansami i produktywnością, co sprawia, że w naszym duecie to on dba
                    o to, by każdy plan był dopięty na ostatni guzik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
