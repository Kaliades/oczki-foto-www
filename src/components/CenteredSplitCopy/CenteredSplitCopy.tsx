import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'
import { cn } from '@/utilities/ui'

import { CENTERED_SPLIT_COPY_FIGMA_NODES, type CenteredSplitCopyHeading } from './constants'

type CenteredSplitCopyProps = {
  body: string
  bodyClassName?: string
  containerClassName?: string
  emphasisPosition?: 'start' | 'end'
  figmaNodes?: {
    body?: string
    heading?: string
  }
  heading: CenteredSplitCopyHeading
  headingId: string
}

/**
 * Responsive centred display heading + body — Figma `Heading` pattern.
 *
 * <div Heading>
 * ├── <h2 Subheading> — regular + italic spans, 32 px
 * └── <p Text> — body/l; 442 px max with 36 px inset on tablet+
 *
 * Breakpoints: mobile gap 8 / full width; tablet+ gap 16 / 514 px heading width.
 */
export function CenteredSplitCopy({
  body,
  bodyClassName,
  containerClassName,
  emphasisPosition,
  figmaNodes,
  heading,
  headingId,
}: CenteredSplitCopyProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-2 text-center [word-break:break-word] md:w-[514px] md:gap-4',
        containerClassName,
      )}
      data-figma-node={figmaNodes?.heading ?? CENTERED_SPLIT_COPY_FIGMA_NODES.heading.desktop}
      data-name="Heading"
    >
      <SplitDisplayHeading
        className="w-full text-[var(--oczki-primary-800)]"
        emphasis={heading.emphasis}
        emphasisPosition={emphasisPosition}
        end={heading.end}
        id={headingId}
        start={heading.start}
      />

      <p
        className={cn(
          'oczki-body-l w-full shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-700)] md:max-w-[442px] md:px-9',
          bodyClassName,
        )}
        data-figma-node={figmaNodes?.body ?? CENTERED_SPLIT_COPY_FIGMA_NODES.body.desktop}
      >
        {body}
      </p>
    </div>
  )
}
