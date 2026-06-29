import { OczkiImage as Image } from '@/components/OczkiImage/OczkiImage'

import { cn } from '@/utilities/ui'

import type { InstagramPost } from './constants'

type InstagramPostTileProps = {
  figmaNode?: string
  post: InstagramPost
  href: string
}

/**
 * Single square tile in the Instagram feed row (Figma 7105:7412–7416).
 * Border, aspect ratio and flex growth match the auto-layout in the
 * desktop / tablet / mobile frames — tiles shrink proportionally below
 * 1366 px while staying square.
 */
export function InstagramPostTile({ figmaNode, href, post }: InstagramPostTileProps) {
  return (
    <a
      className="relative block aspect-square w-full min-w-0 border border-solid border-[var(--oczki-primary-200)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--oczki-primary-800)]"
      data-figma-node={figmaNode}
      data-name="Image"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          alt={post.imageAlt}
          className={cn(post.cropClassName ?? 'object-cover')}
          fill={!post.cropClassName}
          height={post.cropClassName ? 1024 : undefined}
          sizes="(min-width: 1024px) 250px, (min-width: 768px) 131px, 50px"
          src={post.imageSrc}
          width={post.cropClassName ? 1024 : undefined}
        />
      </div>
    </a>
  )
}
