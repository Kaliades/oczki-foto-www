import type { CSSProperties } from 'react'

type StepBacksplashProps = {
  /** Rotation in degrees applied to the whole backsplash. */
  rotation: number
  /** Optional className for sizing/positioning overrides. */
  className?: string
}

/**
 * Decorative striped backsplash that sits behind a process-step foreground card.
 *
 * The vertical stripes from Figma (32 alternating 43 px columns) are recreated
 * with a single `repeating-linear-gradient` instead of 32 DOM nodes — same look,
 * dramatically less markup.
 *
 * Shorter than the cream card on purpose (~88 % of its height, centred) so the
 * green peek reads as a mat behind the text block, not a full-height panel.
 * The visible offset also comes from the rotation difference between layers.
 */
export const StepBacksplash = ({ rotation, className }: StepBacksplashProps) => {
  const style: CSSProperties = {
    transform: `rotate(${rotation}deg)`,
    background: `repeating-linear-gradient(
      to right,
      var(--oczki-secondary-600) 0 43px,
      var(--oczki-secondary-700) 43px 86px
    )`,
    boxShadow:
      '1px 4px 5.8px rgba(53, 39, 25, 0.2), 6px 11px 13.3px rgba(53, 39, 25, 0.12)',
  }

  return (
    <div
      aria-hidden="true"
      className={[
        'absolute inset-x-0 top-1/2 h-[88%] -translate-y-1/2 origin-center overflow-hidden',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    />
  )
}
