'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import type { Media } from '@/payload-types'
import type { GalleryPhoto } from './Component'

type GalleryGridClientProps = {
  photos: GalleryPhoto[]
  initialVisible: number
  loadMoreLabel: string
  emptyStateLabel: string
}

function getImageUrl(image: Media | string | number): string {
  if (typeof image === 'object' && image !== null && 'url' in image) {
    return (image as Media).url ?? ''
  }
  return ''
}

function getImageAlt(image: Media | string | number, fallback?: string | null): string {
  if (typeof image === 'object' && image !== null && 'alt' in image) {
    return (image as Media).alt || fallback || 'Zdjęcie portfolio'
  }
  return fallback || 'Zdjęcie portfolio'
}

type TileProps = {
  photo: GalleryPhoto
}

function GalleryTile({ photo }: TileProps) {
  const url = getImageUrl(photo.image)
  const alt = getImageAlt(photo.image, photo.alt)

  const inner = (
    <div className="relative aspect-square w-full overflow-hidden rounded-[12px] bg-[#e8e2da]">
      {url ? (
        <Image
          alt={alt}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          src={url}
        />
      ) : (
        <div className="h-full w-full bg-[#e8e2da]" />
      )}
    </div>
  )

  if (photo.href) {
    return (
      <Link className="group block" href={photo.href}>
        {inner}
      </Link>
    )
  }

  return <div className="group block">{inner}</div>
}

export function GalleryGridClient({
  photos,
  initialVisible,
  loadMoreLabel,
  emptyStateLabel,
}: GalleryGridClientProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('kategoria')

  const filteredPhotos = activeCategory
    ? photos.filter((p) => p.category === activeCategory)
    : photos

  const [visibleCount, setVisibleCount] = useState(initialVisible)

  const visiblePhotos = filteredPhotos.slice(0, visibleCount)
  const hasMore = visibleCount < filteredPhotos.length

  return (
    <section className="w-full bg-white py-16">
      <div className="mx-auto max-w-[1366px] px-8">
        {filteredPhotos.length === 0 ? (
          <p className="py-24 text-center font-['Instrument_Sans',sans-serif] text-[16px] text-[#6b5947]">
            {emptyStateLabel}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visiblePhotos.map((photo, index) => (
                <GalleryTile key={photo.id ?? index} photo={photo} />
              ))}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  className="inline-flex items-center justify-center rounded-full border border-[#392818] px-8 py-3 font-['Instrument_Sans',sans-serif] text-[14px] leading-[1.48] tracking-[-0.01em] text-[#392818] transition-colors hover:bg-[#392818] hover:text-white"
                  onClick={() => setVisibleCount((prev) => prev + initialVisible)}
                  type="button"
                >
                  {loadMoreLabel}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
