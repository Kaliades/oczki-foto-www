import Image from 'next/image'
import type { CSSProperties } from 'react'

type StepForegroundCardProps = {
  title: string
  paragraphs: readonly [string, string]
  ornamentSrc: string
  /** Rotation in degrees applied to the whole card. */
  rotation: number
}

/**
 * Beige foreground card with title, two paragraphs and a botanical ornament
 * tucked into the bottom-right corner. Used as the front layer in
 * `ProcessStepCard`.
 *
 * The botanical ornament SVG is natively portrait (35.26 × 64 in Figma) and
 * sits inside a landscape 64 × 36 slot rotated by -89.89° — that's how the
 * source composes it so it visually reads as a horizontal sprig.
 */
export const StepForegroundCard = ({
  title,
  paragraphs,
  ornamentSrc,
  rotation,
}: StepForegroundCardProps) => {
  const style: CSSProperties = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <article
      className="relative flex flex-col items-end justify-center gap-[14px] rounded-[4px] bg-[var(--oczki-primary-200)] p-5 shadow-[1px_4px_2.9px_rgba(53,39,25,0.16),6px_11px_6.65px_rgba(53,39,25,0.08)]"
      style={style}
    >
      <div className="flex w-full flex-col gap-2 leading-[1.48]">
        <h3 className="oczki-body-xl tracking-[-0.3px] text-[var(--oczki-primary-800)]">
          {title}
        </h3>
        <div className="oczki-body-m flex flex-col gap-1 tracking-[-0.14px] text-[var(--oczki-primary-700)]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="flex h-[36px] w-[64px] items-center justify-center">
        <div className="-rotate-[89.89deg]">
          <Image
            src={ornamentSrc}
            alt=""
            width={35}
            height={64}
            aria-hidden="true"
            className="pointer-events-none h-[64px] w-[35px] select-none"
          />
        </div>
      </div>
    </article>
  )
}
