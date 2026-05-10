import Image from 'next/image'

type Card = {
  title: string
  text: string
}

const cards: Card[] = [
  {
    title: 'Opanowanie światła',
    text: 'Niezależnie czy pracujemy w studio, czy w plenerze, dbam o to, by światło podkreślało Twoją urodę.',
  },
  {
    title: 'Lata praktyki przy sesjach w Krakowie',
    text: 'Znam tutejsze światło i lokalizacje. Wiem, jak sprawić, by otoczenie pracowało na Twoją korzyść.',
  },
  {
    title: 'Staranna selekcja',
    text: 'Przeglądam setki kadrów, by wybrać te, na których wyglądasz i czujesz się najlepiej.',
  },
  {
    title: 'Czuła obróbka',
    text: 'Moje zdjęcia mają ciepłą, naturalną tonację, która oddaje klimat spotkania i nie wychodzi z mody po jednym sezonie.',
  },
]

// Each card background contains 18 vertical decorative lines (4px wide, 24px gap)
const decorationLines = Array.from({ length: 18 })

export default function OMnieKompetencje() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex items-start justify-between px-[32px] pt-[96px] pb-[129px]">
        <div className="flex flex-col gap-[36px] items-center flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-col gap-[16px] items-center text-center">
            <h2
              className="font-['The_Seasons',serif] text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26] w-[416px]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              <span>Wiedza, która zamienia się w </span>
              <span
                className="italic"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                Twój spokój
              </span>
            </h2>
            <p className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px]">
              Choć na sesji stawiamy na luz, po mojej stronie stoi pełen profesjonalizm. Jako
              doświadczona fotografka, dbam o to, byś nie musiała martwić się o technikę.
            </p>
          </div>

          {/* Cards */}
          <div className="flex gap-[8px] items-stretch justify-end w-full">
            {cards.map((card, idx) => (
              <div
                key={idx}
                className="relative flex flex-col gap-[10px] items-start overflow-hidden bg-[#bbc3b5] p-[6px] w-[320px] flex-1 min-w-0 self-stretch"
              >
                {/* Decorative vertical lines (18 × 4px wide, gap 24px) */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-[24px] items-center h-full opacity-[0.36] pointer-events-none"
                  aria-hidden="true"
                >
                  {decorationLines.map((_, i) => (
                    <div key={i} className="w-[4px] h-full bg-[#f1eee8] shrink-0" />
                  ))}
                </div>

                {/* Inner card content */}
                <div className="relative flex flex-col items-end justify-between bg-[#f6f5f2] border border-solid border-[#96a38b] pt-[12px] pb-[16px] px-[12px] w-full flex-1 min-h-0">
                  <div className="flex flex-col gap-[8px] items-start font-['Instrument_Sans',sans-serif] font-normal leading-[1.48] w-full">
                    <p
                      className="text-[20px] tracking-[-0.3px] text-[#392818] w-full"
                      style={{
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      {card.title}
                    </p>
                    <p
                      className="text-[16px] tracking-[-0.24px] text-[#4f3a26] w-full"
                      style={{
                        fontFeatureSettings:
                          "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                      }}
                    >
                      {card.text}
                    </p>
                  </div>

                  {/* Decorative vector (rotated -90deg, 27×48.6 → bounding 48.6×27) */}
                  <div
                    className="flex items-center justify-center h-[27px] w-[48.6px] mt-[24px]"
                    aria-hidden="true"
                  >
                    <div className="-rotate-90">
                      <Image
                        src="/blocks-v2/omniekompetencje/vector.svg"
                        alt=""
                        width={27}
                        height={49}
                        className="block w-[27px] h-[48.6px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
