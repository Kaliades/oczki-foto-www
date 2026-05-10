import Image from 'next/image'

export default function OMnieInstagram() {
  return (
    <section className="w-full bg-[#f6f5f2]">
      <div className="max-w-[1366px] mx-auto flex flex-col items-center px-[32px] py-[48px]">
        <div className="flex w-full flex-col items-start gap-[24px]">
          {/* Header row: heading + handle */}
          <div className="flex w-full items-center justify-between">
            <h2
              className="font-['The_Seasons',serif] text-[32px] leading-[1.04] tracking-[-0.32px] text-[#4f3a26] whitespace-nowrap"
              style={{ fontFeatureSettings: "'lnum' 1, 'pnum' 1" }}
            >
              Zostańmy w kontakcie na{' '}
              <span
                className="italic"
                style={{ fontFeatureSettings: "'dlig' 1, 'lnum' 1, 'pnum' 1" }}
              >
                Instagramie
              </span>
            </h2>

            <div className="flex items-center justify-center gap-[12px]">
              <div className="flex items-center rounded-full border border-solid border-[#e5d0bb] p-[2px]">
                <div className="relative size-[48px] overflow-hidden rounded-full">
                  <Image
                    src="/blocks-v2/omnieinstagram/avatar.png"
                    alt="Oczki Fotografia — avatar Instagram"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              </div>
              <p
                className="font-['Instrument_Sans',sans-serif] text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947] whitespace-nowrap"
                style={{
                  fontVariationSettings: "'wdth' 100",
                  fontFeatureSettings:
                    "'ss01' 1, 'ss02' 1, 'ss03' 1, 'ss08' 1, 'ss10' 1, 'ss12' 1, 'lnum' 1, 'pnum' 1",
                }}
              >
                @oczki_fotografia
              </p>
            </div>
          </div>

          {/* Tile gallery */}
          <div className="flex w-full items-start gap-[12px]">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="relative aspect-square min-w-px flex-1 overflow-hidden border border-solid border-[#f1eee8]"
              >
                <Image
                  src={`/blocks-v2/omnieinstagram/tile-${n}.png`}
                  alt={`Instagram — kadr ${n}`}
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
