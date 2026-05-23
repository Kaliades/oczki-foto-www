import { InstagramPostTile } from './InstagramPostTile'
import type { InstagramPost } from './constants'

type InstagramFeedGridProps = {
  posts: readonly InstagramPost[]
  profileHref: string
}

/**
 * Instagram post preview grid (Figma 7105:7411).
 *
 * Mobile: `grid-cols-3` — three tiles on the first row, two on the second
 * (7105:14225). Tablet / desktop: `grid-cols-5` in a single row.
 * Gap is `12px` (`gap-3`) at every breakpoint.
 */
export function InstagramFeedGrid({ posts, profileHref }: InstagramFeedGridProps) {
  return (
    <ul className="grid w-full list-none grid-cols-3 gap-3 p-0 md:grid-cols-5">
      {posts.map((post, index) => (
        <li className="min-w-0" key={index}>
          <InstagramPostTile href={post.href ?? profileHref} post={post} />
        </li>
      ))}
    </ul>
  )
}
