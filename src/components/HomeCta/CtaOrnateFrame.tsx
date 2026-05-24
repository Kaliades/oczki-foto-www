import Image from 'next/image'

type CtaOrnateFrameProps = {
  variant: 'desktop' | 'tablet' | 'mobile'
}

type FrameLayerProps = {
  className: string
  height: number
  insetClassName?: string
  src: string
  width: number
}

const FrameLayer = ({ className, height, insetClassName, src, width }: FrameLayerProps) => (
  <div className={className}>
    <div className={insetClassName ?? 'absolute inset-0'}>
      <Image alt="" aria-hidden className="block size-full max-w-none" height={height} src={src} width={width} />
    </div>
  </div>
)

const DESKTOP_OUTER = '/figma/cta-frame-outer-desktop.svg'
const DESKTOP_INNER = '/figma/cta-frame-inner-desktop.svg'

/**
 * Scalloped frame pair — Figma 7105:8981 / 7118:9246 / 7105:14226.
 *
 * Mobile fills its parent shell (328×593). The horizontal bracket SVG is
 * rotated 90° to match the vertical 8560/8564 variant; Figma mobile
 * exports ship a wrong green fill on the inner half, so we reuse desktop
 * inner paths for the correct cream + pink stroke.
 */
export const CtaOrnateFrame = ({ variant }: CtaOrnateFrameProps) => {
  if (variant === 'desktop') {
    return (
      <>
        <FrameLayer
          className="pointer-events-none absolute left-[96px] top-[81.6px] h-[398px] w-[1174px]"
          height={398}
          insetClassName="absolute inset-[-0.13%_0]"
          src={DESKTOP_OUTER}
          width={1174}
        />
        <FrameLayer
          className="pointer-events-none absolute left-[117px] top-[97.6px] h-[366px] w-[1133px]"
          height={366}
          insetClassName="absolute inset-[-0.14%_0]"
          src={DESKTOP_INNER}
          width={1133}
        />
      </>
    )
  }

  if (variant === 'tablet') {
    return (
      <>
        <FrameLayer
          className="pointer-events-none absolute inset-0 z-0"
          height={389}
          insetClassName="absolute inset-[-0.13%_0]"
          src={DESKTOP_OUTER}
          width={672}
        />
        <FrameLayer
          className="pointer-events-none absolute left-[21px] top-4 z-0 h-[358px] w-[648px]"
          height={358}
          insetClassName="absolute inset-[-0.14%_0]"
          src={DESKTOP_INNER}
          width={648}
        />
      </>
    )
  }

  return (
  <>
    {/* Outer — 8560 at (16, 25) → 328×593 inside frame shell */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[328px] w-[593px] rotate-90">
          <div className="absolute inset-[-0.15%_-0.22%]">
            <Image
              alt=""
              aria-hidden
              className="block size-full max-w-none"
              height={328}
              src={DESKTOP_OUTER}
              width={593}
            />
          </div>
        </div>
      </div>
    </div>
    {/* Inner — 8564 at (32, 41) → offset 16 px inside shell, 296×545 */}
    <div className="pointer-events-none absolute left-4 top-4 h-[545px] w-[296px]">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-[296px] w-[545px] rotate-90">
          <div className="absolute inset-[-0.14%_0]">
            <Image
              alt=""
              aria-hidden
              className="block size-full max-w-none"
              height={296}
              src={DESKTOP_INNER}
              width={545}
            />
          </div>
        </div>
      </div>
    </div>
  </>
  )
}
