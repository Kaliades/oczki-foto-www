import Image from 'next/image'

import {
  CTA_DESKTOP_INNER_FRAME,
  CTA_MOBILE_ORNATE_INNER,
  CTA_MOBILE_ORNATE_OUTER,
  CTA_TABLET_INNER_FRAME,
} from './constants'

type CtaOrnateFrameProps = {
  variant: 'desktop' | 'tablet' | 'mobile'
}

const OUTER_INTRINSIC = { width: 1176, height: 399 } as const
const INNER_INTRINSIC = { width: 1135, height: 367 } as const

const OUTER_BLEED = 'absolute inset-[-0.15%_-0.1%]'
const INNER_BLEED = 'absolute inset-[-0.14%_-0.1%]'
const MOBILE_OUTER_BLEED = 'absolute inset-[-0.15%_-0.22%]'

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

const DESKTOP_OUTER = '/figma/cta-frame-outer-desktop.svg'
const DESKTOP_INNER = '/figma/cta-frame-inner-desktop.svg'

/**
 * Scalloped frame pair — Figma 7105:8981 / 7118:9246 / 7105:14226.
 *
 * Mobile (8560 / 8564): horizontal desktop SVG rotated 90°. Inner uses symmetric
 * inset-4 — an asymmetric top-only offset duplicated the bottom scallop stroke.
 */
export const CtaOrnateFrame = ({ variant }: CtaOrnateFrameProps) => {
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
            height: CTA_DESKTOP_INNER_FRAME.height,
            left: CTA_DESKTOP_INNER_FRAME.left,
            top: CTA_DESKTOP_INNER_FRAME.top,
            width: CTA_DESKTOP_INNER_FRAME.width,
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
            height: CTA_TABLET_INNER_FRAME.height,
            left: CTA_TABLET_INNER_FRAME.left,
            top: CTA_TABLET_INNER_FRAME.top,
            width: CTA_TABLET_INNER_FRAME.width,
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
              height: CTA_MOBILE_ORNATE_OUTER.preRotateHeight,
              width: CTA_MOBILE_ORNATE_OUTER.preRotateWidth,
            }}
          >
            <div className={MOBILE_OUTER_BLEED}>
              <Image
                alt=""
                aria-hidden
                className="block size-full max-w-none"
                height={CTA_MOBILE_ORNATE_OUTER.preRotateHeight}
                src={DESKTOP_OUTER}
                width={CTA_MOBILE_ORNATE_OUTER.preRotateWidth}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{ inset: CTA_MOBILE_ORNATE_INNER.inset }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="relative rotate-90"
            style={{
              height: CTA_MOBILE_ORNATE_INNER.preRotateHeight,
              width: CTA_MOBILE_ORNATE_INNER.preRotateWidth,
            }}
          >
            <div className="absolute inset-[-0.14%_0]">
              <Image
                alt=""
                aria-hidden
                className="block size-full max-w-none"
                height={CTA_MOBILE_ORNATE_INNER.preRotateHeight}
                src={DESKTOP_INNER}
                width={CTA_MOBILE_ORNATE_INNER.preRotateWidth}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
