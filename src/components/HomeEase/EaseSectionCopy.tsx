import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import type { HomeEaseData } from './constants'

type EaseSectionCopyProps = {
  heading: HomeEaseData['heading']
  body: string
  headingId?: string
  className?: string
}

/**
 * Right-hand copy column on desktop; first block on tablet/mobile.
 * Figma `6912:13188` / `7104:18226` / `7104:19342`.
 */
export function EaseSectionCopy({
  heading,
  body,
  headingId = 'home-ease-heading',
  className,
}: EaseSectionCopyProps) {
  return (
    <div
      className={className}
      data-figma-node="6912:13188"
    >
      <div className="flex w-full flex-col items-start gap-2.5 md:max-w-[412px] md:gap-3 lg:w-[460px] lg:gap-5">
        <SplitDisplayHeading
          emphasis={heading.emphasis}
          id={headingId}
          start={heading.start}
        />
        <p className="oczki-body-l w-full text-[var(--oczki-primary-700)]">{body}</p>
      </div>
    </div>
  )
}
