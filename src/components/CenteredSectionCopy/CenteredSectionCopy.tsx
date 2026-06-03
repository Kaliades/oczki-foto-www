import {
  CENTERED_SECTION_COPY_LAYOUT,
  type CenteredSectionCopyVariant,
} from './constants'

type CenteredSectionCopyProps = {
  body: string
  headingId: string
  title: string
  variant: CenteredSectionCopyVariant
}

/**
 * Centred display heading + body stack — Figma `Heading` pattern (header/m + body/l).
 *
 * <div Heading>
 * ├── <h2 Title>
 * └── <p Text> (442 px max on tablet+, inset 36 px within 514 px on tablet/desktop)
 */
export function CenteredSectionCopy({
  body,
  headingId,
  title,
  variant,
}: CenteredSectionCopyProps) {
  const layout = CENTERED_SECTION_COPY_LAYOUT[variant]

  return (
    <div
      className="flex flex-col items-center text-center [word-break:break-word]"
      data-figma-node={layout.figmaNode}
      data-name="Heading"
      style={{ gap: layout.gap, width: layout.width }}
    >
      <h2
        className="w-full shrink-0 text-[32px] font-normal leading-[1.04] tracking-[-0.32px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1]"
        data-figma-node={layout.titleNode}
        id={headingId}
      >
        {title}
      </h2>

      <p
        className="oczki-body-l shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-700)]"
        data-figma-node={layout.bodyNode}
        style={{
          maxWidth: layout.bodyWidth,
          paddingInline: layout.bodyInsetX,
          width: layout.bodyInsetX > 0 ? layout.bodyWidth : '100%',
        }}
      >
        {body}
      </p>
    </div>
  )
}
