import { cn } from '@/utilities/ui'

type SplitDisplayHeadingProps = {
  start: string
  emphasis: string
  id?: string
  className?: string
  /** Figma `header/m` at 32 px on this section; override when another scale is needed. */
  sizeClassName?: string
}

/**
 * Display heading with a roman lead-in and italic emphasis run (The Seasons).
 * Reusable anywhere Figma splits the H2 across regular + italic spans.
 */
export function SplitDisplayHeading({
  start,
  emphasis,
  id,
  className,
  sizeClassName = 'text-[32px]',
}: SplitDisplayHeadingProps) {
  return (
    <h2
      className={cn(
        'w-full font-normal leading-[1.04] tracking-[-0.02em] text-[var(--oczki-primary-800)]',
        '[font-family:var(--font-oczki-display)] [font-feature-settings:"lnum"_1,"pnum"_1]',
        sizeClassName,
        className,
      )}
      id={id}
    >
      {start}
      <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
        {emphasis}
      </em>
    </h2>
  )
}
