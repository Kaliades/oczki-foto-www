type CookieConsentToggleProps = {
  checked: boolean
  disabled?: boolean
  id: string
  label: string
  onCheckedChange: (checked: boolean) => void
}

/**
 * Accessible switch for cookie category rows — 44 px hit target, brand tokens.
 */
export function CookieConsentToggle({
  checked,
  disabled = false,
  id,
  label,
  onCheckedChange,
}: CookieConsentToggleProps) {
  return (
    <button
      aria-checked={checked}
      aria-label={label}
      className="flex size-11 shrink-0 items-center justify-center disabled:cursor-not-allowed"
      disabled={disabled}
      id={id}
      onClick={() => onCheckedChange(!checked)}
      role="switch"
      type="button"
    >
      <span
        aria-hidden="true"
        className={`relative h-[26px] w-[44px] rounded-full border transition-colors ${
          disabled
            ? 'border-[var(--oczki-secondary-200)] bg-[var(--oczki-primary-200)]'
            : checked
              ? 'border-[var(--oczki-primary-300)] bg-[var(--oczki-primary-300)]'
              : 'border-[var(--oczki-secondary-200)] bg-transparent'
        }`}
      >
        <span
          className={`absolute top-1/2 size-[18px] -translate-y-1/2 rounded-full bg-[var(--oczki-primary-100)] transition-[left] ${
            checked ? 'left-[22px]' : 'left-[4px]'
          }`}
        />
      </span>
    </button>
  )
}
