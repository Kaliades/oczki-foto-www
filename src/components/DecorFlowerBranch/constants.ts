import type { TiltedPhotoFrameVariant } from '@/components/TiltedPhotoFrame/constants'

export type DecorFlowerBranchVariant = TiltedPhotoFrameVariant

export type DecorFlowerBranchLayout = {
  figmaNode: string
  /** Figma axis-aligned bbox after rotation — placement wrapper. */
  left: number
  top: number
  width: number
  height: number
  rotateDeg: number
  assetWidth: number
  assetHeight: number
  asset: string
}

export const DECOR_FLOWER_BRANCH_ASSET = '/figma/ease-cluster/flower-branch.svg' as const

const DESKTOP_FLOWER_ASSET_WIDTH = 217
const DESKTOP_FLOWER_ASSET_HEIGHT = 215

/** Figma `6952:19970` / `7104:19043` / `7104:19346`. */
export const DECOR_FLOWER_BRANCH_LAYOUT: Record<
  DecorFlowerBranchVariant,
  DecorFlowerBranchLayout
> = {
  desktop: {
    figmaNode: '6952:19970',
    left: 475.4,
    top: 151.1,
    width: 216.1,
    height: 214.2,
    rotateDeg: 0,
    assetWidth: DESKTOP_FLOWER_ASSET_WIDTH,
    assetHeight: DESKTOP_FLOWER_ASSET_HEIGHT,
    asset: DECOR_FLOWER_BRANCH_ASSET,
  },
  tablet: {
    figmaNode: '7104:19043',
    left: 379.8,
    top: 129,
    width: 172.9,
    height: 171.4,
    rotateDeg: 0,
    assetWidth: 174,
    assetHeight: 172,
    asset: DECOR_FLOWER_BRANCH_ASSET,
  },
  mobile: {
    figmaNode: '7104:19346',
    left: 227.3,
    top: 77,
    width: 104.2,
    height: 103.5,
    rotateDeg: 0,
    assetWidth: 104,
    assetHeight: 104,
    asset: DECOR_FLOWER_BRANCH_ASSET,
  },
}
