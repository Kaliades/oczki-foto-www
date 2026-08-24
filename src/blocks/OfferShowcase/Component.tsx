import type { OfferItem, OfferShowcaseBlock as OfferShowcaseBlockProps } from '@/payload-types'

import { HomeOfferShowcase } from '@/components/HomeOfferShowcase/HomeOfferShowcase'
import {
  homeOfferDefaults,
  type HomeOfferData,
  type HomeOfferItem,
} from '@/components/HomeOfferShowcase/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

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
    href: raw.slug ? `/oferta/${raw.slug}` : undefined,
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
  const mapped = (props.items ?? [])
    .map(mapOfferItem)
    .filter((item): item is HomeOfferItem => item !== null)

  // Depth-0 / missing media would otherwise yield an empty carousel.
  const items = mapped.length > 0 ? mapped : [...homeOfferDefaults.items]

  const texture = props.backgroundTexture

  const data: HomeOfferData = {
    heading: {
      start: props.heading?.start ?? homeOfferDefaults.heading.start,
      emphasis: props.heading?.emphasis ?? homeOfferDefaults.heading.emphasis,
      end: props.heading?.end ?? homeOfferDefaults.heading.end,
    },
    subtitle: props.subtitle ?? homeOfferDefaults.subtitle,
    items,
    inquiry: {
      title: props.inquiry?.title ?? homeOfferDefaults.inquiry.title,
      text: props.inquiry?.text ?? homeOfferDefaults.inquiry.text,
      cta: pickInquiryCta(props.inquiry?.cta, homeOfferDefaults.inquiry.cta),
    },
    showFooterNotch: props.showFooterNotch ?? homeOfferDefaults.showFooterNotch,
    textureSrc:
      resolvePopulatedMediaUrl(texture) ?? homeOfferDefaults.textureSrc,
  }

  return <HomeOfferShowcase data={data} />
}
