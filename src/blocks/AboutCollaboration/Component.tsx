// TODO: Mobile breakpoints — verify tablet (2-col) and mobile (1-col) layouts against
// mobile Figma frames in a second pass. Desktop 3-col layout is implemented per Figma.

type AboutCollaborationCard = {
  title: string
  body: string
}

type AboutCollaborationProps = {
  blockType: 'aboutCollaboration'
  heading: string
  lead?: string | null
  cards: AboutCollaborationCard[]
}

export const AboutCollaboration: React.FC<AboutCollaborationProps> = ({ heading, lead, cards }) => {
  return (
    <section className="w-full bg-white px-8 py-20">
      {/* Inner container — max-width matches Figma frame (~1366px) */}
      <div className="mx-auto flex max-w-[1366px] flex-col gap-9">

        {/* Header group — centered heading + lead */}
        <div className="flex flex-col items-center gap-4">
          <h2 className="max-w-[554px] text-center font-sans text-[32px] font-normal leading-[1.24] tracking-[-0.035em] text-black">
            {heading}
          </h2>

          {lead && (
            <p className="max-w-[442px] text-center font-sans text-[16px] font-normal leading-[1.58] text-black">
              {lead}
            </p>
          )}
        </div>

        {/* Card grid — 1-col mobile, 2-col tablet, 3-col desktop */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              className="flex flex-col gap-3 border border-black p-4"
              key={index}
            >
              <p className="font-sans text-[16px] font-semibold leading-[1.36] text-black">
                {card.title}
              </p>
              <p className="font-sans text-[16px] font-normal leading-[1.5] text-black">
                {card.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
