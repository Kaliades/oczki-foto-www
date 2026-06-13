import { InstagramSection } from '@/components/InstagramSection'
import type { InstagramSectionData } from '@/components/InstagramSection'
import {
  HOME_INSTAGRAM_FIGMA_NODES,
  INSTAGRAM_SHELL_PADDING_BOTTOM,
} from './constants'

type HomeInstagramProps = {
  data: InstagramSectionData
}

/**
 * Homepage wrapper for {@link InstagramSection} — adds the cream band before HomeCta.
 *
 * Figma references:
 * - Desktop: {@link HOME_INSTAGRAM_FIGMA_NODES.desktop} 7105:7493
 * - Tablet:  {@link HOME_INSTAGRAM_FIGMA_NODES.tablet} 7105:11930
 * - Mobile:  {@link HOME_INSTAGRAM_FIGMA_NODES.mobile} 7105:14225
 */
export function HomeInstagram({ data }: HomeInstagramProps) {
  return (
    <InstagramSection
      data={data}
      figmaNodes={HOME_INSTAGRAM_FIGMA_NODES}
      headingId="home-instagram-heading"
      paddingBottom={INSTAGRAM_SHELL_PADDING_BOTTOM}
    />
  )
}
