type ExternalLinkIconProps = {
  className?: string
}

/**
 * External-link glyph — Figma `Group 2` (`7064:14819`).
 * 16×16 box, 2.286 px padding, 10.571×11.143 graphic; stroke follows link colour.
 */
export function ExternalLinkIcon({ className }: ExternalLinkIconProps) {
  return (
    <span
      aria-hidden
      className={`inline-flex size-4 shrink-0 items-center justify-center p-[2.286px] ${className ?? ''}`}
      data-figma-node="7064:14820"
    >
      <svg
        className="h-[11.143px] w-[10.571px]"
        fill="none"
        viewBox="0 0 11.5714 12.1429"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6.5 0.5H0.5V11.6429H11.0714V5.35714" stroke="currentColor" />
        <path
          d="M5.29456 6.47425L9.38007 2.38874M9.35622 5.50759C8.66174 4.81311 9.38007 2.38874 9.38007 2.38874C9.38007 2.38874 6.94448 3.09585 6.23737 2.38874"
          stroke="currentColor"
          strokeLinejoin="bevel"
        />
      </svg>
    </span>
  )
}
