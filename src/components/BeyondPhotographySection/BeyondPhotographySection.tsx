import type { BorderedFeatureItem } from '@/components/BorderedFeatureList'
import { BorderedFeatureList } from '@/components/BorderedFeatureList'
import type { FullBleedPhotoCrop } from '@/components/FullBleedPhotoLayer'
import { FullBleedPhotoLayer } from '@/components/FullBleedPhotoLayer'
import { PhotoOverlayIntro } from '@/components/PhotoOverlayIntro'
import type { PhotoOverlayIntroHeading } from '@/components/PhotoOverlayIntro'
import { PrimarySurfacePanel } from '@/components/PrimarySurfacePanel'

import { BEYOND_PHOTOGRAPHY_SECTION_FIGMA_NODES } from './constants'

export type BeyondPhotographySectionData = {
  backdrop: {
    alt: string
    crop: FullBleedPhotoCrop
    src: string
  }
  features: readonly BorderedFeatureItem[]
  heading: PhotoOverlayIntroHeading
  intro: string
}

type BeyondPhotographySectionProps = {
  data: BeyondPhotographySectionData
  headingId: string
}

/**
 * "A poza fotografią…" — personal interests over a full-bleed B&W portrait.
 *
 * Figma `Image` (`6972:15584` / `7092:4630` / `7093:6015`):
 *   <section> — relative, full bleed
 *     ├── <FullBleedPhotoLayer> — absolute backdrop
 *     └── inner layout wrapper — section padding, flex start / justify center
 *         └── <PrimarySurfacePanel>
 *             ├── <PhotoOverlayIntro>
 *             └── <BorderedFeatureList>
 *
 * Section padding: mobile 64/16; tablet 32/80; desktop 32 all sides.
 */
export function BeyondPhotographySection({ data, headingId }: BeyondPhotographySectionProps) {
  const { backdrop, features, heading, intro } = data
  const nodes = BEYOND_PHOTOGRAPHY_SECTION_FIGMA_NODES

  return (
    <section
      aria-labelledby={headingId}
      className="relative w-full overflow-hidden bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={nodes.desktop}
      data-figma-node-mobile={nodes.mobile}
      data-figma-node-tablet={nodes.tablet}
    >
      <FullBleedPhotoLayer
        alt={backdrop.alt}
        crop={backdrop.crop}
        figmaNode={nodes.backdrop.desktop}
        src={backdrop.src}
      />

      <div
        className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start justify-center px-4 py-16 md:px-20 md:py-8 min-[1366px]:px-8 min-[1366px]:py-8"
        data-name="Image"
      >
        <PrimarySurfacePanel figmaNode={nodes.panel.desktop}>
          <PhotoOverlayIntro
            body={intro}
            figmaNodes={{
              body: nodes.intro.body.desktop,
              heading: nodes.intro.heading.desktop,
            }}
            heading={heading}
            headingId={headingId}
          />

          <BorderedFeatureList
            cellDensity="compact"
            figmaNode={nodes.featureList.desktop}
            items={features}
          />
        </PrimarySurfacePanel>
      </div>
    </section>
  )
}
