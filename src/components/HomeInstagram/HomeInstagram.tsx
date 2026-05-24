import {
  HOME_INSTAGRAM_FIGMA_NODES,
  INSTAGRAM_SHELL_PADDING_BOTTOM,
  INSTAGRAM_SHELL_PADDING_TOP,
  type HomeInstagramData,
} from './constants'
import { InstagramFeedGrid } from './InstagramFeedGrid'
import { InstagramSectionHeader } from './InstagramSectionHeader'
import { resolveLinkHref } from '@/utilities/resolveLinkHref'

type HomeInstagramProps = {
  data: HomeInstagramData
}

/**
 * "Zostańmy w kontakcie na Instagramie" — profile link and a five-tile
 * preview of recent posts. Sits toward the bottom of the homepage flow.
 *
 * Figma references (always desktop / tablet / mobile in parallel):
 * - Desktop: {@link HOME_INSTAGRAM_FIGMA_NODES.desktopFrame} 7105:7493
 * - Tablet:  {@link HOME_INSTAGRAM_FIGMA_NODES.tabletFrame} 7105:11930
 * - Mobile:  {@link HOME_INSTAGRAM_FIGMA_NODES.mobileFrame} 7105:14225
 *
 * Shell pattern (see `responsive-layout.mdc`):
 *   - Outer `<section>` carries the full-bleed cream background.
 *   - Inner `<div>` carries the 1366 px cap, `mx-auto` centring, and the
 *     Figma paddings (`px-8`, `pt-12`) plus extra bottom band before HomeCta.
 *     Vertical `gap-6` (24 px) between the header row and the feed grid.
 *
 * Mobile stacks the header and uses a 3-column post grid (3 + 2 tiles).
 * From `md` upward the header is a single row and all five posts sit in
 * one line — tile size follows the capped content width.
 */
export function HomeInstagram({ data }: HomeInstagramProps) {
  const { heading, profile, posts } = data
  const profileHref = resolveLinkHref(profile.link) ?? 'https://www.instagram.com/oczki_fotografia/'

  return (
    <section
      aria-labelledby="home-instagram-heading"
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={HOME_INSTAGRAM_FIGMA_NODES.desktopFrame}
    >
      <div
        className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start gap-6 px-8 pt-12"
        style={{ paddingBottom: INSTAGRAM_SHELL_PADDING_BOTTOM }}
      >
        <InstagramSectionHeader
          avatarAlt={profile.avatarAlt}
          avatarSrc={profile.avatarSrc}
          headingEmphasis={heading.emphasis}
          headingPlain={heading.plain}
          profileLink={profile.link}
        />
        <InstagramFeedGrid posts={posts} profileHref={profileHref} />
      </div>
    </section>
  )
}
