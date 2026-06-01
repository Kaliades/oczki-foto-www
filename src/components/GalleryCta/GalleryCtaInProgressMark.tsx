/**
 * Temporary marker while the gallery CTA decorative frame is incomplete.
 *
 * TODO(galeria/cta): Delete this file and drop usage from GalleryCta once
 * Figma mobile frame `7104:19441` ships and tablet/desktop frames are signed off.
 */
export function GalleryCtaInProgressMark() {
  return (
    <p
      aria-label="Sekcja w przygotowaniu"
      className="pointer-events-none absolute right-4 bottom-4 z-20 rounded-full border border-[var(--oczki-primary-700)]/12 bg-[var(--oczki-primary-100)]/50 px-2.5 py-1 text-[11px] leading-none tracking-[0.02em] text-[var(--oczki-primary-700)]/50 md:right-6 md:bottom-5 lg:right-8 lg:bottom-6"
    >
      W przygotowaniu
    </p>
  )
}
