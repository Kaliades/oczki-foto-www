import { cn } from '@/utilities/ui'
import Link from 'next/link'

type OczkiBreadcrumbItemProps = {
  className?: string
  href?: string
  isCurrent?: boolean
  label: string
}

const breadcrumbTextClass = 'tracking-[-0.12px]'

export function OczkiBreadcrumbItem({
  className,
  href,
  isCurrent = false,
  label,
}: OczkiBreadcrumbItemProps) {
  if (isCurrent || !href) {
    return (
      <span
        aria-current={isCurrent ? 'page' : undefined}
        className={cn(
          'oczki-body-s whitespace-nowrap text-[var(--oczki-primary-600)]',
          breadcrumbTextClass,
          className,
        )}
      >
        {label}
      </span>
    )
  }

  return (
    <Link
      className={cn(
        'oczki-body-s-medium whitespace-nowrap text-[var(--oczki-primary-700)] transition-colors hover:text-[var(--oczki-primary-800)]',
        breadcrumbTextClass,
        className,
      )}
      href={href}
    >
      {label}
    </Link>
  )
}
