import {
  CTA_DESKTOP_SHELL_HEIGHT,
  CTA_MOBILE_CONTENT,
  CTA_MOBILE_FRAME,
  CTA_MOBILE_SHELL_HEIGHT,
  CTA_TABLET_SHELL_HEIGHT,
  HOME_CTA_FIGMA_NODES,
  type HomeCtaData,
} from './constants'
import { CtaBranchDecor } from './CtaBranchDecor'
import { CtaContent } from './CtaContent'
import { CtaFramedLayout } from './CtaFramedLayout'
import { CtaOrnateFrame } from './CtaOrnateFrame'

type HomeCtaProps = {
  data: HomeCtaData
}

const CTA_DESKTOP_SHELL_CLASS =
  'relative mx-auto hidden w-full max-w-[1366px] min-w-[1366px] overflow-visible px-12 pt-32 min-[1366px]:flex'

const CTA_TABLET_SHELL_CLASS =
  'relative mx-auto hidden w-full max-w-[768px] overflow-visible px-12 pt-32 md:max-[1365px]:flex'

/**
 * Final homepage CTA — Figma 7105:8981 / 7118:9246 / 7105:14226.
 */
export const HomeCta = ({ data }: HomeCtaProps) => {
  const { heading, body, cta } = data

  const framedLayoutProps = {
    body,
    cta,
    headingEmphasis: heading.emphasis,
    headingPlain: heading.plain,
  }

  return (
    <section
      aria-labelledby="home-cta-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_CTA_FIGMA_NODES.desktopFrame}
    >
      {/* Mobile — 360×673 (7105:14226) */}
      <div
        className="relative mx-auto w-full max-w-[360px] overflow-visible md:hidden"
        style={{ height: CTA_MOBILE_SHELL_HEIGHT }}
      >
        <div
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{
            height: CTA_MOBILE_FRAME.height,
            left: CTA_MOBILE_FRAME.left,
            top: CTA_MOBILE_FRAME.top,
            width: CTA_MOBILE_FRAME.width,
          }}
        >
          <CtaOrnateFrame variant="mobile" />
          <CtaBranchDecor variant="mobile-top" />
          <CtaBranchDecor variant="mobile-bottom" />
        </div>

        <div
          className="absolute z-10 flex flex-col items-center gap-9"
          style={{
            height: CTA_MOBILE_CONTENT.height,
            left: CTA_MOBILE_CONTENT.left,
            paddingBottom: CTA_MOBILE_CONTENT.paddingBottom,
            paddingLeft: CTA_MOBILE_CONTENT.paddingX,
            paddingRight: CTA_MOBILE_CONTENT.paddingX,
            paddingTop: CTA_MOBILE_CONTENT.paddingTop,
            top: CTA_MOBILE_CONTENT.top,
            width: CTA_MOBILE_CONTENT.width,
          }}
        >
          <CtaContent {...framedLayoutProps} variant="mobile" />
        </div>
      </div>

      {/* Tablet — 7118:9246 */}
      <div
        className={CTA_TABLET_SHELL_CLASS}
        data-figma-node={HOME_CTA_FIGMA_NODES.tabletFrame}
        style={{ height: CTA_TABLET_SHELL_HEIGHT }}
      >
        <CtaFramedLayout {...framedLayoutProps} variant="tablet" />
      </div>

      {/* Desktop — 1366×594 (7105:8981) */}
      <div className={CTA_DESKTOP_SHELL_CLASS} style={{ height: CTA_DESKTOP_SHELL_HEIGHT }}>
        <CtaFramedLayout {...framedLayoutProps} variant="desktop" />
      </div>
    </section>
  )
}
