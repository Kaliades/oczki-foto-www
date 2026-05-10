// V1 — single get_design_context pass, faithful Figma translation
// Assets downloaded to public/seed-images/wybierz/ for stability (Figma URLs expire after 7 days).

const imgPlainBeigeBackgroundTexture1 = "/seed-images/wybierz/beige-background-texture.jpg";
const imgProductImage = "/seed-images/wybierz/product-1-kobieca.png";
const imgProductImage1 = "/seed-images/wybierz/product-2-slubny.png";
const imgProductImage2 = "/seed-images/wybierz/product-3-wizerunkowa.png";
const imgProductImage3 = "/seed-images/wybierz/product-4-rodzinna.png";
const imgProductImage4 = "/seed-images/wybierz/product-5-milosna.png";
const img6 = "/seed-images/wybierz/nav-arrow-left.svg";
const img7 = "/seed-images/wybierz/nav-arrow-right.svg";
const imgSubtract = "/seed-images/wybierz/button-cap-left.svg";
const imgSubtract1 = "/seed-images/wybierz/button-cap-right.svg";
const imgPolygon1 = "/seed-images/wybierz/footer-wave.svg";

export default function WybierzV1() {
  return (
    <div
      className="content-stretch flex flex-col items-start relative size-full"
      data-node-id="6781:17283"
      data-name="Main Container"
    >
      <div
        className="bg-[#ead3d3] content-stretch flex flex-col gap-[64px] items-center pb-[32px] pt-[64px] px-[32px] relative shrink-0 w-[1366px]"
        data-node-id="6724:13186"
        data-name="Wyróżniki"
      >
        <div
          className="-translate-x-1/2 absolute h-[1029px] left-1/2 mix-blend-color-burn top-0 w-[1366px]"
          data-node-id="6769:4618"
          data-name="plain-beige-background-texture 1"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgPlainBeigeBackgroundTexture1}
          />
        </div>
        <div
          className="content-stretch flex flex-col gap-[36px] items-start justify-center relative shrink-0 w-full"
          data-node-id="6769:4620"
          data-name="Content Container"
        >
          <div
            className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full"
            data-node-id="6853:12953"
            data-name="Header Container"
          >
            <div
              className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[560px]"
              data-node-id="6724:13187"
              data-name="Header Text Container"
            >
              <p
                className="font-['The_Seasons',sans-serif] leading-[0] not-italic relative shrink-0 text-[0px] text-[#4f3a26] text-center tracking-[-0.72px] w-full"
                data-node-id="6724:13188"
                style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
              >
                <span className="leading-[1.04] text-[36px]">{`Wybierz `}</span>
                <span
                  className="italic leading-[1.04] text-[36px] tracking-[-0.36px]"
                  style={{
                    fontFamily: "'The Seasons', sans-serif",
                    fontStyle: "italic",
                    fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  historię
                </span>
                <span className="leading-[1.04] text-[36px]">
                  , którą chcesz teraz opowiedzieć
                </span>
              </p>
              <div
                className="content-stretch flex flex-col items-center justify-center relative shrink-0 w-full"
                data-node-id="6724:13189"
                data-name="Subtitle Container"
              >
                <p
                  className="font-['Instrument_Sans',sans-serif] font-normal leading-[1.48] relative shrink-0 text-[#392818] text-[16px] text-center tracking-[-0.24px] w-[535px]"
                  data-node-id="6724:13190"
                  style={{
                    fontVariationSettings: "'wdth' 100",
                    fontFeatureSettings:
                      "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                  }}
                >
                  Każda forma współpracy ma inny rytm, ale wszystkie łączy
                  jedno: spokój, uważność i zdjęcia, które powstają wtedy, gdy
                  można być sobą.
                </p>
              </div>
            </div>
          </div>
          <div
            className="content-start flex flex-wrap gap-[48px_16px] items-start relative shrink-0 w-[1616px]"
            data-node-id="6724:13191"
            data-name="Product List Container"
          >
            {/* Product 1 — Sesja kobieca */}
            <div
              className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[310px]"
              data-node-id="6769:4582"
              data-name="Product Container"
            >
              <div
                className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[298px]"
                data-node-id="6724:13192"
                data-name="Product Content Container"
              >
                <div
                  className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[298px]"
                  data-node-id="6769:4579"
                  data-name="Product Image"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[999px] rounded-tr-[999px] size-full"
                    src={imgProductImage}
                  />
                </div>
                <div
                  className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[298px]"
                  data-node-id="6724:13194"
                  data-name="Product Text Container"
                >
                  <p
                    className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[258px]"
                    data-node-id="6724:13195"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Sesja kobieca
                  </p>
                  <p
                    className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[258px]"
                    data-node-id="6724:13196"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    To czas, w którym możesz zwolnić i skupić się na sobie.
                    Prowadzę Cię spokojnie przez cały proces — tak, żebyś mogła
                    poczuć się swobodnie.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 2 — Reportaż ślubny */}
            <div
              className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[311px]"
              data-node-id="6769:4583"
              data-name="Product Container"
            >
              <div
                className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[299px]"
                data-node-id="6769:4584"
                data-name="Product Content Container"
              >
                <div
                  className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[299px]"
                  data-node-id="6769:4585"
                  data-name="Product Image"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[999px] rounded-tr-[999px] size-full"
                    src={imgProductImage1}
                  />
                </div>
                <div
                  className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[299px]"
                  data-node-id="6769:4586"
                  data-name="Product Text Container"
                >
                  <p
                    className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[259px]"
                    data-node-id="6769:4587"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Reportaż ślubny
                  </p>
                  <p
                    className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[259px]"
                    data-node-id="6769:4588"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Jestem obok, ale nie na pierwszym planie. Łapię spojrzenia,
                    gesty i momenty, które często umykają w dniu ślubu.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 3 — Sesja wizerunkowa */}
            <div
              className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[310px]"
              data-node-id="6769:4590"
              data-name="Product Container"
            >
              <div
                className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[298px]"
                data-node-id="6769:4591"
                data-name="Product Content Container"
              >
                <div
                  className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[298px]"
                  data-node-id="6769:4592"
                  data-name="Product Image"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[999px] rounded-tr-[999px]">
                    <img
                      alt=""
                      className="absolute h-[150%] left-0 max-w-none top-[-16.62%] w-full"
                      src={imgProductImage2}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[298px]"
                  data-node-id="6769:4593"
                  data-name="Product Text Container"
                >
                  <p
                    className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[258px]"
                    data-node-id="6769:4594"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Sesja wizerunkowa
                  </p>
                  <p
                    className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[258px]"
                    data-node-id="6769:4595"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Dla kobiet i marek osobistych, które chcą zdjęć spójnych z
                    tym, kim są. Pomagam stworzyć wizerunek, który jest
                    naturalny, profesjonalny i prawdziwy jednocześnie.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 4 — Sesja rodzinna */}
            <div
              className="border border-[#dba0a0] border-solid content-stretch flex items-center p-[6px] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[311px]"
              data-node-id="6769:4597"
              data-name="Product Container"
            >
              <div
                className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-col items-start justify-center relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-[299px]"
                data-node-id="6769:4598"
                data-name="Product Content Container"
              >
                <div
                  className="relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 size-[299px]"
                  data-node-id="6769:4599"
                  data-name="Product Image"
                >
                  <img
                    alt=""
                    className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-tl-[999px] rounded-tr-[999px] size-full"
                    src={imgProductImage3}
                  />
                </div>
                <div
                  className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-[299px]"
                  data-node-id="6769:4600"
                  data-name="Product Text Container"
                >
                  <p
                    className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-[259px]"
                    data-node-id="6769:4601"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Sesja rodzinna
                  </p>
                  <p
                    className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-[259px]"
                    data-node-id="6769:4602"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Bez ustawiania i sztucznego uśmiechu. Z ruchem, bliskością i
                    przestrzenią na bycie razem. To pamiątka z codzienności, do
                    której chce się wracać.
                  </p>
                </div>
              </div>
            </div>

            {/* Product 5 — Sesja miłosna */}
            <div
              className="border border-[#dba0a0] border-solid content-stretch flex flex-[1_0_0] items-center min-w-px p-[6px] relative rounded-tl-[999px] rounded-tr-[999px]"
              data-node-id="6853:1426"
              data-name="Product Container"
            >
              <div
                className="bg-[#f6f5f2] border border-[#dba0a0] border-solid content-stretch flex flex-[1_0_0] flex-col items-start justify-center min-w-px relative rounded-tl-[999px] rounded-tr-[999px]"
                data-node-id="6853:1427"
                data-name="Product Content Container"
              >
                <div
                  className="aspect-[316/316] relative rounded-tl-[999px] rounded-tr-[999px] shrink-0 w-full"
                  data-node-id="6853:1428"
                  data-name="Product Image"
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-tl-[999px] rounded-tr-[999px]">
                    <img
                      alt=""
                      className="absolute h-[254.48%] left-[-40.69%] max-w-none top-[-57.08%] w-[169.65%]"
                      src={imgProductImage4}
                    />
                  </div>
                </div>
                <div
                  className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] pb-[20px] pt-[16px] px-[20px] relative shrink-0 w-full"
                  data-node-id="6853:1429"
                  data-name="Product Text Container"
                >
                  <p
                    className="relative shrink-0 text-[#4f3a26] text-[20px] tracking-[-0.3px] w-full"
                    data-node-id="6853:1430"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Sesja miłosna
                  </p>
                  <p
                    className="relative shrink-0 text-[#6b5947] text-[14px] tracking-[-0.14px] w-full"
                    data-node-id="6853:1431"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    Dla kobiet i marek osobistych, które chcą zdjęć spójnych z
                    tym, kim są. Pomagam stworzyć wizerunek, który jest
                    naturalny, profesjonalny i prawdziwy jednocześnie.
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation arrows overlay */}
            <div
              className="absolute bg-[rgba(219,160,160,0.48)] content-stretch flex gap-[8px] items-center justify-center left-[567px] rounded-[999px] size-[64px] top-[29px]"
              data-node-id="6853:12954"
              data-name="Navigation Container"
            >
              <div className="flex items-center justify-center relative shrink-0">
                <div className="-scale-y-100 flex-none">
                  <div
                    className="relative size-[16px]"
                    data-node-id="6853:12955"
                    data-name="6"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={img6}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center relative shrink-0">
                <div className="flex-none rotate-180">
                  <div
                    className="relative size-[16px]"
                    data-node-id="6853:12957"
                    data-name="7"
                  >
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={img7}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry section */}
        <div
          className="content-stretch flex flex-col gap-[32px] items-center justify-center relative shrink-0 w-full"
          data-node-id="6724:13212"
          data-name="Inquiry Container"
        >
          <div
            className="content-stretch flex flex-col font-['Instrument_Sans',sans-serif] font-normal gap-[8px] items-start leading-[1.48] relative shrink-0 text-center"
            data-node-id="6724:13213"
            data-name="Inquiry Text Container"
          >
            <p
              className="relative shrink-0 text-[#392818] text-[20px] tracking-[-0.3px] w-[535px]"
              data-node-id="6724:13214"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Twojej historii nie ma w mojej ofercie?
            </p>
            <p
              className="relative shrink-0 text-[#4f3a26] text-[16px] tracking-[-0.24px] w-[535px]"
              data-node-id="6724:13215"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Czasem najlepsze zdjęcia powstają poza gotowymi schematami. Jeśli
              masz pomysł na sesję, który nie mieści się w żadnej kategorii —
              albo po prostu czujesz, że chcesz czegoś innego — napisz do mnie.
            </p>
          </div>
          <div
            className="content-stretch flex items-center relative shrink-0"
            data-node-id="7063:14341"
            data-name="Button"
          >
            <div
              className="h-[44px] relative shrink-0 w-[18px]"
              data-node-id="I7063:14341;7063:14172"
              data-name="Subtract"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgSubtract}
              />
            </div>
            <div
              className="bg-[#cba783] content-stretch flex h-[44px] items-start justify-center pb-[10px] pt-[11px] px-[4px] relative shrink-0"
              data-node-id="I7063:14341;7063:14176"
              data-name="Label-text"
            >
              <p
                className="font-['Instrument_Sans',sans-serif] font-medium leading-[1.48] relative shrink-0 text-[#392818] text-[14px] text-center tracking-[-0.14px] whitespace-nowrap"
                data-node-id="I7063:14341;7063:14177"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                Pogadajmy
              </p>
            </div>
            <div
              className="h-[44px] relative shrink-0 w-[18px]"
              data-node-id="I7063:14341;7063:14178"
              data-name="Subtract"
            >
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgSubtract1}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer wave */}
      <div
        className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full"
        data-node-id="6781:17288"
        data-name="Footer Container"
      >
        <div
          className="aspect-[1366/85] relative shrink-0 w-full"
          data-node-id="6781:17282"
        >
          <img
            alt=""
            className="absolute block inset-0 max-w-none size-full"
            src={imgPolygon1}
          />
        </div>
        <div
          className="-translate-x-1/2 absolute h-[85px] left-1/2 mix-blend-color-burn top-0 w-[1366px]"
          data-node-id="6781:17289"
          data-name="plain-beige-background-texture 1"
        >
          <img
            alt=""
            className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
            src={imgPlainBeigeBackgroundTexture1}
          />
        </div>
      </div>
    </div>
  );
}
