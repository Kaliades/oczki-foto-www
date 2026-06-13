import { ContactHeroDecor } from './ContactHeroDecor'
import { ContactHeroForm } from './ContactHeroForm'
import { ContactHeroHeading } from './ContactHeroHeading'
import { ContactHeroPaperTexture } from './ContactHeroPaperTexture'
import { ContactHeroTopBar } from './ContactHeroTopBar'
import { CONTACT_HERO_FIGMA_NODES, type ContactHeroData } from './constants'

type ContactHeroSectionProps = {
  data: ContactHeroData
}

/**
 * Kontakt page hero — Figma `Background` (`6884:14441` / `7084:3179` / `7086:4110`).
 *
 * <section> (full-bleed tertiary + texture)
 * └── <div> inner 1366 cap, relative
 *     ├── ContactHeroPaperTexture
 *     ├── ContactHeroTopBar
 *     └── <div> Main content
 *         ├── ContactHeroDecor (absolute)
 *         ├── ContactHeroHeading
 *         └── ContactHeroForm
 */
export function ContactHeroSection({ data }: ContactHeroSectionProps) {
  const {
    breadcrumbs,
    defaultSessionTypeId,
    description,
    heading,
    privacyLink,
    sessionQuestion,
    submitLabel,
  } = data
  const headingId = 'contact-hero-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-[var(--oczki-tertiary-300)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CONTACT_HERO_FIGMA_NODES.background.desktop}
    >
      <ContactHeroPaperTexture />

      <div className="relative z-[1] mx-auto w-full max-w-[1366px] min-h-[1003px] md:min-h-[978px] lg:min-h-[688px]">
        <ContactHeroTopBar breadcrumbs={breadcrumbs} />

        <div
          className="relative flex flex-col items-center gap-12 px-4 pb-20 md:gap-16 md:px-20 md:pb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:pb-12 lg:pl-8 lg:pr-20"
          data-figma-node={CONTACT_HERO_FIGMA_NODES.mainContent.desktop}
        >
          <ContactHeroDecor />

          <ContactHeroHeading
            description={description}
            emphasis={heading.emphasis}
            end={heading.end}
            headingId={headingId}
            start={heading.start}
          />

          <div className="relative shrink-0">
            <ContactHeroForm
              defaultSessionTypeId={defaultSessionTypeId}
              privacyLink={privacyLink}
              sessionQuestion={sessionQuestion}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </div>

      <span className="sr-only">{data.title}</span>
    </section>
  )
}
