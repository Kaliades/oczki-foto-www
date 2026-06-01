export type TiltedPhotoFrameVariant = 'desktop' | 'tablet' | 'mobile'

type TiltedPhotoFrameLayout = {
  figmaNode: string
  left: number
  top: number
  shellWidth: number
  shellHeight: number
  rotateDeg: number
  frameWidth: number
  frameHeight: number
  padding: number
  imageHeight: number
}

/** Figma `6952:19918` — tilted cream mat + cover photo (no envelope vectors). */
export const TILTED_PHOTO_FRAME_LAYOUT: Record<TiltedPhotoFrameVariant, TiltedPhotoFrameLayout> = {
  desktop: {
    figmaNode: '6952:19918',
    left: 11,
    top: 12,
    shellWidth: 503,
    shellHeight: 434,
    rotateDeg: 16.61,
    frameWidth: 428,
    frameHeight: 325,
    padding: 8,
    imageHeight: 309,
  },
  tablet: {
    figmaNode: '7104:19108',
    left: 8,
    top: 10,
    shellWidth: 402,
    shellHeight: 347,
    rotateDeg: 16.61,
    frameWidth: 342,
    frameHeight: 260,
    padding: 6,
    imageHeight: 247,
  },
  mobile: {
    figmaNode: '7104:19411',
    left: 4,
    top: 5,
    shellWidth: 241,
    shellHeight: 208,
    rotateDeg: 16.61,
    frameWidth: 205,
    frameHeight: 156,
    padding: 4,
    imageHeight: 148,
  },
}

export const EASE_PHOTO_CLUSTER_LAYOUT = {
  desktop: { width: 692, height: 545, figmaNode: '6952:19969' },
  tablet: { width: 554, height: 436, figmaNode: '7104:19042' },
  mobile: { width: 332, height: 262, figmaNode: '7104:19345' },
} as const
