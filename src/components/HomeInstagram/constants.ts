import type { SectionLink } from '@/utilities/resolveLinkHref'

/**
 * Figma source nodes for the "Zostańmy w kontakcie na Instagramie" section.
 */
export const HOME_INSTAGRAM_FIGMA_NODES = {
  desktopFrame: '7105:7493',
  tabletFrame: '7105:11930',
  mobileFrame: '7105:14225',
} as const

/** Figma inner shell — `py-12` (48 px). */
export const INSTAGRAM_SHELL_PADDING_TOP = 48

/**
 * Extra cream below the post grid before HomeCta (same bg token).
 * Not part of the Instagram Figma frame — tuned for section-to-section rhythm.
 */
export const INSTAGRAM_GAP_BEFORE_HOME_CTA = 80

export const INSTAGRAM_SHELL_PADDING_BOTTOM =
  INSTAGRAM_SHELL_PADDING_TOP + INSTAGRAM_GAP_BEFORE_HOME_CTA

/**
 * Cream band between homepage sections on the shared `--oczki-primary-100` bg.
 * Section #9→#10 uses {@link INSTAGRAM_SHELL_PADDING_BOTTOM}; #10→#11 mirrors it on HomeCta.
 */
export const HOME_CREAM_SECTION_GAP = INSTAGRAM_SHELL_PADDING_BOTTOM

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

export type HomeInstagramData = {
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

export const homeInstagramDefaults: HomeInstagramData = {
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
