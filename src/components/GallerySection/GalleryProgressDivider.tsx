type GalleryProgressDividerProps = {
  /** Fill amount 0–100, mapped to `scaleX` so only the indicator animates. */
  fillPercent?: number
}

/**
 * Bottom progress track from Figma. The fill uses `transform: scaleX` so
 * width changes never participate in document layout (no vertical jank
 * for siblings below the gallery block).
 */
export function GalleryProgressDivider({ fillPercent = 20 }: GalleryProgressDividerProps) {
  const scale = Math.max(0, Math.min(fillPercent, 100)) / 100

  return (
    <div
      aria-hidden="true"
      className="h-1 w-full overflow-hidden bg-[var(--oczki-primary-200)]"
      role="presentation"
    >
      <div
        className="h-full w-full origin-left bg-[var(--oczki-secondary-600)] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `scaleX(${scale})` }}
      />
    </div>
  )
}
