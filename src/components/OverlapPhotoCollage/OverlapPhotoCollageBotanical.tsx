import { OVERLAP_PHOTO_COLLAGE_ASSETS } from './constants'

type OverlapPhotoCollageBotanicalProps = {
  height: number
  width: number
}

/** Figma `OBJECTS` (`6994:25775`) — 229×301 SVG export, scaled per breakpoint. */
export function OverlapPhotoCollageBotanical({ height, width }: OverlapPhotoCollageBotanicalProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden
      className="block size-full max-w-none"
      data-figma-node="6994:25775"
      data-name="OBJECTS"
      height={height}
      src={OVERLAP_PHOTO_COLLAGE_ASSETS.botanical}
      width={width}
    />
  )
}
