import { cn } from '@/utilities/ui'

import { CrossMaskedPhotoVisualLayer } from './CrossMaskedPhotoVisualLayer'

type CrossMaskedPhotoVisualProps = {
  className?: string
  photoAlt?: string
}

/**
 * Responsive cross-masked photo cluster — switches 360 / 768 / 1366 artboards.
 */
export function CrossMaskedPhotoVisual({ className, photoAlt }: CrossMaskedPhotoVisualProps) {
  return (
    <div className={cn('relative shrink-0', className)}>
      <CrossMaskedPhotoVisualLayer className="md:hidden" photoAlt={photoAlt} variant="mobile" />
      <CrossMaskedPhotoVisualLayer
        className="hidden md:block lg:hidden"
        photoAlt={photoAlt}
        variant="tablet"
      />
      <CrossMaskedPhotoVisualLayer
        className="hidden lg:block"
        photoAlt={photoAlt}
        variant="desktop"
      />
    </div>
  )
}
