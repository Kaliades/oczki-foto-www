import React, { Fragment } from 'react'

import { HomepageAboutTeaser } from './HomepageAboutTeaser/Component'
import { HomepageCta } from './HomepageCta/Component'
import { HomepageGallery } from './HomepageGallery/Component'
import { HomepageInstagram } from './HomepageInstagram/Component'
import { HomepageIntro } from './HomepageIntro/Component'
import { HomepagePhilosophy } from './HomepagePhilosophy/Component'
import { HomepageProcess } from './HomepageProcess/Component'
import { HomepageServices } from './HomepageServices/Component'
import { HomepageTestimonials } from './HomepageTestimonials/Component'

const blockComponents: Record<string, React.FC<any>> = {
  homepageAboutTeaser: HomepageAboutTeaser,
  homepageCta: HomepageCta,
  homepageGallery: HomepageGallery,
  homepageInstagram: HomepageInstagram,
  homepageIntro: HomepageIntro,
  homepagePhilosophy: HomepagePhilosophy,
  homepageProcess: HomepageProcess,
  homepageServices: HomepageServices,
  homepageTestimonials: HomepageTestimonials,
}

export const RenderBlocks: React.FC<{
  blocks: unknown[]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const b = block as Record<string, unknown>
          const blockType = b?.blockType as string | undefined

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return <Block {...b} key={index} />
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
