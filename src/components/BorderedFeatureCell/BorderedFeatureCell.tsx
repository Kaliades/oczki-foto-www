type BorderedFeatureCellProps = {
  description: string
  figmaNode?: string
  title: string
}

/**
 * Title + body copy cell with a bottom divider edge.
 *
 * Figma `Section` (`6998:26822`):
 *   <div Section> — border-b primary-300; p 20 px (desktop/tablet) / py 16 px (mobile)
 *     └── <div Section Container> — gap 6 px
 *         ├── title — body/l, primary-800
 *         └── description — body/m, primary-700
 */
export function BorderedFeatureCell({ description, figmaNode, title }: BorderedFeatureCellProps) {
  return (
    <div
      className="flex w-full flex-col items-start gap-1.5 border-b border-[var(--oczki-primary-300)] py-4 md:p-5"
      data-figma-node={figmaNode}
      data-name="Section"
    >
      <div
        className="flex w-full flex-col items-start gap-1.5 [word-break:break-word]"
        data-name="Section Container"
      >
        <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-800)]">{title}</p>
        <p className="oczki-body-m w-full tracking-[-0.14px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>
    </div>
  )
}
