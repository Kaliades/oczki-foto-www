import { TERTIARY_BORDERED_PANEL_FIGMA_NODES, TERTIARY_BORDERED_PANEL_INNER } from './constants'

export type TertiaryBorderedPanelProps = {
  title: string
  description: string
  figmaNode?: string
}

/**
 * Rose triple-frame copy panel — Figma `Section Container` on case-study duo block.
 *
 * <article> — `tertiary/300` border, 4 px pad
 *   └── <div> — `tertiary/500` mat, 2 px pad
 *       └── <div> — `primary/100` well, body copy
 */
export function TertiaryBorderedPanel({ title, description, figmaNode }: TertiaryBorderedPanelProps) {
  const { copyGap, middlePad, outerBorder, paddingBottom, paddingTop, paddingX } =
    TERTIARY_BORDERED_PANEL_INNER

  return (
    <article
      className="flex w-full flex-col border border-solid border-[var(--oczki-tertiary-300)]"
      data-figma-node={figmaNode ?? TERTIARY_BORDERED_PANEL_FIGMA_NODES.sectionContainer}
      data-name="Section Container"
      style={{ padding: outerBorder }}
    >
      <div
        className="flex w-full flex-col bg-[var(--oczki-tertiary-500)]"
        data-name="Subsection Container"
        style={{ padding: middlePad }}
      >
        <div
          className="flex w-full flex-col bg-[var(--oczki-primary-100)] leading-[1.48]"
          data-figma-node={TERTIARY_BORDERED_PANEL_FIGMA_NODES.innerContainer}
          data-name="Subsection Inner Container"
          style={{
            gap: copyGap,
            paddingBottom,
            paddingLeft: paddingX,
            paddingRight: paddingX,
            paddingTop,
          }}
        >
          <h3 className="oczki-body-xl tracking-[-0.3px] text-[var(--oczki-primary-900)]">{title}</h3>
          <p className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-800)]">{description}</p>
        </div>
      </div>
    </article>
  )
}
