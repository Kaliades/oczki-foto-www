import type { SectionLink } from '@/utilities/resolveLinkHref'

/** Shared Instagram component children — same across home and about instances. */
export const INSTAGRAM_COMPONENT_FIGMA_NODES = {
  container: '7105:7404',
  header: {
    row: '7105:7405',
    heading: '7105:7406',
    profile: '7105:7407',
    avatarRing: '7105:7408',
    avatar: '7105:7409',
    handle: '7105:7410',
  },
  grid: '7105:7411',
  posts: ['7105:7412', '7105:7413', '7105:7414', '7105:7415', '7105:7416'] as const,
} as const

export const HOME_INSTAGRAM_FIGMA_NODES = {
  desktop: '7105:7493',
  tablet: '7105:11930',
  mobile: '7105:14225',
} as const

export const ABOUT_INSTAGRAM_FIGMA_NODES = {
  desktop: '7105:7422',
  tablet: '7105:7437',
  mobile: '7105:7452',
} as const

/** Figma inner shell — `py-12` (48 px). */
export const INSTAGRAM_SHELL_PADDING_TOP = 48

export type InstagramSectionFigmaNodes = {
  desktop: string
  tablet: string
  mobile: string
}

export type InstagramPost = {
  imageSrc: string
  imageAlt: string
  /**
   * Optional crop classes on the underlying `<Image>` so the Figma framing
   * is preserved inside the square tile without re-exporting assets.
   */
  cropClassName?: string
  /** Falls back to the profile link when omitted. */
  href?: string
}

export type InstagramSectionData = {
  heading: {
    plain: string
    emphasis: string
  }
  profile: {
    avatarSrc: string
    avatarAlt: string
    link: SectionLink
  }
  posts: readonly InstagramPost[]
}

export const instagramSectionDefaults: InstagramSectionData = {
  heading: {
    plain: 'Zostańmy w kontakcie na ',
    emphasis: 'Instagramie',
  },
  profile: {
    avatarSrc: '/figma/instagram-profile.png',
    avatarAlt: 'Zdjęcie profilowe @oczki_fotografia na Instagramie',
    link: {
      type: 'custom',
      url: 'https://www.instagram.com/oczki_fotografia/',
      label: '@oczki_fotografia',
      newTab: true,
    },
  },
  posts: [
    {
      imageSrc: '/figma/instagram-post-1.png',
      imageAlt: 'Post na Instagramie — sesja w domowym wnętrzu',
      cropClassName:
        'absolute h-[134.59%] left-[-0.84%] top-[0.2%] w-[101.27%] max-w-none object-cover',
    },
    {
      imageSrc: '/figma/instagram-post-2.png',
      imageAlt: 'Post na Instagramie — portret w żółtym garniturze',
      cropClassName:
        'absolute h-[133.77%] left-[0.05%] top-[0.16%] w-full max-w-none object-cover',
    },
    {
      imageSrc: '/figma/instagram-post-3.png',
      imageAlt: 'Post na Instagramie — czarno-biały portret w kapeluszu',
      cropClassName: 'absolute h-[132.79%] left-0 top-[0.35%] w-full max-w-none object-cover',
    },
    {
      imageSrc: '/figma/instagram-post-4.png',
      imageAlt: 'Post na Instagramie — portret przy witrażu',
      cropClassName: 'absolute h-[133.33%] left-0 top-[0.08%] w-full max-w-none object-cover',
    },
    {
      imageSrc: '/figma/instagram-post-5.png',
      imageAlt: 'Post na Instagramie — dzień pracy fotografki',
      cropClassName:
        'absolute h-[134.38%] left-[-1.32%] top-[0.2%] w-[101.44%] max-w-none object-cover',
    },
  ],
}
