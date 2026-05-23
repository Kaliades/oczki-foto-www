import type { HomeGalleryBlock as HomeGalleryBlockProps } from '@/payload-types'

import { HomeGallery } from '@/components/HomeGallery/HomeGallery'
import {
  homeGalleryDefaults,
  type HomeGalleryData,
  type HomeGalleryItem,
} from '@/components/HomeGallery/constants'

/**
 * Bridge between the Payload `homeGallery` block and the
 * presentation-only `HomeGallery` section component. Falls back to
 * `homeGalleryDefaults` whenever a relational field (media upload) hasn't
 * been populated yet — keeps the home page rendering against the static
 * seed before the admin creates a real document.
 */
export const HomeGalleryBlock: React.FC<HomeGalleryBlockProps> = (props) => {
  const items: HomeGalleryItem[] = (props.items ?? []).flatMap((entry, idx) => {
    const image = entry?.image
    const src =
      image && typeof image === 'object' && 'url' in image && image.url
        ? image.url
        : homeGalleryDefaults.items[idx]?.imageSrc

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
    items: items.length > 0 ? items : homeGalleryDefaults.items,
  }

  return <HomeGallery data={data} />
}
