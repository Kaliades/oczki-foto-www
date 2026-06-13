type LegalDocumentIntroProps = {
  description: string
  figmaNode?: string
  headingId: string
  title: string
}

/**
 * Document title + lead copy — Figma `Texts` (`3668:4881` / `7108:16069` / `7108:16705`).
 */
export function LegalDocumentIntro({
  description,
  figmaNode,
  headingId,
  title,
}: LegalDocumentIntroProps) {
  return (
    <div
      className="flex w-full flex-col gap-4 border-b border-[var(--oczki-primary-200)] pb-6 opacity-80 md:pb-9 md:opacity-100"
      data-figma-node={figmaNode}
      data-name="Texts"
    >
      <h1
        className="oczki-heading-l w-full text-[var(--oczki-primary-800)]"
        id={headingId}
      >
        {title}
      </h1>
      <p className="oczki-body-l w-full text-[var(--oczki-primary-700)]">{description}</p>
    </div>
  )
}
