import type { HomeInstagramBlock as HomeInstagramBlockProps } from '@/payload-types'

import { HomeInstagram } from '@/components/HomeInstagram/HomeInstagram'
import { homeInstagramDefaults, type HomeInstagramData } from '@/components/HomeInstagram/constants'
import type { InstagramPost } from '@/components/InstagramSection/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'
import { resolvePopulatedMediaUrl } from '@/utilities/resolvePopulatedMediaUrl'

export const HomeInstagramBlock: React.FC<HomeInstagramBlockProps> = (props) => {
  const d = homeInstagramDefaults

  const profileLink: SectionLink = {
    type: props.profile?.profileLink?.type ?? d.profile.link.type,
    url: props.profile?.profileLink?.url ?? d.profile.link.url,
    label: props.profile?.profileLink?.label ?? d.profile.link.label,
    newTab: props.profile?.profileLink?.newTab ?? d.profile.link.newTab,
    reference:
      (props.profile?.profileLink?.reference as SectionLink['reference']) ??
      d.profile.link.reference,
  }

  const posts: InstagramPost[] = (props.posts ?? []).flatMap((entry, idx) => {
    const src = resolvePopulatedMediaUrl(entry?.image)
    if (!src) return []
    const fallback = d.posts[idx]
    return [
      {
        imageSrc: src,
        imageAlt: entry?.imageAlt ?? fallback?.imageAlt ?? '',
        href: entry?.href ?? fallback?.href,
        cropClassName: entry?.cropClassName ?? undefined,
      },
    ]
  })

  const data: HomeInstagramData = {
    heading: {
      plain: props.heading?.plain ?? d.heading.plain,
      emphasis: props.heading?.emphasis ?? d.heading.emphasis,
    },
    profile: {
      avatarSrc: resolvePopulatedMediaUrl(props.profile?.avatar) ?? '',
      avatarAlt: props.profile?.avatarAlt ?? d.profile.avatarAlt,
      link: profileLink,
    },
    posts,
  }

  return <HomeInstagram data={data} />
}
