import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import type { FaqSectionHeading } from './constants'

type FaqSectionIntroProps = {
  heading: FaqSectionHeading
  intro: string
  headingId: string
  className?: string
}

/**
 * Left / top copy column — Figma `7100:6960` Header container.
 * gap-16 between display heading and body intro.
 */
export function FaqSectionIntro({
  heading,
  intro,
  headingId,
  className,
}: FaqSectionIntroProps) {
  return (
    <header className={className} data-figma-node="7100:6960" data-name="Header container">
      <div className="flex w-full flex-col items-start gap-4">
        <SplitDisplayHeading
          emphasis={heading.emphasis}
          emphasisPosition="start"
          id={headingId}
          start={heading.start}
        />
        <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-700)]">
          {intro}
        </p>
      </div>
    </header>
  )
}
