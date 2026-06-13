type OczkiNumberDiamondProps = {
  value: number | string
  /** Rose tertiary palette — default for legal / process emphasis rows. */
  variant?: 'tertiary' | 'muted'
  /** Compact 32/24 squares in a 44 px hit target; standard matches offer process steps. */
  size?: 'compact' | 'standard'
}

/**
 * Numbered diamond indicator — Figma `Step Number Container`.
 *
 * Compact (`7106:15552` / privacy policy): 32×32 outline + 24×24 fill inside 44 px
 * box with 54 px decorative overflow. Standard (`7105:7519`): 38×38 + 30×30 in 54 px.
 */
export function OczkiNumberDiamond({
  value,
  variant = 'tertiary',
  size = 'compact',
}: OczkiNumberDiamondProps) {
  const isTertiary = variant === 'tertiary'
  const borderColor = isTertiary
    ? 'border-[var(--oczki-tertiary-700)]'
    : 'border-[var(--oczki-primary-300)]'
  const fillColor = isTertiary ? 'bg-[var(--oczki-tertiary-300)]' : 'bg-[var(--oczki-primary-200)]'
  const numberColor = isTertiary ? 'text-[var(--oczki-primary-800)]' : 'text-[var(--oczki-primary-600)]'

  if (size === 'standard') {
    return (
      <div aria-hidden="true" className="relative size-[54px] shrink-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`size-[38px] rotate-45 border border-solid ${borderColor}`} />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`size-[30px] rotate-45 ${fillColor}`} />
        </div>
        <span
          className={`oczki-body-l absolute left-1/2 top-1/2 w-5 -translate-x-1/2 -translate-y-1/2 text-center ${numberColor}`}
        >
          {value}
        </span>
      </div>
    )
  }

  return (
    <div aria-hidden="true" className="relative size-11 shrink-0">
      <span
        className={`oczki-body-m absolute left-1/2 top-1/2 z-[2] w-5 -translate-x-1/2 -translate-y-1/2 text-center ${numberColor}`}
      >
        {value}
      </span>
      <div className="absolute -left-[5px] -top-[5px] z-[1] flex size-[54px] items-center justify-center">
        <div className="flex size-[45.255px] items-center justify-center">
          <div className={`size-8 rotate-45 border border-solid ${borderColor}`} />
        </div>
        <div className="absolute left-1/2 top-1/2 flex size-[33.941px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <div className={`size-6 rotate-45 ${fillColor}`} />
        </div>
      </div>
    </div>
  )
}
