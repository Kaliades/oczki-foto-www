'use client'

import { useCallback, useMemo, useState } from 'react'

import { BentoPhotoGrid } from '@/components/BentoPhotoGrid'
import { GalleryPortfolioLoadMore } from '@/components/GalleryPortfolio/GalleryPortfolioLoadMore'
import { SplitDisplayHeading } from '@/components/SplitDisplayHeading/SplitDisplayHeading'

import {
  CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES,
  CASE_STUDY_PHOTO_GALLERY_HEADING_SIZE_CLASSNAME,
  CASE_STUDY_PHOTO_GALLERY_INITIAL_COUNT,
  CASE_STUDY_PHOTO_GALLERY_LOAD_MORE_BATCH,
  type CaseStudyPhotoGalleryData,
} from './constants'

type CaseStudyPhotoGalleryProps = {
  data: CaseStudyPhotoGalleryData
}

/**
 * Case study photo gallery — Figma `Galeria` on gallery case-study page.
 *
 * <section> full-bleed cream
 * └── inner 1366 cap
 *     ├── SplitDisplayHeading (centred, max 480 px)
 *     └── Image Gallery (flex col)
 *         ├── BentoPhotoGrid → first N tiles (12, then +12 per click)
 *         └── Footer → GalleryPortfolioLoadMore (hidden when nothing left)
 *
 * Section padding (metadata): mobile 48/64 px 16, gap 28; tablet 80 all, gap 36;
 * desktop 80 vertical px 32, gap 36. Image Gallery inner gap: 24 mobile / 32 tablet+.
 * Footer border-t pt: 8 mobile / 12 tablet+.
 */
export function CaseStudyPhotoGallery({ data }: CaseStudyPhotoGalleryProps) {
  const { heading, items, loadMoreLabel } = data
  const headingId = 'case-study-photo-gallery-heading'
  const [visibleCount, setVisibleCount] = useState(
    Math.min(CASE_STUDY_PHOTO_GALLERY_INITIAL_COUNT, items.length),
  )

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount])
  const hasMore = visibleCount < items.length

  const handleLoadMore = useCallback(() => {
    setVisibleCount((count) =>
      Math.min(count + CASE_STUDY_PHOTO_GALLERY_LOAD_MORE_BATCH, items.length),
    )
  }, [items.length])

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES.desktop}
    >
      <div className="mx-auto flex w-full max-w-[1366px] flex-col items-center gap-7 px-4 pb-16 pt-12 md:gap-9 md:p-20 lg:gap-9 lg:px-8 lg:py-20">
        <SplitDisplayHeading
          className="w-full max-w-[480px] text-center [word-break:break-word]"
          emphasis={heading.emphasis}
          emphasisPosition="end"
          end={heading.end}
          id={headingId}
          sizeClassName={CASE_STUDY_PHOTO_GALLERY_HEADING_SIZE_CLASSNAME}
          start={heading.start}
        />

        <div
          className="flex w-full max-w-[1302px] flex-col items-stretch gap-6 md:gap-8"
          data-figma-node={CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES.imageGallery.desktop}
          data-name="Image Gallery"
        >
          <BentoPhotoGrid items={visibleItems} />

          {hasMore ? (
            <GalleryPortfolioLoadMore
              figmaNode={CASE_STUDY_PHOTO_GALLERY_FIGMA_NODES.loadMore.desktop}
              footerClassName="pt-2 md:pt-3"
              label={loadMoreLabel}
              onLoadMore={handleLoadMore}
            />
          ) : null}
        </div>
      </div>
    </section>
  )
}
