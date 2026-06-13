import type { CSSProperties, ReactNode } from 'react'

import { PunchedTagCard } from '@/components/PunchedTagCard'
import type { PunchedTagCardVariantIndex } from '@/components/PunchedTagCard'
import { cn } from '@/utilities/ui'

import { CollaborationPillarsRibbon } from './CollaborationPillarsRibbon'
import {
  PUNCHED_TAG_CARD_RAIL_DESKTOP,
  PUNCHED_TAG_CARD_RAIL_FIGMA_NODES,
  PUNCHED_TAG_CARD_RAIL_MOBILE,
  PUNCHED_TAG_CARD_RAIL_TABLET,
} from './constants'

export type PunchedTagCardRailItem = {
  description: string
  figmaNodes?: {
    desktop?: string
    mobile?: string
    tablet?: string
  }
  title: string
  variantIndex: PunchedTagCardVariantIndex
}

type PunchedTagCardRailProps = {
  className?: string
  figmaNode?: string
  items: readonly PunchedTagCardRailItem[]
}

/**
 * Tilted tag rail — Figma `Container` per breakpoint.
 *
 * Desktop: `flex justify-between` row (`6994:26175`).
 * Tablet: `flex-col items-center` + `mb-0` (`7092:4675`, overlap eased from Figma `-16px`).
 * Mobile: `flex-col items-center` + `mb-0` (`7093:6060`, overlap eased from Figma `-6px`).
 */
export function PunchedTagCardRail({ className, figmaNode, items }: PunchedTagCardRailProps) {
  return (
    <div className={cn('relative flex w-full justify-center', className)}>
      <PunchedTagCardRailFlexViewport
        figmaNode={PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.mobile}
        items={items}
        layout={PUNCHED_TAG_CARD_RAIL_MOBILE}
        nodeKey="mobile"
        ribbonOnRail
        visibilityClassName="md:hidden"
      />

      <PunchedTagCardRailFlexViewport
        figmaNode={PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.tablet}
        items={items}
        layout={PUNCHED_TAG_CARD_RAIL_TABLET}
        nodeKey="tablet"
        ribbonOnCardIndex={1}
        visibilityClassName="hidden md:max-[1365px]:block"
      />

      <PunchedTagCardRailDesktopViewport
        figmaNode={figmaNode ?? PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.desktop}
        items={items}
      />
    </div>
  )
}

type PunchedTagCardRailFlexViewportProps = {
  figmaNode: string
  items: readonly PunchedTagCardRailItem[]
  layout: typeof PUNCHED_TAG_CARD_RAIL_MOBILE | typeof PUNCHED_TAG_CARD_RAIL_TABLET
  nodeKey: 'mobile' | 'tablet'
  ribbonOnCardIndex?: number
  ribbonOnRail?: boolean
  visibilityClassName: string
}

function PunchedTagCardRailFlexViewport({
  figmaNode,
  items,
  layout,
  nodeKey,
  ribbonOnCardIndex,
  ribbonOnRail = false,
  visibilityClassName,
}: PunchedTagCardRailFlexViewportProps) {
  return (
    <div
      className={cn('relative mx-auto shrink-0', visibilityClassName)}
      data-figma-node={figmaNode}
      data-name="Container"
      style={{ height: layout.heightPx, width: layout.widthPx }}
    >
      <div className={cn('relative size-full', layout.layoutClassName)}>
        {items.map((item, index) => {
          const slot = layout.slots[index]
          if (!slot) return null

          const ribbonOverlay =
            ribbonOnCardIndex === index ? (
              <CollaborationPillarsRibbon
                className="pointer-events-none absolute z-20"
                figmaNode={PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.ribbon[nodeKey]}
                placement={nodeKey}
              />
            ) : undefined

          return (
            <PunchedTagCardRailSlot
              articleOverlay={ribbonOverlay}
              className="relative flex shrink-0 items-center justify-center"
              figmaNode={item.figmaNodes?.[nodeKey]}
              item={item}
              key={item.title}
              style={{
                height: slot.heightPx,
                marginBottom: 'marginBottomPx' in slot ? slot.marginBottomPx : undefined,
                marginLeft: 'marginLeftPx' in slot ? slot.marginLeftPx : undefined,
                width: slot.widthPx,
                zIndex: index + 1,
              }}
            />
          )
        })}

        {ribbonOnRail ? (
          <CollaborationPillarsRibbon
            className="pointer-events-none absolute z-20"
            figmaNode={PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.ribbon[nodeKey]}
            placement={nodeKey}
          />
        ) : null}
      </div>
    </div>
  )
}

type PunchedTagCardRailDesktopViewportProps = {
  figmaNode: string
  items: readonly PunchedTagCardRailItem[]
}

function PunchedTagCardRailDesktopViewport({
  figmaNode,
  items,
}: PunchedTagCardRailDesktopViewportProps) {
  const layout = PUNCHED_TAG_CARD_RAIL_DESKTOP

  return (
    <div
      className="relative mx-auto hidden shrink-0 min-[1366px]:block"
      data-figma-node={figmaNode}
      data-name="Container"
      style={{ height: layout.heightPx, width: layout.widthPx }}
    >
      <div className={cn('relative size-full', layout.layoutClassName)}>
        {items.map((item, index) => {
          const slot = layout.slots[index]
          if (!slot) return null

          return (
            <PunchedTagCardRailSlot
              className="relative flex shrink-0 items-center justify-center"
              figmaNode={item.figmaNodes?.desktop}
              item={item}
              key={item.title}
              style={{
                height: slot.heightPx,
                marginTop: 'marginTopPx' in slot ? slot.marginTopPx : undefined,
                width: slot.widthPx,
                zIndex: index + 1,
              }}
            />
          )
        })}

        <CollaborationPillarsRibbon
          className="pointer-events-none absolute z-20"
          figmaNode={PUNCHED_TAG_CARD_RAIL_FIGMA_NODES.ribbon.desktop}
          placement="desktop"
        />
      </div>
    </div>
  )
}

type PunchedTagCardRailSlotProps = {
  articleOverlay?: ReactNode
  className?: string
  figmaNode?: string
  item: PunchedTagCardRailItem
  style: CSSProperties
}

function PunchedTagCardRailSlot({
  articleOverlay,
  className = 'absolute',
  figmaNode,
  item,
  style,
}: PunchedTagCardRailSlotProps) {
  return (
    <div className={className} style={style}>
      <PunchedTagCard
        articleOverlay={articleOverlay}
        description={item.description}
        figmaNode={figmaNode}
        title={item.title}
        variantIndex={item.variantIndex}
      />
    </div>
  )
}

