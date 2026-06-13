import {
  STRIPED_DETAIL_FRAME_SHARED,
  type StripeBacksplashSpec,
} from './constants'

type StripeBacksplashLayerProps = {
  className?: string
  figmaNode?: string
  spec: StripeBacksplashSpec
}

const STRIPE_BAR_INDICES_CACHE = new Map<number, readonly number[]>()

function getBarIndices(count: number): readonly number[] {
  const cached = STRIPE_BAR_INDICES_CACHE.get(count)
  if (cached) {
    return cached
  }

  const indices = Array.from({ length: count }, (_, index) => index)
  STRIPE_BAR_INDICES_CACHE.set(count, indices)
  return indices
}

/**
 * One absolute-centred stripe field — Figma `Section Header` / `Card Background`.
 */
export function StripeBacksplashLayer({ className, figmaNode, spec }: StripeBacksplashLayerProps) {
  const { backsplashOpacity, stripeGapPx, stripeWidthPx } = STRIPED_DETAIL_FRAME_SHARED
  const { backsplashHeightPx, backsplashWidthPx, stripeBarCount } = spec

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 items-stretch',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-figma-node={figmaNode}
      data-name="Card Background"
      style={{
        width: backsplashWidthPx,
        height: backsplashHeightPx,
        gap: stripeGapPx,
        opacity: backsplashOpacity,
      }}
    >
      {getBarIndices(stripeBarCount).map((index) => (
        <div
          className="h-full shrink-0 bg-[var(--oczki-primary-200)]"
          key={index}
          style={{ width: stripeWidthPx }}
        />
      ))}
    </div>
  )
}
