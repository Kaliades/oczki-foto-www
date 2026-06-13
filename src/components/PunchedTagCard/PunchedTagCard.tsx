import Image from 'next/image'
import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/utilities/ui'

import {
  PUNCHED_TAG_CARD_HOLE,
  PUNCHED_TAG_CARD_SHADOW,
  PUNCHED_TAG_CARD_VARIANTS,
  resolvePunchedTagCardOrnamentSrc,
  type PunchedTagCardVariantIndex,
} from './constants'

export type PunchedTagCardProps = {
  articleOverlay?: ReactNode
  description: string
  figmaNode?: string
  title: string
  variantIndex: PunchedTagCardVariantIndex
}

/**
 * Tilted cream tag — Figma `Container` inside absolute rail slot.
 *
 * Slot flex-centres the rotate/skew shell; article uses exact Figma padding per breakpoint.
 */
export function PunchedTagCard({
  articleOverlay,
  description,
  figmaNode,
  title,
  variantIndex,
}: PunchedTagCardProps) {
  const variant = PUNCHED_TAG_CARD_VARIANTS[variantIndex]
  const ornamentSrc = resolvePunchedTagCardOrnamentSrc(variant.ornament.variant)

  const tiltStyle: CSSProperties = {
    transform: `rotate(${variant.rotationDeg}deg) skewX(${variant.skewDeg}deg)`,
  }

  return (
    <div
      className="relative isolate flex h-full w-full items-center justify-center"
      data-name="Container wrapper"
    >
      <div className="flex-none" style={tiltStyle}>
        <article
          className={cn(
            'relative flex shrink-0 flex-col items-end justify-center',
            'gap-[10px] py-[16px] pl-[36px] pr-[20px]',
            'md:gap-[14px] md:py-[20px] md:pl-[48px] md:pr-[24px]',
            'bg-[var(--oczki-primary-200)] [word-break:break-word]',
            PUNCHED_TAG_CARD_SHADOW,
            variant.cardSizeClass,
          )}
          data-figma-node={figmaNode}
          data-name="Container"
        >
          <div
            className="flex w-full flex-col items-start gap-[4px] md:gap-[8px]"
            data-name="Container"
          >
            <p className="oczki-body-xl w-full tracking-[-0.3px] text-[var(--oczki-primary-800)]">
              {title}
            </p>
            <p className="oczki-body-m w-full tracking-[-0.14px] text-[var(--oczki-primary-700)]">
              {description}
            </p>
          </div>

          <div
            aria-hidden="true"
            className="flex shrink-0 items-center justify-center"
            style={{
              height: variant.ornament.slotHeightPx,
              width: variant.ornament.slotWidthPx,
            }}
          >
            <div className={cn('flex-none', variant.ornament.rotationClass)}>
              <Image
                alt=""
                aria-hidden
                className="pointer-events-none block max-w-none select-none"
                height={variant.ornament.imageHeightPx}
                src={ornamentSrc}
                width={variant.ornament.imageWidthPx}
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute md:hidden"
            style={{
              height: PUNCHED_TAG_CARD_HOLE.mobile.sizePx,
              left: variant.holeLeftPx,
              top: '50%',
              transform: `translateY(calc(-50% + ${variant.holeOffsetPx.mobile}px)) skewX(${-variant.skewDeg}deg)`,
              width: PUNCHED_TAG_CARD_HOLE.mobile.sizePx,
            }}
          >
            <img
              alt=""
              className="pointer-events-none block size-[20px] select-none"
              height={PUNCHED_TAG_CARD_HOLE.mobile.sizePx}
              src={PUNCHED_TAG_CARD_HOLE.mobile.src}
              width={PUNCHED_TAG_CARD_HOLE.mobile.sizePx}
            />
          </div>

          <div
            aria-hidden="true"
            className="absolute hidden md:block"
            style={{
              height: PUNCHED_TAG_CARD_HOLE.desktop.sizePx,
              left: variant.holeLeftPx,
              top: '50%',
              transform: `translateY(calc(-50% + ${variant.holeOffsetPx.desktop}px)) skewX(${-variant.skewDeg}deg)`,
              width: PUNCHED_TAG_CARD_HOLE.desktop.sizePx,
            }}
          >
            <img
              alt=""
              className="pointer-events-none block size-[24px] select-none"
              height={PUNCHED_TAG_CARD_HOLE.desktop.sizePx}
              src={PUNCHED_TAG_CARD_HOLE.desktop.src}
              width={PUNCHED_TAG_CARD_HOLE.desktop.sizePx}
            />
          </div>

          {articleOverlay}
        </article>
      </div>
    </div>
  )
}
