import { GALLERY_HERO_FIGMA_NODES } from './constants'

type GalleryHeroHeadingProps = {
  titleLead: string
  titleEmphasis: string
  titleTrail: string
  description: string
  headingId?: string
}

/**
 * Figma `Heading Container` — centred column, gap 10 / 12 / 20 px by breakpoint.
 *
 * Heading Container
 * ├── Main Heading (header/l, centred)
 * └── Subheading Container
 *     └── body/l paragraph
 */
export function GalleryHeroHeading({
  titleLead,
  titleEmphasis,
  titleTrail,
  description,
  headingId = 'gallery-hero-heading',
}: GalleryHeroHeadingProps) {
  return (
    <div
      className="relative z-10 flex w-full max-w-[328px] flex-col items-center gap-2.5 text-center md:max-w-[440px] md:gap-3 lg:max-w-[547px] lg:gap-5"
      data-figma-node={GALLERY_HERO_FIGMA_NODES.headingContainer.desktop}
    >
      <h1
        className="oczki-heading-l w-full text-[var(--oczki-primary-800)]"
        id={headingId}
      >
        {titleLead}
        <em className="italic">{titleEmphasis}</em>
        {titleTrail}
      </h1>
      <p className="oczki-body-l w-full text-[var(--oczki-primary-700)]">{description}</p>
    </div>
  )
}
