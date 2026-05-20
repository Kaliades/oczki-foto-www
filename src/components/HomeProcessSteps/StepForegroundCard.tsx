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
      className="relative flex flex-col items-end justify-center gap-[14px] bg-[var(--oczki-primary-200)] p-5 shadow-[1px_4px_2.9px_rgba(53,39,25,0.16),6px_11px_6.65px_rgba(53,39,25,0.08)]"
      style={style}
    >
      <div className="flex w-full flex-col gap-2 leading-[1.48]">
        <h3 className="font-oczki-body text-[20px] tracking-[-0.3px] text-[var(--oczki-primary-800)]">
          {title}
        </h3>
        <div className="flex flex-col gap-1 text-[14px] tracking-[-0.14px] text-[var(--oczki-primary-700)]">
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Image
        src={ornamentSrc}
        alt=""
        width={64}
        height={36}
        aria-hidden="true"
        className="pointer-events-none h-[36px] w-[64px] select-none opacity-90"
      />
    </article>
  )
}
