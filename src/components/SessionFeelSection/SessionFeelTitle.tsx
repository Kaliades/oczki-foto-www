import type { CenteredSplitCopyTitleProps } from '@/components/CenteredSplitCopy/CenteredSplitCopy'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

/** Display H2 — Figma `Title` (`6972:15549`): header/l, primary/900. */
export function SessionFeelTitle({ emphasis, headingId }: CenteredSplitCopyTitleProps) {
  return (
    <SplitDisplayHeading
      className="w-full text-[var(--oczki-primary-900)]"
      emphasis={emphasis}
      emphasisPosition="end"
      id={headingId}
      sizeClassName=""
      start="Sesja jak "
    />
  )
}
