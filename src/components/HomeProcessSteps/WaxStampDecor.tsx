type WaxStampDecorProps = {
  className?: string
}

/**
 * Decorative pink wax stamp with a layered floral overlay (mix-blend-lighten
 * gives the white flower silhouette on the rose-coloured wax).
 *
 * Layout reproduces Figma node 6781:17291 1:1 — the 180 px frame is the unit,
 * everything inside is positioned in percentages so the same composition
 * scales down for tablet (148 px) and mobile (112 px).
 *
 *   stamp PNG                fill of wrapper
 *   floral overlay  →        24.79% / 26.41% offset, 44.97% × 46.85% size
 *     (mix-blend-lighten)
 *     └─ rotate(-41.31°) inner box (39.98 × 77.143 portrait)
 *         └─ two stacked vector SVGs (one main, one as the highlight)
 *
 * The wrapper itself is rotated 90° per the Figma source and sized per
 * breakpoint. Pure decoration → `aria-hidden`.
 *
 * Native `<img>` is intentional: `next/image` with `fill` strips inline SVG
 * styles (the floral artwork loses its `mix-blend-mode:lighten` and
 * `var(--fill-0)` colour, leaving the stamp visually incomplete).
 */
export const WaxStampDecor = ({ className }: WaxStampDecorProps) => {
  // Position + size of the floral overlay inside the stamp, expressed as
  // percentages of the 180 px Figma frame so the layout stays 1:1 across
  // all three breakpoints.
  const FLORAL_LEFT_PCT = (44.63 / 180) * 100 // 24.794%
  const FLORAL_TOP_PCT = (47.54 / 180) * 100 // 26.411%
  const FLORAL_WIDTH_PCT = (80.953 / 180) * 100 // 44.974%
  const FLORAL_HEIGHT_PCT = (84.339 / 180) * 100 // 46.855%

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[57px] z-10 h-28 w-28 md:-top-[75px] md:h-[148px] md:w-[148px] lg:left-auto lg:right-[14%] lg:-top-[91px] lg:h-[180px] lg:w-[180px] lg:translate-x-0',
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
            mixBlendMode: 'lighten',
          }}
        >
          <div className="relative h-[91.5%] w-[49.4%] -rotate-[41.31deg]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-wax-stamp-flower-1.svg"
              alt=""
              className="absolute h-[102.6%] w-[105%] -inset-x-[2.5%] -inset-y-[1.3%] max-w-none"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-wax-stamp-flower-2.svg"
              alt=""
              className="absolute inset-0 h-full w-full max-w-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
