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
 * Why CSS, not the Figma raster:
 *   The Firefly-generated PNG asset that Figma exports for the wax body
 *   comes back empty (1024×1024 transparent) through the MCP, regardless
 *   of how often we re-fetch the URL. Painting the wax in pure CSS —
 *   `border-radius: 50%` + radial-gradient between the rose tokens — is
 *   visually equivalent, never expires, and renders deterministically on
 *   every device.
 *
 * Composition:
 *   wax body (CSS gradient, radius 50%, drop shadow)        full frame
 *   floral overlay                                          24.79% / 26.41%
 *     └─ rotate(-41.31°) inner box (39.98 × 77.143)            of 80.953 / 84.339
 *         └─ flat cream div masked by the flower SVG
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
  const FLOWER_WIDTH_PCT = (39.98 / 80.953) * 100
  const FLOWER_HEIGHT_PCT = (77.143 / 84.339) * 100

  // Wax body — radial gradient gives the soft 3-d look of a real seal.
  const waxStyle: CSSProperties = {
    background:
      'radial-gradient(circle at 32% 28%, var(--oczki-tertiary-300) 0%, var(--oczki-tertiary-700) 65%, #c08585 100%)',
    boxShadow:
      'inset -6px -10px 18px rgba(140, 90, 90, 0.35), inset 6px 8px 18px rgba(255, 230, 228, 0.45)',
  }

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
        <div className="absolute inset-0 rounded-full" style={waxStyle} />
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
