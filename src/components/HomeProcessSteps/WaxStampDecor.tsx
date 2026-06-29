import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

type WaxStampDecorProps = {
  className?: string
}

/**
 * Decorative wax-pressed stamp with the cream botanical motif.
 *
 * Source: `process-wax-stamp.svg` — the Firefly raster of the wax body
 * (originally exported from Figma node 6781:17292 as a 1024 × 1024 base64
 * PNG embedded inside a 180 × 180 SVG viewBox) composed with the floral
 * vector overlay (path from 6781:17293) using `mix-blend-mode: lighten`
 * to keep the organic, hand-pressed look at retina resolution.
 *
 * Sizing per breakpoint (Figma 1:1 — nodes 7105:13764 / 7105:11469 / 6781:17291):
 *   - mobile  (frame 360):  112 × 112, top `-57`
 *   - tablet  (frame 768):  148 × 148, top `-75`
 *   - desktop (frame 1366): 180 × 180, top `-91`
 *
 * Horizontal anchor: the stamp is centred on every breakpoint
 * (`left-1/2 -translate-x-1/2`). Inside the two-layer section shell the
 * centring is relative to the 1366 cap, so on ultra-wide displays the
 * stamp tracks the content rather than the viewport.
 *
 * Pure decoration → `aria-hidden`.
 */
export const WaxStampDecor = ({ className }: WaxStampDecorProps) => {
  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 -top-[57px] z-10 h-[112px] w-[112px] -translate-x-1/2 md:-top-[75px] md:h-[148px] md:w-[148px] lg:-top-[91px] lg:h-[180px] lg:w-[180px]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Image
        alt=""
        src="/figma/process-wax-stamp.svg"
        width={180}
        height={180}
        className="h-full w-full select-none"
        priority={false}
      />
    </div>
  )
}
