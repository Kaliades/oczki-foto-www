import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { cn } from '@/utilities/ui'

import type { LeftAlignedIntroCopyHeading } from './constants'

type LeftAlignedIntroCopyProps = {
  body: string
  bodyClassName?: string
  figmaNodes?: {
    body?: string
    heading?: string
    section?: string
  }
  heading: LeftAlignedIntroCopyHeading
  headingId: string
}

/**
 * Left-aligned display heading + lead paragraph — Figma `Section container`.
 *
 * <div Section container> — gap 10 px mobile / 16 px tablet+
 * ├── <h2 Title> — header/l, italic emphasis leads
 * └── <p Text> — body/l, primary-700
 */
export function LeftAlignedIntroCopy({
  body,
  bodyClassName,
  figmaNodes,
  heading,
  headingId,
}: LeftAlignedIntroCopyProps) {
  return (
    <div
      className="flex w-full flex-col items-start gap-2.5 [word-break:break-word] md:gap-4"
      data-figma-node={figmaNodes?.section}
      data-name="Section container"
    >
      <SplitDisplayHeading
        className="w-full text-left text-[var(--oczki-primary-800)]"
        emphasis={heading.emphasis}
        emphasisPosition="start"
        end={heading.end}
        id={headingId}
        sizeClassName="text-[36px] tracking-[-0.36px]"
        start={heading.start ?? ''}
      />

      <p
        className={cn(
          'oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]',
          bodyClassName,
        )}
        data-figma-node={figmaNodes?.body}
      >
        {body}
      </p>
    </div>
  )
}
