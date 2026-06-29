import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  CASE_STUDY_HERO_BACKGROUND,
  CASE_STUDY_HERO_FIGMA_NODES,
} from './constants'

type CaseStudyHeroBackgroundProps = {
  alt: string
  src?: string
}

/**
 * Full-bleed hero photograph with left-to-right white wash — Figma `image 58` (648 px tall).
 */
export function CaseStudyHeroBackground({
  alt,
  src = CASE_STUDY_HERO_BACKGROUND.src,
}: CaseStudyHeroBackgroundProps) {
  return (
    <div
      aria-hidden
      className="absolute inset-0 h-[648px] w-full"
      data-figma-node={CASE_STUDY_HERO_FIGMA_NODES.background.desktop}
    >
      <Image
        alt={alt}
        className="size-full object-cover object-[18%_center] md:object-left lg:object-[center_25%]"
        fill
        priority
        sizes="100vw"
        src={src}
      />
      <div className="absolute inset-0 bg-gradient-to-l from-white/0 to-white/[0.16]" />
    </div>
  )
}
