/**
 * Temporary marker while the ease section visual cluster is incomplete.
 *
 * TODO(galeria/ease): Delete this file and drop usage from HomeEase once
 * DecorFlowerBranch (`6952:19970`) and ScallopedHandwrittenBadge (`6952:19954`) ship.
 */
export function EaseInProgressMark() {
  return (
    <p
      aria-label="Sekcja w przygotowaniu"
      className="pointer-events-none absolute right-4 bottom-4 z-20 rounded-full border border-[var(--oczki-primary-700)]/12 bg-[var(--oczki-primary-100)]/50 px-2.5 py-1 text-[11px] leading-none tracking-[0.02em] text-[var(--oczki-primary-700)]/50 md:right-6 md:bottom-5 lg:right-8 lg:bottom-6"
    >
      W przygotowaniu
    </p>
  )
}
