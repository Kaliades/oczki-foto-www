import { ORNATE_CTA_SHELL_PADDING_X } from './geometry'
import { OrnateCtaBranchDecor } from './OrnateCtaBranchDecor'
import { OrnateCtaCopy } from './OrnateCtaCopy'
import { OrnateCtaFramedLayout } from './OrnateCtaFramedLayout'
import { OrnateCtaFrame } from './OrnateCtaFrame'
import type { OrnateCtaLayoutProfile } from './profiles'
import type { OrnateCtaData, OrnateCtaFigmaNodes } from './types'

type OrnateCtaSectionProps = {
  data: OrnateCtaData
  figmaNodes: OrnateCtaFigmaNodes
  headingId: string
  profile: OrnateCtaLayoutProfile
}

const DESKTOP_SHELL_CLASS =
  'relative mx-auto hidden w-full max-w-[1366px] min-w-[1366px] overflow-visible px-12 min-[1366px]:flex'

const TABLET_SHELL_CLASS =
  'relative mx-auto hidden w-full max-w-[768px] overflow-visible px-12 md:max-[1365px]:flex'

/**
 * Reusable ornate-framed booking CTA — Figma `CTA-section` component (7105:8627).
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   <section> — primary/100 full bleed
 *     └── inner cap — max-w 1366, discrete 360 / 768 / 1366 shells
 *         └── frame cluster 8627 — ornaments + copy card 8641
 *
 * Layout profiles tune shell rhythm (home-final vs gallery) while sharing frame geometry.
 */
export function OrnateCtaSection({
  data,
  figmaNodes,
  headingId,
  profile,
}: OrnateCtaSectionProps) {
  const { body, cta, heading } = data
  const { metrics } = profile

  const desktopShellPaddingTop =
    profile.id === 'home-final' ? 'pt-32' : ''

  const framedLayoutProps = {
    body,
    cta,
    heading,
    headingId,
    metrics,
  }

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktopFrame}
    >
      <div
        className="relative mx-auto w-full max-w-[360px] overflow-visible md:hidden"
        data-figma-node={figmaNodes.mobileFrame}
        style={{ height: metrics.mobileShellHeight }}
      >
        <div
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{
            height: metrics.mobileFrame.height,
            left: metrics.mobileFrame.left,
            top: metrics.mobileFrame.top,
            width: metrics.mobileFrame.width,
          }}
        >
          <OrnateCtaFrame metrics={metrics} variant="mobile" />
          <OrnateCtaBranchDecor metrics={metrics} variant="mobile-top" />
          <OrnateCtaBranchDecor metrics={metrics} variant="mobile-bottom" />
        </div>

        <div
          className="absolute z-10 flex flex-col items-center gap-9"
          data-name="Container"
          style={{
            height: metrics.mobileContent.height,
            left: metrics.mobileContent.left,
            paddingBottom: metrics.mobileContent.paddingBottom,
            paddingLeft: metrics.mobileContent.paddingX,
            paddingRight: metrics.mobileContent.paddingX,
            paddingTop: metrics.mobileContent.paddingTop,
            top: metrics.mobileContent.top,
            width: metrics.mobileContent.width,
          }}
        >
          <OrnateCtaCopy
            body={body}
            cta={cta}
            heading={heading}
            headingId={headingId}
            variant="mobile"
          />
        </div>
      </div>

      <div
        className={TABLET_SHELL_CLASS}
        data-figma-node={figmaNodes.tabletFrame}
        style={{ height: metrics.tabletShellHeight }}
      >
        <OrnateCtaFramedLayout {...framedLayoutProps} variant="tablet" />
      </div>

      <div
        className={`${DESKTOP_SHELL_CLASS} ${desktopShellPaddingTop}`}
        style={{ height: metrics.desktopShellHeight }}
      >
        <OrnateCtaFramedLayout {...framedLayoutProps} variant="desktop" />
      </div>
    </section>
  )
}

export { ORNATE_CTA_SHELL_PADDING_X }
