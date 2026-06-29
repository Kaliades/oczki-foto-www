import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  ORNATE_CTA_DESKTOP_INNER_FRAME,
  type OrnateCtaLayoutMetrics,
} from './geometry'

type OrnateCtaFrameProps = {
  metrics: OrnateCtaLayoutMetrics
  variant: 'desktop' | 'tablet' | 'mobile'
}

const OUTER_INTRINSIC = { width: 1176, height: 399 } as const
const INNER_INTRINSIC = { width: 1135, height: 367 } as const

const OUTER_BLEED = 'absolute inset-[-0.15%_-0.1%]'
const INNER_BLEED = 'absolute inset-[-0.14%_-0.1%]'
const MOBILE_OUTER_BLEED = 'absolute inset-[-0.15%_-0.22%]'

const DESKTOP_OUTER = '/figma/cta-frame-outer-desktop.svg'
const DESKTOP_INNER = '/figma/cta-frame-inner-desktop.svg'

type FrameLayerProps = {
  className: string
  height: number
  insetClassName: string
  src: string
  width: number
}

const FrameLayer = ({ className, height, insetClassName, src, width }: FrameLayerProps) => (
  <div className={className}>
    <div className={insetClassName}>
      <Image alt="" aria-hidden className="block size-full max-w-none" height={height} src={src} width={width} />
    </div>
  </div>
)

/**
 * Scalloped frame pair — Figma 7105:8627 / 7105:8634.
 *
 * Mobile: horizontal desktop SVG rotated 90°.
 */
export function OrnateCtaFrame({ metrics, variant }: OrnateCtaFrameProps) {
  const { mobileOrnateInner, mobileOrnateOuter, tabletInnerFrame } = metrics

  if (variant === 'desktop') {
    return (
      <>
        <FrameLayer
          className="pointer-events-none absolute inset-0 z-0 overflow-visible"
          height={OUTER_INTRINSIC.height}
          insetClassName={OUTER_BLEED}
          src={DESKTOP_OUTER}
          width={OUTER_INTRINSIC.width}
        />
        <div
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{
            height: ORNATE_CTA_DESKTOP_INNER_FRAME.height,
            left: ORNATE_CTA_DESKTOP_INNER_FRAME.left,
            top: ORNATE_CTA_DESKTOP_INNER_FRAME.top,
            width: ORNATE_CTA_DESKTOP_INNER_FRAME.width,
          }}
        >
          <div className={INNER_BLEED}>
            <Image
              alt=""
              aria-hidden
              className="block size-full max-w-none"
              height={INNER_INTRINSIC.height}
              src={DESKTOP_INNER}
              width={INNER_INTRINSIC.width}
            />
          </div>
        </div>
      </>
    )
  }

  if (variant === 'tablet') {
    return (
      <>
        <FrameLayer
          className="pointer-events-none absolute inset-0 z-0 overflow-visible"
          height={OUTER_INTRINSIC.height}
          insetClassName={OUTER_BLEED}
          src={DESKTOP_OUTER}
          width={OUTER_INTRINSIC.width}
        />
        <div
          className="pointer-events-none absolute z-0 overflow-visible"
          style={{
            height: tabletInnerFrame.height,
            left: tabletInnerFrame.left,
            top: tabletInnerFrame.top,
            width: tabletInnerFrame.width,
          }}
        >
          <div className={INNER_BLEED}>
            <Image
              alt=""
              aria-hidden
              className="block size-full max-w-none"
              height={INNER_INTRINSIC.height}
              src={DESKTOP_INNER}
              width={INNER_INTRINSIC.width}
            />
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative rotate-90"
            style={{
              height: mobileOrnateOuter.preRotateHeight,
              width: mobileOrnateOuter.preRotateWidth,
            }}
          >
            <div className={MOBILE_OUTER_BLEED}>
              <Image
                alt=""
                aria-hidden
                className="block size-full max-w-none"
                height={mobileOrnateOuter.preRotateHeight}
                src={DESKTOP_OUTER}
                width={mobileOrnateOuter.preRotateWidth}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{ inset: mobileOrnateInner.inset }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative rotate-90"
            style={{
              height: mobileOrnateInner.preRotateHeight,
              width: mobileOrnateInner.preRotateWidth,
            }}
          >
            <div className="absolute inset-[-0.14%_0]">
              <Image
                alt=""
                aria-hidden
                className="block size-full max-w-none"
                height={mobileOrnateInner.preRotateHeight}
                src={DESKTOP_INNER}
                width={mobileOrnateInner.preRotateWidth}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
