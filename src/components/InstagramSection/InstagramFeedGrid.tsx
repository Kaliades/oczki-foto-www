import { INSTAGRAM_COMPONENT_FIGMA_NODES, type InstagramPost } from './constants'
import { InstagramPostTile } from './InstagramPostTile'

type InstagramFeedGridProps = {
  figmaNode?: string
  posts: readonly InstagramPost[]
  profileHref: string
}

/**
 * Instagram post preview grid (Figma 7105:7411).
 *
 * Mobile: `grid-cols-3` — three tiles on the first row, two on the second
 * (7105:7452 / 7105:14225). Tablet / desktop: `grid-cols-5` in a single row.
 * Gap is `12px` (`gap-3`) at every breakpoint.
 */
export function InstagramFeedGrid({
  figmaNode = INSTAGRAM_COMPONENT_FIGMA_NODES.grid,
  posts,
  profileHref,
}: InstagramFeedGridProps) {
  return (
    <ul
      className="grid w-full list-none grid-cols-3 gap-3 p-0 md:grid-cols-5"
      data-figma-node={figmaNode}
      data-name="Container"
    >
      {posts.map((post, index) => (
        <li className="min-w-0" key={index}>
          <InstagramPostTile
            figmaNode={INSTAGRAM_COMPONENT_FIGMA_NODES.posts[index]}
            href={post.href ?? profileHref}
            post={post}
          />
        </li>
      ))}
    </ul>
  )
}
