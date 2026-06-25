import type { HomeCtaBlock as HomeCtaBlockProps } from '@/payload-types'

import { HomeCta } from '@/components/HomeCta/HomeCta'
import { homeCtaDefaults, type HomeCtaData } from '@/components/HomeCta/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'

function resolveLink(cta: HomeCtaBlockProps['cta'] | undefined): SectionLink {
  const d = homeCtaDefaults.cta
  if (!cta) return d
  return {
    type: cta.type ?? d.type,
    url: cta.url ?? d.url,
    label: cta.label ?? d.label,
    newTab: cta.newTab ?? d.newTab,
    reference: (cta.reference as SectionLink['reference']) ?? null,
  }
}

export const HomeCtaBlock: React.FC<HomeCtaBlockProps> = (props) => {
  const data: HomeCtaData = {
    heading: {
      plain: props.heading?.plain ?? homeCtaDefaults.heading.plain,
      emphasis: props.heading?.emphasis ?? homeCtaDefaults.heading.emphasis,
    },
    body: props.body ?? homeCtaDefaults.body,
    cta: resolveLink(props.cta),
  }

  return <HomeCta data={data} />
}
