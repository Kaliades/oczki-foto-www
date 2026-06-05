import { cn } from '@/utilities/ui'

/** One display line in a stacked split heading — Figma `Subheading` line boxes. */
export type SplitDisplayHeadingLine =
  | { kind: 'plain'; text: string }
  | { kind: 'emphasis'; emphasis: string }
  | { kind: 'regular-emphasis'; emphasis: string; regular: string }

type SplitDisplayHeadingProps = {
  start: string
  emphasis: string
  /** Optional trailing regular run after the emphasis span (e.g. gallery CTA heading). */
  end?: string
  id?: string
  className?: string
  /** Figma `header/m` scale — pass `""` to fall back to `oczki-heading-l` on inline runs. */
  sizeClassName?: string
  /** Whether the italic emphasis run leads or trails the regular run. */
  emphasisPosition?: 'start' | 'end'
  /** Override default `leading-[1.04]` on each text run (e.g. tighter wrap rhythm). */
  runLeadingClassName?: string
  /** Semantic level — page heroes use `h1`. */
  as?: 'h1' | 'h2'
  /**
   * Explicit stacked lines — use when font substitution (Cormorant vs The Seasons)
   * or sibling inline runs would drift from Figma line boxes.
   */
  displayLines?: readonly SplitDisplayHeadingLine[]
}

function resolveTypographyClassName(sizeClassName: string | undefined): string {
  if (sizeClassName === undefined) {
    return 'text-[32px] tracking-[-0.32px]'
  }

  if (sizeClassName === '') {
    return 'oczki-heading-l'
  }

  return sizeClassName
}

function EmphasisRun({ text }: { text: string }) {
  return (
    <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
      {text}
    </em>
  )
}

function renderDisplayLine(line: SplitDisplayHeadingLine) {
  switch (line.kind) {
    case 'plain':
      return line.text
    case 'emphasis':
      return <EmphasisRun text={line.emphasis} />
    case 'regular-emphasis':
      return (
        <>
          {line.regular}
          <EmphasisRun text={line.emphasis} />
        </>
      )
  }
}

/**
 * Display heading with a roman lead-in and italic emphasis run (The Seasons).
 *
 * Default: single inline flow (`leading-[0]` shell + one span with nested `<em>`).
 * With `displayLines`: stacked block lines matching Figma bbox per breakpoint.
 */
export function SplitDisplayHeading({
  start,
  emphasis,
  end,
  id,
  className,
  sizeClassName,
  emphasisPosition = 'end',
  as: HeadingTag = 'h2',
  displayLines,
  runLeadingClassName,
}: SplitDisplayHeadingProps) {
  const runClassName = cn(
    runLeadingClassName ?? 'leading-[1.04]',
    resolveTypographyClassName(sizeClassName),
  )

  const shellClassName = cn(
    'w-full font-normal leading-[0] text-[0px] text-[var(--oczki-primary-800)]',
    '[font-family:var(--font-oczki-display)] [font-feature-settings:"lnum"_1,"pnum"_1]',
    className,
  )

  if (displayLines) {
    return (
      <HeadingTag
        className={cn(
          'flex w-full flex-col items-center gap-0 font-normal text-[var(--oczki-primary-800)]',
          '[font-family:var(--font-oczki-display)] [font-feature-settings:"lnum"_1,"pnum"_1]',
          className,
        )}
        id={id}
      >
        {displayLines.map((line, index) => (
          <span className={cn(runClassName, 'block')} key={index}>
            {renderDisplayLine(line)}
          </span>
        ))}
      </HeadingTag>
    )
  }

  return (
    <HeadingTag className={shellClassName} id={id}>
      <span className={cn(runClassName, 'inline')}>
        {emphasisPosition === 'start' ? (
          <>
            <EmphasisRun text={emphasis} />
            {start}
            {end}
          </>
        ) : (
          <>
            {start}
            <EmphasisRun text={emphasis} />
            {end}
          </>
        )}
      </span>
    </HeadingTag>
  )
}

export type { SplitDisplayHeadingProps }
