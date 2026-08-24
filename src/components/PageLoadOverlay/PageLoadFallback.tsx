import { cn } from '@/utilities/ui'

type PageLoadFallbackProps = {
  className?: string
  /** Taller for full-route `loading.tsx`; shorter for inline sections. */
  compact?: boolean
}

/** Server-safe branded spinner — used by route `loading.tsx`. */
export function PageLoadFallback({ className, compact = false }: PageLoadFallbackProps) {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={cn(
        'flex w-full items-center justify-center bg-[var(--oczki-primary-100)]',
        compact ? 'min-h-[40vh]' : 'min-h-[70vh]',
        className,
      )}
      role="status"
    >
      <span className="sr-only">Ładowanie</span>
      <span
        aria-hidden
        className="size-9 animate-spin rounded-full border-2 border-[var(--oczki-primary-300)] border-t-[var(--oczki-primary-700)]"
      />
    </div>
  )
}
