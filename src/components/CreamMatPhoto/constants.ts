export type CreamMatPhotoVariant = 'desktop' | 'tablet' | 'mobile'

type CreamMatPhotoLayout = {
  figmaNode: string
  shellWidth: number
  shellHeight: number
  padding: number
  imageWidth: number
  imageHeight: number
  shadow: string
}

/** Figma cream mat + cover photo (`6986:19957` / `7104:20203` / `7111:8999`). */
export const CREAM_MAT_PHOTO_LAYOUT: Record<CreamMatPhotoVariant, CreamMatPhotoLayout> = {
  desktop: {
    figmaNode: '6986:19957',
    shellWidth: 268,
    shellHeight: 331,
    padding: 6,
    imageWidth: 256,
    imageHeight: 319,
    shadow:
      '1px 4px 2.9px rgba(53,39,25,0.12), 6px 11px 6.65px rgba(53,39,25,0.06)',
  },
  tablet: {
    figmaNode: '7104:20203',
    shellWidth: 221,
    shellHeight: 273,
    padding: 4,
    imageWidth: 213,
    imageHeight: 265,
    shadow:
      '0.832px 3.327px 2.412px rgba(53,39,25,0.12), 4.991px 9.15px 5.531px rgba(53,39,25,0.06)',
  },
  mobile: {
    figmaNode: '7111:8999',
    shellWidth: 139,
    shellHeight: 171,
    padding: 4,
    imageWidth: 131,
    imageHeight: 163,
    shadow:
      '0.512px 2.048px 1.485px rgba(53,39,25,0.12), 3.072px 5.632px 3.405px rgba(53,39,25,0.06)',
  },
}
