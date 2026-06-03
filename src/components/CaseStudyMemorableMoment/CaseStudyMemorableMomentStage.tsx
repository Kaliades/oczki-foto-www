import Image from 'next/image'

import { CenteredSectionCopy } from '@/components/CenteredSectionCopy'
import { GrainDotCluster } from '@/components/GrainDotCluster'
import { TertiaryPlaidTile } from '@/components/TertiaryPlaidTile'

import {
  CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES,
  CASE_STUDY_MEMORABLE_MOMENT_LAYOUT,
  CASE_STUDY_MEMORABLE_MOMENT_STAGE,
  type CaseStudyMemorableMomentData,
  type CaseStudyMemorableMomentVariant,
} from './constants'

type CaseStudyMemorableMomentStageProps = {
  data: CaseStudyMemorableMomentData
  headingId: string
  variant: CaseStudyMemorableMomentVariant
}

/**
 * One breakpoint slice — all layers positioned section-absolute from Figma metadata.
 *
 * Mobile/tablet: fixed Figma reference canvas (360 / 768 px) centred inside wider
 * viewports so decorative bleed items move as a unit instead of sticking to edges.
 *
 * Z-order (back → front): dots, landscape, plaid, portrait, heading (z-10).
 */
export function CaseStudyMemorableMomentStage({
  data,
  headingId,
  variant,
}: CaseStudyMemorableMomentStageProps) {
  const stage = CASE_STUDY_MEMORABLE_MOMENT_STAGE[variant]
  const layout = CASE_STUDY_MEMORABLE_MOMENT_LAYOUT[variant]
  const nodes = CASE_STUDY_MEMORABLE_MOMENT_FIGMA_NODES
  const canvasWidth = 'width' in stage ? stage.width : undefined

  return (
    <div
      className="relative w-full shrink-0 overflow-visible"
      data-figma-node={stage.figmaNode}
      data-name="Herosection"
      style={{
        height: stage.height,
        maxWidth: canvasWidth ? '100%' : undefined,
        width: canvasWidth,
      }}
    >
      <div
        className="absolute"
        style={{ left: layout.dots.left, top: layout.dots.top }}
      >
        <GrainDotCluster variant={variant} />
      </div>

      <div
        className="absolute overflow-hidden"
        data-figma-node={nodes.landscape[variant]}
        data-name="Additional Image"
        style={{
          height: layout.landscape.height,
          left: layout.landscape.left,
          top: layout.landscape.top,
          width: layout.landscape.width,
        }}
      >
        <Image
          alt={data.landscapePhoto.alt}
          className="object-cover"
          fill
          sizes={`${layout.landscape.width}px`}
          src={data.landscapePhoto.src}
        />
      </div>

      <div
        className="absolute"
        data-figma-node={nodes.plaid[variant]}
        style={{ left: layout.plaid.left, top: layout.plaid.top }}
      >
        <TertiaryPlaidTile size={layout.plaid.size} />
      </div>

      <div
        className="absolute overflow-hidden"
        data-figma-node={nodes.portrait[variant]}
        data-name="Main Image"
        style={{
          height: layout.portrait.height,
          left: layout.portrait.left,
          top: layout.portrait.top,
          width: layout.portrait.width,
        }}
      >
        <Image
          alt={data.portraitPhoto.alt}
          className="object-cover"
          fill
          sizes={`${layout.portrait.width}px`}
          src={data.portraitPhoto.src}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--oczki-primary-100)] from-0% to-transparent to-50%"
          style={{ height: Math.round(layout.portrait.height * 0.38) }}
        />
      </div>

      <div
        className="absolute z-10"
        data-figma-node={nodes.heading[variant]}
        style={{ left: layout.heading.left, top: layout.heading.top }}
      >
        <CenteredSectionCopy
          body={data.body}
          headingId={headingId}
          title={data.title}
          variant={variant}
        />
      </div>
    </div>
  )
}
