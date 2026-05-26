type OczkiNavbarMenuButtonProps = {
  onClick?: () => void
}

export function OczkiNavbarMenuButton({ onClick }: OczkiNavbarMenuButtonProps) {
  return (
    <button
      aria-label="Otwórz menu"
      className="flex size-11 items-center justify-center text-[var(--oczki-primary-900)] md:hidden"
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
