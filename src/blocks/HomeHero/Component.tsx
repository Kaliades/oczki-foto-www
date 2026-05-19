import type { HomeHeroBlock as HomeHeroBlockProps } from '@/payload-types'

import { HomeHero } from '@/components/HomeHero/HomeHero'
import { homeHeroDefaults, type HomeHeroData } from '@/components/HomeHero/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'

function resolveBackground(
  background: HomeHeroBlockProps['background'],
): HomeHeroData['background'] {
  if (background && typeof background === 'object' && 'url' in background && background.url) {
    return {
      src: background.url,
      alt: background.alt ?? '',
    }
  }
  return homeHeroDefaults.background
}

function pickCta(
  ctas: HomeHeroBlockProps['ctas'],
  index: number,
  fallback: SectionLink,
): SectionLink {
  const entry = ctas?.[index]
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

export const HomeHeroBlock: React.FC<HomeHeroBlockProps> = (props) => {
  const data: HomeHeroData = {
    title: {
      lineOne: props.title?.lineOne ?? homeHeroDefaults.title.lineOne,
      lineTwoItalic: props.title?.lineTwoItalic ?? homeHeroDefaults.title.lineTwoItalic,
      lineTwoRest: props.title?.lineTwoRest ?? homeHeroDefaults.title.lineTwoRest,
      lineThree: props.title?.lineThree ?? homeHeroDefaults.title.lineThree,
    },
    description: props.description ?? homeHeroDefaults.description,
    background: resolveBackground(props.background),
    showScallop: props.showScallop ?? homeHeroDefaults.showScallop,
    primaryCta: pickCta(props.ctas, 0, homeHeroDefaults.primaryCta),
    secondaryCta: pickCta(props.ctas, 1, homeHeroDefaults.secondaryCta),
  }

  return <HomeHero data={data} />
}
