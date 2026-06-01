import { DecorDotsField } from '@/components/DecorDotsField/DecorDotsField'

import type { HomeEaseData } from './constants'
import { HOME_EASE_FIGMA_NODES } from './constants'
import { EaseInProgressMark } from './EaseInProgressMark'
import { EasePhotoVisual } from './EasePhotoVisual'
import { EaseSectionCopy } from './EaseSectionCopy'

type HomeEaseProps = {
  data: HomeEaseData
}

/**
 * "Zdjęcia pełne lekkości…" — session-feel section below gallery.
 *
 * Figma: desktop `6912:13184`, tablet `7104:18140`, mobile `7104:19341`.
 */
export function HomeEase({ data }: HomeEaseProps) {
  const { heading, body, tiltedPhoto } = data

  return (
    <section
      aria-labelledby="home-ease-heading"
      className="relative w-full bg-[var(--oczki-primary-200)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_EASE_FIGMA_NODES.desktopFrame}
    >
      {/* TODO(galeria/ease): Remove when visual cluster matches Figma (branch + quote badge shipped). */}
      <EaseInProgressMark />

      {/* Mobile — 360, Figma 7104:19341 */}
      <div className="relative mx-auto w-full max-w-[360px] px-4 py-12 md:hidden">
        <DecorDotsField variant="mobile" />
        <div className="relative flex flex-col items-center gap-7">
          <EaseSectionCopy body={body} heading={heading} />
          <EasePhotoVisual tiltedPhoto={tiltedPhoto} variant="mobile" />
        </div>
      </div>

      {/* Tablet — 768, Figma 7104:18140 */}
      <div
        className="relative mx-auto hidden w-full max-w-[768px] px-20 py-12 md:block lg:hidden"
        data-figma-node={HOME_EASE_FIGMA_NODES.tabletFrame}
      >
        <DecorDotsField variant="tablet" />
        <div className="relative flex flex-col items-center gap-7">
          <EaseSectionCopy
            body={body}
            className="w-full pr-[196px]"
            heading={heading}
          />
          <EasePhotoVisual tiltedPhoto={tiltedPhoto} variant="tablet" />
        </div>
      </div>

      {/* Desktop — 1366, Figma 6912:13184 */}
      <div className="relative mx-auto hidden w-full max-w-[1366px] pl-16 pr-20 pt-6 pb-12 lg:block">
        <DecorDotsField variant="desktop" />
        <div className="flex min-h-[617px] items-center justify-between">
          <EasePhotoVisual tiltedPhoto={tiltedPhoto} variant="desktop" />
          <EaseSectionCopy body={body} heading={heading} />
        </div>
      </div>
    </section>
  )
}
