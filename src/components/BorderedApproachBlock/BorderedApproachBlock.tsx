import { RotatedBotanicalOrnament } from '@/components/RotatedBotanicalOrnament'
import { cn } from '@/utilities/ui'

type BorderedApproachBlockLayout = 'bookend' | 'stacked'

type BorderedApproachBlockProps = {
  description: string
  figmaNode?: string
  layout: BorderedApproachBlockLayout
  stretchContent?: boolean
  title: string
  widthClassName?: string
}

/**
 * Bordered approach copy card — Figma `Block`.
 *
 * Desktop (`6986:20149`): p 24, h 442; bookend or gap 128 — from 1366 px viewport.
 * Tablet (`7100:7855`): 300×426, p 16, justify-between — also 768–1365 px.
 * Mobile (`7102:9526`): full width, pt 12 pb 16 px 16, gap 48 title→copy.
 */
export function BorderedApproachBlock({
  description,
  figmaNode,
  layout,
  stretchContent = false,
  title,
  widthClassName,
}: BorderedApproachBlockProps) {
  const contentWidthClass = stretchContent ? 'w-full' : 'w-full min-[1366px]:max-w-[298px]'

  const spacingClass =
    layout === 'bookend'
      ? 'gap-12 md:justify-between md:gap-0 min-[1366px]:justify-between min-[1366px]:gap-0'
      : 'gap-12 md:justify-between md:gap-0 min-[1366px]:justify-start min-[1366px]:gap-32'

  return (
    <article
      className={cn(
        'flex w-full shrink-0 flex-col border border-[var(--oczki-primary-300)]',
        'px-4 pt-3 pb-4 md:h-[426px] md:w-[300px] md:p-4 min-[1366px]:h-[442px] min-[1366px]:p-6',
        spacingClass,
        widthClassName,
      )}
      data-figma-node={figmaNode}
      data-name="Block"
    >
      <h3
        className={cn(
          'oczki-body-xl w-full shrink-0 self-center text-center tracking-[-0.3px] text-[var(--oczki-primary-800)]',
          contentWidthClass,
        )}
      >
        {title}
      </h3>

      <div
        className={cn('flex shrink-0 flex-col items-center gap-5 self-center', contentWidthClass)}
        data-name="Text Block"
      >
        <RotatedBotanicalOrnament />
        <p className="oczki-body-l w-full text-center tracking-[-0.24px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>
    </article>
  )
}
