import { CenteredMessageStack } from '@/components/CenteredMessageStack'
import { OczkiButton } from '@/components/OczkiButton'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import {
  CASE_STUDY_CLOSING_CTA_FIGMA_NODES,
  CASE_STUDY_CLOSING_CTA_PANEL,
  type CaseStudyClosingCtaData,
} from './constants'

type CaseStudyClosingCtaPanelProps = {
  data: CaseStudyClosingCtaData
  headingId: string
  variant: 'desktop' | 'tablet' | 'mobile'
}

/**
 * One breakpoint slice — Figma `Card Container`.
 *
 * Botanical side decor deferred — wire `BotanicalSideDecor` when assets are ready.
 */
function CaseStudyClosingCtaPanel({ data, headingId, variant }: CaseStudyClosingCtaPanelProps) {
  const panel = CASE_STUDY_CLOSING_CTA_PANEL[variant]
  const nodes = CASE_STUDY_CLOSING_CTA_FIGMA_NODES
  const href = resolveLinkHref(data.cta)

  const paddingClassName =
    variant === 'mobile' ? 'px-4' : variant === 'tablet' ? 'px-[132px]' : 'px-8'

  return (
    <div
      className={`mx-auto flex shrink-0 flex-col items-center justify-center gap-9 py-20 ${paddingClassName}`}
      data-figma-node={nodes[variant]}
      data-name="Card Container"
      style={{ minHeight: panel.height, width: panel.width }}
    >
      <CenteredMessageStack
        body={data.body}
        heading={data.heading}
        headingId={headingId}
        variant={variant}
      />

      {href && data.cta.label ? (
        <div
          className={variant === 'mobile' ? 'w-full shrink-0' : 'shrink-0'}
          data-figma-node={nodes.button[variant]}
          data-name="Button"
        >
          <OczkiButton className={variant === 'mobile' ? 'w-full' : undefined} href={href}>
            {data.cta.label}
          </OczkiButton>
        </div>
      ) : null}
    </div>
  )
}

type CaseStudyClosingCtaProps = {
  data: CaseStudyClosingCtaData
}

/**
 * Case study closing thank-you — Figma `Card Container` after memorable moment.
 *
 * <section> full-bleed primary-200
 * └── inner cap (centres reference-width panels on wider viewports)
 *     └── Card Container (per breakpoint)
 */
export function CaseStudyClosingCta({ data }: CaseStudyClosingCtaProps) {
  const headingId = 'case-study-closing-cta-heading'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full overflow-visible bg-[var(--oczki-primary-200)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_CLOSING_CTA_FIGMA_NODES.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] justify-center overflow-visible">
        <div className="md:hidden">
          <CaseStudyClosingCtaPanel data={data} headingId={headingId} variant="mobile" />
        </div>

        <div className="hidden md:block lg:hidden">
          <CaseStudyClosingCtaPanel data={data} headingId={headingId} variant="tablet" />
        </div>

        <div className="hidden lg:block">
          <CaseStudyClosingCtaPanel data={data} headingId={headingId} variant="desktop" />
        </div>
      </div>
    </section>
  )
}
