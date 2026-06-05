import { TickIcon } from '@/components/TickIcon'
import { cn } from '@/utilities/ui'

import type { ChecklistFeatureCardTilt } from './constants'

type ChecklistFeatureCardProps = {
  description: string
  figmaNode?: string
  tilt?: ChecklistFeatureCardTilt
  title: string
}

/**
 * Dashed-border checklist row — Figma `Checklist Container` inside `Text Block Container`.
 *
 * Hierarchy:
 *   [optional tilt shell]
 *   └── outer mat (`p-[6px]`, primary-100)
 *       └── dashed frame (`border-dashed`, inner padding)
 *           └── row (`gap-[8px]`)
 *               ├── tick (`24px` container, `pt-px`)
 *               └── text group (`gap-[6px]` desktop / `gap-[4px]` mobile)
 */
export function ChecklistFeatureCard({ description, figmaNode, tilt, title }: ChecklistFeatureCardProps) {
  const card = (
    <div className="w-full bg-[var(--oczki-primary-100)] p-1.5" data-name="Text Block Container">
      <div
        className={cn(
          'flex w-full flex-col items-start border border-dashed border-[var(--oczki-secondary-200)]',
          'bg-[var(--oczki-primary-100)] px-2.5 pt-2.5 pb-3 md:px-3 md:pt-3 md:pr-4 md:pb-4',
        )}
        data-name="Text Block Container"
      >
        <div className="flex w-full items-start gap-2" data-name="Checklist Container">
          <TickIcon variant="checklist" />
          <div
            className="flex min-w-0 flex-1 flex-col items-start gap-1 md:gap-1.5"
            data-name="Text Group"
          >
            <p className="w-full text-[16px] font-normal leading-[1.48] tracking-[-0.24px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-body)] md:text-[20px] md:tracking-[-0.3px]">
              {title}
            </p>
            <p className="w-full text-[14px] font-normal leading-[1.48] tracking-[-0.14px] text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-body)] md:text-[16px] md:tracking-[-0.24px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )

  if (!tilt) {
    return (
      <div className="w-full" data-figma-node={figmaNode} data-name="Text Block Container">
        {card}
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center" data-figma-node={figmaNode} data-name="Text Block Container">
      <div className="w-full" style={{ transform: `rotate(${tilt.degrees}deg)` }}>
        {card}
      </div>
    </div>
  )
}
