import { HOME_CTA_FIGMA_NODES, type HomeCtaData } from './constants'
import { CtaBranchDecor } from './CtaBranchDecor'
import { CtaContent } from './CtaContent'
import { CtaOrnateFrame } from './CtaOrnateFrame'

type HomeCtaProps = {
  data: HomeCtaData
}

/**
 * Final homepage CTA — "Czy to jest ten moment, w którym robimy coś pięknego?"
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 *   - Desktop: {@link HOME_CTA_FIGMA_NODES.desktopFrame}
 *   - Tablet:  {@link HOME_CTA_FIGMA_NODES.tabletFrame}
 *   - Mobile:  {@link HOME_CTA_FIGMA_NODES.mobileFrame}
 */
export const HomeCta = ({ data }: HomeCtaProps) => {
  const { heading, body, cta } = data

  return (
    <section
      aria-labelledby="home-cta-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_CTA_FIGMA_NODES.desktopFrame}
    >
      <div className="relative mx-auto w-full max-w-[1366px] px-4 pb-[25px] pt-[25px] md:px-20 md:pb-24 md:pt-24 lg:px-12 lg:pb-32 lg:pt-24">
        {/* Card shell — Figma container 7105:8641 / 7105:8604 / 7105:8567 */}
        <div className="relative mx-auto min-h-[593px] w-full max-w-[328px] md:h-[362px] md:min-h-0 md:max-w-[608px] lg:mx-0 lg:h-[370px] lg:max-w-none">
          <CtaOrnateFrame />

          {/* Mobile — top / bottom ornaments centred in frame ears */}
          <CtaBranchDecor className="absolute left-1/2 top-[75px] -translate-x-1/2 md:hidden" />
          <CtaBranchDecor
            className="absolute bottom-[75px] left-1/2 -translate-x-1/2 md:hidden"
            flipped
          />

          {/* Tablet — left bracket only (7105:8610 at x = −29) */}
          <CtaBranchDecor className="absolute -left-[29px] top-1/2 hidden -translate-y-1/2 md:flex lg:hidden" />

          {/* Desktop — left + right ornaments (7105:8655 / 7105:8647) */}
          <CtaBranchDecor className="absolute left-[116px] top-[122px] hidden lg:flex" />
          <CtaBranchDecor
            className="absolute right-[34px] top-1/2 hidden -translate-y-1/2 lg:flex"
            mirrored
          />

          <CtaContent
            body={body}
            cta={cta}
            headingEmphasis={heading.emphasis}
            headingPlain={heading.plain}
          />
        </div>
      </div>
    </section>
  )
}
