import Image from 'next/image'

export default function OMnieKroki() {
  const cards = [
    {
      title: 'Opowieści pisane światłem',
      body: 'Nie ingerujemy w bieg wydarzeń. Pozwalamy emocjom płynąć naturalnie, łapiąc te niepozowane momenty – od drżenia dłoni podczas przysięgi, po spontaniczny wybuch śmiechu rodziców.',
      rotation: '-3.49deg',
      ellipse: '/blocks-v2/omniekroki/ellipse-1.svg',
      arrow: '/blocks-v2/omniekroki/arrow-1.svg',
      arrowRotation: '88.47deg',
      arrowFlip: false,
      hideArrow: false,
    },
    {
      title: 'Kompozycja i technika',
      body: 'Łączymy artystyczną wrażliwość z techniczną perfekcją. Wykorzystujemy naturalne światło, by wydobyć magię miejsc, które wybraliście na swój ślub.',
      rotation: '6.12deg',
      ellipse: '/blocks-v2/omniekroki/ellipse-2.svg',
      arrow: '/blocks-v2/omniekroki/arrow-2.svg',
      arrowRotation: '-90.41deg',
      arrowFlip: true,
      hideArrow: false,
    },
    {
      title: 'Wasza historia, nasze kadry',
      body: 'Pamiętajcie, że to Wy jesteście głównymi bohaterami. My jesteśmy opowiadaczami, którzy dbają o to, byście po latach, patrząc na zdjęcia, poczuli ten sam zapach powietrza i te same dreszcze emocji.',
      rotation: '-1.68deg',
      ellipse: '/blocks-v2/omniekroki/ellipse-1.svg',
      arrow: '/blocks-v2/omniekroki/arrow-3.svg',
      arrowRotation: '-89.89deg',
      arrowFlip: true,
      hideArrow: true,
    },
  ]

  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto px-8 py-24 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2
            className="font-['The_Seasons',serif] text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26] w-[442px] max-w-full"
            style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
          >
            <span>Jak </span>
            <span className="italic" style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}>
              wspólnie działamy
            </span>
            <span> nad Waszą historią?</span>
          </h2>
          <p
            className="font-['Instrument_Sans',sans-serif] text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] w-[442px] max-w-full"
            style={{
              fontVariationSettings: "'wdth' 100",
              fontFeatureSettings:
                "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
            }}
          >
            W duecie stajemy się Waszymi „cieniami” – jesteśmy wszędzie tam, gdzie dzieje się coś
            ważnego, ale pozostajemy niemal niewidoczni. Nasza wspólna filozofia opiera się na
            trzech filarach:
          </p>
        </div>

        <div className="relative w-full max-w-[1302px] h-[280px] flex items-start justify-between">
          {cards.map((card, i) => (
            <div
              key={i}
              className="relative w-[408px] h-[237px] flex items-center justify-center shrink-0"
              style={{ transform: `rotate(${card.rotation}) skewX(-0.34deg)` }}
            >
              <div
                className="relative w-full h-full bg-[#f1eee8] flex flex-col items-end justify-center gap-3.5 pl-12 pr-6 py-5"
                style={{
                  filter:
                    'drop-shadow(1px 4px 2.9px rgba(53,39,25,0.16)) drop-shadow(6px 11px 6.65px rgba(53,39,25,0.08))',
                }}
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <p
                    className="font-['Instrument_Sans',sans-serif] text-[20px] leading-[1.48] tracking-[-0.3px] text-[#4f3a26] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    {card.title}
                  </p>
                  <p
                    className="font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] w-full"
                    style={{
                      fontVariationSettings: "'wdth' 100",
                      fontFeatureSettings:
                        "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                    }}
                  >
                    {card.body}
                  </p>
                </div>

                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-6 h-6">
                  <Image
                    src={card.ellipse}
                    alt=""
                    width={24}
                    height={24}
                    className="block w-full h-full"
                  />
                </div>

                {!card.hideArrow && (
                  <div
                    className="relative w-[39px] h-[80px]"
                    style={{
                      transform: `rotate(${card.arrowRotation})${card.arrowFlip ? ' scaleY(-1)' : ''} skewX(-0.34deg)`,
                    }}
                  >
                    <Image
                      src={card.arrow}
                      alt=""
                      width={39}
                      height={80}
                      className="block w-full h-full"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          <div
            className="absolute pointer-events-none"
            style={{
              left: '747.69px',
              top: '-28px',
              width: '166px',
              height: '223px',
              transform: 'rotate(7.29deg)',
            }}
          >
            <Image
              src="/blocks-v2/omniekroki/portrait.png"
              alt=""
              width={166}
              height={223}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
