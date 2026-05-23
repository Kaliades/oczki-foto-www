/**
 * Decorative full-bleed background made of 43 px vertical stripes
 * alternating between `secondary/600` and `secondary/700` — taken
 * verbatim from Figma node `7102:13755` (used on all three breakpoints).
 *
 * Implemented as a `repeating-linear-gradient` so the pattern tiles
 * infinitely above the 1366 px cap. The gradient lives on the outer
 * `<section>` (passed via inline `style`) — this component is exported
 * only for clarity when scanning the section composition.
 */
export const TESTIMONIAL_STRIPES_BACKGROUND_IMAGE =
  'repeating-linear-gradient(to right, var(--oczki-secondary-600) 0 43px, var(--oczki-secondary-700) 43px 86px)'
