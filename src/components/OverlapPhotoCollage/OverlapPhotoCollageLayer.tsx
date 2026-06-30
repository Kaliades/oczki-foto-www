import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import {
  OVERLAP_PHOTO_COLLAGE_FIGMA_NODES,
  OVERLAP_PHOTO_COLLAGE_LAYOUT,
  type OverlapPhotoCollageVariant,
} from './constants'
import { OverlapPhotoCollageBotanical } from './OverlapPhotoCollageBotanical'
import { ScallopFrameEar } from './ScallopFrameEar'

type OverlapPhotoCollageLayerProps = {
  mainPhotoAlt: string
  mainPhotoSrc: string
  scallopPhotoAlt: string
  scallopPhotoSrc: string
  variant: OverlapPhotoCollageVariant
}

const SCALLOP_FRAME_EAR_FIGMA_NODES = {
  desktop: {
    bottom: '6989:25334',
    left: '6989:25329',
    right: '6989:25330',
    top: '6989:25335',
  },
  tablet: {
    bottom: '7100:8043',
    left: '7100:8041',
    right: '7100:8042',
    top: '7100:8044',
  },
  mobile: {
    bottom: '7102:11238',
    left: '7102:11236',
    right: '7102:11237',
    top: '7102:11239',
  },
} as const

/**
 * One breakpoint slice of the overlap collage (`Image Container`).
 *
 * Layer order (back → front): botanical `OBJECTS`, main rectangle, green frame
 * bg + scallop ears, then scallop photo on top (`6989:25173`).
 */
export function OverlapPhotoCollageLayer({
  mainPhotoAlt,
  mainPhotoSrc,
  scallopPhotoAlt,
  scallopPhotoSrc,
  variant,
}: OverlapPhotoCollageLayerProps) {
  const layout = OVERLAP_PHOTO_COLLAGE_LAYOUT[variant]
  const { botanical, mainPhoto, scallopFrame } = layout
  const earNodes = SCALLOP_FRAME_EAR_FIGMA_NODES[variant]

  return (
    <div
      className="relative shrink-0 overflow-visible"
      data-figma-node={OVERLAP_PHOTO_COLLAGE_FIGMA_NODES[variant]}
      data-name="Image Container"
      style={{ height: layout.containerHeight, width: layout.containerWidth }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute z-0 overflow-visible"
        style={{
          height: botanical.height,
          left: botanical.left,
          top: botanical.top,
          width: botanical.width,
        }}
      >
        <OverlapPhotoCollageBotanical height={botanical.height} width={botanical.width} />
      </div>

      <div
        className="absolute z-10 overflow-hidden"
        data-name="Main Image"
        style={{
          height: mainPhoto.height,
          left: mainPhoto.left,
          top: mainPhoto.top,
          width: mainPhoto.width,
        }}
      >
        <Image
          alt={mainPhotoAlt}
          className="object-cover"
          fill
          sizes={`${mainPhoto.width}px`}
          src={mainPhotoSrc}
        />
      </div>

      <div
        className="absolute z-20 box-border overflow-visible rounded-[999px] bg-[var(--oczki-secondary-400)]"
        data-figma-node="6989:25173"
        data-name="Image Group"
        style={{
          height: scallopFrame.height,
          left: scallopFrame.left,
          padding: scallopFrame.padding,
          top: scallopFrame.top,
          width: scallopFrame.width,
        }}
      >
        {(Object.keys(scallopFrame.ears) as Array<keyof typeof scallopFrame.ears>).map((key) => {
          const ear = scallopFrame.ears[key]

          return (
            <ScallopFrameEar
              figmaNode={earNodes[key]}
              key={key}
              {...ear}
            />
          )
        })}

        <div
          className="relative z-10 shrink-0 overflow-hidden rounded-[999px]"
          style={{ height: scallopFrame.photoHeight, width: scallopFrame.photoWidth }}
        >
          <Image
            alt={scallopPhotoAlt}
            className="object-cover"
            fill
            sizes={`${scallopFrame.photoWidth}px`}
            src={scallopPhotoSrc}
          />
        </div>
      </div>
    </div>
  )
}
