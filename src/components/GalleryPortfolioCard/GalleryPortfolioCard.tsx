'use client'

import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'
import Link from 'next/link'
import { useState } from 'react'

import { cn } from '@/utilities/ui'

import { GalleryPortfolioCardHoverOverlay } from './GalleryPortfolioCardHoverOverlay'
import type { GalleryPortfolioCardCaptionData } from './GalleryPortfolioCardCaption'
import { GALLERY_PORTFOLIO_CARD_FIGMA_NODES } from './constants'

export type GalleryPortfolioCardData = {
  id: string
  imageSrc: string
  imageAlt: string
  caption?: GalleryPortfolioCardCaptionData
  href?: string
  /** Optional Figma crop — absolute positioned img inside overflow-hidden frame. */
  cropClassName?: string
}

type GalleryPortfolioCardProps = {
  item: GalleryPortfolioCardData
  sizes: string
  className?: string
}

/**
 * Figma `Card` / `Image-hover` — portrait tile with optional hover caption.
 *
 * Root (relative, overflow-visible)
 * ├── imageClip (inset-0, overflow-hidden)
 * │   └── Image
 * └── HoverOverlay (absolute inset-0; frame may extend past clip)
 */
export function GalleryPortfolioCard({ item, sizes, className }: GalleryPortfolioCardProps) {
  const { imageSrc, imageAlt, caption, href, cropClassName } = item
  const [isHovered, setIsHovered] = useState(false)
  const showOverlay = Boolean(caption) && isHovered

  const hoverHandlers = {
    onBlur: () => setIsHovered(false),
    onFocus: () => setIsHovered(true),
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  }

  const content = (
    <>
      <div
        className="absolute inset-0 overflow-hidden"
        data-figma-node={GALLERY_PORTFOLIO_CARD_FIGMA_NODES.image}
      >
        <Image
          alt={imageAlt}
          className={cn('object-cover', cropClassName ?? 'size-full')}
          fill={!cropClassName}
          height={cropClassName ? 1024 : undefined}
          sizes={sizes}
          src={imageSrc}
          width={cropClassName ? 683 : undefined}
        />
      </div>
      {caption ? (
        <div
          aria-hidden={!showOverlay}
          className={cn(
            'absolute inset-0 transition-opacity duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]',
            showOverlay ? 'opacity-100' : 'opacity-0',
          )}
        >
          <GalleryPortfolioCardHoverOverlay caption={caption} />
        </div>
      ) : null}
    </>
  )

  const rootClassName = cn(
    'relative block size-full overflow-visible border-0 bg-transparent p-0 text-left',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--oczki-primary-800)]',
    className,
  )

  const figmaNode = caption
    ? GALLERY_PORTFOLIO_CARD_FIGMA_NODES.hoverRoot
    : GALLERY_PORTFOLIO_CARD_FIGMA_NODES.card

  if (href) {
    return (
      <Link
        className={rootClassName}
        data-figma-node={figmaNode}
        href={href}
        {...hoverHandlers}
      >
        {content}
      </Link>
    )
  }

  return (
    <article
      className={rootClassName}
      data-figma-node={figmaNode}
      tabIndex={caption ? 0 : undefined}
      {...hoverHandlers}
    >
      {content}
    </article>
  )
}
