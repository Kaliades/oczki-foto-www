import { BRACKET_PHOTO_FRAME_ASSETS } from './constants'

type BracketPhotoBotanicalProps = {
  width: number
  height: number
}

/**
 * Figma `OBJECTS` (`6972:18736`) — single 190×325 SVG, scaled per breakpoint.
 * Color `#96A38B` matches `--oczki-secondary-400`.
 */
export function BracketPhotoBotanical({ width, height }: BracketPhotoBotanicalProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      aria-hidden
      className="block size-full max-w-none"
      height={height}
      src={BRACKET_PHOTO_FRAME_ASSETS.botanical}
      width={width}
    />
  )
}
