import Image from 'next/image'

import { ABOUT_HERO_FIGMA_NODES, type AboutHeroLayoutVariant } from './constants'

type PortraitBox = {
  height: number
  left: number
  top: number
  width: number
}

type AboutHeroPortraitProps = {
  alt: string
  box: PortraitBox
  src: string
  variant: AboutHeroLayoutVariant
}

const PORTRAIT_SIZES: Record<AboutHeroLayoutVariant, string> = {
  mobile: '136px',
  tablet: '225px',
  desktop: '364px',
}

/** Lead portrait — Figma `Featured Image Right`. */
export function AboutHeroPortrait({ alt, box, src, variant }: AboutHeroPortraitProps) {
  return (
    <div
      className="absolute z-[1] overflow-visible"
      data-figma-node={ABOUT_HERO_FIGMA_NODES.portrait[variant]}
      data-name="Featured Image Right"
      style={{
        height: box.height,
        left: box.left,
        top: box.top,
        width: box.width,
      }}
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority
        sizes={PORTRAIT_SIZES[variant]}
        src={src}
      />
    </div>
  )
}
