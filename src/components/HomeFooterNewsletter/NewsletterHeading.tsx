type NewsletterHeadingProps = {
  plain: string
  emphasis: string
  plainEnd: string
  headingId?: string
}

/**
 * Newsletter title block — Figma node `7091:3624`.
 *
 * Uses header/m (32 px The Seasons) on every breakpoint. The emphasis
 * run is set in italic; body copy below uses `oczki-body-l`.
 */
export function NewsletterHeading({
  plain,
  emphasis,
  plainEnd,
  headingId = 'footer-newsletter-heading',
}: NewsletterHeadingProps) {
  return (
    <h2
      className="w-full text-[32px] font-normal leading-[1.04] tracking-[-0.01em] text-[var(--oczki-primary-300)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1]"
      id={headingId}
    >
      {plain}
      <em className="italic tracking-[-0.01em] [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
        {emphasis}
      </em>
      {plainEnd}
    </h2>
  )
}
