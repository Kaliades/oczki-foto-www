import Image from 'next/image'

type WaxStampDecorProps = {
  className?: string
}

/**
 * Decorative pink wax stamp with two layered floral vector overlays.
 *
 * In Figma the whole composition is rotated 90°. Sizes per breakpoint:
 * - Desktop ≥ lg: 180 px, anchored top-right.
 * - Tablet md..lg: 148 px, centered above the section.
 * - Mobile < md: 112 px, centered above the section.
 *
 * Pure visual decoration, so it carries `aria-hidden`.
 */
export const WaxStampDecor = ({ className }: WaxStampDecorProps) => {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 -translate-x-1/2 -top-[57px] flex h-28 w-28 items-center justify-center md:-top-[75px] md:h-[148px] md:w-[148px] lg:left-auto lg:right-[14%] lg:-top-[91px] lg:h-[180px] lg:w-[180px] lg:translate-x-0',
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
        <Image
          src="/figma/process-wax-stamp.png"
          alt=""
          fill
          sizes="(min-width: 1024px) 180px, (min-width: 768px) 148px, 112px"
          className="object-cover"
          priority={false}
        />
        <div
          className="absolute left-1/2 top-1/2 h-[47%] w-[45%] -translate-x-1/2 -translate-y-1/2"
          style={{ mixBlendMode: 'lighten' }}
        >
          <div className="relative h-full w-full -rotate-[41.31deg]">
            <Image
              src="/figma/process-wax-stamp-flower-2.svg"
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
            <Image
              src="/figma/process-wax-stamp-flower-1.svg"
              alt=""
              fill
              sizes="80px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
