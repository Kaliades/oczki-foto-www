import { HOME_FOOTER_NEWSLETTER_FIGMA_NODES, type HomeFooterNewsletterData } from './constants'
import { FooterGalleryGrid } from './FooterGalleryGrid'
import { FooterNav } from './FooterNav'
import { FooterScallopRow } from './FooterScallopRow'
import { NewsletterSection } from './NewsletterSection'

type HomeFooterNewsletterProps = {
  data: HomeFooterNewsletterData
}

/**
 * Combined newsletter signup + site footer — the closing section of the
 * homepage (Figma "Footer+Newsletter").
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - Desktop: {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.desktopFrame}
 *   - Tablet:  {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.tabletFrame}
 *   - Mobile:  {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.mobileFrame}
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - Newsletter outer `<section>` — sage background + left photo bleed.
 *   - Footer outer `<section>` — cream (`primary-300`) full-bleed bg.
 *   - Both inners carry `max-w-[1366px] mx-auto`; scallop row and all
 *     layout live inside the footer inner so decorations track the cap.
 */
export function HomeFooterNewsletter({ data }: HomeFooterNewsletterProps) {
  const { newsletter, footer } = data

  return (
    <div
      className="w-full [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_FOOTER_NEWSLETTER_FIGMA_NODES.desktopFrame}
    >
      <NewsletterSection
        heading={newsletter.heading}
        intro={newsletter.intro}
        photoAlt={newsletter.photoAlt}
        photoSrc={newsletter.photoSrc}
        privacyLink={newsletter.privacyLink}
        submitLabel={newsletter.submitLabel}
      />

      <section aria-label="Stopka" className="w-full bg-[var(--oczki-primary-300)]">
        <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-center overflow-hidden px-6 pb-4 pt-12 md:px-6 lg:px-6">
          <FooterScallopRow />

          <div className="relative z-[1] flex w-full flex-col items-start gap-20 pt-12">
            <FooterNav
              pageLinks={footer.pageLinks}
              serviceLinks={footer.serviceLinks}
              socialLinks={footer.socialLinks}
            />
            <FooterGalleryGrid images={footer.galleryImages} />
          </div>
        </div>
      </section>
    </div>
  )
}
