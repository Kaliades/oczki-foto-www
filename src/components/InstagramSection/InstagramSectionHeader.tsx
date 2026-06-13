import Image from 'next/image'

import { resolveLinkHref, type SectionLink } from '@/utilities/resolveLinkHref'

import { INSTAGRAM_COMPONENT_FIGMA_NODES } from './constants'

type InstagramSectionHeaderProps = {
  avatarAlt: string
  avatarSrc: string
  headingEmphasis: string
  headingId: string
  headingPlain: string
  profileLink: SectionLink
}

/**
 * Header block for the Instagram section (Figma 7105:7405).
 *
 * Mobile (360): column stack — full-width heading, then profile chip
 * with `gap-4` (16 px) before the grid (7105:7452 / 7105:14225).
 *
 * Tablet / desktop (768+): single row with `justify-between` — title
 * left, profile right (7105:7422 / 7105:7437 / 7105:7493).
 */
export function InstagramSectionHeader({
  avatarAlt,
  avatarSrc,
  headingEmphasis,
  headingId,
  headingPlain,
  profileLink,
}: InstagramSectionHeaderProps) {
  const profileHref = resolveLinkHref(profileLink)
  const nodes = INSTAGRAM_COMPONENT_FIGMA_NODES.header

  return (
    <div
      className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
      data-figma-node={nodes.row}
      data-name="Container"
    >
      <h2
        className="w-full text-[32px] font-normal leading-[1.04] tracking-[-0.32px] text-[var(--oczki-primary-800)] [font-family:var(--font-oczki-display)] [font-feature-settings:'lnum'_1,'pnum'_1] md:w-auto md:max-w-[530px]"
        data-figma-node={nodes.heading}
        id={headingId}
      >
        {headingPlain}
        <em className="italic [font-feature-settings:'dlig'_1,'lnum'_1,'pnum'_1]">
          {headingEmphasis}
        </em>
      </h2>

      {profileHref && profileLink.label ? (
        <a
          className="flex shrink-0 items-center justify-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oczki-primary-800)]"
          data-figma-node={nodes.profile}
          href={profileHref}
          rel="noopener noreferrer"
          target={profileLink.newTab ? '_blank' : undefined}
        >
          <span
            className="flex items-center rounded-full border border-solid border-[var(--oczki-primary-400)] p-0.5"
            data-figma-node={nodes.avatarRing}
          >
            <span
              className="relative size-12 overflow-hidden rounded-full"
              data-figma-node={nodes.avatar}
            >
              <Image
                alt={avatarAlt}
                className="object-cover"
                fill
                sizes="48px"
                src={avatarSrc}
              />
            </span>
          </span>
          <span
            className="oczki-body-l whitespace-nowrap text-[var(--oczki-primary-700)]"
            data-figma-node={nodes.handle}
          >
            {profileLink.label}
          </span>
        </a>
      ) : null}
    </div>
  )
}
