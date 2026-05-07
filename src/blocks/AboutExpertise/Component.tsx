// TODO: dedicated mobile pass — current layout uses responsive grid (1-col mobile,
// 2-col tablet, 4-col desktop) but heading/lead sizing may benefit from a
// closer inspection of the Figma mobile frame.

type Card = {
  id?: string | null
  title: string
  body: string
}

type AboutExpertiseProps = {
  blockType: 'aboutExpertise'
  heading: string
  lead?: string | null
  cards?: Card[] | null
}

export const AboutExpertise: React.FC<AboutExpertiseProps> = ({ heading, lead, cards }) => {
  return (
    <section className="w-full bg-white py-20 px-8">
      <div className="max-w-[1206px] mx-auto flex flex-col gap-9">
        {/* Heading + lead */}
        <div className="flex flex-col gap-4 items-center text-center">
          <h2 className="text-[32px] leading-[1.24] tracking-[-0.035em] text-black font-normal">
            {heading}
          </h2>
          {lead && (
            <p className="text-base leading-[1.58] text-black max-w-[442px]">{lead}</p>
          )}
        </div>

        {/* Card grid */}
        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {cards.map((card, index) => (
              <div
                key={card.id ?? index}
                className="border border-black p-4 flex flex-col gap-3"
              >
                <p className="text-base font-semibold leading-[1.36] text-black">{card.title}</p>
                <p className="text-base font-normal leading-[1.5] text-black">{card.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
