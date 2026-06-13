import { cn } from '@/utilities/ui'

import {
  GINGHAM_ARTBOARD_WIDTH_PX,
  GINGHAM_STRIPE_BACKDROP_FIGMA_NODES,
  GINGHAM_STRIPE_WIDTH_PX,
  GINGHAM_WAVE_BAND_ROW_PITCH_PX,
} from './constants'

type GinghamStripeBackdropProps = {
  className?: string
  figmaNode?: string
}

/**
 * Pink gingham field — Figma `Container` (`7001:2008`).
 *
 * Vertical stripes (`7001:2009`) alternate tertiary/300 and tertiary/500 at 43 px.
 * Horizontal wave bands (`7001:2042`) use tertiary/700 @ 36 %.
 * Stripe phase anchors to the centred 1366 px artboard; both layers bleed full viewport.
 */
export function GinghamStripeBackdrop({ className, figmaNode }: GinghamStripeBackdropProps) {
  const stripeWidth = `${GINGHAM_STRIPE_WIDTH_PX}px`
  const wavePitch = `${GINGHAM_WAVE_BAND_ROW_PITCH_PX}px`
  const stripeOriginX = `calc(50% - ${GINGHAM_ARTBOARD_WIDTH_PX / 2}px)`

  return (
    <div
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
      data-figma-node={figmaNode ?? GINGHAM_STRIPE_BACKDROP_FIGMA_NODES.shell}
      data-name="Container"
    >
      <div
        className="absolute inset-x-0 top-[-5px] h-[calc(100%+5px)]"
        data-figma-node={GINGHAM_STRIPE_BACKDROP_FIGMA_NODES.stripes}
        data-name="Container"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            var(--oczki-tertiary-300) 0,
            var(--oczki-tertiary-300) ${stripeWidth},
            var(--oczki-tertiary-500) ${stripeWidth},
            var(--oczki-tertiary-500) calc(${stripeWidth} * 2)
          )`,
          backgroundPosition: `${stripeOriginX} top`,
        }}
      />
      <div
        className="absolute inset-0"
        data-figma-node={GINGHAM_STRIPE_BACKDROP_FIGMA_NODES.waveBands}
        data-name="Container"
        style={{
          backgroundImage: `repeating-linear-gradient(
            180deg,
            rgb(219 160 160 / 36%) 0,
            rgb(219 160 160 / 36%) 4px,
            transparent 4px,
            transparent 28px,
            rgb(219 160 160 / 36%) 28px,
            rgb(219 160 160 / 36%) 60px,
            transparent 60px,
            transparent ${wavePitch}
          )`,
        }}
      />
    </div>
  )
}
