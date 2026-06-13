import {
  FOOTER_NEWSLETTER_SHELL,
  HOME_FOOTER_NEWSLETTER_FIGMA_NODES,
  type FooterNewsletterFigmaNodes,
  type HomeFooterNewsletterData,
} from './constants'
import { FooterGalleryGrid } from './FooterGalleryGrid'
import { FooterNav } from './FooterNav'
import { FooterScallopRow } from './FooterScallopRow'
import { NewsletterSection } from './NewsletterSection'

type HomeFooterNewsletterProps = {
  data: HomeFooterNewsletterData
  /** Defaults to homepage nodes; pass gallery nodes on `/galeria`. */
  figmaNodes?: FooterNewsletterFigmaNodes
  headingId?: string
}

/**
 * Combined newsletter signup + site footer (Figma "Footer+Newsletter").
 * Reused on homepage and gallery — same hierarchy, CMS-ready `data` prop.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - Desktop: {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.desktopFrame}
 *   - Tablet:  {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.tabletFrame}
 *   - Mobile:  {@link HOME_FOOTER_NEWSLETTER_FIGMA_NODES.mobileFrame}
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - Newsletter — sage full-bleed shell, capped photo + form (no photo bleed).
 *   - Stopka — cream full-bleed; scallop row alone spans the viewport width.
 *   - Scallop row is absolute (`z-10`, −40 px into newsletter); stopka uses
 *     `pt-[88px]` so links never sit under the tiles (Figma 40 + 48).
 */
export function HomeFooterNewsletter({
  data,
  figmaNodes = HOME_FOOTER_NEWSLETTER_FIGMA_NODES,
  headingId = 'footer-newsletter-heading',
}: HomeFooterNewsletterProps) {
  const { newsletter, footer } = data

  return (
    <div
      className="relative w-full [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktopFrame}
      data-figma-node-mobile={figmaNodes.mobileFrame}
      data-figma-node-tablet={figmaNodes.tabletFrame}
    >
      <NewsletterSection
        figmaNodes={figmaNodes}
        heading={newsletter.heading}
        headingId={headingId}
        intro={newsletter.intro}
        photoAlt={newsletter.photoAlt}
        photoSrc={newsletter.photoSrc}
        privacyLink={newsletter.privacyLink}
        submitLabel={newsletter.submitLabel}
      />

      <section
        aria-label="Stopka"
        className="relative w-full overflow-x-clip bg-[var(--oczki-primary-300)]"
      >
        <FooterScallopRow />

        <div
          className="relative"
          style={{ paddingTop: FOOTER_NEWSLETTER_SHELL.footer.stopkaContentPaddingTop }}
        >
          <div className="relative mx-auto flex w-full max-w-[1366px] flex-col items-center">
            <div
              className="flex w-full flex-col items-start px-6 pb-4"
              style={{ gap: FOOTER_NEWSLETTER_SHELL.footer.stopkaSectionGap }}
            >
              <FooterNav
                pageLinks={footer.pageLinks}
                serviceLinks={footer.serviceLinks}
                socialLinks={footer.socialLinks}
              />
              <FooterGalleryGrid images={footer.galleryImages} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
