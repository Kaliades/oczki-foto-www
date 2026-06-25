import type { HomeInstagramBlock as HomeInstagramBlockProps } from '@/payload-types'

import { HomeInstagram } from '@/components/HomeInstagram/HomeInstagram'
import { homeInstagramDefaults, type HomeInstagramData } from '@/components/HomeInstagram/constants'
import type { InstagramPost } from '@/components/InstagramSection/constants'
import type { SectionLink } from '@/utilities/resolveLinkHref'

function mediaUrl(image: unknown): string | null {
  if (!image || typeof image !== 'object') return null
  return 'url' in image ? ((image as { url?: string | null }).url ?? null) : null
}

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
    const src = mediaUrl(entry?.image) ?? d.posts[idx]?.imageSrc
    if (!src) return []
    const fallback = d.posts[idx]
    return [
      {
        imageSrc: src,
        imageAlt: entry?.imageAlt ?? fallback?.imageAlt ?? '',
        href: entry?.href ?? fallback?.href,
        cropClassName: entry?.cropClassName ?? fallback?.cropClassName,
      },
    ]
  })

  const data: HomeInstagramData = {
    heading: {
      plain: props.heading?.plain ?? d.heading.plain,
      emphasis: props.heading?.emphasis ?? d.heading.emphasis,
    },
    profile: {
      avatarSrc: mediaUrl(props.profile?.avatar) ?? d.profile.avatarSrc,
      avatarAlt: props.profile?.avatarAlt ?? d.profile.avatarAlt,
      link: profileLink,
    },
    posts: posts.length === 5 ? posts : d.posts,
  }

  return <HomeInstagram data={data} />
}
