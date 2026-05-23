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
 * Sized to match the foreground card (`inset-0`); the visible "peek" comes from
 * the rotation difference between the two layers, not from a size offset.
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
        'absolute inset-0 origin-center overflow-hidden rounded-[4px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    />
  )
}
