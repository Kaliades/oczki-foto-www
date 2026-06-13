import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ScallopedButtonProps = {
  children: ReactNode
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

function ScallopSide({ side }: { side: 'left' | 'right' }) {
  if (side === 'left') {
    return (
      <svg
        aria-hidden="true"
        className="h-11 w-[18px] shrink-0 text-[var(--oczki-primary-500)]"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 18 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 44H10C10 38.4772 5.52285 34 0 34V10C5.52285 10 10 5.52285 10 0H18V44Z"
          fill="currentColor"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      className="h-11 w-[18px] shrink-0 text-[var(--oczki-primary-500)]"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 18 44"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C8 5.52285 12.4772 10 18 10V34C12.4772 34 8 38.4772 8 44H0V0H8Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Figma `Button` (`7063:14172`–`14178`) — primary/500 fill with scalloped ends. */
export function ScallopedButton({
  children,
  className,
  fullWidth = false,
  type = 'button',
  ...buttonProps
}: ScallopedButtonProps) {
  return (
    <button
      className={`inline-flex h-11 items-stretch justify-center text-[var(--oczki-primary-900)] ${fullWidth ? 'w-full' : 'w-auto'} ${className ?? ''}`}
      type={type}
      {...buttonProps}
    >
      <ScallopSide side="left" />
      <span
        className={`oczki-body-m-medium flex items-center justify-center bg-[var(--oczki-primary-500)] px-1 ${fullWidth ? 'min-w-0 flex-1' : 'flex-none'}`}
      >
        {children}
      </span>
      <ScallopSide side="right" />
    </button>
  )
}
