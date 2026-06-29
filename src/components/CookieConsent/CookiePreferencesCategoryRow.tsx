import type { CookieCategoryCopy } from './constants'
import { CookieConsentToggle } from './CookieConsentToggle'

type CookiePreferencesCategoryRowProps = {
  categoryId: string
  copy: CookieCategoryCopy
  checked: boolean
  disabled?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function CookiePreferencesCategoryRow({
  categoryId,
  copy,
  checked,
  disabled = false,
  onCheckedChange,
}: CookiePreferencesCategoryRowProps) {
  const toggleId = `cookie-category-${categoryId}`

  return (
    <div
      className="flex w-full items-start justify-between gap-4 border-t border-[var(--oczki-primary-200)] pt-4 first:border-t-0 first:pt-0"
      data-name="Category row"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <label
          className="oczki-body-m-medium text-[var(--oczki-primary-800)]"
          htmlFor={toggleId}
        >
          {copy.title}
        </label>
        <p className="oczki-body-m text-[var(--oczki-primary-700)]">{copy.description}</p>
      </div>

      <CookieConsentToggle
        checked={checked}
        disabled={disabled}
        id={toggleId}
        label={copy.title}
        onCheckedChange={onCheckedChange ?? (() => undefined)}
      />
    </div>
  )
}
