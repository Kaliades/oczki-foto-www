import Image from 'next/image'

export default function HomepageObalamyMit() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex items-center justify-between px-[112px] pt-[80px] pb-[96px]">
        {/* Left: text block */}
        <div className="flex flex-col gap-[20px] items-start w-[514px]">
          <h2
            className="font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.72px] text-[#4f3a26]"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            <span>Twoja niefotogeniczność to mit, który </span>
            <span
              className="italic tracking-[-0.36px]"
              style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
            >
              wspólnie obalimy
            </span>
          </h2>

          <div className="flex flex-col gap-[10px] items-start">
            <p className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px]">
              Większość moich klientek zaczyna naszą rozmowę od słów:
            </p>

            {/* Quote pill with little tail */}
            <div className="relative bg-[#f1eee8] flex items-center justify-center px-[12px] py-[8px] gap-[10px]">
              <p className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px]">
                Asia, ja naprawdę nie umiem pozować
              </p>
              <Image
                src="/blocks-v2/homepageobalamymit/quote-tail.svg"
                alt=""
                width={14}
                height={12}
                className="absolute left-[436px] top-[-6px] w-[14px] h-[12px]"
              />
            </div>

            <p className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px]">
              I wiesz co? To zupełnie normalne! Nie jesteś modelką z wybiegu, masz prawo czuć
              lekki stres. Moim zadaniem nie jest ustawienie Cię w geometrycznej, niewygodnej
              figurze. Ja Ci po prostu towarzyszę. Rozmawiamy, śmiejemy się, a ja wyłapuję te
              momenty, gdy poprawiasz włosy lub szczerze się uśmiechasz. Zanim się obejrzysz,
              stres zniknie, a zostanie czysta radość z bycia „tu i teraz”.
            </p>
          </div>
        </div>

        {/* Right: image + handwritten quote bubble, both rotated */}
        <div className="relative w-[543px] h-[428px] shrink-0">
          {/* Tilted polaroid-style portrait, positioned to the right */}
          <div
            className="absolute top-0 left-[192px] w-[292px] h-[393px]"
            style={{ transform: 'rotate(-7.48deg)' }}
          >
            <div className="bg-[#f1eee8] border-[0.657px] border-solid border-[#e7ded4] p-[6.568px] w-[271px] h-[332px] flex items-center">
              <div className="relative w-[258px] h-[319px] overflow-hidden">
                <Image
                  src="/blocks-v2/homepageobalamymit/portrait.png"
                  alt="Portret fotografki"
                  fill
                  className="object-cover"
                  sizes="258px"
                />
              </div>
            </div>
          </div>

          {/* Tilted handwritten quote bubble */}
          <div
            className="absolute top-[138px] left-0 w-[251px] h-[232px]"
            style={{ transform: 'rotate(14.06deg)' }}
          >
            <Image
              src="/blocks-v2/homepageobalamymit/quote-bubble.svg"
              alt=""
              width={212}
              height={186}
              className="absolute top-[23px] left-[20px] w-[212px] h-[186px]"
            />
            <p
              className="absolute top-[68px] left-[35px] w-[179px] text-center font-['Dancing_Script',cursive] font-normal text-[24px] leading-[0.98] text-[#6b7a5e]"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              I found a love for me, Oh, darlin&apos;, just dive right in and follow my lead
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
