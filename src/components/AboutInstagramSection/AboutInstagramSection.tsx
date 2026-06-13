import { InstagramSection } from '@/components/InstagramSection'

import { ABOUT_INSTAGRAM_FIGMA_NODES, type AboutInstagramSectionData } from './constants'

type AboutInstagramSectionProps = {
  data: AboutInstagramSectionData
  headingId: string
}

/**
 * About page wrapper for {@link InstagramSection} — symmetric `py-12` shell.
 *
 * Figma references:
 * - Desktop: {@link ABOUT_INSTAGRAM_FIGMA_NODES.desktop} 7105:7422
 * - Tablet:  {@link ABOUT_INSTAGRAM_FIGMA_NODES.tablet} 7105:7437
 * - Mobile:  {@link ABOUT_INSTAGRAM_FIGMA_NODES.mobile} 7105:7452
 */
export function AboutInstagramSection({ data, headingId }: AboutInstagramSectionProps) {
  return (
    <InstagramSection data={data} figmaNodes={ABOUT_INSTAGRAM_FIGMA_NODES} headingId={headingId} />
  )
}
