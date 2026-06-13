import { resolveLinkHref } from '@/utilities/resolveLinkHref'

import {
  INSTAGRAM_COMPONENT_FIGMA_NODES,
  INSTAGRAM_SHELL_PADDING_TOP,
  type InstagramSectionData,
  type InstagramSectionFigmaNodes,
} from './constants'
import { InstagramFeedGrid } from './InstagramFeedGrid'
import { InstagramSectionHeader } from './InstagramSectionHeader'

type InstagramSectionProps = {
  data: InstagramSectionData
  figmaNodes: InstagramSectionFigmaNodes
  headingId: string
  /** Bottom padding in px — defaults to symmetric `py-12` (48 px). */
  paddingBottom?: number
}

/**
 * "Zostańmy w kontakcie na Instagramie" — profile link and a five-tile
 * preview of recent posts.
 *
 * Figma `Instagram` component hierarchy (shared across page instances):
 *   <section> — primary/100, full bleed
 *     └── inner 1366 cap — column, `px-8` / `pt-12`, configurable bottom band
 *         └── Container (`7105:7404`) — `gap-6` (24 px)
 *             ├── InstagramSectionHeader (`7105:7405`)
 *             └── InstagramFeedGrid (`7105:7411`)
 *                 └── five × InstagramPostTile (`7105:7412`–`7416`)
 *
 * Mobile stacks the header and uses a 3-column post grid (3 + 2 tiles).
 * From `md` upward the header is a single row and all five posts sit in
 * one line — tile size follows the capped content width.
 */
export function InstagramSection({
  data,
  figmaNodes,
  headingId,
  paddingBottom = INSTAGRAM_SHELL_PADDING_TOP,
}: InstagramSectionProps) {
  const { heading, posts, profile } = data
  const profileHref = resolveLinkHref(profile.link) ?? 'https://www.instagram.com/oczki_fotografia/'

  return (
    <section
      aria-labelledby={headingId}
      className="w-full bg-[var(--oczki-primary-100)] [font-family:var(--font-oczki-body)]"
      data-figma-node={figmaNodes.desktop}
      data-figma-node-mobile={figmaNodes.mobile}
      data-figma-node-tablet={figmaNodes.tablet}
      data-name="Instagram"
    >
      <div
        className="relative mx-auto flex w-full max-w-[1366px] flex-col items-start gap-6 px-8 pt-12"
        data-figma-node={INSTAGRAM_COMPONENT_FIGMA_NODES.container}
        data-name="Container"
        style={{ paddingBottom }}
      >
        <InstagramSectionHeader
          avatarAlt={profile.avatarAlt}
          avatarSrc={profile.avatarSrc}
          headingEmphasis={heading.emphasis}
          headingId={headingId}
          headingPlain={heading.plain}
          profileLink={profile.link}
        />
        <InstagramFeedGrid posts={posts} profileHref={profileHref} />
      </div>
    </section>
  )
}

export type { InstagramSectionData, InstagramSectionFigmaNodes }
