import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import {
  CENTERED_MESSAGE_STACK_LAYOUT,
  type CenteredMessageStackHeading,
  type CenteredMessageStackVariant,
} from './constants'

type CenteredMessageStackProps = {
  body: string
  heading: CenteredMessageStackHeading
  headingId: string
  variant: CenteredMessageStackVariant
}

/**
 * Centred display heading + body — Figma `Text Container` pattern.
 *
 * <div Text Container>
 * ├── <h2 Description> — `typography/header/m` per breakpoint (32 / 28 / 24 px)
 * └── <p Text> — body/l at 16 px, max 442 px on tablet+
 */
export function CenteredMessageStack({
  body,
  heading,
  headingId,
  variant,
}: CenteredMessageStackProps) {
  const layout = CENTERED_MESSAGE_STACK_LAYOUT[variant]

  return (
    <div
      className="relative z-10 flex shrink-0 flex-col items-center text-center [word-break:break-word]"
      data-figma-node={layout.figmaNode}
      data-name="Text Container"
      style={{ gap: layout.gap, width: layout.width }}
    >
      <SplitDisplayHeading
        className="w-full text-[var(--oczki-primary-800)]"
        emphasis={heading.emphasis}
        end={heading.end}
        id={headingId}
        sizeClassName={layout.headingSizeClassName}
        start={heading.start}
      />

      <p
        className="oczki-body-l shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-700)]"
        data-figma-node={layout.bodyNode}
        style={{
          maxWidth: layout.bodyMaxWidth,
          paddingInline: layout.bodyInsetX,
          width: layout.bodyMaxWidth ? layout.bodyMaxWidth : '100%',
        }}
      >
        {body}
      </p>
    </div>
  )
}
