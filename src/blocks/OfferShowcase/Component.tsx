import type { OfferItem, OfferShowcaseBlock as OfferShowcaseBlockProps } from '@/payload-types'

import { HomeOfferShowcase } from '@/components/HomeOfferShowcase/HomeOfferShowcase'
import {
  homeOfferDefaults,
  type HomeOfferData,
  type HomeOfferItem,
} from '@/components/HomeOfferShowcase/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'

function mapOfferItem(raw: OfferItem | string | number): HomeOfferItem | null {
  if (typeof raw !== 'object') return null

  const image = raw.image
  if (!image || typeof image !== 'object' || !('url' in image) || !image.url) {
    return null
  }

  return {
    title: raw.title,
    description: raw.shortDescription,
    imageAlt: raw.imageAlt,
    imageSrc: image.url,
    cropClassName: raw.imageCropClassName ?? undefined,
  }
}

function pickInquiryCta(
  cta: OfferShowcaseBlockProps['inquiry']['cta'],
  fallback: SectionLink,
): SectionLink {
  const entry = cta?.[0]
  if (!entry?.link) return fallback

  const { link } = entry
  return {
    type: link.type ?? null,
    label: link.label ?? null,
    newTab: link.newTab ?? null,
    url: link.url ?? null,
    reference:
      link.type === 'reference' && link.reference
        ? {
            relationTo: link.reference.relationTo,
            value: link.reference.value,
          }
        : null,
  }
}

export const OfferShowcaseBlock: React.FC<OfferShowcaseBlockProps> = (props) => {
  const items = (props.items ?? [])
    .map(mapOfferItem)
    .filter((item): item is HomeOfferItem => item !== null)

  const texture = props.backgroundTexture
  const textureSrc =
    texture && typeof texture === 'object' && 'url' in texture && texture.url
      ? texture.url
      : homeOfferDefaults.textureSrc

  const data: HomeOfferData = {
    heading: {
      start: props.heading?.start ?? homeOfferDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeOfferDefaults.heading.emphasis,
      end: props.heading?.end ?? homeOfferDefaults.heading.end,
    },
    subtitle: props.subtitle ?? homeOfferDefaults.subtitle,
    items: items.length > 0 ? items : homeOfferDefaults.items,
    inquiry: {
      title: props.inquiry?.title ?? homeOfferDefaults.inquiry.title,
      text: props.inquiry?.text ?? homeOfferDefaults.inquiry.text,
      cta: pickInquiryCta(props.inquiry?.cta, homeOfferDefaults.inquiry.cta),
    },
    showFooterNotch: props.showFooterNotch ?? homeOfferDefaults.showFooterNotch,
    textureSrc,
  }

  return <HomeOfferShowcase data={data} />
}
