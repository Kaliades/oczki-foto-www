import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

type TestimonialPolaroidDecorProps = {
  photoSrc: string
  photoAlt: string
}

/**
 * Desktop geometry for the polaroid composite — Figma node `7102:13808`.
 * All child offsets are expressed in this coordinate space and the whole
 * tree is uniformly scaled per breakpoint so the photo stays locked inside
 * the torn-edge frame at every size.
 */
const DESKTOP = {
  outerW: 396,
  outerH: 482,
  innerLeft: 3.59,
  innerTop: 6.44,
  innerW: 389,
  innerH: 471,
  photoAnchorLeft: 14.61,
  photoAnchorTop: 12.78,
  photoAnchorW: 337,
  photoAnchorH: 379,
  photoW: 258,
  photoH: 319,
  frameAnchorW: 389,
  frameAnchorH: 471,
  frameW: 286,
  frameH: 407,
  tapeLeft: 205.16,
  tapeTop: 8.31,
  tapeW: 103,
  tapeH: 120,
} as const

/** Paperclip asset — Figma node `7102:13812`, viewBox 103 × 120. */
const SPINACZ_SRC = '/figma/spinacz.svg'

const POLAROID_FRAME_CROP = {
  width: '127.8%',
  height: '143.82%',
  left: '-13.74%',
  top: '-23.15%',
} as const

const POLAROID_FRAME_SHADOW =
  'drop-shadow(0.757px 3.029px 4.392px rgba(53,39,25,0.16)) drop-shadow(4.544px 8.33px 10.072px 0px rgba(53,39,25,0.08))'

/**
 * Decorative polaroid + paperclip composite from Figma node `7102:13808`.
 *
 * Placement per breakpoint (Figma screenshots — the component instance
 * exports desktop coordinates for every frame, so we branch in CSS):
 *   - mobile `7105:13897`: bottom-right, scale 0.379×
 *   - tablet `7105:11602`: top-right, tucked toward the cap edge (0.78×,
 *     `right: -135`) so the heading column stays clear
 *   - desktop `7102:14473`: top-right, scale 1× at `top: -49` / `right: -44`
 *     (bleeds above the green section; tablet does not)
 */
export const TestimonialPolaroidDecor = ({
  photoSrc,
  photoAlt,
}: TestimonialPolaroidDecorProps) => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 right-0 z-10 origin-bottom-right scale-[0.379] md:bottom-auto md:right-[-135px] md:top-2 md:origin-top-right md:scale-[0.78] lg:right-[-44px] lg:top-[-49px] lg:z-30 lg:scale-100"
    >
      <div
        className="relative"
        style={{ width: DESKTOP.outerW, height: DESKTOP.outerH }}
      >
        <div
          className="absolute"
          style={{
            left: DESKTOP.innerLeft,
            top: DESKTOP.innerTop,
            width: DESKTOP.innerW,
            height: DESKTOP.innerH,
          }}
        >
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: DESKTOP.photoAnchorLeft,
              top: DESKTOP.photoAnchorTop,
              width: DESKTOP.photoAnchorW,
              height: DESKTOP.photoAnchorH,
            }}
          >
            <div
              className="relative shrink-0"
              style={{
                width: DESKTOP.photoW,
                height: DESKTOP.photoH,
                transform: 'rotate(-16.45deg)',
              }}
            >
              <Image
                alt={photoAlt}
                src={photoSrc}
                fill
                className="select-none object-cover"
                sizes="258px"
              />
            </div>
          </div>

          <div
            className="absolute left-0 top-0 flex items-center justify-center"
            style={{
              width: DESKTOP.frameAnchorW,
              height: DESKTOP.frameAnchorH,
            }}
          >
            <div
              className="relative shrink-0"
              style={{
                width: DESKTOP.frameW,
                height: DESKTOP.frameH,
                transform: 'rotate(-16.45deg)',
                filter: POLAROID_FRAME_SHADOW,
              }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="absolute max-w-none select-none"
                  src="/figma/testimonial-polaroid-photo.png"
                  style={POLAROID_FRAME_CROP}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            left: DESKTOP.tapeLeft,
            top: DESKTOP.tapeTop,
            width: DESKTOP.tapeW,
            height: DESKTOP.tapeH,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="size-full select-none"
            src={SPINACZ_SRC}
          />
        </div>
      </div>
    </div>
  )
}
