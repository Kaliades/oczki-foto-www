import { cn } from '@/utilities/ui'
import Link from 'next/link'

import type { OczkiBreadcrumbsVariant } from './constants'

type OczkiBreadcrumbItemProps = {
  className?: string
  href?: string
  isCurrent?: boolean
  label: string
  variant?: OczkiBreadcrumbsVariant
}

const linkStyles: Record<OczkiBreadcrumbsVariant, string> = {
  default:
    'oczki-body-s-medium whitespace-nowrap text-[var(--oczki-primary-700)] transition-colors hover:text-[var(--oczki-primary-800)] tracking-[-0.12px]',
  onPhoto:
    'whitespace-nowrap text-[12px] font-bold leading-[1.7] tracking-[-0.12px] text-[var(--oczki-primary-800)] transition-colors hover:text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-body)]',
}

const currentStyles: Record<OczkiBreadcrumbsVariant, string> = {
  default: 'oczki-body-s whitespace-nowrap text-[var(--oczki-primary-600)] tracking-[-0.12px]',
  onPhoto:
    'whitespace-nowrap text-[12px] font-normal leading-[1.7] tracking-[-0.12px] text-[var(--oczki-primary-700)] [font-family:var(--font-oczki-body)]',
}

export function OczkiBreadcrumbItem({
  className,
  href,
  isCurrent = false,
  label,
  variant = 'default',
}: OczkiBreadcrumbItemProps) {
  if (isCurrent || !href) {
    return (
      <span
        aria-current={isCurrent ? 'page' : undefined}
        className={cn(currentStyles[variant], className)}
      >
        {label}
      </span>
    )
  }

  return (
    <Link className={cn(linkStyles[variant], className)} href={href}>
      {label}
    </Link>
  )
}
