import Image from 'next/image'

import { ABOUT_HERO_FIGMA_NODES, type AboutHeroLayoutVariant } from './constants'

type SecondaryPhotoBox = {
  height: number
  left: number
  top: number
  width: number
}

type AboutHeroSecondaryPhotoProps = {
  alt: string
  box: SecondaryPhotoBox
  /** Copy-column inset — used to bleed the photo past the button’s right edge. */
  contentInset?: number
  flowGap?: number
  layout?: 'absolute' | 'flow'
  src: string
  variant: AboutHeroLayoutVariant
}

const SECONDARY_SIZES: Record<AboutHeroLayoutVariant, string> = {
  mobile: '237px',
  tablet: '435px',
  desktop: '411px',
}

/** Landscape accent photo — Figma `Featured Image Left`. */
export function AboutHeroSecondaryPhoto({
  alt,
  box,
  contentInset = 0,
  flowGap,
  layout = 'absolute',
  src,
  variant,
}: AboutHeroSecondaryPhotoProps) {
  const isFlow = layout === 'flow'

  return (
    <div
      className={isFlow ? 'relative z-[1] shrink-0' : 'absolute z-[1]'}
      data-figma-node={ABOUT_HERO_FIGMA_NODES.secondaryPhoto[variant]}
      data-name="Featured Image Left"
      style={{
        height: box.height,
        ...(isFlow
          ? {
              marginLeft: `calc(100% - ${box.width - contentInset}px)`,
              marginTop: flowGap,
              width: box.width,
            }
          : { left: box.left, top: box.top, width: box.width }),
      }}
    >
      <Image
        alt={alt}
        className="object-cover"
        fill
        priority={false}
        sizes={SECONDARY_SIZES[variant]}
        src={src}
      />
    </div>
  )
}
