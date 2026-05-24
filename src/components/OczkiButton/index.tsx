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
  variant?: 'primary' | 'secondary'
}

export function OczkiButton({
  children,
  className,
  href,
  variant = 'primary',
}: OczkiButtonProps) {
  if (variant === 'secondary') {
    return (
      <Link
        className={cn(
          'oczki-body-m group inline-flex h-11 items-center justify-center gap-1 text-[var(--oczki-primary-900)] transition-colors hover:text-[var(--oczki-primary-700)]',
          className,
        )}
        href={href}
      >
        <span className="border-b border-transparent pb-1 transition-colors group-hover:border-current">
          {children}
        </span>
        <span aria-hidden="true" className="pb-1">
          {'->'}
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
    >
      <ButtonSide side="left" />
      <span className="oczki-body-m-medium relative z-[1] -mx-px flex min-w-0 flex-1 items-center justify-center bg-[var(--oczki-primary-500)] px-1 transition-colors group-hover:bg-[var(--oczki-primary-400)]">
        {children}
      </span>
      <ButtonSide side="right" />
    </Link>
  )
}
