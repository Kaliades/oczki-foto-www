/**
 * Highlight label on a package panel — Figma `Badge container` (`6989:25446`).
 *
 * Outer: 2 px padding, tertiary/300 border.
 * Inner: tertiary/500 fill, 8×4 px padding, body/m.
 */
export function PackageBadge({ label }: { label: string }) {
  return (
    <div
      className="w-[156px] shrink-0 border border-[var(--oczki-tertiary-300)] p-0.5"
      data-name="Badge container"
    >
      <div
        className="flex w-full items-center justify-center bg-[var(--oczki-tertiary-500)] px-2 py-1"
        data-name="Badge text container"
      >
        <span className="oczki-body-m whitespace-nowrap text-[var(--oczki-primary-900)]">
          {label}
        </span>
      </div>
    </div>
  )
}
