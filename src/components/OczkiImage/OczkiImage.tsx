import NextImage, { type ImageProps } from 'next/image'

import { IMAGE_MAX_QUALITY } from '@/constants/image'

/**
 * Site-wide next/image wrapper — always optimizes at max quality (100).
 * Use for every photograph; icons/SVGs may keep next/image directly.
 */
export function OczkiImage({ quality = IMAGE_MAX_QUALITY, ...props }: ImageProps) {
  return <NextImage quality={quality} {...props} />
}
