import Image from 'next/image'

import { BorderedApproachBlock } from '@/components/BorderedApproachBlock'

import { APPROACH_BLOCKS_RAIL_DESKTOP_WIDTHS, APPROACH_BLOCKS_RAIL_FIGMA_NODES } from './constants'

export type ApproachBlockItem = {
  description: string
  figmaNode?: string
  layout: 'bookend' | 'stacked'
  stretchContent?: boolean
  title: string
}

type ApproachBlocksRailProps = {
  blocks: readonly [ApproachBlockItem, ApproachBlockItem, ApproachBlockItem]
  image: {
    alt: string
    figmaNode?: string
    src: string
  }
}

/**
 * Four-slot approach rail — Figma `Section`.
 *
 * Desktop (`6986:20148`): row — Block | Block | Image | Block (from 1366 px; rail needs 1302 px).
 * Tablet (`7100:7854`): 2×2 wrap, 300×426 cells, gap 8 px — also 768–1365 px.
 * Mobile (`7102:9525`): column stack, gap 8 px, image h 325 px.
 */
export function ApproachBlocksRail({ blocks, image }: ApproachBlocksRailProps) {
  const [firstBlock, secondBlock, thirdBlock] = blocks

  return (
    <div
      className="flex w-full flex-col items-end gap-2 md:flex-row md:flex-wrap md:items-stretch md:justify-center md:content-start min-[1366px]:flex-nowrap min-[1366px]:items-stretch min-[1366px]:justify-start"
      data-figma-node={APPROACH_BLOCKS_RAIL_FIGMA_NODES.desktop}
      data-name="Section"
    >
      <BorderedApproachBlock
        description={firstBlock.description}
        figmaNode={firstBlock.figmaNode}
        layout={firstBlock.layout}
        stretchContent={firstBlock.stretchContent}
        title={firstBlock.title}
        widthClassName={APPROACH_BLOCKS_RAIL_DESKTOP_WIDTHS[0]}
      />

      <BorderedApproachBlock
        description={secondBlock.description}
        figmaNode={secondBlock.figmaNode}
        layout={secondBlock.layout}
        stretchContent={secondBlock.stretchContent}
        title={secondBlock.title}
        widthClassName={APPROACH_BLOCKS_RAIL_DESKTOP_WIDTHS[1]}
      />

      <div
        className="relative h-[325px] w-full shrink-0 self-stretch overflow-hidden md:h-[426px] md:w-[300px] min-[1366px]:h-[442px] min-[1366px]:w-[241px]"
        data-figma-node={image.figmaNode}
        data-name="Image"
      >
        <Image
          alt={image.alt}
          className="object-cover"
          fill
          sizes="(min-width: 1366px) 241px, (min-width: 768px) 300px, 100vw"
          src={image.src}
        />
      </div>

      <BorderedApproachBlock
        description={thirdBlock.description}
        figmaNode={thirdBlock.figmaNode}
        layout={thirdBlock.layout}
        stretchContent={thirdBlock.stretchContent}
        title={thirdBlock.title}
        widthClassName={APPROACH_BLOCKS_RAIL_DESKTOP_WIDTHS[3]}
      />
    </div>
  )
}
