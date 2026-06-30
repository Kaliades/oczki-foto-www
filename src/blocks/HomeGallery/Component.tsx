import type { HomeGalleryBlock as HomeGalleryBlockProps } from '@/payload-types'

import { HomeGallery } from '@/components/HomeGallery/HomeGallery'
import {
  homeGalleryDefaults,
  type HomeGalleryData,
  type HomeGalleryItem,
} from '@/components/HomeGallery/constants'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export const HomeGalleryBlock: React.FC<HomeGalleryBlockProps> = (props) => {
  const items: HomeGalleryItem[] = (props.items ?? []).flatMap((entry, idx) => {
    const src = resolvePopulatedMediaUrl(entry?.image)
    if (!src) return []

    const fallbackItem = homeGalleryDefaults.items[idx]

    return [
      {
        imageSrc: src,
        imageAlt: entry?.imageAlt ?? fallbackItem?.imageAlt ?? '',
        caption:
          entry?.caption?.title && entry.caption.subtitle
            ? { title: entry.caption.title, subtitle: entry.caption.subtitle }
            : fallbackItem?.caption,
      },
    ]
  })

  const data: HomeGalleryData = {
    heading: {
      start: props.heading?.start ?? homeGalleryDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeGalleryDefaults.heading.emphasis,
    },
    description: props.description ?? homeGalleryDefaults.description,
    cta: {
      type: props.cta?.type ?? homeGalleryDefaults.cta.type,
      url: props.cta?.url ?? homeGalleryDefaults.cta.url,
      label: props.cta?.label ?? homeGalleryDefaults.cta.label,
      newTab: props.cta?.newTab ?? homeGalleryDefaults.cta.newTab,
      reference: (props.cta?.reference as HomeGalleryData['cta']['reference']) ?? null,
    },
    items,
  }

  return <HomeGallery data={data} />
}
