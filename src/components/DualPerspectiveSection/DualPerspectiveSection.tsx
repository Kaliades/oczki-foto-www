import { LeftAlignedIntroCopy } from '@/components/LeftAlignedIntroCopy'
import type { LeftAlignedIntroCopyHeading } from '@/components/LeftAlignedIntroCopy'
import { PrimaryBorderedPanelList } from '@/components/PrimaryBorderedPanelList'
import type { PrimaryBorderedPanelItem } from '@/components/PrimaryBorderedPanelList'
import { PrimaryMatPortraitFrame } from '@/components/PrimaryMatPortraitFrame'

import { DUAL_PERSPECTIVE_SECTION_FIGMA_NODES } from './constants'

export type DualPerspectiveSectionData = {
  heading: LeftAlignedIntroCopyHeading
  intro: string
  portrait: {
    alt: string
    src: string
  }
  profileHeading: string
  profileItems: readonly PrimaryBorderedPanelItem[]
}

type DualPerspectiveSectionProps = {
  data: DualPerspectiveSectionData
  headingId: string
}

/**
 * "Podwójne spojrzenie na Waszą historię" — wedding duo with Łukasz portrait.
 *
 * Figma `Main container` (`6994:25998` / `7092:4648` / `7093:6033`):
 *   <section> — primary/100, full bleed
 *     └── inner 1366 cap — row desktop / column mobile-tablet
 *         ├── <PrimaryMatPortraitFrame> — primary/200 mat column
 *         └── <div Content container> — primary/100 copy column
 *             ├── <LeftAlignedIntroCopy>
 *             └── profile block
 *                 ├── subtitle — body/xl
 *                 └── <PrimaryBorderedPanelList>
 *
 * Content padding: mobile 32/16; tablet+ 80 top / 96 bottom / 80 horizontal.
 * Intro-to-profile gap: 28 px mobile; 48 px tablet+.
 */
export function DualPerspectiveSection({ data, headingId }: DualPerspectiveSectionProps) {
  const { heading, intro, portrait, profileHeading, profileItems } = data
  const nodes = DUAL_PERSPECTIVE_SECTION_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
      data-figma-node-mobile={nodes.mobile}
      data-figma-node-tablet={nodes.tablet}
    >
      <div
        className="mx-auto flex w-full max-w-[1366px] flex-col min-[1366px]:flex-row"
        data-name="Main container"
      >
        <PrimaryMatPortraitFrame
          alt={portrait.alt}
          figmaNode={nodes.portrait.container.desktop}
          imageFigmaNode={nodes.portrait.image.desktop}
          src={portrait.src}
        />

        <div
          className="flex w-full min-w-0 flex-col items-start gap-7 bg-[var(--oczki-primary-100)] px-4 py-8 md:gap-12 md:px-20 md:pb-24 md:pt-20 min-[1366px]:flex-1"
          data-figma-node={nodes.content.desktop}
          data-figma-node-mobile={nodes.content.mobile}
          data-figma-node-tablet={nodes.content.tablet}
          data-name="Content container"
        >
          <LeftAlignedIntroCopy
            body={intro}
            figmaNodes={{
              body: nodes.intro.body.desktop,
              heading: nodes.intro.heading.desktop,
              section: nodes.intro.section.desktop,
            }}
            heading={heading}
            headingId={headingId}
          />

          <div
            className="flex w-full flex-col items-start gap-3 md:gap-4"
            data-figma-node={nodes.profile.desktop}
            data-figma-node-mobile={nodes.profile.mobile}
            data-figma-node-tablet={nodes.profile.tablet}
          >
            <p
              className="oczki-body-xl w-full tracking-[-0.3px] text-[var(--oczki-primary-800)] [word-break:break-word]"
              data-figma-node={nodes.profile.subtitle.desktop}
            >
              {profileHeading}
            </p>

            <PrimaryBorderedPanelList
              figmaNode={nodes.profile.list.desktop}
              items={profileItems}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
