import type { TextareaHTMLAttributes } from 'react'

type BorderLabelTextareaProps = {
  id: string
  label: string
  labelSurfaceClassName?: string
  labelClassName?: string
  textareaClassName?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

/** Figma `Input` textarea variant (`7064:14499`) — 80 px tall field shell. */
export function BorderLabelTextarea({
  id,
  label,
  labelSurfaceClassName = 'bg-[var(--oczki-primary-100)]',
  labelClassName = 'text-[var(--oczki-primary-700)]',
  textareaClassName = 'text-[var(--oczki-primary-700)]',
  className,
  ...textareaProps
}: BorderLabelTextareaProps) {
  return (
    <div className="flex w-full flex-col isolate items-start">
      <label
        className={`relative z-[2] -mb-[11px] px-1 py-0.5 oczki-body-s ${labelClassName} ${labelSurfaceClassName}`}
        htmlFor={id}
      >
        {label}
      </label>
      <textarea
        className={`z-[1] h-20 w-full resize-none border border-[var(--oczki-secondary-200)] bg-transparent px-3 pb-[13px] pt-3 outline-none focus:border-[var(--oczki-primary-300)] ${textareaClassName} ${className ?? ''}`}
        id={id}
        {...textareaProps}
      />
    </div>
  )
}
