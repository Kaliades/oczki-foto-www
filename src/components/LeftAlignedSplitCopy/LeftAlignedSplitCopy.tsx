import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import type { LeftAlignedSplitCopyHeading } from './constants'

type LeftAlignedSplitCopyProps = {
  bodyParagraphs: readonly [string, string]
  figmaNode?: string
  heading: LeftAlignedSplitCopyHeading
  headingId: string
}

/**
 * Left-aligned display heading + body paragraphs — Figma `Section` (`6986:20143`).
 *
 * Empty paragraph slots are skipped so services can ship one or two leads.
 * Layout width stays the audited shared skeleton (`md:w-[480px]`).
 *
 * <div Section> — gap 16 px, width 480 px
 * ├── <h2 Title> — header/m with italic emphasis
 * └── <div Text Block> — gap 8 px, body/l
 */
export function LeftAlignedSplitCopy({
  bodyParagraphs,
  figmaNode,
  heading,
  headingId,
}: LeftAlignedSplitCopyProps) {
  const paragraphs = bodyParagraphs.filter((paragraph) => paragraph.trim().length > 0)

  return (
    <div
      className="flex w-full flex-col items-start gap-4 md:w-[480px]"
      data-figma-node={figmaNode}
      data-name="Section"
    >
      <SplitDisplayHeading
        className="w-full text-left [word-break:break-word] text-[var(--oczki-primary-800)]"
        emphasis={heading.emphasis}
        end={heading.end}
        id={headingId}
        start={heading.start}
      />

      <div className="flex w-full flex-col gap-2" data-name="Text Block">
        {paragraphs.map((paragraph) => (
          <p
            className="oczki-body-l tracking-[-0.24px] text-[var(--oczki-primary-700)]"
            key={paragraph.slice(0, 24)}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  )
}
