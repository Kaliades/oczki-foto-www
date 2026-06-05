type OczkiNavbarMenuButtonProps = {
  onClick?: () => void
}

/**
 * Mobile menu trigger — Figma `7093:5558` (360×60 shell, 44px touch target).
 * Three 1px lines in a 20×12px icon box, centred inside `size-11`.
 */
export function OczkiNavbarMenuButton({ onClick }: OczkiNavbarMenuButtonProps) {
  return (
    <button
      aria-label="Otwórz menu"
      className="flex size-11 shrink-0 items-center justify-center text-[var(--oczki-primary-900)] md:hidden"
      data-name="Menu button"
      onClick={onClick}
      type="button"
    >
      <span className="relative block h-3 w-5">
        <span className="absolute left-0 top-0 h-px w-full bg-current" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
        <span className="absolute bottom-0 left-0 h-px w-full bg-current" />
      </span>
    </button>
  )
}
