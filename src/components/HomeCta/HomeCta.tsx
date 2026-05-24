import {
  CTA_TABLET_CONTENT_IN_FRAME,
  CTA_TABLET_FRAME_CLUSTER,
  HOME_CTA_FIGMA_NODES,
  type HomeCtaData,
} from './constants'
import { CtaBranchDecor } from './CtaBranchDecor'
import { CtaContent } from './CtaContent'
import { CtaOrnateFrame } from './CtaOrnateFrame'

type HomeCtaProps = {
  data: HomeCtaData
}

type CtaContentBlockProps = {
  body: string
  cta: HomeCtaData['cta']
  headingEmphasis: string
  headingPlain: string
}

const CTA_DESKTOP_SHELL_CLASS =
  'relative mx-auto hidden h-[594px] w-full max-w-[1366px] min-w-[1366px] flex-col overflow-x-clip px-12 pb-32 pt-24 min-[1366px]:flex'

const CTA_TABLET_SHELL_CLASS =
  'relative mx-auto hidden h-[554px] w-full max-w-[768px] flex-col overflow-visible px-12 pt-24 md:max-[1365px]:flex'

/**
 * Desktop artboard — Figma 7105:8981.
 */
const CtaDesktopShell = ({
  body,
  cta,
  headingEmphasis,
  headingPlain,
}: CtaContentBlockProps) => (
  <>
    <CtaOrnateFrame variant="desktop" />
    <div className="relative flex min-h-0 flex-1 flex-col items-center gap-9 px-[336px] py-16">
      <CtaBranchDecor variant="desktop-left" />
      <CtaBranchDecor variant="desktop-right" />
      <CtaContent
        body={body}
        cta={cta}
        headingEmphasis={headingEmphasis}
        headingPlain={headingPlain}
        variant="desktop"
      />
    </div>
  </>
)

/**
 * Tablet — graphic frame is the root; copy + ornaments live inside 8604 relative to it.
 */
const CtaTabletShell = ({
  body,
  cta,
  headingEmphasis,
  headingPlain,
}: CtaContentBlockProps) => (
  <div
    className="absolute overflow-visible"
    style={{
      height: CTA_TABLET_FRAME_CLUSTER.height,
      left: CTA_TABLET_FRAME_CLUSTER.left,
      top: CTA_TABLET_FRAME_CLUSTER.top,
      width: CTA_TABLET_FRAME_CLUSTER.width,
    }}
  >
    <div className="relative size-full">
      <CtaOrnateFrame variant="tablet" />
      <div
        className="absolute overflow-visible"
        style={{
          height: CTA_TABLET_CONTENT_IN_FRAME.height,
          left: CTA_TABLET_CONTENT_IN_FRAME.left,
          top: CTA_TABLET_CONTENT_IN_FRAME.top,
          width: CTA_TABLET_CONTENT_IN_FRAME.width,
        }}
      >
        <CtaBranchDecor variant="tablet-left" />
        <CtaBranchDecor variant="tablet-right" />
        <div className="relative z-10 flex flex-col items-center gap-9 px-16 pt-16">
          <CtaContent
            body={body}
            cta={cta}
            headingEmphasis={headingEmphasis}
            headingPlain={headingPlain}
            variant="tablet"
          />
        </div>
      </div>
    </div>
  </div>
)

/**
 * Final homepage CTA — Figma 7105:8981 / 7118:9246 / 7105:14226.
 */
export const HomeCta = ({ data }: HomeCtaProps) => {
  const { heading, body, cta } = data

  const contentProps = {
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
      <div className="relative mx-auto h-[673px] w-full max-w-[360px] overflow-x-clip md:hidden">
        <div className="pointer-events-none absolute left-4 top-[25px] z-0 h-[593px] w-[328px] overflow-hidden">
          <CtaOrnateFrame variant="mobile" />
          <CtaBranchDecor variant="mobile-top" />
          <CtaBranchDecor variant="mobile-bottom" />
        </div>

        <div className="absolute left-4 top-[164px] z-10 flex h-[345px] w-[328px] flex-col items-center gap-9 px-4 pt-6">
          <CtaContent {...contentProps} variant="mobile" />
        </div>
      </div>

      {/* Tablet — 7118:9246 */}
      <div className={CTA_TABLET_SHELL_CLASS} data-figma-node={HOME_CTA_FIGMA_NODES.tabletFrame}>
        <CtaTabletShell {...contentProps} />
      </div>

      {/* Desktop — 1366×594 (7105:8981) */}
      <div className={CTA_DESKTOP_SHELL_CLASS}>
        <CtaDesktopShell {...contentProps} />
      </div>
    </section>
  )
}
