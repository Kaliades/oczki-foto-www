import { cn } from '@/utilities/ui'

import { PERFORATED_SCALLOP_CIRCLE } from './constants'

type ScallopCircleProps = {
  className?: string
}

/** Single perforation disc — Figma `Ellipse 52` (`7001:2104`). */
export function ScallopCircle({ className }: ScallopCircleProps) {
  const { asset, sizePx } = PERFORATED_SCALLOP_CIRCLE

  return (
    <div
      className={cn('relative shrink-0', className)}
      style={{ height: sizePx, width: sizePx }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="block max-w-none"
        height={sizePx}
        src={asset}
        style={{ height: sizePx, width: sizePx }}
        width={sizePx}
      />
    </div>
  )
}
