import { cn } from '@/utilities/ui'

type BorderedPrincipleCellProps = {
  description: string
  figmaNode?: string
  isLast: boolean
  title: string
  widthClassName?: string
}

/**
 * Title + body copy cell with a responsive divider edge.
 *
 * Figma `Container` (`7001:2520`):
 *   <div Container> — p 16 px; gap 10 px between title and body
 *     ├── <p Subtitle> — body/l, primary-800
 *     └── <p Text> — body/m, primary-700
 *
 * Tablet/mobile (`7092:4353`): border-b + px 64 py 16.
 * Desktop (`7001:2520`): border-r on first two columns; last column has no border.
 */
export function BorderedPrincipleCell({
  description,
  figmaNode,
  isLast,
  title,
  widthClassName,
}: BorderedPrincipleCellProps) {
  return (
    <div
      className={cn(
        'flex w-full shrink-0 flex-col items-start gap-2 py-4 md:gap-2.5 md:px-16 md:py-4 lg:p-4',
        !isLast && 'border-b border-[var(--oczki-primary-300)] lg:border-b-0 lg:border-r',
        widthClassName,
      )}
      data-figma-node={figmaNode}
      data-name="Container"
    >
      <p className="oczki-body-l w-full shrink-0 tracking-[-0.24px] text-[var(--oczki-primary-800)]">{title}</p>
      <p className="oczki-body-m w-full shrink-0 tracking-[-0.14px] text-[var(--oczki-primary-700)]">
        {description}
      </p>
    </div>
  )
}
