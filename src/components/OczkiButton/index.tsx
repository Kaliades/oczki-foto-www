import { cn } from '@/utilities/ui'
import Link from 'next/link'
import type { ReactNode } from 'react'

function ButtonSide({ side }: { side: 'left' | 'right' }) {
  if (side === 'left') {
    return (
      <svg
        aria-hidden="true"
        className="h-11 w-[18px] shrink-0 overflow-visible text-[var(--oczki-primary-500)] transition-colors group-hover:text-[var(--oczki-primary-400)]"
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
      className="h-11 w-[18px] shrink-0 overflow-visible text-[var(--oczki-primary-500)] transition-colors group-hover:text-[var(--oczki-primary-400)]"
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

type OczkiButtonProps = {
  children: ReactNode
  className?: string
  href: string
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}

export function OczkiButton({
  children,
  className,
  href,
  onClick,
  variant = 'primary',
}: OczkiButtonProps) {
  if (variant === 'secondary') {
    return (
      <Link
        className={cn(
          'group inline-flex h-11 items-start justify-center pb-[10px] pt-[11px] text-[var(--oczki-primary-900)] transition-colors hover:text-[var(--oczki-primary-700)]',
          className,
        )}
        href={href}
        onClick={onClick}
      >
        <span className="flex flex-col items-start">
          <span className="flex items-start gap-1 pb-1">
            <span className="oczki-body-m whitespace-nowrap">{children}</span>
            <span className="flex w-[14px] shrink-0 flex-col items-start pt-[5px]">
              <span className="flex flex-col items-start px-[2px] py-[3px]">
                <svg
                  aria-hidden="true"
                  className="block h-[7.719px] w-[10.111px]"
                  fill="none"
                  viewBox="0 0 10.3522 7.71875"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 3.88889H10.1111M6.22222 7.71875C6.22222 6 10.1111 3.88889 10.1111 3.88889C10.1111 3.88889 6.22222 1.75 6.22222 0"
                    stroke="currentColor"
                    strokeLinejoin="bevel"
                  />
                </svg>
              </span>
            </span>
          </span>
          <span
            aria-hidden="true"
            className="block h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"
          />
        </span>
      </Link>
    )
  }

  return (
    <Link
      className={cn(
        'group inline-flex h-11 items-stretch justify-center gap-0 text-[var(--oczki-primary-900)]',
        className,
      )}
      href={href}
      onClick={onClick}
    >
      <ButtonSide side="left" />
      <span className="oczki-body-m-medium relative z-[1] -mx-px flex min-w-0 flex-1 items-start justify-center bg-[var(--oczki-primary-500)] px-1 pb-[10px] pt-[11px] transition-colors group-hover:bg-[var(--oczki-primary-400)]">
        {children}
      </span>
      <ButtonSide side="right" />
    </Link>
  )
}
