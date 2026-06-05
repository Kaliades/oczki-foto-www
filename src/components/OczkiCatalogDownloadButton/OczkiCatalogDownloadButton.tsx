import { cn } from '@/utilities/ui'
import Link from 'next/link'

type OczkiCatalogDownloadButtonProps = {
  children: string
  className?: string
  href: string
}

/**
 * Catalog download control — Figma `Download container` + secondary `Button`.
 *
 * Outer shell: primary/200, h 44, px 12.
 * Inner link: body/m label + download icon, hover underline.
 */
export function OczkiCatalogDownloadButton({
  children,
  className,
  href,
}: OczkiCatalogDownloadButtonProps) {
  return (
    <div
      className={cn(
        'flex h-11 shrink-0 items-start justify-center bg-[var(--oczki-primary-200)] px-3',
        className,
      )}
      data-name="Download container"
    >
      <Link
        className="group flex h-11 flex-1 items-start justify-center pb-2.5 pt-[11px] text-[var(--oczki-primary-900)] transition-colors hover:text-[var(--oczki-primary-700)] md:flex-none"
        data-name="Button"
        href={href}
      >
        <span className="flex flex-col items-start">
          <span className="flex items-start gap-1 pb-1">
            <span className="oczki-body-m whitespace-nowrap">{children}</span>
            <span className="flex w-3.5 shrink-0 flex-col items-start pt-1.5">
              <svg
                aria-hidden="true"
                className="block h-[7.719px] w-[10.111px]"
                fill="none"
                viewBox="0 0 10.111 7.719"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.055 7.719V0M5.055 7.719L0 4.5M5.055 7.719L10.111 4.5"
                  stroke="currentColor"
                  strokeLinejoin="bevel"
                />
              </svg>
            </span>
          </span>
          <span
            aria-hidden="true"
            className="block h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100"
          />
        </span>
      </Link>
    </div>
  )
}
