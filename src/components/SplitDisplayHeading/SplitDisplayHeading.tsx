import { cn } from '@/utilities/ui'

type SplitDisplayHeadingProps = {
  start: string
  emphasis: string
  /** Optional trailing regular run after the emphasis span (e.g. gallery CTA heading). */
  end?: string
  id?: string
  className?: string
  /** Figma `header/m` at 32 px on this section; override when another scale is needed. */
  sizeClassName?: string
  /** Whether the italic emphasis run leads or trails the regular run. */
  emphasisPosition?: 'start' | 'end'
}

/**
 * Display heading with a roman lead-in and italic emphasis run (The Seasons).
 * Reusable anywhere Figma splits the H2 across regular + italic spans.
 */
export function SplitDisplayHeading({
  start,
  emphasis,
  end,
  id,
  className,
  sizeClassName = 'text-[32px]',
  emphasisPosition = 'end',
}: SplitDisplayHeadingProps) {
  const emphasisEl = (
    <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
      {emphasis}
    </em>
  )

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
      {emphasisPosition === 'start' ? (
        <>
          {emphasisEl}
          {start}
          {end}
        </>
      ) : (
        <>
          {start}
          {emphasisEl}
          {end}
        </>
      )}
    </h2>
  )
}
