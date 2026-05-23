import type { CSSProperties } from 'react'

type WaxStampDecorProps = {
  className?: string
}

/**
 * Decorative pink wax stamp with a layered floral overlay.
 *
 * Layout reproduces Figma node 6781:17291 1:1 — the 180 px frame is the unit,
 * everything inside is positioned in percentages so the same composition
 * scales down for tablet (148 px) and mobile (112 px).
 *
 *   stamp PNG                fill of wrapper
 *   floral overlay           24.79% / 26.41% offset, 44.97% × 46.85% size
 *     └─ rotate(-41.31°) inner box (39.98 × 77.143 portrait)
 *         └─ CSS mask flower (cream-coloured div masked by the flower SVG)
 *
 * Why CSS mask instead of `<img>`:
 *   The original Figma asset uses inline SVG `mix-blend-mode: lighten` to
 *   paint the flower in cream against the rose stamp. Browsers do NOT
 *   honour those inline styles when the SVG is loaded through an `<img>`
 *   (or `next/image`), so the flower disappeared. Painting the flower as
 *   a plain `background-color` div masked by the SVG always renders, no
 *   matter how the asset is fetched.
 *
 * Desktop horizontal anchor reproduces the Figma source exactly:
 *   stamp x=782 (centre 872), section width 1366
 *   → right edge of stamp at 962 / 1366 ≈ 29.57 % from right.
 *
 * Pure decoration → `aria-hidden`.
 */
export const WaxStampDecor = ({ className }: WaxStampDecorProps) => {
  // Position + size of the floral overlay inside the stamp, expressed as
  // percentages of the 180 px Figma frame so the layout stays 1:1 across
  // all three breakpoints.
  const FLORAL_LEFT_PCT = (44.63 / 180) * 100
  const FLORAL_TOP_PCT = (47.54 / 180) * 100
  const FLORAL_WIDTH_PCT = (80.953 / 180) * 100
  const FLORAL_HEIGHT_PCT = (84.339 / 180) * 100

  // Inner rotated portrait box: 39.98 × 77.143 inside an 80.953 × 84.339 outer.
  const FLOWER_WIDTH_PCT = (39.98 / 80.953) * 100 // 49.39%
  const FLOWER_HEIGHT_PCT = (77.143 / 84.339) * 100 // 91.47%

  const flowerStyle: CSSProperties = {
    width: `${FLOWER_WIDTH_PCT}%`,
    height: `${FLOWER_HEIGHT_PCT}%`,
    transform: 'rotate(-41.31deg)',
    backgroundColor: 'var(--oczki-tertiary-100)',
    maskImage: 'url(/figma/process-wax-stamp-flower-2.svg)',
    maskSize: 'contain',
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    WebkitMaskImage: 'url(/figma/process-wax-stamp-flower-2.svg)',
    WebkitMaskSize: 'contain',
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
  }

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[57px] z-10 h-28 w-28 md:-top-[75px] md:h-[148px] md:w-[148px] lg:left-auto lg:right-[29.57%] lg:-top-[91px] lg:h-[180px] lg:w-[180px] lg:translate-x-0',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        filter:
          'drop-shadow(1px 4px 2.9px rgba(53, 39, 25, 0.2)) drop-shadow(6px 11px 6.65px rgba(53, 39, 25, 0.12))',
      }}
    >
      <div className="relative h-full w-full rotate-90">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/process-wax-stamp.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: `${FLORAL_LEFT_PCT}%`,
            top: `${FLORAL_TOP_PCT}%`,
            width: `${FLORAL_WIDTH_PCT}%`,
            height: `${FLORAL_HEIGHT_PCT}%`,
          }}
        >
          <div style={flowerStyle} />
        </div>
      </div>
    </div>
  )
}
