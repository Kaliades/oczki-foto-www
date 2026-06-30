import { cn } from '@/utilities/ui'

import { OverlapPhotoCollageLayer } from './OverlapPhotoCollageLayer'

type OverlapPhotoCollageProps = {
  className?: string
  mainPhotoAlt: string
  mainPhotoSrc: string
  scallopPhotoAlt: string
  scallopPhotoSrc: string
}

/**
 * Overlapping main + scalloped portrait with botanical `OBJECTS` decor.
 * Figma `Image Container` — `6999:26871` / `7100:7990` / `7102:11185`.
 */
export function OverlapPhotoCollage({
  className,
  mainPhotoAlt,
  mainPhotoSrc,
  scallopPhotoAlt,
  scallopPhotoSrc,
}: OverlapPhotoCollageProps) {
  return (
    <div className={cn('relative z-0 shrink-0', className)}>
      <div className="md:hidden">
        <OverlapPhotoCollageLayer
          mainPhotoAlt={mainPhotoAlt}
          mainPhotoSrc={mainPhotoSrc}
          scallopPhotoAlt={scallopPhotoAlt}
          scallopPhotoSrc={scallopPhotoSrc}
          variant="mobile"
        />
      </div>
      <div className="hidden md:block lg:hidden">
        <OverlapPhotoCollageLayer
          mainPhotoAlt={mainPhotoAlt}
          mainPhotoSrc={mainPhotoSrc}
          scallopPhotoAlt={scallopPhotoAlt}
          scallopPhotoSrc={scallopPhotoSrc}
          variant="tablet"
        />
      </div>
      <div className="hidden lg:block">
        <OverlapPhotoCollageLayer
          mainPhotoAlt={mainPhotoAlt}
          mainPhotoSrc={mainPhotoSrc}
          scallopPhotoAlt={scallopPhotoAlt}
          scallopPhotoSrc={scallopPhotoSrc}
          variant="desktop"
        />
      </div>
    </div>
  )
}
