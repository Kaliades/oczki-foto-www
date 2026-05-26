import {
  GALLERY_HERO_DECOR_ASSETS,
  GALLERY_HERO_DECOR_FRAMES,
  GALLERY_HERO_FIGMA_NODES,
  GALLERY_HERO_NAVBAR_GUTTER_CLASS,
  GALLERY_HERO_NAVBAR_GUTTER_END_CLASS,
} from './constants'

type DecorFrameProps = {
  src: string
  intrinsicWidth: number
  intrinsicHeight: number
  figmaNode: string
  className: string
}

function DecorFrame({ src, intrinsicWidth, intrinsicHeight, figmaNode, className }: DecorFrameProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
      data-figma-node={figmaNode}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        className="block size-full max-w-none"
        height={intrinsicHeight}
        src={src}
        width={intrinsicWidth}
      />
    </div>
  )
}

/**
 * Botanical ornaments — Figma `OBJECTS` (left) and `Group` (right).
 * Horizontal: left stem column aligns with navbar logo; right stem with Umów sesję (cap gutter).
 * Vertical: Figma hero metadata (top / height per breakpoint).
 */
export function GalleryHeroDecor() {
  const { left, right } = GALLERY_HERO_DECOR_FRAMES

  return (
    <>
      <DecorFrame
        className={`${GALLERY_HERO_NAVBAR_GUTTER_CLASS} top-[216px] h-[228px] w-[187px] md:top-[159px] md:h-[309px] md:w-[253px] lg:top-[73px] lg:h-[394px] lg:w-[323px]`}
        figmaNode={GALLERY_HERO_FIGMA_NODES.decorLeft.tablet}
        intrinsicHeight={left.intrinsicHeight}
        intrinsicWidth={left.intrinsicWidth}
        src={GALLERY_HERO_DECOR_ASSETS.left}
      />
      <DecorFrame
        className={`${GALLERY_HERO_NAVBAR_GUTTER_END_CLASS} top-[-67px] h-[185px] w-[147px] md:top-[-45px] md:h-[284px] md:w-[200px] lg:top-[-37px] lg:h-[347px] lg:w-[255px]`}
        figmaNode={GALLERY_HERO_FIGMA_NODES.decorRight.tablet}
        intrinsicHeight={right.intrinsicHeight}
        intrinsicWidth={right.intrinsicWidth}
        src={GALLERY_HERO_DECOR_ASSETS.right}
      />
    </>
  )
}
