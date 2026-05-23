import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { HomeGalleryBlock } from '@/blocks/HomeGallery/Component'
import { HomeHeroBlock } from '@/blocks/HomeHero/Component'
import { IntroQuoteBlock } from '@/blocks/IntroQuote/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { OfferShowcaseBlock } from '@/blocks/OfferShowcase/Component'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'

type LayoutBlock = Page['layout'][number]
type LayoutBlockType = LayoutBlock['blockType']

/**
 * Some legacy block components (ArchiveBlock, FormBlock) declare their `id`
 * prop as `id?: string` while the Payload-generated types use
 * `id?: string | null`. The mismatch is a template inheritance issue, not
 * a bug in our blocks. We type the map loosely and rely on the strongly-typed
 * `block` value during iteration for prop safety.
 */
const blockComponents: Record<LayoutBlockType, React.ComponentType<never>> = {
  archive: ArchiveBlock as React.ComponentType<never>,
  content: ContentBlock as React.ComponentType<never>,
  cta: CallToActionBlock as React.ComponentType<never>,
  formBlock: FormBlock as React.ComponentType<never>,
  homeGallery: HomeGalleryBlock as React.ComponentType<never>,
  homeHero: HomeHeroBlock as React.ComponentType<never>,
  introQuote: IntroQuoteBlock as React.ComponentType<never>,
  mediaBlock: MediaBlock as React.ComponentType<never>,
  offerShowcase: OfferShowcaseBlock as React.ComponentType<never>,
  processSteps: ProcessStepsBlock as React.ComponentType<never>,
  testimonial: TestimonialBlock as React.ComponentType<never>,
}

/**
 * Blocks that render their own full-bleed section chrome should NOT be
 * wrapped in `my-16` margins — that would punch a stripe of base
 * background between sections.
 */
const fullBleedBlocks = new Set<LayoutBlockType>([
  'homeGallery',
  'homeHero',
  'introQuote',
  'offerShowcase',
  'processSteps',
  'testimonial',
])

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = ({ blocks }) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (!(blockType in blockComponents)) return null

        const Block = blockComponents[blockType] as React.ComponentType<typeof block>
        const isFullBleed = fullBleedBlocks.has(blockType)

        return (
          <div className={isFullBleed ? undefined : 'my-16'} key={index}>
            <Block {...block} />
          </div>
        )
      })}
    </Fragment>
  )
}
