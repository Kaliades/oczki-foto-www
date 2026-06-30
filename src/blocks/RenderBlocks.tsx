import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { HomeAboutBlock } from '@/blocks/HomeAbout/Component'
import { HomeCtaBlock } from '@/blocks/HomeCta/Component'
import { HomeGalleryBlock } from '@/blocks/HomeGallery/Component'
import { HomeHeroBlock } from '@/blocks/HomeHero/Component'
import { HomeInstagramBlock } from '@/blocks/HomeInstagram/Component'
import { IntroQuoteBlock } from '@/blocks/IntroQuote/Component'
import { OfferShowcaseBlock } from '@/blocks/OfferShowcase/Component'
import { ProcessStepsBlock } from '@/blocks/ProcessSteps/Component'
import { TestimonialBlock } from '@/blocks/Testimonial/Component'

type LayoutBlock = Page['layout'][number]
type LayoutBlockType = LayoutBlock['blockType']

const blockComponents: Record<LayoutBlockType, React.ComponentType<never>> = {
  homeAbout: HomeAboutBlock as React.ComponentType<never>,
  homeCta: HomeCtaBlock as React.ComponentType<never>,
  homeGallery: HomeGalleryBlock as React.ComponentType<never>,
  homeHero: HomeHeroBlock as React.ComponentType<never>,
  homeInstagram: HomeInstagramBlock as React.ComponentType<never>,
  introQuote: IntroQuoteBlock as React.ComponentType<never>,
  offerShowcase: OfferShowcaseBlock as React.ComponentType<never>,
  processSteps: ProcessStepsBlock as React.ComponentType<never>,
  testimonial: TestimonialBlock as React.ComponentType<never>,
}

const fullBleedBlocks = new Set<LayoutBlockType>([
  'homeAbout',
  'homeCta',
  'homeGallery',
  'homeHero',
  'homeInstagram',
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
