type OfferStepDiamondProps = {
  /** Number printed inside the diamond — usually 1..5. */
  value: number
  /** Active step uses the rose palette; the rest use the muted primary one. */
  variant: 'active' | 'muted'
}

/**
 * Numbered diamond used as the step indicator in
 * "Kroki do realizacji oferty" (Figma 7105:7519 / 7105:7528).
 *
 * The shape is two stacked rotated squares: a 38×38 outline and a 30×30
 * fill, both rotated 45° inside a 54×54 box. The number text is centred
 * absolutely so the visual stays balanced regardless of variant.
 */
export const OfferStepDiamond = ({ value, variant }: OfferStepDiamondProps) => {
  const borderColor =
    variant === 'active' ? 'border-[var(--oczki-tertiary-700)]' : 'border-[var(--oczki-primary-300)]'
  const fillColor =
    variant === 'active' ? 'bg-[var(--oczki-tertiary-300)]' : 'bg-[var(--oczki-primary-200)]'
  const numberColor =
    variant === 'active' ? 'text-[var(--oczki-primary-800)]' : 'text-[var(--oczki-primary-600)]'

  return (
    <div aria-hidden="true" className="relative size-[54px] shrink-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`size-[38px] rotate-45 border border-solid ${borderColor}`} />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`size-[30px] rotate-45 ${fillColor}`} />
      </div>
      <span
        className={`oczki-body-l absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center ${numberColor}`}
      >
        {value}
      </span>
    </div>
  )
}
