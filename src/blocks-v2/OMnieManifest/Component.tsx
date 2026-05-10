export default function OMnieManifest() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex flex-col items-center gap-[48px] pt-[96px] pb-[128px] px-[80px] text-center">
        {/* Heading: subtitle + body intro */}
        <div className="flex flex-col items-center gap-[16px]">
          <h2
            className="font-['The_Seasons',serif] text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26] w-[514px]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            <span>Oczki to spojrzenie na to, co w Tobie </span>
            <span
              className="italic"
              style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
            >
              najbardziej naturalne
            </span>
          </h2>
          <p
            className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px]"
            style={{
              fontVariationSettings: "'wdth' 100",
              fontFeatureSettings:
                "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
            }}
          >
            Wierzę, że w oczach widać wszystko – radość, spokój i te iskierki, których nie da
            się wyreżyserować. Moje podejście opiera się na kilku zasadach:
          </p>
        </div>

        {/* 3-column values row */}
        <div className="flex items-start justify-end gap-[8px] w-[906px]">
          {/* Column 1 */}
          <div className="flex flex-col items-start gap-[10px] p-[16px] w-[297px] border-r border-solid border-[#e7ded4]">
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-[265px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Naturalność bez filtrów
            </p>
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-[265px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Uwielbiam miękkie światło i kolory, które oddają rzeczywistość taką, jaka jest –
              ciepłą i szlachetną.
            </p>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col items-start gap-[10px] p-[16px] w-[297px] border-r border-solid border-[#e7ded4]">
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-[265px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Komfort jako priorytet
            </p>
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-[265px]"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Wiem, że poczucie bezpieczeństwa to klucz do pięknych zdjęć. Zawsze dbam o to,
              byś czuła się zaopiekowana od pierwszego maila aż po odbiór albumu.
            </p>
          </div>

          {/* Column 3 (no right border) */}
          <div className="flex flex-1 flex-col items-start gap-[10px] p-[16px] min-w-px">
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[16px] leading-[1.48] tracking-[-0.24px] text-[#4f3a26] w-full"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Brak sztywnych schematów
            </p>
            <p
              className="font-['Instrument_Sans',sans-serif] font-normal text-left text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-full"
              style={{
                fontVariationSettings: "'wdth' 100",
                fontFeatureSettings:
                  "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
              }}
            >
              Każda sesja to dla mnie nowa historia. Nie ustawiam Was pod linijkę – pozwalam
              wydarzeniom płynąć, łapiąc te najbardziej szczere chwile.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
