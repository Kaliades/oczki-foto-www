/**
 * Chevron between crumbs — Figma `Chevron icon` (`7064:15088`) inside 12×12 frame
 * with vector inset at 37.5% / 25% (not a stretched 4×7 bbox).
 */
export function OczkiBreadcrumbSeparator() {
  return (
    <span
      aria-hidden="true"
      className="relative size-3 shrink-0 overflow-clip text-[var(--oczki-primary-700)]"
    >
      <span className="absolute inset-y-1/4 inset-x-[37.5%]">
        <span className="absolute inset-[-8.33%_-16.67%]">
          <svg
            className="block size-full"
            fill="none"
            viewBox="0 0 4.00008 7.00016"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.5 0.5L3.50008 3.50008L0.5 6.50016"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </span>
    </span>
  )
}
