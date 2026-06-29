import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { FOOTER_NEWSLETTER_SHELL } from './constants'

/** 112 px diameter, −12 px overlap → 100 px step; 96 tiles cover ~9.6 k px. */
const SCALLOP_COUNT = 96
const scallopItems = Array.from({ length: SCALLOP_COUNT }, (_, index) => index)

const { scallopOverlapUp, stopkaContentPaddingTop } = FOOTER_NEWSLETTER_SHELL.footer

export { scallopOverlapUp as FOOTER_SCALLOP_OVERLAP_UP_PX }
export { stopkaContentPaddingTop as FOOTER_STOPKA_PADDING_TOP_PX }

/**
 * Overlapping cream circles between newsletter and footer (Figma `7091:3634`).
 *
 * Absolutely positioned on the footer shell so tiles sit above the newsletter
 * (`z-10`) without covering stopka links — copy clears the row via
 * {@link FOOTER_NEWSLETTER_SHELL.footer.stopkaContentPaddingTop} on the cream block below.
 */
export function FooterScallopRow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 overflow-hidden"
      data-figma-node="7091:3634"
      style={{ transform: `translateY(-${scallopOverlapUp}px)` }}
    >
      <div className="absolute left-1/2 flex h-28 w-max -translate-x-1/2 items-center">
        {scallopItems.map((item) => (
          <div
            className="relative size-28 shrink-0 [&:not(:last-child)]:-mr-3"
            key={item}
          >
            <Image
              alt=""
              className="block size-28 max-w-none"
              height={112}
              src="/figma/footer-scallop-circle.svg"
              width={112}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
