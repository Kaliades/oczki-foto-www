// TODO: Mobile breakpoint — full responsive pass needed (cards stack on mobile/md).
// Desktop layout is implemented as per Figma (3-column tilted cards).

type HomepagePhilosophyProps = {
  blockType: 'homepagePhilosophy'
  heading: string
  lead?: string | null
  pillars: { title: string; body: string }[]
}

// Alternating tilt angles per card (from Figma: card 1 ≈ -2.3°, card 2 ≈ +4.4°, card 3 ≈ -5.6°)
const CARD_ROTATIONS = ['-rotate-[2.3deg]', 'rotate-[4.4deg]', '-rotate-[5.6deg]']

// Floral motif SVG — decorative dots in card corner (hardcoded, matches Figma Vector asset)
function FloralMotif() {
  return (
    <svg
      width="66"
      height="40"
      viewBox="0 0 66 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 opacity-40"
      aria-hidden="true"
    >
      {/* Stylised floral dot pattern matching Figma Vector nodes in card corners */}
      <circle cx="8" cy="20" r="3.5" fill="#96a38b" />
      <circle cx="8" cy="20" r="1.5" fill="#6b7a5e" />
      <circle cx="20" cy="12" r="3" fill="#96a38b" />
      <circle cx="20" cy="12" r="1.2" fill="#6b7a5e" />
      <circle cx="20" cy="28" r="3" fill="#96a38b" />
      <circle cx="20" cy="28" r="1.2" fill="#6b7a5e" />
      <circle cx="33" cy="8" r="2.5" fill="#96a38b" />
      <circle cx="33" cy="8" r="1" fill="#6b7a5e" />
      <circle cx="33" cy="20" r="2.5" fill="#96a38b" />
      <circle cx="33" cy="20" r="1" fill="#6b7a5e" />
      <circle cx="33" cy="32" r="2.5" fill="#96a38b" />
      <circle cx="33" cy="32" r="1" fill="#6b7a5e" />
      <circle cx="46" cy="12" r="2" fill="#96a38b" />
      <circle cx="46" cy="28" r="2" fill="#96a38b" />
      <circle cx="57" cy="20" r="2" fill="#96a38b" />
    </svg>
  )
}

// Pink wax-seal badge — the decorative AI-generated seal image from Figma
// Exported as a static asset — replace src with actual optimised image path when available.
function WaxSealBadge() {
  return (
    <div className="flex items-center justify-center w-[140px] h-[140px] mx-auto mb-6 drop-shadow-[1px_4px_6px_rgba(53,39,25,0.18)]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/seed-images/wax-seal-philosophy.png"
        alt=""
        width={140}
        height={140}
        className="object-cover rounded-full"
        aria-hidden="true"
      />
    </div>
  )
}

function PillarCard({
  title,
  body,
  rotation,
}: {
  title: string
  body: string
  rotation: string
}) {
  return (
    <div className="relative flex-1 min-w-0">
      {/* Green "shadow" card behind — decorative tilted background card */}
      <div
        className="absolute inset-0 bg-[#96a38b] rounded-sm shadow-[1px_4px_5.8px_0px_rgba(53,39,25,0.20),6px_11px_13.3px_0px_rgba(53,39,25,0.12)] rotate-[7deg]"
        aria-hidden="true"
      />

      {/* White/cream foreground card */}
      <div
        className={[
          'relative bg-[#f1eee8] rounded-sm p-5 flex flex-col gap-3',
          'shadow-[1px_4px_2.9px_rgba(53,39,25,0.16),6px_11px_6.65px_rgba(53,39,25,0.08)]',
          rotation,
        ].join(' ')}
      >
        {/* Card title */}
        <p
          className="font-['Instrument_Sans',sans-serif] font-normal text-[20px] leading-[1.48] tracking-[-0.3px] text-[#4f3a26]"
        >
          {title}
        </p>

        {/* Card body */}
        <p
          className="font-['Instrument_Sans',sans-serif] font-normal text-[14px] leading-[1.48] tracking-[-0.14px] text-[#6b5947] whitespace-pre-line"
        >
          {body}
        </p>

        {/* Floral motif — bottom-right corner */}
        <div className="flex justify-end mt-1">
          <FloralMotif />
        </div>
      </div>
    </div>
  )
}

export function HomepagePhilosophy({ heading, lead, pillars }: HomepagePhilosophyProps) {
  return (
    <section className="w-full bg-[#f5f1ec] py-24 px-8 overflow-hidden">
      <div className="max-w-[1366px] mx-auto">

        {/* Wax seal badge — centred at top */}
        <WaxSealBadge />

        {/* Heading + lead — left-aligned, max ~535px wide */}
        <div className="max-w-[535px] mb-16">
          {/* Heading: mixed italic/regular spans matching The Seasons design */}
          <h2 className="font-['The_Seasons',serif] text-[36px] leading-[1.04] tracking-[-0.72px] text-[#4f3a26] mb-4">
            {heading}
          </h2>

          {lead && (
            <div className="flex flex-col gap-[6px]">
              {lead.split('\n').map((line, i) => (
                <p
                  key={i}
                  className="font-['Instrument_Sans',sans-serif] font-normal text-[16px] leading-[1.48] tracking-[-0.24px] text-[#6b5947]"
                >
                  {line}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Pillar cards — 1 column mobile, 2 md, 3 lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              title={pillar.title}
              body={pillar.body}
              rotation={CARD_ROTATIONS[index % CARD_ROTATIONS.length] ?? ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
