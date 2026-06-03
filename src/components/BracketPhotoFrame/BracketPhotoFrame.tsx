import { BracketPhotoFrameLayer } from './BracketPhotoFrameLayer'

type BracketPhotoFrameProps = {
  imageSrc: string
  imageAlt: string
}

/**
 * Arch bracket photo with cream union mat and botanical `OBJECTS` overlay.
 * Responsive asset sets — Figma `6972:18735` / `7102:12560` / `7102:16486`.
 */
export function BracketPhotoFrame({ imageSrc, imageAlt }: BracketPhotoFrameProps) {
  return (
    <div className="relative z-0 shrink-0">
      <div className="md:hidden">
        <BracketPhotoFrameLayer imageAlt={imageAlt} imageSrc={imageSrc} variant="mobile" />
      </div>
      <div className="hidden md:block lg:hidden">
        <BracketPhotoFrameLayer imageAlt={imageAlt} imageSrc={imageSrc} variant="tablet" />
      </div>
      <div className="hidden lg:block">
        <BracketPhotoFrameLayer imageAlt={imageAlt} imageSrc={imageSrc} variant="desktop" />
      </div>
    </div>
  )
}
