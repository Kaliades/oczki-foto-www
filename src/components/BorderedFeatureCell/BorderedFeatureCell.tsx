import { cn } from '@/utilities/ui'

import { BORDERED_FEATURE_CELL_LAYOUT } from './constants'

type BorderedFeatureCellProps = {
  density?: keyof typeof BORDERED_FEATURE_CELL_LAYOUT.density
  description: string
  figmaNode?: string
  showDivider?: boolean
  title: string
}

/**
 * Title + body copy cell with a bottom divider edge.
 *
 * Figma `Section` (`6998:26800` / `7092:4636` / `7093:6021`):
 *   <div Section> — border-b primary-300; p 20 px (desktop/tablet) / py 12 px (mobile compact)
 *     └── <div Section Container> — gap 6 px
 *         ├── title — body/l, primary-800
 *         └── description — body/m, primary-700
 */
export function BorderedFeatureCell({
  density = 'default',
  description,
  figmaNode,
  showDivider = true,
  title,
}: BorderedFeatureCellProps) {
  const paddingClassName = BORDERED_FEATURE_CELL_LAYOUT.density[density]

  return (
    <div
      className={cn(
        'flex w-full flex-col items-start',
        showDivider ? 'border-b border-[var(--oczki-primary-300)]' : undefined,
        paddingClassName,
      )}
      data-figma-node={figmaNode}
      data-name="Section"
    >
      <div
        className="flex w-full flex-col items-start gap-1.5 [word-break:break-word]"
        data-name="Section Container"
      >
        <p className="oczki-body-l w-full tracking-[-0.24px] text-[var(--oczki-primary-800)]">{title}</p>
        <p className="oczki-body-m w-full tracking-[-0.14px] text-[var(--oczki-primary-700)]">
          {description}
        </p>
      </div>
    </div>
  )
}
