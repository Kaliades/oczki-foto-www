import Image from 'next/image'

type CtaOrnateFrameProps = {
  className?: string
}

/**
 * Double-layer scalloped frame — Figma bbox positions, no object-fill stretch.
 *
 * Desktop (7105:8627 / 7105:8634): outer 1174×398 at (48, −14), inner 1133×366
 * at (69, 2) relative to the 1270×370 card shell.
 *
 * Tablet scales the same horizontal pair to the 608×362 card (ratio 608/1270).
 *
 * Mobile (7105:8560 / 7105:8564): vertical pair filling the 328×593 shell.
 */
export const CtaOrnateFrame = ({ className }: CtaOrnateFrameProps) => {
  return (
    <div
      aria-hidden="true"
      className={['pointer-events-none absolute inset-0', className].filter(Boolean).join(' ')}
    >
      {/* Mobile — vertical frame, 328 × 593 (Figma 7105:8553) */}
      <Image
        alt=""
        className="absolute left-0 top-0 max-w-none md:hidden"
        height={593}
        src="/figma/cta-frame-outer-mobile.svg"
        width={328}
      />
      <Image
        alt=""
        className="absolute left-[4%] top-[3%] max-w-none md:hidden"
        height={545}
        src="/figma/cta-frame-inner-mobile.svg"
        width={296}
      />

      {/* Tablet — scaled horizontal frame (608 × 362 card) */}
      <Image
        alt=""
        className="absolute left-[23px] -top-[14px] hidden max-w-none md:block lg:hidden"
        height={390}
        src="/figma/cta-frame-outer-desktop.svg"
        width={562}
      />
      <Image
        alt=""
        className="absolute left-[33px] top-[2px] hidden max-w-none md:block lg:hidden"
        height={358}
        src="/figma/cta-frame-inner-desktop.svg"
        width={542}
      />

      {/* Desktop — horizontal frame 1:1 (1270 × 370 card) */}
      <Image
        alt=""
        className="absolute left-[48px] -top-[14px] hidden max-w-none lg:block"
        height={398}
        src="/figma/cta-frame-outer-desktop.svg"
        width={1174}
      />
      <Image
        alt=""
        className="absolute left-[69px] top-[2px] hidden max-w-none lg:block"
        height={366}
        src="/figma/cta-frame-inner-desktop.svg"
        width={1133}
      />
    </div>
  )
}
