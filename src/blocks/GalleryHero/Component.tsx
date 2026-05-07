// TODO: dedicated mobile pass — pills currently wrap naturally; a horizontal-scroll
// snap variant (overflow-x-auto snap-x with snap-center pills) may be preferred
// on narrow viewports. Inspect mobile Figma frame when available.

type CategoryFilter = {
  label: string
  slug: string
}

type GalleryHeroProps = {
  blockType: 'galleryHero'
  breadcrumbLabel?: string | null
  heading: string
  lead?: string | null
  categoryFilters?: CategoryFilter[] | null
}

export const GalleryHero: React.FC<GalleryHeroProps> = ({
  breadcrumbLabel,
  heading,
  lead,
  categoryFilters,
}) => {
  const label = breadcrumbLabel || 'Galeria'

  return (
    <section className="w-full bg-white py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1206px] px-6 flex flex-col items-center text-center gap-5">
        {/* Breadcrumb strip */}
        <nav aria-label="Okruszek nawigacyjny" className="text-sm text-stone-400 tracking-wide uppercase">
          <span>{label}</span>
        </nav>

        {/* Heading */}
        <h1 className="text-[32px] leading-[1.12] tracking-[-0.035em] text-black font-normal max-w-[547px]">
          {heading}
        </h1>

        {/* Lead */}
        {lead && (
          <p className="text-base leading-[1.58] text-black max-w-[486px]">
            {lead}
          </p>
        )}

        {/* Category filter pills */}
        {categoryFilters && categoryFilters.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {categoryFilters.map((filter) => (
              <a
                key={filter.slug}
                href={`?kategoria=${filter.slug}`}
                className="inline-flex items-center px-6 py-2.5 rounded-full border border-black text-black text-base leading-[1.5] hover:bg-black hover:text-white transition-colors whitespace-nowrap"
              >
                {filter.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
