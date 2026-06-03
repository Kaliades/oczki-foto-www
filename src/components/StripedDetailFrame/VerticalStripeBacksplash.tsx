import {
  STRIPED_DETAIL_FRAME_FIGMA_NODES,
  STRIPED_DETAIL_FRAME_LAYOUT,
} from './constants'

const STRIPE_BAR_INDICES = Array.from(
  { length: STRIPED_DETAIL_FRAME_LAYOUT.stripeBarCount },
  (_, index) => index,
)

type VerticalStripeBacksplashProps = {
  className?: string
}

/**
 * Figma `Section Header` (`7102:14770`) — 32 × 4 px bars in `primary/200`,
 * `gap` 24 px so the mat (`secondary/200`) shows through, whole group at 36 % opacity.
 *
 * A single gradient with `opacity` on the layer was wrong: transparent “gaps”
 * blended differently than flex gaps over the sage mat.
 */
export function VerticalStripeBacksplash({ className }: VerticalStripeBacksplashProps) {
  const { backsplashHeightPx, backsplashOpacity, backsplashWidthPx, stripeGapPx, stripeWidthPx } =
    STRIPED_DETAIL_FRAME_LAYOUT

  return (
    <div
      aria-hidden="true"
      className={[
        'pointer-events-none absolute left-1/2 top-0 flex -translate-x-1/2 items-stretch',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      data-figma-node={STRIPED_DETAIL_FRAME_FIGMA_NODES.sectionHeader}
      data-name="Section Header"
      style={{
        width: backsplashWidthPx,
        height: backsplashHeightPx,
        gap: stripeGapPx,
        opacity: backsplashOpacity,
      }}
    >
      {STRIPE_BAR_INDICES.map((index) => (
        <div
          className="h-full shrink-0 bg-[var(--oczki-primary-200)]"
          key={index}
          style={{ width: stripeWidthPx }}
        />
      ))}
    </div>
  )
}
