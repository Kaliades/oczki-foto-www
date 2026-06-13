import type { SectionLink } from '@/utilities/resolveLinkHref'

import type { FooterNewsletterFigmaNodes } from './constants'
import { NewsletterFormColumn } from './NewsletterFormColumn'
import { NewsletterPhoto } from './NewsletterPhoto'

type NewsletterSectionProps = {
  figmaNodes?: FooterNewsletterFigmaNodes
  heading: {
    plain: string
    emphasis: string
    plainEnd: string
  }
  headingId?: string
  intro: string
  submitLabel: string
  privacyLink: SectionLink
  photoSrc: string
  photoAlt: string
}

/**
 * Top half of Footer+Newsletter — split photo / form on desktop,
 * stacked form-then-photo on mobile and tablet (Figma `7091:3620`).
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   <section> — secondary/600 full bleed
 *     └── discrete 360 / 768 / 1366 layout caps with negative overlap
 *         ├── Text Column `7091:3622` — pt/pb/px from {@link FOOTER_NEWSLETTER_SHELL}
 *         └── Image `7091:3621` — square, 660 px wide on desktop
 */
export function NewsletterSection({
  figmaNodes,
  heading,
  headingId = 'footer-newsletter-heading',
  intro,
  submitLabel,
  privacyLink,
  photoSrc,
  photoAlt,
}: NewsletterSectionProps) {
  const columnProps = {
    heading,
    headingId,
    intro,
    privacyLink,
    submitLabel,
  }

  return (
    <section
      aria-labelledby={headingId}
      className="relative z-0 w-full overflow-x-clip bg-[var(--oczki-secondary-600)]"
      data-figma-node={figmaNodes?.desktopFrame}
      data-figma-node-mobile={figmaNodes?.mobileFrame}
      data-figma-node-tablet={figmaNodes?.tabletFrame}
    >
      {/* Mobile — 360 */}
      <div
        className="relative mx-auto mb-[-32px] flex w-full max-w-[360px] flex-col md:hidden"
        data-figma-node={figmaNodes?.mobileFrame}
        data-name="Content Section"
      >
        <NewsletterFormColumn
          {...columnProps}
          fieldIdPrefix="newsletter-mobile"
          shellClassName="px-6 pb-32 pt-20"
          submitFullWidth
        />
        <NewsletterPhoto alt={photoAlt} sizes="360px" src={photoSrc} />
      </div>

      {/* Tablet — 768 */}
      <div
        className="relative mx-auto mb-[-32px] hidden w-full max-w-[768px] flex-col md:flex lg:hidden"
        data-figma-node={figmaNodes?.tabletFrame}
        data-name="Content Section"
      >
        <NewsletterFormColumn
          {...columnProps}
          fieldIdPrefix="newsletter-tablet"
          shellClassName="px-20 pb-32 pt-20"
        />
        <NewsletterPhoto alt={photoAlt} sizes="768px" src={photoSrc} />
      </div>

      {/* Desktop — 1366 */}
      <div
        className="relative mx-auto mb-[-32px] hidden w-full max-w-[1366px] flex-row lg:flex"
        data-figma-node={figmaNodes?.desktopFrame}
        data-name="Content Section"
      >
        <div className="w-[660px] shrink-0">
          <NewsletterPhoto alt={photoAlt} sizes="660px" src={photoSrc} />
        </div>
        <NewsletterFormColumn
          {...columnProps}
          fieldIdPrefix="newsletter-desktop"
          shellClassName="w-[706px] px-32 pb-32 pt-20"
        />
      </div>
    </section>
  )
}
