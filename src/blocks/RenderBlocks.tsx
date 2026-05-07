import React, { Fragment } from 'react'

import { HomepageAboutTeaser } from './HomepageAboutTeaser/Component'
import { HomepageCta } from './HomepageCta/Component'
import { HomepageGallery } from './HomepageGallery/Component'
import { HomepageHero } from './HomepageHero/Component'
import { HomepageInstagram } from './HomepageInstagram/Component'
import { HomepageIntro } from './HomepageIntro/Component'
import { HomepagePhilosophy } from './HomepagePhilosophy/Component'
import { HomepageProcess } from './HomepageProcess/Component'
import { HomepageServices } from './HomepageServices/Component'
import { HomepageTestimonials } from './HomepageTestimonials/Component'
import { AboutHero } from './AboutHero/Component'
import { AboutValues } from './AboutValues/Component'
import { AboutApproach } from './AboutApproach/Component'
import { AboutExpertise } from './AboutExpertise/Component'
import { AboutHobbies } from './AboutHobbies/Component'
import { AboutDuoBio } from './AboutDuoBio/Component'
import { AboutCollaboration } from './AboutCollaboration/Component'
import { AboutInstagram } from './AboutInstagram/Component'
import { AboutCta } from './AboutCta/Component'
import { AboutNewsletter } from './AboutNewsletter/Component'
import { GalleryHero } from './GalleryHero/Component'
import { GalleryGrid } from './GalleryGrid/Component'
import { GalleryQuoteBand } from './GalleryQuoteBand/Component'
import { GalleryFaq } from './GalleryFaq/Component'
import { GalleryCta } from './GalleryCta/Component'
import { GalleryNewsletter } from './GalleryNewsletter/Component'
import { PolicyHero } from './PolicyHero/Component'
import { PolicyContent } from './PolicyContent/Component'

const blockComponents: Record<string, React.FC<any>> = {
  homepageAboutTeaser: HomepageAboutTeaser,
  homepageCta: HomepageCta,
  homepageGallery: HomepageGallery,
  homepageHero: HomepageHero,
  homepageInstagram: HomepageInstagram,
  homepageIntro: HomepageIntro,
  homepagePhilosophy: HomepagePhilosophy,
  homepageProcess: HomepageProcess,
  homepageServices: HomepageServices,
  homepageTestimonials: HomepageTestimonials,
  aboutHero: AboutHero,
  aboutValues: AboutValues,
  aboutApproach: AboutApproach,
  aboutExpertise: AboutExpertise,
  aboutHobbies: AboutHobbies,
  aboutDuoBio: AboutDuoBio,
  aboutCollaboration: AboutCollaboration,
  aboutInstagram: AboutInstagram,
  aboutCta: AboutCta,
  aboutNewsletter: AboutNewsletter,
  galleryHero: GalleryHero,
  galleryGrid: GalleryGrid,
  galleryQuoteBand: GalleryQuoteBand,
  galleryFaq: GalleryFaq,
  galleryCta: GalleryCta,
  galleryNewsletter: GalleryNewsletter,
  policyHero: PolicyHero,
  policyContent: PolicyContent,
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
