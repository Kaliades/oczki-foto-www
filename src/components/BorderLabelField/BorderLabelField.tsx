import type { InputHTMLAttributes } from 'react'

type BorderLabelFieldProps = {
  id: string
  label: string
  /** Background painted behind the notch label — must match the parent surface. */
  labelSurfaceClassName?: string
} & InputHTMLAttributes<HTMLInputElement>

/**
 * Figma `Input` (`7064:14438`–`14440`) — label sits on the top border line.
 */
export function BorderLabelField({
  id,
  label,
  labelSurfaceClassName = 'bg-[var(--oczki-secondary-600)]',
  className,
  ...inputProps
}: BorderLabelFieldProps) {
  return (
    <div className="flex w-full flex-col isolate items-start">
      <label
        className={`relative z-[2] -mb-[11px] px-1 py-0.5 oczki-body-s text-[var(--oczki-primary-100)] ${labelSurfaceClassName}`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`z-[1] h-[46px] w-full border border-[var(--oczki-secondary-200)] bg-transparent px-3 pb-[13px] pt-3 text-[var(--oczki-primary-100)] outline-none focus:border-[var(--oczki-primary-300)] ${className ?? ''}`}
        id={id}
        {...inputProps}
      />
    </div>
  )
}
