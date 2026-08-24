'use client'

import NextImage, { type ImageProps } from 'next/image'
import { useState } from 'react'

import {
  usePhotoUnitRevealActive,
  usePhotoUnitRevealOnLoad,
} from '@/components/PhotoUnitReveal'
import { IMAGE_MAX_QUALITY } from '@/constants/image'
import { cn } from '@/utilities/ui'

type OczkiImageProps = ImageProps & {
  /**
   * When false, does not notify a parent `PhotoUnitReveal` and does not solo-fade
   * (use for decorative SVG chrome that must not gate the photograph).
   */
  participateInReveal?: boolean
}

/**
 * Site-wide next/image wrapper — max quality (100).
 * - Inside `PhotoUnitReveal`: notifies the unit so frame+photo fade in together.
 * - Elsewhere: fades the bitmap in alone (no empty flash of broken/missing paint).
 */
export function OczkiImage({
  quality = IMAGE_MAX_QUALITY,
  onLoad,
  className,
  participateInReveal = true,
  ...props
}: OczkiImageProps) {
  const inUnit = usePhotoUnitRevealActive()
  const reveal = usePhotoUnitRevealOnLoad()
  const [soloReady, setSoloReady] = useState(!participateInReveal)

  return (
    <NextImage
      className={cn(
        participateInReveal && !inUnit && 'transition-opacity duration-300 ease-out',
        participateInReveal && !inUnit && (soloReady ? 'opacity-100' : 'opacity-0'),
        className,
      )}
      quality={quality}
      {...props}
      onLoad={(event) => {
        if (participateInReveal) {
          reveal.onLoad?.(event)
          if (!inUnit) setSoloReady(true)
        }
        onLoad?.(event)
      }}
    />
  )
}
