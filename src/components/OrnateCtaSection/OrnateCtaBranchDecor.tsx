import Image from 'next/image'

import {
  ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME,
  ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME,
  ORNATE_CTA_MOBILE_BOTTOM_DECOR_INSET,
  ORNATE_CTA_MOBILE_TOP_DECOR_INSET,
  type OrnateCtaLayoutMetrics,
} from './geometry'

type OrnateCtaBranchDecorProps = {
  metrics: OrnateCtaLayoutMetrics
  variant:
    | 'desktop-left'
    | 'desktop-right'
    | 'tablet-left'
    | 'tablet-right'
    | 'mobile-top'
    | 'mobile-bottom'
}

const MOBILE_DECOR_CLIP_CLASS = 'h-[63.913px] w-[116.8px]'

const HeartIcon = () => (
  <div className="flex size-3 shrink-0 items-center justify-center">
    <div className="-rotate-90">
      <Image
        alt=""
        className="size-3 max-w-none"
        height={12}
        src="/figma/cta-heart.svg"
        width={12}
      />
    </div>
  </div>
)

const DesktopBranch = () => (
  <div className="flex h-9 w-20 shrink-0 items-center justify-center">
    <div className="-scale-y-100 rotate-90">
      <Image
        alt=""
        className="h-20 w-9 max-w-none"
        height={80}
        src="/figma/cta-branch.svg"
        width={36}
      />
    </div>
  </div>
)

const TabletBranch = () => (
  <div className="flex h-[29px] w-[64.357px] shrink-0 items-center justify-center">
    <div className="-scale-y-100 rotate-90">
      <Image
        alt=""
        className="h-[64.357px] w-[29px] max-w-none"
        height={64}
        src="/figma/cta-branch.svg"
        width={29}
      />
    </div>
  </div>
)

const TabletStack = ({ mirrored }: { mirrored?: boolean }) => {
  const stack = (
    <div className="flex h-[117px] w-[64.357px] flex-col items-center pt-3">
      <HeartIcon />
      <div className="mt-5">
        <TabletBranch />
      </div>
      <div className="mt-8">
        <HeartIcon />
      </div>
    </div>
  )

  if (mirrored) {
    return <div className="-scale-y-100 rotate-180">{stack}</div>
  }

  return stack
}

const MobileDecorRow = () => (
  <div className="flex h-[63.913px] w-[116.8px] items-center justify-center gap-8">
    <HeartIcon />
    <div className="flex h-[63.913px] w-[28.8px] shrink-0 items-center justify-center">
      <Image
        alt=""
        className="h-[63.913px] w-[28.8px] max-w-none"
        height={64}
        src="/figma/cta-branch.svg"
        width={29}
      />
    </div>
    <HeartIcon />
  </div>
)

const DesktopStack = ({ mirrored }: { mirrored?: boolean }) => {
  const stack = (
    <div className="flex flex-col items-center gap-8">
      <HeartIcon />
      <DesktopBranch />
      <HeartIcon />
    </div>
  )

  if (mirrored) {
    return <div className="-scale-y-100 rotate-180">{stack}</div>
  }

  return stack
}

/** Side ornaments — positioned relative to outer frame 8627. */
export function OrnateCtaBranchDecor({ metrics, variant }: OrnateCtaBranchDecorProps) {
  const { tabletDecorLeftInFrame, tabletDecorRightInFrame } = metrics

  if (variant === 'desktop-left') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute z-[5]"
        style={{
          left: ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME.left,
          top: ORNATE_CTA_DESKTOP_DECOR_LEFT_IN_FRAME.top,
        }}
      >
        <DesktopStack />
      </div>
    )
  }

  if (variant === 'desktop-right') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute z-[5]"
        style={{
          left: ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.left,
          top: ORNATE_CTA_DESKTOP_DECOR_RIGHT_IN_FRAME.top,
        }}
      >
        <div className="-scale-y-100 rotate-180">
          <DesktopStack mirrored />
        </div>
      </div>
    )
  }

  if (variant === 'tablet-left') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute z-[5]"
        style={{
          left: tabletDecorLeftInFrame.left,
          top: tabletDecorLeftInFrame.top,
        }}
      >
        <TabletStack />
      </div>
    )
  }

  if (variant === 'tablet-right') {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute z-[5]"
        style={{
          left: tabletDecorRightInFrame.left,
          top: tabletDecorRightInFrame.top,
        }}
      >
        <div className="-scale-y-100 rotate-180">
          <TabletStack mirrored />
        </div>
      </div>
    )
  }

  if (variant === 'mobile-top') {
    return (
      <div
        aria-hidden
        className={`pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-hidden ${MOBILE_DECOR_CLIP_CLASS}`}
        style={{ top: ORNATE_CTA_MOBILE_TOP_DECOR_INSET }}
      >
        <MobileDecorRow />
      </div>
    )
  }

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute left-1/2 -translate-x-1/2 overflow-hidden ${MOBILE_DECOR_CLIP_CLASS}`}
      style={{ bottom: ORNATE_CTA_MOBILE_BOTTOM_DECOR_INSET }}
    >
      <div className="-scale-y-100">
        <MobileDecorRow />
      </div>
    </div>
  )
}
