// TODO: Mobile breakpoint — tablet (2-col) and mobile (1-col) implemented via responsive grid.
// Desktop layout: 4-column card grid as per Figma node 6593:13293.

type AboutApproachCard = {
  title: string
  body: string
}

type AboutApproachProps = {
  blockType: 'aboutApproach'
  heading: string
  lead?: string | null
  cards: AboutApproachCard[]
}

function ApproachCard({ title, body }: AboutApproachCard) {
  return (
    <div className="border border-black flex flex-col gap-3 p-4 flex-1 min-w-0">
      <p className="font-['Roboto',sans-serif] font-semibold text-[16px] leading-[1.36] text-black">
        {title}
      </p>
      <p className="font-['Roboto',sans-serif] font-normal text-[16px] leading-[1.5] text-black">
        {body}
      </p>
    </div>
  )
}

export function AboutApproach({ heading, lead, cards }: AboutApproachProps) {
  return (
    <section className="w-full bg-white py-20 px-8">
      <div className="max-w-[1366px] mx-auto flex flex-col gap-9">

        {/* Heading + lead — centered */}
        <div className="flex flex-col gap-4 items-center w-full">
          <h2 className="font-['Inter',sans-serif] font-normal text-[32px] leading-[1.24] tracking-[-0.035em] text-black text-center">
            {heading}
          </h2>

          {lead && (
            <p className="font-['Roboto',sans-serif] font-normal text-[16px] leading-[1.58] text-black text-center max-w-[442px]">
              {lead}
            </p>
          )}
        </div>

        {/* Cards grid: 1-col mobile, 2-col tablet, 4-col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {cards.map((card, index) => (
            <ApproachCard key={index} title={card.title} body={card.body} />
          ))}
        </div>

      </div>
    </section>
  )
}
